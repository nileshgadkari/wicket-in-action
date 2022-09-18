package wicket.in.action.chapter12.customresourcelocator;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Locale;

import org.apache.wicket.IConverterLocator;
import org.apache.wicket.protocol.http.WebApplication;
import org.apache.wicket.util.convert.ConversionException;
import org.apache.wicket.util.convert.ConverterLocator;
import org.apache.wicket.util.convert.IConverter;
import org.apache.wicket.util.resource.locator.IResourceStreamLocator;

public class MyApplication extends WebApplication {

  public MyApplication() {
  }

  public Class getHomePage() {
    return Home.class;
  }

  protected void init() {
    File baseDir = new File("/home/me");
    IResourceStreamLocator locator = new MyResourceStreamLocator(
        baseDir);
    getResourceSettings().setResourceStreamLocator(locator);
  }

  @Override
  protected IConverterLocator newConverterLocator() {
    ConverterLocator locator = new ConverterLocator();
    locator.set(URL.class, new IConverter() {
      public Object convertToObject(String value, Locale locale) {
        try {
          return new URL(value.toString());
        } catch (MalformedURLException e) {
          throw new ConversionException("'" + value
              + "' is not a valid URL");
        }
      }

      public String convertToString(Object value, Locale locale) {
        return value != null ? value.toString() : null;
      }
    });
    return locator;
  }
}
