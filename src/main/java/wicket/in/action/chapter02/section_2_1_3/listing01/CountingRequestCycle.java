package wicket.in.action.chapter02.section_2_1_3.listing01;

import org.apache.wicket.Response;
import org.apache.wicket.protocol.http.WebApplication;
import org.apache.wicket.protocol.http.WebRequest;
import org.apache.wicket.protocol.http.WebRequestCycle;

public class CountingRequestCycle extends WebRequestCycle {

  public CountingRequestCycle(WebApplication application,
      WebRequest request, Response response) {
    super(application, request, response);
  }

  @Override
  protected void onBeginRequest() {
    ((CountingWebSession) getSession()).hit();
  }
}
