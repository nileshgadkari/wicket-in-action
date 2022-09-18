package wicket.in.action.chapter07.section_7_1;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.panel.Panel;

/**
 * @author dashorst
 */
public class LabelsGroup extends Panel {
  public LabelsGroup(String id) {
    super(id);
    add(new Label("dexter", "Omelette du fromage"));
    add(new Label("deedee", "That's all you can say!"));
  }
}
