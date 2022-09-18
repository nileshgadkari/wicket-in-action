package wicket.in.action.chapter13.dbdiscounts.dao;

public interface GenericDao {

  <T> T load(Class<T> type, long id);
}
