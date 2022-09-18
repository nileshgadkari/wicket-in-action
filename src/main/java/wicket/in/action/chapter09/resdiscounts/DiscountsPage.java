package wicket.in.action.chapter09.resdiscounts;

import java.util.Iterator;
import java.util.List;

import org.apache.wicket.ResourceReference;
import org.apache.wicket.behavior.SimpleAttributeModifier;
import org.apache.wicket.extensions.yui.calendar.DateField;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.RequiredTextField;
import org.apache.wicket.markup.html.image.Image;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.repeater.Item;
import org.apache.wicket.markup.repeater.RefreshingView;
import org.apache.wicket.markup.repeater.ReuseIfModelsEqualStrategy;
import org.apache.wicket.markup.repeater.util.ModelIteratorAdapter;
import org.apache.wicket.model.CompoundPropertyModel;
import org.apache.wicket.model.IModel;

import wicket.in.action.AbstractBasePage;
import wicket.in.action.chapter13.dbdiscounts.web.model.EqualsDecorator;
import wicket.in.action.common.DataBase;
import wicket.in.action.common.Discount;
import wicket.in.action.common.PercentageField;

public class DiscountsPage extends AbstractBasePage {

  public DiscountsPage() {
    /* Section 9.1 */
    RefreshingView discountsView = new RefreshingView("list") {
      private List<Discount> discounts;

      @Override
      protected Iterator getItemModels() {
        if (discounts == null) {
          discounts = DataBase.getInstance().listDiscounts();
        }
        return new ModelIteratorAdapter(discounts.iterator()) {
          @Override
          protected IModel model(Object object) {
            return EqualsDecorator
                .decorate(new CompoundPropertyModel((Discount) object));
          }
        };
      }

      @Override
      protected void populateItem(Item item) {
        item.add(new Label("cheese.name"));
        item.add(new PercentageField("discount"));
        item.add(new RequiredTextField("description"));
        item.add(new DateField("from"));
        item.add(new DateField("until"));

        final Discount discount = (Discount) item.getModelObject();
        final Link removeLink = new Link("remove") {
          @Override
          public void onClick() {
            DataBase.getInstance().remove(discount);
          }
        };
        item.add(removeLink);
        removeLink.add(new Image("icon", new ResourceReference(
            DiscountsEditList.class, "remove_icon.gif")));
        removeLink.add(new SimpleAttributeModifier("onclick",
            "if(!confirm('remove discount for "
                + discount.getCheese().getName()
                + " ?')) return false;"));
      }
    };
    discountsView.setItemReuseStrategy(ReuseIfModelsEqualStrategy
        .getInstance());
    add(discountsView);
  }
}
