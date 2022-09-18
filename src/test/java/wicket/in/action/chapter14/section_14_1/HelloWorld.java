package wicket.in.action.chapter14.section_14_1;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.model.ResourceModel;

/**
 * @author dashorst
 */
public class HelloWorld extends WebPage {
  public HelloWorld() {
    add(new Label("message", new ResourceModel("greeting", "Helaaalo, world!")));
  }
}

