package wicket.in.action.chapter10.ajaxdiscounts;

import java.util.Iterator;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.markup.repeater.Item;
import org.apache.wicket.markup.repeater.RefreshingView;
import org.apache.wicket.markup.repeater.util.ModelIteratorAdapter;
import org.apache.wicket.model.CompoundPropertyModel;
import org.apache.wicket.model.IModel;

import wicket.in.action.common.DataBase;
import wicket.in.action.common.DateFmtLabel;
import wicket.in.action.common.Discount;

public final class DiscountsPanel extends Panel {

  public DiscountsPanel(String id) {

    super(id);
    final FeedbackPanel feedbackPanel = new FeedbackPanel("feedback");
    add(feedbackPanel);
    add(new RefreshingView("discounts") {

      @Override
      protected Iterator getItemModels() {
        return new ModelIteratorAdapter(DataBase.getInstance()
            .listDiscounts().iterator()) {
          @Override
          protected IModel model(Object object) {
            return new CompoundPropertyModel((Discount) object);
          }
        };
      }

      @Override
      protected void populateItem(Item item) {
        item.add(new Label("cheese.name"));
        item.add(new EditablePercentageLabel("discount",
            feedbackPanel));
        item.add(new Label("description"));
        item.add(new DateFmtLabel("until"));
      }
    });
  }
}