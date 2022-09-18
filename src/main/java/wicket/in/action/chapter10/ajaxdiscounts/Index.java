package wicket.in.action.chapter10.ajaxdiscounts;

import wicket.in.action.AbstractBasePage;

public class Index extends AbstractBasePage {

  public Index() {
    add(new DiscountsPanel("discounts"));
  }
}
