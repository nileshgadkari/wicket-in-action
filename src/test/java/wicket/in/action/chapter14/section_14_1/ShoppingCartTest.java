package wicket.in.action.chapter14.section_14_1;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Arrays;

import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.util.tester.TestPanelSource;
import org.apache.wicket.util.tester.WicketTester;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import wicket.in.action.chapter03.section_3_1.Cart;
import wicket.in.action.chapter03.section_3_1.Cheese;
import wicket.in.action.chapter03.section_3_3.ShoppingCartPanel;

public class ShoppingCartTest {
  private Cheese gouda;

  private Cheese edam;

  private Cart cart;

  private static WicketTester tester;

  @BeforeClass
  public static void setupClass() {
    tester = new WicketTester();
  }

  @Before
  public void setup() {
    gouda = new Cheese("Gouda", "Gouda is a nice cheese", 1.99);
    edam = new Cheese("Edam", "Edam is a nicer cheese", 2.99);
    cart = new Cart();
  }

  @Test
  public void removeOneItemFromCart() {
    cart.getCheeses().add(gouda);
    cart.getCheeses().add(edam);

    tester.startPanel(new TestPanelSource() {
      public Panel getTestPanel(String panelId) {
        return new ShoppingCartPanel(panelId, cart);
      }
    });
    tester.assertComponent("panel:cart", ListView.class);
    tester.assertListView("panel:cart", Arrays.asList(gouda, edam));
    tester.assertLabel("panel:total", NumberFormat.getCurrencyInstance().format(4.98));

    tester.clickLink("panel:cart:0:remove");
    tester.assertListView("panel:cart", Arrays.asList(edam));
    tester.assertLabel("panel:total", NumberFormat.getCurrencyInstance().format(2.99));
  }

  @Test
  public void removeAllItems() {
    cart.getCheeses().add(gouda);
    cart.getCheeses().add(edam);

    tester.startPanel(new TestPanelSource() {
      public Panel getTestPanel(String panelId) {
        return new ShoppingCartPanel(panelId, cart);
      }
    });

    tester.assertComponent("panel:cart", ListView.class);
    tester.assertListView("panel:cart", Arrays.asList(gouda, edam));
    tester.clickLink("panel:cart:0:remove");
    tester.clickLink("panel:cart:0:remove");
    tester.assertListView("panel:cart", new ArrayList());
  }
}
