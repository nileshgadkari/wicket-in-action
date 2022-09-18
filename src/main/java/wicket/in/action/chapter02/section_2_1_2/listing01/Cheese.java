package wicket.in.action.chapter02.section_2_1_2.listing01;

import java.io.Serializable;

public class Cheese implements Serializable {
  private final String name;

  private final double price;

  public Cheese(String name, double price) {
    this.name = name;
    this.price = price;
  }

  public String getName() {
    return name;
  }

  public double getPrice() {
    return price;
  }
}
