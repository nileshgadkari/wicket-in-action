package wicket.in.action.chapter13.dbdiscounts.web;

import java.util.Iterator;
import java.util.List;

import org.apache.wicket.behavior.SimpleAttributeModifier;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.markup.repeater.Item;
import org.apache.wicket.markup.repeater.RefreshingView;
import org.apache.wicket.markup.repeater.ReuseIfModelsEqualStrategy;
import org.apache.wicket.model.IModel;
import org.apache.wicket.spring.injection.annot.SpringBean;

import wicket.in.action.chapter13.dbdiscounts.domain.Discount;
import wicket.in.action.chapter13.dbdiscounts.services.DiscountsService;
import wicket.in.action.chapter13.dbdiscounts.web.model.DomainModelIteratorAdaptor;
import wicket.in.action.chapter13.dbdiscounts.web.model.HashcodeEnabledCompoundPropertyModel;
import wicket.in.action.common.DateTimeField;
import wicket.in.action.common.PercentageField;
import wicket.in.action.common.RequiredTextField;

public final class DiscountsEditList extends Panel {

  @SpringBean
  private DiscountsService service;

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
        service.saveDiscounts(discounts);
        info("discounts updated");
      }
    });
    form.add(new FeedbackPanel("feedback"));

    RefreshingView discountsView = new RefreshingView("discounts") {

      @Override
      protected Iterator getItemModels() {
        discounts = service.findAllDiscounts();
        return new DomainModelIteratorAdaptor<Discount>(discounts
            .iterator()) {
          @Override
          protected IModel model(Object object) {
            return new HashcodeEnabledCompoundPropertyModel(
                (Discount) object);
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
            service.deleteDiscount(discount);
          }
        };
        item.add(removeLink);
        removeLink.add(new SimpleAttributeModifier("onclick",
            "if(!confirm('remove discount for "
                + discount.getCheese().getName()
                + " ?')) return false;"));
      }
    };
    discountsView.setItemReuseStrategy(ReuseIfModelsEqualStrategy
        .getInstance());
    form.add(discountsView);
  }
}