package wicket.in.action.chapter07.section_7_2;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.model.PropertyModel;

/**
 * @author dashorst
 */
public class ChildPage extends BasePage {
  private int nr = 0;

  public ChildPage() {
    add(new Label("nr", new PropertyModel(this, "nr")));
  }

  public int getNr() {
    return nr++;
  }
}
