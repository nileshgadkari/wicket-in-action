package wicket.in.action.chapter14.section_14_3;

import java.util.Arrays;

import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.extensions.ajax.markup.html.IndicatingAjaxLink;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.CheckBox;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.model.CompoundPropertyModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.settings.IExceptionSettings;
import org.apache.wicket.settings.IExceptionSettings.UnexpectedExceptionDisplay;
import org.apache.wicket.util.lang.PropertyResolver;
import org.apache.wicket.util.time.Duration;

import wicket.in.action.AbstractBasePage;

/**
 * @author dashorst
 */
public class Index extends AbstractBasePage {
  public Index() {
    setModel(new CompoundPropertyModel(this));
    add(new Label("application.configurationType"));
    add(new DropDownChoice(
        "application.resourceSettings.resourcePollFrequency", Arrays
            .asList(Duration.seconds(1), Duration.seconds(5),
                Duration.seconds(30), Duration.ONE_MINUTE, Duration
                    .minutes(2), Duration.minutes(3))) {
      @Override
      protected boolean wantOnSelectionChangedNotifications() {
        return true;
      }
    }.setNullValid(true));
    add(new CheckBox("application.debugSettings.componentUseCheck") {
      @Override
      protected boolean wantOnSelectionChangedNotifications() {
        return true;
      }
    });
    add(new CheckBox("application.markupSettings.stripWicketTags") {
      @Override
      protected boolean wantOnSelectionChangedNotifications() {
        return true;
      }
    });
    add(new DropDownChoice(
        "application.exceptionSettings.unexpectedExceptionDisplay",
        Arrays.asList(IExceptionSettings.SHOW_EXCEPTION_PAGE,
            IExceptionSettings.SHOW_INTERNAL_ERROR_PAGE,
            IExceptionSettings.SHOW_NO_EXCEPTION_PAGE)) {
      @Override
      protected boolean wantOnSelectionChangedNotifications() {
        return true;
      }
    }.setNullValid(false));
    add(new Link("exception") {

      @Override
      public void onClick() {
        throw new RuntimeException("Some exception during processing");
      }
    });
    add(new CheckBox("application.debugSettings.ajaxDebugModeEnabled") {
      @Override
      protected boolean wantOnSelectionChangedNotifications() {
        return true;
      }
    });
    add(new IndicatingAjaxLink("ajax") {

      @Override
      public void onClick(AjaxRequestTarget target) {
        try {
          Thread.sleep(1000);
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
      }
    });
    add(new CheckBox(
        "application.resourceSettings.stripJavascriptCommentsAndWhitespace") {
      @Override
      protected boolean wantOnSelectionChangedNotifications() {
        return true;
      }
    });

    /* 15.3.2 */
    add(new CheckBox("application.cheesrRequestCycle") {
      @Override
      protected boolean wantOnSelectionChangedNotifications() {
        return true;
      }
    });
    add(new Link("outofcheese") {
      @Override
      public void onClick() {
        throw new OutOfCheeseException();
      }
    });
    add(new Link("runtime") {
      @Override
      public void onClick() {
        throw new RuntimeException();
      }
    });
    add(new Label("expected1", new Model() {
      @Override
      public Object getObject() {
        UnexpectedExceptionDisplay display = (UnexpectedExceptionDisplay) PropertyResolver
            .getValue(
                "application.exceptionSettings.unexpectedExceptionDisplay",
                getPage());
        Boolean isCheesrRequestCycle = (Boolean) PropertyResolver
            .getValue("application.cheesrRequestCycle", getPage());

        if (IExceptionSettings.SHOW_EXCEPTION_PAGE.equals(display))
          return "Developer exception page";

        if (isCheesrRequestCycle)
          return "Cheesr error page";
        else
          return "Wicket internal error page";
      }
    }));
    add(new Label("expected2", new Model() {
      @Override
      public Object getObject() {
        UnexpectedExceptionDisplay display = (UnexpectedExceptionDisplay) PropertyResolver
            .getValue(
                "application.exceptionSettings.unexpectedExceptionDisplay",
                getPage());
        if (IExceptionSettings.SHOW_INTERNAL_ERROR_PAGE
            .equals(display)) {
          return "Wicket internal error page";
        } else if (IExceptionSettings.SHOW_EXCEPTION_PAGE
            .equals(display)) {
          return "Developer exception page";
        }
        return "nothing";
      }
    }));
  }
}
