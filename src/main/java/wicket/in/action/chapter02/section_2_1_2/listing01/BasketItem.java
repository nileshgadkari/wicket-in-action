package wicket.in.action.chapter02.section_2_1_2.listing01;

import java.io.Serializable;

public class BasketItem implements Serializable {
  private final Cheese cheese;

  private final int quantity;

  public BasketItem(Cheese cheese, int quantity) {
    this.cheese = cheese;
    this.quantity = quantity;
  }

  public Cheese getCheese() {
    return cheese;
  }

  public int getQuantity() {
    return quantity;
  }

  public double getPrice() {
    return quantity * cheese.getPrice();
  }
}
