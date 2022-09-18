package wicket.in.action.chapter09.resdiscounts;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import org.apache.wicket.ResourceReference;
import org.apache.wicket.behavior.SimpleAttributeModifier;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.upload.FileUpload;
import org.apache.wicket.markup.html.form.upload.FileUploadField;
import org.apache.wicket.markup.html.image.Image;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.markup.repeater.Item;
import org.apache.wicket.markup.repeater.RefreshingView;
import org.apache.wicket.markup.repeater.ReuseIfModelsEqualStrategy;
import org.apache.wicket.markup.repeater.util.ModelIteratorAdapter;
import org.apache.wicket.model.CompoundPropertyModel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.PropertyModel;

import wicket.in.action.chapter08.discounts.NewDiscountForm;
import wicket.in.action.chapter13.dbdiscounts.web.model.EqualsDecorator;
import wicket.in.action.common.DataBase;
import wicket.in.action.common.DateTimeField;
import wicket.in.action.common.Discount;
import wicket.in.action.common.PercentageField;
import wicket.in.action.common.RequiredTextField;

public final class DiscountsEditList extends Panel {

  private final class ImportForm extends Form {

    private transient FileUpload file;

    public ImportForm(String id) {
      super(id);
      setMultiPart(true);
      add(new FileUploadField("file", new PropertyModel(this, "file")));
    }

    public FileUpload getFile() {
      return file;
    }

    public void setFile(FileUpload file) {
      this.file = file;
    }

    @Override
    protected void onSubmit() {
      if (file != null) {
        try {
          int count = DataBase.getInstance().importDiscounts(
              file.getInputStream());
          info(count + " discounts imported");
        } catch (IOException e) {
          error(e.getMessage());
        }
      } else {
        warn("nothing imported; nothing was uploaded");
      }
    }
  }

  private List<Discount> discounts;

  public DiscountsEditList(String id) {

    super(id);
    Form form = new Form("form");
    add(form);
    form.add(new Button("newButton") {
      @Override
      public void onSubmit() {
        DiscountsEditList.this.replaceWith(new NewDiscountForm(
            DiscountsEditList.this.getId()));
      }
    });
    form.add(new Button("saveButton") {
      @Override
      public void onSubmit() {
        DataBase.getInstance().update(discounts);
        info("discounts updated");
      }
    });
    form.add(new FeedbackPanel("feedback"));

    RefreshingView discountsView = new RefreshingView("discounts") {

      @Override
      protected Iterator getItemModels() {
        if (discounts == null) {
          discounts = DataBase.getInstance().listDiscounts();
        }
        return new ModelIteratorAdapter(discounts.iterator()) {
          @Override
          protected IModel model(Object object) {
            return EqualsDecorator
                .decorate(new CompoundPropertyModel((Discount) object));
          }
        };
      }

      @Override
      protected void populateItem(Item item) {
        item.add(new Label("cheese.name"));
        item.add(new PercentageField("discount"));
        item.add(new RequiredTextField("description"));
        item.add(new DateTimeField("from"));
        item.add(new DateTimeField("until"));

        final Discount discount = (Discount) item.getModelObject();
        final Link removeLink = new Link("remove") {
          @Override
          public void onClick() {
            DataBase.getInstance().remove(discount);
          }
        };
        item.add(removeLink);
        removeLink.add(new Image("icon", new ResourceReference(
            DiscountsEditList.class, "remove_icon.gif")));
        removeLink.add(new SimpleAttributeModifier("onclick",
            "if(!confirm('remove discount for "
                + discount.getCheese().getName()
                + " ?')) return false;"));
      }
    };
    discountsView.setItemReuseStrategy(ReuseIfModelsEqualStrategy
        .getInstance());
    form.add(discountsView);
    add(new ImportForm("importForm"));
  }
}