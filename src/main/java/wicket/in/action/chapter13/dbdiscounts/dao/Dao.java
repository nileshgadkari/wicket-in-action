package wicket.in.action.chapter13.dbdiscounts.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import wicket.in.action.chapter13.dbdiscounts.domain.DomainObject;

public interface Dao<T extends DomainObject> {

  @Transactional
  void delete(T o);

  T load(long id);

  @Transactional
  void save(T o);

  List<T> findAll();

  int countAll();
}
