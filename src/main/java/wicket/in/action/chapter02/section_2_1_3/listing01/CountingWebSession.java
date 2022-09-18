package wicket.in.action.chapter02.section_2_1_3.listing01;

import org.apache.wicket.Request;
import org.apache.wicket.protocol.http.WebApplication;
import org.apache.wicket.protocol.http.WebSession;

public class CountingWebSession extends WebSession {

  private int numberOfRequests = 0;

  public CountingWebSession(WebApplication application,
      Request request) {
    super(application, request);
  }

  public synchronized void hit() {
    numberOfRequests++;
  }
}
