package wicket.in.action.chapter10.ajax.dojo;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.model.PropertyModel;

public class Index extends WebPage {

  private String text = "Lorem ipsum dolor sit amet, consectetuer adipiscing "
      + "elit.Pellentesque egestas, metus imperdiet nonummy viverra, felis odio imperdiet augue, "
      + "sit amet consectetuer mi magna fringilla nunc. Aliquam adipiscing sodales est. Phasellus laoreet. "
      + "Curabitur nec dolor. Aliquam erat volutpat. Pellentesque purus lacus, vehicula vitae, molestie sed, "
      + "suscipit et, turpis. Integer est massa, accumsan in, interdum eu, scelerisque vel, turpis. "
      + "Etiam quis pede. Proin lorem nunc, commodo id, hendrerit at, tempor tincidunt, nisi. "
      + "Nulla semper orci placerat sapien. Phasellus id dui molestie sapien condimentum dictum. "
      + "Nulla odio nunc, dignissim nec, luctus id, molestie sed, quam. Vestibulum eu magna sit amet "
      + "risus porta luctus. Maecenas sit amet velit in mauris egestas tincidunt. Fusce viverra "
      + "laoreet lacus. Quisque ultrices lorem sit amet lacus. Cum sociis natoque penatibus et magnis "
      + "dis parturient montes, nascetur ridiculus mus. Nam at arcu eget eros dignissim vehicula.";

  public Index() {

    Form form = new Form("form");
    add(form);
    form.add(new Button("apply") {

      @Override
      public void onSubmit() {
        System.err.println("text: " + text);
      }
    });
    form.add(new DojoTextEditor("editor", new PropertyModel(this,
        "text")));
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }
}
