package wicket.in.action.common;

import java.text.NumberFormat;
import java.text.ParseException;

import org.apache.wicket.Session;
import org.apache.wicket.model.IModel;

public class NumberFormatModel implements IModel {

  private final IModel wrapped;

  public NumberFormatModel(IModel numberModel) {
    this.wrapped = numberModel;
  }

  public Object getObject() {
    Number nbr = (Number) wrapped.getObject();
    return nbr != null ? getFormat().format(nbr) : null;
  }

  public void setObject(Object object) {
    try {
      if (object != null) {
        wrapped.setObject(getFormat().parse((String) object));
      } else {
        wrapped.setObject(null);
      }
    } catch (ParseException e) {
      throw new RuntimeException(e);
    }
  }

  private NumberFormat getFormat() {
    NumberFormat fmt = NumberFormat.getNumberInstance(Session.get()
        .getLocale());
    return fmt;
  }
  
  public void detach() {
  }
}
