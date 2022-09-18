package wicket.in.action.chapter10.ajax.etc;

import java.util.TimeZone;

import org.apache.wicket.ajax.AjaxSelfUpdatingTimerBehavior;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.util.time.Duration;

public class ClockPage extends WebPage {

  public ClockPage() {

    TimeZone tz = TimeZone
            .getTimeZone("America/Los_Angeles");
    Clock clock = new Clock(this, "clock", tz);

    clock.add(new AjaxSelfUpdatingTimerBehavior(Duration
        .seconds(5)));
  }
}