package wicket.in.action.chapter06.section_6_5;

import org.apache.wicket.Page;
import org.apache.wicket.markup.html.link.Link;

import wicket.in.action.AbstractBasePage;

/**
 * @author dashorst
 */
public class Page2 extends AbstractBasePage {
  public Page2(final Page returnTo) {
    add(new Link("returnLink") {
      @Override
      public void onClick() {
        setResponsePage(returnTo);
      }
    });
  }
}
