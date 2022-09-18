package wicket.in.action.chapter04.section_4_4;

import org.apache.wicket.model.LoadableDetachableModel;
import org.apache.wicket.model.PropertyModel;

import wicket.in.action.AbstractBasePage;
import wicket.in.action.chapter04.section_4_2.Index.Customer;
import wicket.in.action.chapter04.section_4_3.CheeseDao;
import wicket.in.action.chapter05.section_5_3.Cheese;

public class Index extends AbstractBasePage {
   public Index() {
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

     Long cheeseId = 1L;
     LoadableCheeseModel cheeseModel = new LoadableCheeseModel(cheeseId);
     PropertyModel nameModel = new PropertyModel(cheeseModel, "name");
     String name = (String) nameModel.getObject();
     nameModel.detach();

     Customer customer = new Customer();
     customer.getAddress().setStreet("White Abbey Road");

     PropertyModel addressModel = new PropertyModel(customer, "address");
     PropertyModel street = new PropertyModel(addressModel, "street");

     System.out.println("Street: " + street.getObject());

   }
}
