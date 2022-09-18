package wicket.in.action.chapter05.section_5_5;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.wicket.Application;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.BookmarkablePageLink;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.markup.repeater.Item;
import org.apache.wicket.markup.repeater.RefreshingView;
import org.apache.wicket.markup.repeater.RepeatingView;
import org.apache.wicket.model.Model;

import wicket.in.action.AbstractBasePage;

public class Index extends AbstractBasePage {
  public class MenuItem implements Serializable {
    private String caption;

    private Class destination;
  }

  public Index() {
    Application.get().getMarkupSettings().setStripWicketTags(false);
    RepeatingView rv1 = new RepeatingView("rv1");
    add(rv1);
    for (int i = 0; i < 5; i++) {
      rv1.add(new Label(String.valueOf(i), "Value " + i));
    }

    RepeatingView rv2 = new RepeatingView("rv2");
    add(rv2);
    rv2.add(new Label(rv2.newChildId(), "Label with text"));
    rv2.add(new Link(rv2.newChildId()) {
      public void onClick() {
      }
    });

    List<MenuItem> menu = createMenu();

    RepeatingView rv = new RepeatingView("menu");
    add(rv);
    for (MenuItem item : menu) {
      WebMarkupContainer parent = new WebMarkupContainer(rv
          .newChildId());
      rv.add(parent);
      BookmarkablePageLink link = new BookmarkablePageLink("link",
          item.destination);
      parent.add(link);
      link.add(new Label("caption", item.caption));
    }

    List<Integer> list = new ArrayList<Integer>();
    for (int i = 0; i < 5; i++) {
      list.add(i);
    }

    RefreshingView refreshing1 = new RefreshingView("") {
      @Override
      protected Iterator getItemModels() {
        return null;
      }

      @Override
      protected void populateItem(Item item) {
      }
    };
    
    ListView lv1 = new ListView("lv1", list) {
      protected void populateItem(ListItem item) {
        item
            .add(new Label("value", "Value " + item.getModelObject()));
      }
    };
    add(lv1);

    ListView lv2 = new ListView("lv2", menu) {
      protected void populateItem(ListItem item) {
        MenuItem menuitem = (MenuItem) item.getModelObject();
        BookmarkablePageLink link = new BookmarkablePageLink("link",
            menuitem.destination);
        link.add(new Label("caption", menuitem.caption));
        item.add(link);
      }
    };
    add(lv2);
    add(new Link("add", new Model((Serializable) menu)) {
      public void onClick() {
        List<MenuItem> menu = (List<MenuItem>) getModelObject();
        MenuItem item = new MenuItem();
        item.caption = "Menu " + (menu.size() + 1);
        item.destination = Page1.class;
        menu.add(item);
      }
    });
    add(new Link("remove", new Model((Serializable) menu)) {
      public void onClick() {
        List<MenuItem> menu = (List<MenuItem>) getModelObject();
        menu.remove(0);
      }
    });
  }

  private List<MenuItem> createMenu() {
    List<MenuItem> menu = new ArrayList<MenuItem>();

    MenuItem item = new MenuItem();
    item.caption = "Home";
    item.destination = Page1.class;
    menu.add(item);

    item = new MenuItem();
    item.caption = "Cheeses";
    item.destination = Page1.class;
    menu.add(item);

    item = new MenuItem();
    item.caption = "Wines";
    item.destination = Page1.class;
    menu.add(item);

    item = new MenuItem();
    item.caption = "Recipes";
    item.destination = Page1.class;
    menu.add(item);
    return menu;
  }
}
