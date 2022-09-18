package wicket.in.action.chapter13.dbdiscounts.web;

import org.apache.wicket.markup.html.WebPage;

public class Index extends WebPage {

  public Index() {
    add(new DiscountsPanel("discounts"));
  }
}
