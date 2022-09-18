package wicket.in.action.chapter12.customresourcelocator;

import org.apache.wicket.protocol.http.WebApplication;
import org.apache.wicket.util.file.Folder;
import org.apache.wicket.util.file.Path;
import org.apache.wicket.util.resource.locator.IResourceStreamLocator;
import org.apache.wicket.util.resource.locator.ResourceStreamLocator;

public class MyOtherApplication extends WebApplication {

  public MyOtherApplication() {
  }

  public Class getHomePage() {
    return Home.class;
  }

  protected void init() {
    IResourceStreamLocator locator =
      new ResourceStreamLocator(new Path(new Folder("/home/me")));
    getResourceSettings().setResourceStreamLocator(locator);
  }
}
