package wicket.in.action.chapter12.customresourcelocator;

import java.net.MalformedURLException;
import java.net.URL;
import java.text.NumberFormat;
import java.util.Locale;

import org.apache.wicket.markup.ComponentTag;
import org.apache.wicket.markup.MarkupStream;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.model.AbstractReadOnlyModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.util.convert.ConversionException;
import org.apache.wicket.util.convert.IConverter;
import org.apache.wicket.util.convert.MaskConverter;

/* Just holds some examples, not meant to actually work! */
public class Home extends WebPage {

  public Home() {
    final Double number = 100.125;
    new Label("number", new AbstractReadOnlyModel() {

      public Object getObject() {
        NumberFormat fmt = NumberFormat
            .getNumberInstance(getLocale());
        return fmt.format(number);
      }
    });
    new Label("number", new Model(number));
    add(new TextField("urlProperty", URL.class) {
      public IConverter getConverter(final Class type) {
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
    });
    add(new TextField("phoneNumberUS", UsPhoneNumber.class) {
      public IConverter getConverter(final Class/* <?> */type) {
        return new MaskConverter("(###) ###-####",
            UsPhoneNumber.class);
      }
    });
  }

  protected void onComponentTagBody(final MarkupStream markupStream,
      final ComponentTag openTag) {
    replaceComponentTagBody(markupStream, openTag,
        getModelObjectAsString());
  }
}
