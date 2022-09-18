package wicket.in.action.chapter11.authdiscounts;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.AbstractReadOnlyModel;

import wicket.in.action.common.AdminOnly;

public final class DiscountsPanel extends Panel {

  @AdminOnly
  private class ModeLink extends Link {

    ModeLink(String id) {
      super(id);
    }

    @Override
    public void onClick() {
      inEditMode = !inEditMode;
      setContentPanel();
    }
  }

  private boolean inEditMode = false;

  public DiscountsPanel(String id) {

    super(id);

    add(new DiscountsList("content"));
    ModeLink modeLink = new ModeLink("modeLink");
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