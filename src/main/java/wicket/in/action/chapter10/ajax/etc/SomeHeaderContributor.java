package wicket.in.action.chapter10.ajax.etc;

import org.apache.wicket.behavior.AbstractBehavior;
import org.apache.wicket.markup.html.IHeaderContributor;
import org.apache.wicket.markup.html.IHeaderResponse;

public class SomeHeaderContributor extends AbstractBehavior implements
    IHeaderContributor {

  private static final String id = "foo";

  @Override
  public void renderHead(IHeaderResponse response) {

    if (!response.wasRendered(id)) {

      response.renderString("<!-- very meaningful contribution -->");

      response.markRendered(id);
    }
  }
}