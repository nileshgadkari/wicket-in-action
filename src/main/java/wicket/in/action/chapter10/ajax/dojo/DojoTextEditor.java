package wicket.in.action.chapter10.ajax.dojo;

import org.apache.wicket.ResourceReference;
import org.apache.wicket.behavior.HeaderContributor;
import org.apache.wicket.behavior.StringHeaderContributor;
import org.apache.wicket.markup.ComponentTag;
import org.apache.wicket.markup.html.form.TextArea;
import org.apache.wicket.model.IModel;

public class DojoTextEditor extends TextArea {

  public DojoTextEditor (String id) {
    super(id);
    init();
  }

  public DojoTextEditor (String id,
      IModel model) {
    super(id, model);
    init();
  }

  protected String getMenuItems() {
    return "formatblock;|;insertunorderedlist;insertorderedlist;|;bold;italic;underline;strikethrough;|;createLink;";
  }

  @Override
  protected void onComponentTag(ComponentTag tag) {
    super.onComponentTag(tag);
    tag.put("dojoType", "Editor");
    String menuItems = getMenuItems();
    tag.put("items", menuItems);
  }

  private void init() {
    add(HeaderContributor.forJavaScript(new ResourceReference(
        DojoTextEditor.class, "dojo.js")));
    add(new StringHeaderContributor(
        "<script type=\"text/javascript\">dojo.require(\"dojo.widget.Editor\");</script>"));
  }
}
