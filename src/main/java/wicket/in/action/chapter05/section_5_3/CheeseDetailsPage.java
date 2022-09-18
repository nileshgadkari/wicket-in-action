package wicket.in.action.chapter05.section_5_3;

import org.apache.wicket.PageParameters;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.BookmarkablePageLink;

import wicket.in.action.AbstractBasePage;

/**
 */
public class CheeseDetailsPage extends AbstractBasePage {
  /**
   * Constructor for bookmarkable URLs.
   * 
   * @param parameters
   */
  public CheeseDetailsPage(PageParameters parameters) {
    super(parameters);

    // look up cheese
    Cheese cheese = new Cheese();
    cheese.setName("Edam");
    cheese.setDescription("Edam (Dutch Edammer) is a Dutch cheese that is traditionally sold as spheres with pale yellow interior and a coat of paraffin. Its Spanish name is queso de bola, literally 'ball cheese'. It is named after the town of Edam in the province of North Holland[1], where the cheese is coated for export and for tourist high season. Edam which has aged for at least 17 weeks is coated with black wax, rather than the usual red or yellow.");

    createComponents(cheese);
  }

  /**
   * Session relative constructor.
   * 
   * @param cheese
   */
  public CheeseDetailsPage(Cheese cheese) {
    createComponents(cheese);
  }

  /**
   * Creates and adds the components to the page.
   * 
   * @param cheese
   */
  private void createComponents(Cheese cheese) {
    add(new Label("name", cheese.getName()));
    add(new Label("description", cheese.getDescription()));
  }
}
