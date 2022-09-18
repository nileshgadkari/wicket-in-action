package wicket.in.action.chapter10.ajax.scriptaculous;

import org.apache.wicket.RequestCycle;
import org.apache.wicket.ResourceReference;
import org.apache.wicket.behavior.AbstractAjaxBehavior;
import org.apache.wicket.markup.html.IHeaderResponse;
import org.apache.wicket.request.target.basic.StringRequestTarget;

public abstract class AbstractScriptaculousBehavior extends
    AbstractAjaxBehavior {

  public void onRequest() {
    RequestCycle.get().setRequestTarget(
        new StringRequestTarget(getAnswer()));
  }

  @Override
  public final void renderHead(IHeaderResponse response) {
    response.renderJavascriptReference(new ResourceReference(
        AbstractScriptaculousBehavior.class, "prototype.js"));
    response.renderJavascriptReference(new ResourceReference(
        AbstractScriptaculousBehavior.class, "scriptaculous.js"));
    response.renderJavascriptReference(new ResourceReference(
        AbstractScriptaculousBehavior.class, "behavior.js"));
    onRenderHead(response);
  }

  protected abstract String getAnswer();

  protected void onRenderHead(IHeaderResponse response) {
  }
}
