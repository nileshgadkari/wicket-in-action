package wicket.in.action.chapter09.resdiscounts;

import org.apache.wicket.markup.html.WebResource;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.link.ResourceLink;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.AbstractReadOnlyModel;
import org.apache.wicket.protocol.http.WebResponse;
import org.apache.wicket.util.resource.IResourceStream;
import org.apache.wicket.util.resource.StringResourceStream;

import wicket.in.action.common.DataBase;

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

    WebResource export = new WebResource() {

      @Override
      public IResourceStream getResourceStream() {
        CharSequence discounts = DataBase.getInstance()
            .exportDiscounts();
        return new StringResourceStream(discounts, "text/csv");
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