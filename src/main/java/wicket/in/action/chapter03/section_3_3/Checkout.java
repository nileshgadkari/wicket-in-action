package wicket.in.action.chapter03.section_3_3;

import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.PropertyModel;

import wicket.in.action.chapter03.section_3_1.Address;
import wicket.in.action.chapter03.section_3_1.Cart;
import wicket.in.action.chapter03.section_3_1.CheesrPage;

public class Checkout extends CheesrPage {
  public Checkout() {
    add(new FeedbackPanel("feedback"));
    Form form = new Form("form");
    add(form);
    Address address = getCart().getBillingAddress();

    form
        .add(new TextField("name", new PropertyModel(address, "name")).setRequired(true));
    form.add(new TextField("street", new PropertyModel(address,
        "street")).setRequired(true));
    form.add(new TextField("zipcode", new PropertyModel(address,
        "zipcode")).setRequired(true));
    form
        .add(new TextField("city", new PropertyModel(address, "city")).setRequired(true));
    form.add(new Link("cancel") {
      @Override
      public void onClick() {
        setResponsePage(Index.class);
      }
    });
    form.add(new Button("order") {
      @Override
      public void onSubmit() {
        Cart cart = getCart();

        // charge customers’ credit card
        // ship cheeses to our customer
        // clean out shopping cart
        cart.getCheeses().clear();

        // return to front page
        setResponsePage(Index.class);
      }
    });
    add(new ShoppingCartPanel("cart", getCart()));
  }
}
