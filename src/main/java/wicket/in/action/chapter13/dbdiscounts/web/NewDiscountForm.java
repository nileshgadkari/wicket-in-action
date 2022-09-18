package wicket.in.action.chapter13.dbdiscounts.web;

import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.ChoiceRenderer;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.CompoundPropertyModel;
import org.apache.wicket.spring.injection.annot.SpringBean;

import wicket.in.action.chapter13.dbdiscounts.domain.Discount;
import wicket.in.action.chapter13.dbdiscounts.services.DiscountsService;
import wicket.in.action.common.PercentageField;
import wicket.in.action.common.RequiredTextField;

public final class NewDiscountForm extends Panel {

  @SpringBean
  private DiscountsService service;

  public NewDiscountForm(String id) {

    super(id);
    final Form form = new Form("form", new CompoundPropertyModel(
        new Discount()));
    add(form);
    form.add(new DropDownChoice("cheese", service.findAllCheeses(),
        new ChoiceRenderer("name")).setRequired(true));
    form.add(new PercentageField("discount"));
    form.add(new RequiredTextField("description"));
    form.add(new FeedbackPanel("feedback"));

    form.add(new Button("saveButton") {
      @Override
      public void onSubmit() {
        Discount discount = (Discount) form.getModelObject();
        service.saveDiscount(discount);
        DiscountsPanel discountsPanel = (DiscountsPanel) NewDiscountForm.this
            .getParent();
        discountsPanel.info("saved new discount " + discount);
        discountsPanel.setContentPanel();
      }
    });

    Button cancelButton = new Button("cancelButton") {
      @Override
      public void onSubmit() {
        ((DiscountsPanel) NewDiscountForm.this.getParent())
            .setContentPanel();
      }
    };
    form.add(cancelButton);
    cancelButton.setDefaultFormProcessing(false);
  }
}