package wicket.in.action.chapter06.section_6_1;

import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.model.Model;

import wicket.in.action.AbstractBasePage;

/**
 * @author dashorst
 */
public class FormsPage extends AbstractBasePage {
  public FormsPage() {
    Form form = new Form("form") {
      @Override
      protected void onSubmit() {
        System.out.println("form was submitted!");
      }
    };
    add(form);
    form.add(new TextField("field", new Model("")));
  }
}
