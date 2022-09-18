package wicket.in.action.chapter08.locales;

import java.util.List;
import java.util.Locale;

import org.apache.wicket.MetaDataKey;
import org.apache.wicket.Session;
import org.apache.wicket.markup.html.form.ChoiceRenderer;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.IModel;

public class LocaleDropDownWithReset extends Panel {

  static MetaDataKey SAVED = new MetaDataKey(Locale.class) {
  };

  private static class LocaleDropDown extends DropDownChoice {

    private class LocaleRenderer extends ChoiceRenderer {

      @Override
      public String getDisplayValue(Object locale) {
        return ((Locale) locale).getDisplayName(getLocale());
      }
    }

    LocaleDropDown(String id, List supportedLocales) {
      super(id, supportedLocales);
      setChoiceRenderer(new LocaleRenderer());
      setModel(new IModel() {

        public Object getObject() {
          return getSession().getLocale();
        }

        public void setObject(Object object) {
          Session session = getSession();
          Locale keep = (Locale) session.getMetaData(SAVED);
          if (keep == null) {
            session.setMetaData(SAVED, getLocale());
          }
          session.setLocale((Locale) object);
        }

        public void detach() {
        }
      });
    }

    @Override
    protected boolean wantOnSelectionChangedNotifications() {
      return true;
    }
  }

  public LocaleDropDownWithReset(String id, List supportedLocales) {
    super(id);
    add(new LocaleDropDown("localeSelect", supportedLocales));
    add(new Link("reset") {
      @Override
      public void onClick() {
        Session session = getSession();
        Locale keep = (Locale) session.getMetaData(SAVED);
        if (keep != null) {
          session.setLocale(keep);
          session.setMetaData(SAVED, null);
        }
      }
    });
  }
}
