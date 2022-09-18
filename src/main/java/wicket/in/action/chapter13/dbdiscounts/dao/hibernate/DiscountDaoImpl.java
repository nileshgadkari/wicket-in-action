package wicket.in.action.chapter13.dbdiscounts.dao.hibernate;

import wicket.in.action.chapter13.dbdiscounts.dao.DiscountDao;
import wicket.in.action.chapter13.dbdiscounts.domain.Discount;

public class DiscountDaoImpl extends
    AbstractHibernateDaoImpl<Discount> implements DiscountDao {

  public DiscountDaoImpl() {
    super(Discount.class);
  }
}
