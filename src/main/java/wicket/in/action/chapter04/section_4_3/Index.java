package wicket.in.action.chapter04.section_4_3;

import org.apache.wicket.model.LoadableDetachableModel;
import org.apache.wicket.model.Model;

import wicket.in.action.AbstractBasePage;
import wicket.in.action.chapter05.section_5_3.Cheese;

public class Index extends AbstractBasePage {
  public Index() {
    class CheeseModel extends Model {
      private Long id;

      private transient Cheese cheese;

      public CheeseModel() {
      }

      public CheeseModel(Cheese cheese) {
        setObject(cheese);
      }

      public CheeseModel(Long id) {
        this.id = id;
      }

      @Override
      public Object getObject() {
        if (cheese != null)
          return cheese;
        if (id == null) {
          cheese = new Cheese();
        } else {
          CheeseDao dao = new CheeseDao();
          cheese = dao.getCheese(id);
        }
        return cheese;
      }

      @Override
      public void setObject(Object object) {
        this.cheese = (Cheese) object;
        id = (cheese == null) ? null : cheese.getId();
      }

      @Override
      public void detach() {
        this.cheese = null;
      }
    }

    // The same functionality, but now using a
    // LoadableDetachableModel
    class LoadableCheeseModel extends LoadableDetachableModel {
      private final Long id;

      private transient Cheese cheese;

      public LoadableCheeseModel(Cheese cheese) {
        super(cheese);
        this.id=cheese.getId();
      }

      public LoadableCheeseModel(Long id) {
        this.id = id;
      }

      @Override
      protected Object load() {
        if(id == null) return new Cheese();
        CheeseDao dao = new CheeseDao();
        return dao.getCheese(id);
      }
    }
  }
}
