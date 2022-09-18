package wicket.in.action.chapter05.section_5_3;

import java.io.Serializable;

import org.apache.wicket.PageParameters;
import org.apache.wicket.markup.html.link.BookmarkablePageLink;
import org.apache.wicket.markup.html.link.ExternalLink;

import wicket.in.action.AbstractBasePage;
import wicket.in.action.Book;

/**
 * Page for examples of section 5.3 from Wicket in Action
 */
public class Index extends AbstractBasePage {
  public Index() {
    /* for 5.3.1 see markup */

    /* 5.3.2 */
    class Recipe implements Serializable {
      private String url;

      private String name;

      public String getUrl() {
        return url;
      }

      public String getName() {
        return name;
      }

      public Recipe(String name, String url) {
        this.name = name;
        this.url = url;
      }
    }
    
    Recipe recipe = new Recipe("Lasagna", "http://en.wikibooks.org/wiki/Cookbook:Traditional_Lasagne");
    add(new ExternalLink("recipe", recipe.getUrl(), recipe.getName()));
    
    /* 5.3.3 */
    add(new BookmarkablePageLink("book", Book.class));
    add(new BookmarkablePageLink("details", CheeseDetailsPage.class, new PageParameters("name=" + "edam")));
    
    /* 5.3.4 See markup */
    
  }
}
