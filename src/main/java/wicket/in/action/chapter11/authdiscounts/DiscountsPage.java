package wicket.in.action.chapter11.authdiscounts;

import wicket.in.action.common.ProtectedPage;

public class DiscountsPage extends ProtectedPage {

  public DiscountsPage() {
    add(new UserPanel("userPanel", DiscountsPage.class));
    add(new DiscountsPanel("discounts"));
  }
}
