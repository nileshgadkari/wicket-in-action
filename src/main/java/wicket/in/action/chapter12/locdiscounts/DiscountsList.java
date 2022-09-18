package wicket.in.action.chapter12.locdiscounts;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.PropertyListView;
import org.apache.wicket.markup.html.panel.Panel;

import wicket.in.action.common.DataBase;

public final class DiscountsList extends Panel {

  private static final class DiscountsListView extends
      PropertyListView {

    public DiscountsListView (String id) {
      super(id, DataBase.getInstance()
          .listDiscounts());
    }

    @Override
    protected void populateItem(ListItem item) {
      item.add(new Label("cheese.name"));
      item.add(new Label("discount"));
      item.add(new Label("description"));
    }
  }

  public DiscountsList (String id) {

    super(id);
    add(new DiscountsListView("discounts"));
  }
}