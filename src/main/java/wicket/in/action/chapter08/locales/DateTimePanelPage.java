package wicket.in.action.chapter08.locales;

import java.util.Date;

import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.validation.validator.DateValidator;

import wicket.in.action.AbstractBasePage;
import wicket.in.action.common.DateTimeField;

public class DateTimePanelPage extends AbstractBasePage {

  private Date date = new Date();

  public DateTimePanelPage() {
    Form form = new Form("form") {
      @Override
      protected void onSubmit() {
        info("new date value: " + date);
      }
    };
    add(form);
    IModel model = new PropertyModel(this, "date");
    DateTimeField dateTimeField = new DateTimeField("dateTime", model);
    dateTimeField.add(DateValidator.minimum(new Date()));
    form.add(dateTimeField);
    add(new FeedbackPanel("feedback"));
  }
}
