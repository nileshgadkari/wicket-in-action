package wicket.in.action.chapter08.locales;

import java.util.Locale;

import org.apache.wicket.Session;
import org.apache.wicket.markup.ComponentTag;
import org.apache.wicket.markup.MarkupStream;
import org.apache.wicket.markup.html.WebComponent;

public final class CurrentLocaleLabel extends WebComponent {

  public CurrentLocaleLabel(String id) {
    super(id);
  }

  @Override
  protected void onComponentTag(ComponentTag tag) {
    super.onComponentTag(tag);
    tag.put("style", "border: thin solid orange;");
  }

  @Override
  protected void onComponentTagBody(MarkupStream markupStream,
      ComponentTag tag) {
    Locale locale = Session.get().getLocale();
    String s = "locale: " + locale.getDisplayName(locale);
    replaceComponentTagBody(markupStream, tag, s);
  }
}