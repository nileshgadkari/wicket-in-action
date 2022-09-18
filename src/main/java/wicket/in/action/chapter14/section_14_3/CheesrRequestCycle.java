package wicket.in.action.chapter14.section_14_3;

import java.lang.reflect.InvocationTargetException;

import org.apache.wicket.Page;
import org.apache.wicket.Response;
import org.apache.wicket.WicketRuntimeException;
import org.apache.wicket.protocol.http.WebApplication;
import org.apache.wicket.protocol.http.WebRequest;
import org.apache.wicket.protocol.http.WebRequestCycle;

public class CheesrRequestCycle extends WebRequestCycle {

  public CheesrRequestCycle(WebApplication application,
      WebRequest request, Response response) {
    super(application, request, response);
  }

  @Override
  public Page onRuntimeException(Page page, RuntimeException e) {
    Throwable cause = e;
    if(cause instanceof WicketRuntimeException)
      cause = cause.getCause();
    if(cause instanceof InvocationTargetException)
      cause = cause.getCause();
    if (cause instanceof OutOfCheeseException) {
      return new CheesrErrorPage();
    }
    return super.onRuntimeException(page, e);
  }
}
