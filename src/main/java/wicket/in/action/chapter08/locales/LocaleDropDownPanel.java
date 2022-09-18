package wicket.in.action.chapter08.locales;

import java.util.List;
import java.util.Locale;

import org.apache.wicket.markup.html.form.ChoiceRenderer;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.IModel;

public class LocaleDropDownPanel extends Panel {

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
          getSession().setLocale((Locale) object);
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

  public LocaleDropDownPanel(String id, List supportedLocales) {
    super(id);
    add(new LocaleDropDown("localeSelect", supportedLocales));
  }
}
