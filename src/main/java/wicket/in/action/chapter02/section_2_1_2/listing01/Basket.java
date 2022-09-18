package wicket.in.action.chapter02.section_2_1_2.listing01;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Basket implements Serializable {
  List<BasketItem> items = new ArrayList<BasketItem>();

  public void add(BasketItem item) {
    items.add(item);
  }

  public double getTotalPrice() {
    double total = 0;
    for (BasketItem item : items) {
      total += item.getPrice();
    }
    return total;
  }
}
