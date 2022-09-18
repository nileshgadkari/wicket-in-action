/*
 * Copyright Teachscape
 */
package wicket.in.action.chapter13.dbdiscounts.web.model;

import java.io.Serializable;
import java.util.Iterator;

import org.apache.wicket.markup.repeater.util.ModelIteratorAdapter;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;

import wicket.in.action.common.Objects;

public class SimpleModelIteratorAdaptor extends ModelIteratorAdapter {

  private static final class DefaultModel extends Model {

    public DefaultModel() {
      super();
    }

    public DefaultModel(Serializable object) {
      super(object);
    }

    @Override
    public boolean equals(Object obj) {
      if (obj instanceof DefaultModel) {
        return Objects.equal(getObject(), ((DefaultModel) obj)
            .getObject());
      }
      return false;
    }

    @Override
    public int hashCode() {
      return Objects.hashCode(getObject());
    }
  }

  public SimpleModelIteratorAdaptor(Iterator delegate) {
    super(delegate);
  }

  @Override
  protected IModel model(Object object) {
    return new DefaultModel((Serializable) object);
  }
}
