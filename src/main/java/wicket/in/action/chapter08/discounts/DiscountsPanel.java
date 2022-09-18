package wicket.in.action.chapter08.discounts;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.AbstractReadOnlyModel;

public class DiscountsPanel extends Panel {

  private boolean inEditMode = false;

  public DiscountsPanel(String id) {
    super(id);
    add(new DiscountsList("content"));
    Link modeLink = new Link("modeLink") {
      @Override
      public void onClick() {
        inEditMode = !inEditMode;
        setContentPanel();
      }
    };
    add(modeLink);
    modeLink.add(new Label("linkLabel", new AbstractReadOnlyModel() {
      @Override
      public Object getObject() {
        return inEditMode ? "[display]" : "[edit]";
      }
    }));
  }

  void setContentPanel() {
    if (inEditMode) {
      addOrReplace(new DiscountsEditList("content"));
    } else {
      addOrReplace(new DiscountsList("content"));
    }
  }
}