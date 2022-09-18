package wicket.in.action.chapter12.locdiscounts;

import org.apache.wicket.markup.html.WebResource;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.link.ResourceLink;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.AbstractReadOnlyModel;
import org.apache.wicket.protocol.http.WebResponse;
import org.apache.wicket.util.resource.IResourceStream;
import org.apache.wicket.util.resource.StringResourceStream;

import wicket.in.action.common.AdminOnly;
import wicket.in.action.common.DataBase;

public final class DiscountsPanel extends Panel {

  @AdminOnly
  private class ModeLink extends Link {

    private ModeLink(String id) {
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
        String key = (inEditMode) ? "display" : "edit";
        return "["
            + getLocalizer().getString(key, DiscountsPanel.this)
            + "]";
      }
    }));

    WebResource export = new WebResource() {

      @Override
      public IResourceStream getResourceStream() {
        CharSequence discounts = DataBase.getInstance()
            .exportDiscounts();
        return new StringResourceStream(discounts, "text/plain");
      }

      @Override
      protected void setHeaders(WebResponse response) {
        super.setHeaders(response);
        response.setAttachmentHeader("discounts.csv");
      }
    };
    export.setCacheable(false);

    add(new ResourceLink("exportLink", export));
  }

  void setContentPanel() {
    if (inEditMode) {
      addOrReplace(new DiscountsEditList("content"));
    } else {
      addOrReplace(new DiscountsList("content"));
    }
  }
}