package wicket.in.action.chapter12.locdiscounts;

import java.io.IOException;
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
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.PropertyListView;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.model.ResourceModel;

import wicket.in.action.common.DataBase;
import wicket.in.action.common.Discount;
import wicket.in.action.common.RequiredTextField;

public final class DiscountsEditList extends Panel {

  private final class DiscountsForm extends Form {

    public DiscountsForm(String id) {
      super(id);

      discounts = DataBase.getInstance().listDiscounts();
      add(discountsListView = new DiscountsListView("discounts"));

      add(new Button("newButton", new ResourceModel("new")) {
        @Override
        public void onSubmit() {
          DiscountsEditList.this.replaceWith(new NewDiscountForm(
              DiscountsEditList.this.getId()));
        }
      });

      add(new Button("saveButton", new ResourceModel("save")) {
        @Override
        public void onSubmit() {
          DataBase.getInstance().update(discounts);
          discountsListView.removeAll();
          info("discounts updated");
        }
      });

      add(new FeedbackPanel("feedback"));
    }
  }

  private final class DiscountsListView extends PropertyListView {

    public DiscountsListView(String id) {
      super(id, discounts);
      setReuseItems(true);
    }

    @Override
    protected void populateItem(ListItem item) {

      item.add(new Label("cheese.name"));
      item.add(new RequiredTextField("discount", double.class));
      item.add(new RequiredTextField("description"));

      final Discount discount = (Discount) item.getModelObject();
      final Link removeLink = new Link("remove") {
        @Override
        public void onClick() {
          DataBase.getInstance().remove(discount);
          discounts = DataBase.getInstance().listDiscounts();
          DiscountsListView.this.setList(discounts);
        }
      };
      item.add(removeLink);
      removeLink.add(new SimpleAttributeModifier("onclick",
          "if(!confirm('remove discount for "
              + discount.getCheese().getName()
              + " ?')) return false;"));
      removeLink.add(new Image("icon", new ResourceReference(
          DiscountsEditList.class, "remove_icon.gif")));
    }
  }

  private final class ImportForm extends Form {

    private transient FileUpload file;

    public ImportForm(String id) {
      super(id);
      setMultiPart(true);
      add(new FileUploadField("file", new PropertyModel(this, "file")));
      add(new Button("import", new ResourceModel("import")) {

        @Override
        public void onSubmit() {
          if (file != null) {
            try {
              int count = DataBase.getInstance().importDiscounts(
                  file.getInputStream());
              info(count + " discounts imported");
              discounts = DataBase.getInstance().listDiscounts();
              discountsListView.setList(discounts);
            } catch (IOException e) {
              error(e.getMessage());
            }
          } else {
            warn("nothing imported; nothing was uploaded");
          }
        }
      });
    }

    public FileUpload getFile() {
      return file;
    }

    public void setFile(FileUpload file) {
      this.file = file;
    }
  }

  private List<Discount> discounts;

  private DiscountsListView discountsListView;

  public DiscountsEditList(String id) {

    super(id);
    add(new DiscountsForm("form"));
    add(new ImportForm("importForm"));
  }
}