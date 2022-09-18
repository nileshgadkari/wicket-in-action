package wicket.in.action.chapter09.resdiscounts3;

import wicket.in.action.AbstractBasePage;

public class DiscountsPage extends AbstractBasePage {

  public DiscountsPage() {
    add(new DiscountsPanel("discounts"));
  }
}
