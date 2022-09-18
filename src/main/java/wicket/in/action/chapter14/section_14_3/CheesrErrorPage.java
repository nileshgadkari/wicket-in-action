package wicket.in.action.chapter14.section_14_3;

import javax.servlet.http.HttpServletResponse;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.protocol.http.WebResponse;

public class CheesrErrorPage extends WebPage {
  public CheesrErrorPage() {
  }

  @Override
  protected void setHeaders(WebResponse response) {
    response.getHttpServletResponse().setStatus(
        HttpServletResponse.SC_NOT_FOUND);
    super.setHeaders(response);
  }
}
