package wicket.in.action.chapter12.locdiscounts;

import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.CompoundPropertyModel;

import wicket.in.action.common.DataBase;
import wicket.in.action.common.Discount;
import wicket.in.action.common.RequiredTextField;

public final class NewDiscountForm extends Panel {

  private final class DiscountForm extends Form {

    public DiscountForm(String id) {

      super(id, new CompoundPropertyModel(new Discount()));

      add(new DropDownChoice("cheese", DataBase.getInstance()
          .listCheeses()).setRequired(true));
      add(new RequiredTextField("discount", double.class));
      add(new RequiredTextField("description"));
      add(new FeedbackPanel("feedback"));

      add(new Button("saveButton") {
        @Override
        public void onSubmit() {
          Discount discount = (Discount) DiscountForm.this
              .getModelObject();
          DataBase.getInstance().add(discount);
          DiscountsPanel discountsPanel = (DiscountsPanel) NewDiscountForm.this
              .getParent();
          discountsPanel.info("saved new discount " + discount);
          discountsPanel.setContentPanel();
        }
      });

      final Button cancelButton = new Button("cancelButton") {
        @Override
        public void onSubmit() {
          ((DiscountsPanel) NewDiscountForm.this.getParent())
              .setContentPanel();
        }
      };
      add(cancelButton);
      cancelButton.setDefaultFormProcessing(false);
    }
  }

  public NewDiscountForm(String id) {

    super(id);
    add(new DiscountForm("form"));
  }
}