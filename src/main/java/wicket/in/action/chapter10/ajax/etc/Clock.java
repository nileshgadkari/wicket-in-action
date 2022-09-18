package wicket.in.action.chapter10.ajax.etc;

import java.text.DateFormat;
import java.util.Date;
import java.util.TimeZone;

import org.apache.wicket.MarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.model.AbstractReadOnlyModel;

public class Clock extends Label {

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

  public Clock(MarkupContainer parent, final String id, TimeZone tz) {
    super(id, new ClockModel(tz));
  }
}