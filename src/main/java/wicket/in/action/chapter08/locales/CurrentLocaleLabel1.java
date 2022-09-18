package wicket.in.action.chapter08.locales;

import java.util.Locale;

import org.apache.wicket.Component;
import org.apache.wicket.Session;
import org.apache.wicket.behavior.IBehavior;
import org.apache.wicket.behavior.SimpleAttributeModifier;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.model.AbstractReadOnlyModel;
import org.apache.wicket.model.IModel;

public final class CurrentLocaleLabel1 extends Label {

  public CurrentLocaleLabel1(String id) {
    super(id, new AbstractReadOnlyModel() {

      @Override
      public String getObject() {
        Locale locale = Session.get().getLocale();
        return "locale: " + locale.getDisplayName(locale);
      }
    });

    add(new SimpleAttributeModifier("style",
        "border: thin solid orange;"));
  }

  @Override
  public Component setModel(IModel model) {
    throw new IllegalStateException("setting model not allowed");
  }

  @Override
  protected boolean isBehaviorAccepted(IBehavior behavior) {
    if (behavior instanceof SimpleAttributeModifier) {
      SimpleAttributeModifier m = (SimpleAttributeModifier) behavior;
      return "style".equalsIgnoreCase(m.getAttribute());
    }
    return super.isBehaviorAccepted(behavior);
  }
}