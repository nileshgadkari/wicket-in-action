package wicket.in.action.chapter09.resdiscounts3;

import org.apache.wicket.ResourceReference;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.link.ResourceLink;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.AbstractReadOnlyModel;

import wicket.in.action.chapter08.discounts.DiscountsList;
import wicket.in.action.chapter11.authdiscounts.DiscountsEditList;

public final class DiscountsPanel extends Panel {

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

    ResourceReference ref = new ResourceReference("discounts");
    add(new ResourceLink("exportLink", ref));
  }

  void setContentPanel() {
    if (inEditMode) {
      addOrReplace(new DiscountsEditList("content"));
    } else {
      addOrReplace(new DiscountsList("content"));
    }
  }
}