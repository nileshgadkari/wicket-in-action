package wicket.in.action.chapter11.authdiscounts;

import org.apache.wicket.Page;
import org.apache.wicket.PageParameters;
import org.apache.wicket.RestartResponseAtInterceptPageException;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.BookmarkablePageLink;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.PropertyModel;

import wicket.in.action.common.SignOutPage;
import wicket.in.action.common.SigninPage;
import wicket.in.action.common.WiaSession;

public class UserPanel extends Panel {

  public UserPanel(String id, Class<? extends Page> logoutPageClass) {

    super(id);
    add(new Label("fullname", new PropertyModel(this,
        "session.user.fullname")));
    PageParameters parameters = new PageParameters();
    parameters.add(SignOutPage.REDIRECTPAGE_PARAM, logoutPageClass
        .getName());
    add(new BookmarkablePageLink("signout", SignOutPage.class,
        parameters) {
      @Override
      public boolean isVisible() {
        return WiaSession.get().isAuthenticated();
      }
    });
    add(new Link("signin") {

      @Override
      public void onClick() {
        throw new RestartResponseAtInterceptPageException(
            SigninPage.class);
      }

      @Override
      public boolean isVisible() {
        return !WiaSession.get().isAuthenticated();
      }
    });
  }
}
