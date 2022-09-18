package wicket.in.action.chapter12.locdiscounts2;

import java.util.Arrays;
import java.util.Locale;

import org.apache.wicket.Page;
import org.apache.wicket.PageParameters;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.BookmarkablePageLink;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.LoadableDetachableModel;
import org.apache.wicket.model.PropertyModel;

import wicket.in.action.chapter08.locales.LocaleDropDown;
import wicket.in.action.common.SignOutPage;
import wicket.in.action.common.User;
import wicket.in.action.common.WiaSession;

public class UserPanel extends Panel {

  public UserPanel(String id, Class<? extends Page> logoutToPageClass) {

    super(id);
    IModel userModel = new LoadableDetachableModel() {
      @Override
      protected User load() {
        return WiaSession.get().getUser();
      }
    };
    IModel nameModel = new PropertyModel(userModel, "fullname");
    add(new Label("fullname", nameModel));
    PageParameters parameters = new PageParameters();
    parameters.add(SignOutPage.REDIRECTPAGE_PARAM, logoutToPageClass
        .getName());
    add(new BookmarkablePageLink("signout", SignOutPage.class, parameters));
    add(new LocaleDropDown("localeSelect", Arrays
        .asList(new Locale[] { Locale.ENGLISH, new Locale("nl"),
            new Locale("th") })));
  }

  @Override
  public boolean isVisible() {
    return WiaSession.get().isAuthenticated();
  }
}
