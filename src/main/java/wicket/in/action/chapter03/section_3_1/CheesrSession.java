package wicket.in.action.chapter03.section_3_1;

import org.apache.wicket.Request;

import wicket.in.action.common.WiaSession;

/*
 * Extends WiaSession instead of WebSession to make the 
 * cheesr application work within the examples.
 */
public class CheesrSession extends WiaSession {
  private Cart cart = new Cart();

  public CheesrSession(Request request) {
    super(request);
  }

  public Cart getCart() {
    return cart;
  }
}
