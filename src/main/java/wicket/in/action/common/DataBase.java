package wicket.in.action.common;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.wicket.util.lang.Objects;

public final class DataBase {

  private static int idCounter = 0;

  private static final DataBase INSTANCE = new DataBase();

  public static DataBase getInstance() {
    return INSTANCE;
  }

  private List<Cheese> cheeses = Collections
      .synchronizedList(new ArrayList<Cheese>());

  private List<Discount> discounts = Collections
      .synchronizedList(new ArrayList<Discount>());

  private Map<String, User> users = Collections
      .synchronizedMap(new HashMap<String, User>());

  private DataBase() {

    Cheese[] temp = new Cheese[] {
        new Cheese(
            "Gouda",
            "Gouda is a yellowish Dutch cheese named after the city of Gouda. The cheese is made from cow's milk. Exported Gouda is usually the young variety (aged between 1 and 6 months, rich yellow in colour and with a red or yellow paraffin wax coating). This cheese is easily sliced on bread.",
            1.65),
        new Cheese(
            "Edam",
            "Edam (Dutch Edammer) is a Dutch cheese named after the town of Edam. Edam cheese has a very mild taste, slightly salty or nutty and almost no smell when compared to other cheeses. Mild Edam is good with fruit such as peaches, melons, apricots and cherries. Aged Edammer is good with traditional \"cheese fruits\" like pears and apples. Like most cheeses, it is also good on crackers and bread. Pinot Noir is a recommended wine to accompany this cheese.",
            1.05),
        new Cheese(
            "Maasdam",
            "Maasdam cheese is a Dutch cheese in a Swiss-style. Made from cow's milk, it is aged for at least 4 weeks. It ripens faster than other Dutch cheeses. Maasdam has internal holes from the ripening process, and a smooth yellow rind. Sometimes it is waxed like Gouda. It is nutty and sweet, but softer than Emmental due to a higher moisture content.",
            2.35),
        new Cheese(
            "Brie",
            "Brie is a soft cows' milk cheese named after Brie, the French province.  It is pale in colour with a slight greyish tinge under crusty white mould; very soft and savoury with a hint of ammonia. The white mouldy rind is moderately tasteful and edible.",
            3.15),
        new Cheese(
            "Buxton Blue",
            "Buxton Blue cheese is an English blue cheese that is a close relative of Blue Stilton. It is made from cow's milk and is lightly veined with a deep russet colouring. It is usually made in a cylindrical shape. This cheese is complimented with a chilled glass of sweet dessert wine or ruby port.",
            0.99),
        new Cheese(
            "Parmesan",
            "Parmesan is a grana, a hard, granular cheese, cooked but not pressed, named after the producing areas of Parma and Reggio Emilia, in Emilia-Romagna, Italy. Uses of the cheese include being grated over pasta, stirred into soup and risotto, and eaten in chunks with balsamic vinegar. It is also a key ingredient in alfredo sauce and pesto.",
            1.99),
        new Cheese(
            "Cheddar",
            "Cheddar cheese is a hard, pale yellow to orange, sharp-tasting cheese originally made in the English village of Cheddar, in Somerset.",
            2.95),
        new Cheese(
            "Roquefort",
            "Roquefort is a ewe's-milk blue cheese from the south of France, and is one of the most famous of all French cheeses. The cheese is white, crumbly and slightly moist, with distinctive veins of blue mold. It has characteristic odor and flavor with a notable taste of butyric acid; the blue veins provide a sharp tang. The overall flavor sensation begins slightly mild, then waxing sweet, then smoky, and fading to a salty finish.",
            1.67),
        new Cheese(
            "Boursin",
            "Boursin Cheese is a soft creamy cheese available in a variety of flavors. Its flavor and texture is somewhat similar to American cream cheese.",
            1.33),
        new Cheese(
            "Camembert",
            "Camembert is a soft, creamy French cheese. When fresh, it is quite crumbly and relatively hard, but it characteristically ripens and becomes more runny and strongly flavoured as it ages. Camembert can be used in many dishes, but it is popularly eaten uncooked on bread or with wine or meat, to enjoy the subtle flavour and texture which does not survive heating. It is usually served at room temperature.",
            1.69),
        new Cheese(
            "Emmental",
            "Emmental is a yellow, medium-hard cheese, with characteristic large holes from Switzerland. It has a piquant, but not really sharp taste. It is often put on top of gratins, dishes which are then put in the oven to let the cheese melt and become golden-brown and crusty. It is also used for fondue.",
            2.39),
        new Cheese(
            "Reblochon",
            "Reblochon is a French cheese from the Alps region of Savoie. Reblochon has a nutty taste that remains in mouth after its soft and uniform centre has been enjoyed. It is an essential ingredient of tartiflette, a Savoyard gratin made from potatoes, cream, onions, and bacon.",
            2.99) };
    cheeses.addAll(Arrays.asList(temp));

    add(new Discount(temp[0], 0.1, "Special season's offer"));
    add(new Discount(temp[1], 0.15, "Fresh from the cow"));

    add(new User("user", "user", "Regular User", false));
    add(new User("admin", "admin", "Administrator", true));
  }

  public void add(Cheese cheese) {

    if (!cheeses.contains(cheese)) {
      cheeses.add(cheese);
    }
  }

  public void add(Discount discount) {
    discount.id = idCounter++;
    discounts.add(discount);
  }

  public void add(User user) {
    users.put(user.getWiaUsername(), user);
  }

  public CharSequence exportDiscounts() {
    StringBuilder b = new StringBuilder();
    for (Discount discount : discounts) {
      b.append(discount.getCheese().getName());
      b.append(',');
      b.append(discount.getDiscount());
      b.append(',');
      b.append(DATE_TIME_FORMAT.format(discount.getFrom()));
      b.append(',');
      b.append(DATE_TIME_FORMAT.format(discount.getUntil()));
      b.append(',');
      b.append(discount.getDescription());
      b.append('\n');
    }
    return b;
  }

  public User findUser(String username) {
    return users.get(username);
  }

  private static final SimpleDateFormat DATE_TIME_FORMAT = new SimpleDateFormat(
      "yyy.MM.dd-HH:mm");

  public int importDiscounts(BufferedReader reader) {
    int nbrOfImports = 0;
    String line = null;
    try {
      while ((line = reader.readLine()) != null) {
        String[] data = line.split(",", 5);
        Cheese cheese = findCheese(data[0]);
        if (cheese == null) {
          throw new IllegalStateException("cheese " + data[0]
              + " not found!");
        }
        double disc = Double.parseDouble(data[1]);
        Date from = DATE_TIME_FORMAT.parse(data[2]);
        Date until = DATE_TIME_FORMAT.parse(data[3]);
        String description = data[4];
        Discount discount = new Discount(cheese, disc, from, until,
            description);
        add(discount);
        nbrOfImports++;
      }
    } catch (IOException e) {
      throw new RuntimeException(e);
    } catch (ParseException e) {
      throw new RuntimeException(e);
    }
    return nbrOfImports;
  }

  public int importDiscounts(InputStream contents) {
    return importDiscounts(new BufferedReader(new InputStreamReader(
        contents)));
  }

  public List listCheeses() {
    return (List) Objects.cloneObject(cheeses);
  }

  @SuppressWarnings("unchecked")
  public List<Discount> listDiscounts() {
    return (List<Discount>) Objects.cloneObject(discounts);
  }

  public Cheese findCheese(String name) {
    Cheese test = new Cheese();
    test.setName(name);
    int index = cheeses.indexOf(test);
    return (index != -1) ? cheeses.get(index) : null;
  }

  public Collection listUsers() {
    return users.values();
  }

  public void remove(Cheese cheese) {
    cheeses.remove(cheese);
  }

  public void remove(Discount discount) {
    discounts.remove(discount);
  }

  public void remove(User user) {
    users.remove(user.getWiaUsername());
  }

  public void update(Discount discount) {
    int index = discounts.indexOf(discount);
    discounts.set(index, discount);
  }

  public void update(List<Discount> discounts) {
    this.discounts = discounts;
  }
}
