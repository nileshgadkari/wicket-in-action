package wicket.in.action.chapter13.dbdiscounts.dao.hibernate;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import wicket.in.action.chapter13.dbdiscounts.dao.GenericDao;

public class GenericDaoImpl implements GenericDao {

  private SessionFactory sessionFactory;

  public GenericDaoImpl() {
  }

  public SessionFactory getSessionFactory() {
    return sessionFactory;
  }

  public void setSessionFactory(SessionFactory sf) {
    this.sessionFactory = sf;
  }

  @SuppressWarnings("unchecked")
  public <T> T load(Class<T> type, long id) {
    return (T) getCurrentSession().get(type, id);
  }

  public Session getCurrentSession() {
    // presumes a current session, which we have through the
    // OpenSessionInViewFilter; doesn't work without that
    return sessionFactory.getCurrentSession();
  }
}
