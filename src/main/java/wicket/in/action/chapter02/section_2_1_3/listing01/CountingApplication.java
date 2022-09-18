package wicket.in.action.chapter02.section_2_1_3.listing01;

import org.apache.wicket.Request;
import org.apache.wicket.RequestCycle;
import org.apache.wicket.Response;
import org.apache.wicket.protocol.http.WebApplication;
import org.apache.wicket.protocol.http.WebRequest;

public class CountingApplication extends WebApplication {

  public CountingApplication() {
  }

  @Override
  public Class getHomePage() {
    return null;
  }

  @Override
  public RequestCycle newRequestCycle(Request request,
      Response response) {
    return new CountingRequestCycle(this, (WebRequest) request,
        response);
  }
}
