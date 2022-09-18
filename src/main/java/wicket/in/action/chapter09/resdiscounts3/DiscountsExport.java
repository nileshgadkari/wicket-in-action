package wicket.in.action.chapter09.resdiscounts3;

import org.apache.wicket.Application;
import org.apache.wicket.IInitializer;
import org.apache.wicket.SharedResources;
import org.apache.wicket.markup.html.WebResource;
import org.apache.wicket.protocol.http.WebResponse;
import org.apache.wicket.util.resource.IResourceStream;
import org.apache.wicket.util.resource.StringResourceStream;

import wicket.in.action.common.DataBase;
  
public class DiscountsExport extends WebResource {

  public static class Initializer implements IInitializer {

    public void init(Application application) {
      SharedResources res = application.getSharedResources();
      res.add("discounts", new DiscountsExport());
    }
  }

  public DiscountsExport() {

    setCacheable(false);
  }

  @Override
  public IResourceStream getResourceStream() {
    CharSequence discounts = DataBase.getInstance().exportDiscounts();
    return new StringResourceStream(discounts, "text/plain");
  }

  @Override
  protected void setHeaders(WebResponse response) {
    super.setHeaders(response);
    response.setAttachmentHeader("discounts.csv");
  }
}
