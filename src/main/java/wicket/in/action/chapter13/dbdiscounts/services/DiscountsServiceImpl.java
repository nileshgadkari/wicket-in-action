package wicket.in.action.chapter13.dbdiscounts.services;

import java.util.List;

import wicket.in.action.chapter13.dbdiscounts.dao.CheeseDao;
import wicket.in.action.chapter13.dbdiscounts.dao.DiscountDao;
import wicket.in.action.chapter13.dbdiscounts.dao.GenericDao;
import wicket.in.action.chapter13.dbdiscounts.dao.UserDao;
import wicket.in.action.chapter13.dbdiscounts.domain.Cheese;
import wicket.in.action.chapter13.dbdiscounts.domain.Discount;
import wicket.in.action.chapter13.dbdiscounts.domain.User;

public class DiscountsServiceImpl implements DiscountsService {

  private CheeseDao cheeseDao;

  private DiscountDao discountDao;

  private UserDao userDao;

  private GenericDao genericDao;

  public DiscountsServiceImpl() {
  }

  public <T> T load(Class<T> type, long id) {
    return genericDao.load(type, id);
  }

  public List<Cheese> findAllCheeses() {
    return cheeseDao.findAll();
  }

  public List<Discount> findAllDiscounts() {
    return discountDao.findAll();
  }

  public List<User> findAllUsers() {
    return userDao.findAll();
  }

  public void saveCheese(Cheese cheese) {
    cheeseDao.save(cheese);
  }

  public void saveDiscount(Discount discount) {
    discountDao.save(discount);
  }

  public void saveDiscounts(List<Discount> discounts) {
    if (discounts == null) {
      return;
    }
    for (Discount discount : discounts) {
      discountDao.save(discount);
    }
  }

  public void saveUser(User user) {
    userDao.save(user);
  }

  public void deleteCheese(Cheese cheese) {
    cheeseDao.delete(cheese);
  }

  public void deleteDiscount(Discount discount) {
    discountDao.delete(discount);
  }

  public void deleteUser(User user) {
    userDao.delete(user);
  }

  public CheeseDao getCheeseDao() {
    return cheeseDao;
  }

  public void setCheeseDao(CheeseDao cheeseDao) {
    this.cheeseDao = cheeseDao;
  }

  public DiscountDao getDiscountDao() {
    return discountDao;
  }

  public void setDiscountDao(DiscountDao discountDao) {
    this.discountDao = discountDao;
  }

  public UserDao getUserDao() {
    return userDao;
  }

  public void setUserDao(UserDao userDao) {
    this.userDao = userDao;
  }

  public GenericDao getGenericDao() {
    return genericDao;
  }

  public void setGenericDao(GenericDao genericDao) {
    this.genericDao = genericDao;
  }
}
