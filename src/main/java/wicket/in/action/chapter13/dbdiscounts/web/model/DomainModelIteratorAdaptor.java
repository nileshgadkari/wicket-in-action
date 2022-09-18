package wicket.in.action.chapter13.dbdiscounts.web.model;

import java.util.Iterator;

import org.apache.wicket.markup.repeater.util.ModelIteratorAdapter;
import org.apache.wicket.model.IModel;

import wicket.in.action.chapter13.dbdiscounts.domain.DomainObject;

public class DomainModelIteratorAdaptor<T> extends
    ModelIteratorAdapter {

  public DomainModelIteratorAdaptor(
      Iterator<? extends DomainObject> delegate) {
    super(delegate);
  }

  @SuppressWarnings("unchecked")
  @Override
  protected IModel model(Object object) {
    DomainObject domainObject = (DomainObject) object;
    return new DomainObjectModel(domainObject);
  }
}
