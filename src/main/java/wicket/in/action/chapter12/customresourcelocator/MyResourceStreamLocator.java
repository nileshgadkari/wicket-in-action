package wicket.in.action.chapter12.customresourcelocator;

import java.io.File;

import org.apache.wicket.util.resource.FileResourceStream;
import org.apache.wicket.util.resource.IResourceStream;
import org.apache.wicket.util.resource.locator.ResourceStreamLocator;

public class MyResourceStreamLocator extends ResourceStreamLocator {

  private final File baseDir;

  public MyResourceStreamLocator(File baseDir) {
    this.baseDir = baseDir;
  }

  public IResourceStream locate(Class clazz, String path) {
    File file = new File(baseDir, path);
    if (file.exists()) {
      return new FileResourceStream(file);
    }
    return super.locate(clazz, path);
  }
}
