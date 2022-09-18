package wicket.in.action.common;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Locale;

import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.model.IModel;
import org.apache.wicket.util.convert.ConversionException;
import org.apache.wicket.util.convert.IConverter;

public class UrlTextField extends TextField {

  public UrlTextField(String id) {
    super(id, URL.class);
  }

  public UrlTextField(String id, IModel object) {
    super(id, object, URL.class);
  }

  @Override
  public final IConverter getConverter(Class type) {

    return new IConverter() {

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
    };
  }
}
