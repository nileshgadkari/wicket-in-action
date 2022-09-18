package wicket.in.action.chapter10.ajax.etc;

import java.text.DateFormat;
import java.util.Date;
import java.util.TimeZone;

import org.apache.wicket.MarkupContainer;
import org.apache.wicket.ajax.AjaxSelfUpdatingTimerBehavior;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.model.AbstractReadOnlyModel;
import org.apache.wicket.util.time.Duration;

public class SelfUpdatingClock extends Label {

  private static class ClockModel extends AbstractReadOnlyModel {
    private DateFormat df;

    ClockModel(TimeZone tz) {
      df = DateFormat.getDateTimeInstance(DateFormat.FULL,
          DateFormat.FULL);
      df.setTimeZone(tz);
    }

    @Override
    public Object getObject() {
      return df.format(new Date());
    }
  }

  public SelfUpdatingClock(MarkupContainer parent, final String id,
      TimeZone tz, Duration updateInterval) {
    super(id, new ClockModel(tz));
    add(new AjaxSelfUpdatingTimerBehavior(updateInterval));
  }
}