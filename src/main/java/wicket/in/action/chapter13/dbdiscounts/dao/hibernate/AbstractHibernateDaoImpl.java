package wicket.in.action.chapter13.dbdiscounts.dao.hibernate;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;

import wicket.in.action.chapter13.dbdiscounts.dao.Dao;
import wicket.in.action.chapter13.dbdiscounts.domain.DomainObject;

public abstract class AbstractHibernateDaoImpl<T extends DomainObject>
    implements Dao<T> {

  private Class<T> domainClass;

  private SessionFactory sf;

  public AbstractHibernateDaoImpl(Class<T> domainClass) {
    this.domainClass = domainClass;
  }

  public SessionFactory getSessionFactory() {
    return sf;
  }

  public void setSessionFactory(SessionFactory sf) {
    this.sf = sf;
  }

  public void delete(T object) {
    getSession().delete(object);
  }

  @SuppressWarnings("unchecked")
  public T load(long id) {
    return (T) getSession().get(domainClass, id);
  }

  public void save(T object) {
    getSession().saveOrUpdate(object);
  }

  @SuppressWarnings("unchecked")
  public List<T> findAll() {
    Criteria criteria = getSession().createCriteria(domainClass);
    return (List<T>) criteria.list();
  }

  public int countAll() {
    Criteria criteria = getSession().createCriteria(domainClass);
    criteria.setProjection(Projections.rowCount());
    return (Integer) criteria.uniqueResult();
  }

  public Session getSession() {
    // presumes a current session, which we have through the
    // OpenSessionInViewFilter; doesn't work without that
    return sf.getCurrentSession();
  }
}
