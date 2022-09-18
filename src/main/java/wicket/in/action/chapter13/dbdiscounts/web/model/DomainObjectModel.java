package wicket.in.action.chapter13.dbdiscounts.web.model;

import org.apache.wicket.injection.web.InjectorHolder;
import org.apache.wicket.model.LoadableDetachableModel;
import org.apache.wicket.spring.injection.annot.SpringBean;

import wicket.in.action.chapter13.dbdiscounts.domain.DomainObject;
import wicket.in.action.chapter13.dbdiscounts.services.DiscountsService;

public class DomainObjectModel<T extends DomainObject> extends
    LoadableDetachableModel {

  @SpringBean
  private DiscountsService service;

  private final Class<T> type;

  private final Long id;

  public DomainObjectModel(Class<T> type, Long id) {
    InjectorHolder.getInjector().inject(this);
    this.type = type;
    this.id = id;
  }

  @SuppressWarnings("unchecked")
  public DomainObjectModel(T domainObject) {
    super(domainObject);
    InjectorHolder.getInjector().inject(this);
    this.type = (Class<T>) domainObject.getClass();
    this.id = domainObject.getId();
  }

  @Override
  protected T load() {
    return service.load(type, id);
  }
}