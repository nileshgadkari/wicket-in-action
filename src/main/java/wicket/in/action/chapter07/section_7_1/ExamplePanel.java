package wicket.in.action.chapter07.section_7_1;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.panel.Panel;

/**
 * @author dashorst
 */
public class ExamplePanel extends Panel {

  public ExamplePanel(String id) {
    super(id);
    add(new Label("title", "Example Panel"));
  }
}
