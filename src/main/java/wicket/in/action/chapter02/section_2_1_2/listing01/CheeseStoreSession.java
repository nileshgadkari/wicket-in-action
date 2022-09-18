package wicket.in.action.chapter02.section_2_1_2.listing01;

import org.apache.wicket.Request;
import org.apache.wicket.protocol.http.WebApplication;
import org.apache.wicket.protocol.http.WebSession;

public class CheeseStoreSession extends WebSession {

  private Basket basket;

  public CheeseStoreSession(WebApplication application,
      Request request) {
    super(application, request);
  }

  public Basket getBasket() {
    return basket;
  }

  public void setBasket(Basket basket) {
    this.basket = basket;
  }
}
