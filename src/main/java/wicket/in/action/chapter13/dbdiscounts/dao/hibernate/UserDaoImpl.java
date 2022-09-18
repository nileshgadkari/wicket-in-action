package wicket.in.action.chapter13.dbdiscounts.dao.hibernate;

import wicket.in.action.chapter13.dbdiscounts.dao.UserDao;
import wicket.in.action.chapter13.dbdiscounts.domain.User;

public class UserDaoImpl extends AbstractHibernateDaoImpl<User>
    implements UserDao {

  public UserDaoImpl() {
    super(User.class);
  }
}
