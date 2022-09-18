package wicket.in.action.chapter12.locdiscounts;

import wicket.in.action.AbstractBasePage;

public class DiscountsPage extends AbstractBasePage {

  public DiscountsPage() {
    add(new UserPanel("userPanel", DiscountsPage.class));
    add(new DiscountsPanel("discounts"));
  }
}
