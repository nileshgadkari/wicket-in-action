package wicket.in.action.chapter07.section_7_2;

import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.AjaxLink;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.panel.Panel;

/**
 * @author dashorst
 */
public class CheesrPage extends WebPage {
  private Panel cheesesPanel = new CheesesPanel("main");

  private Panel recipesPanel = new RecipesPanel("main");

  private Panel current = cheesesPanel;

  private WebMarkupContainer menu = new WebMarkupContainer("menu");;

  public CheesrPage() {
    cheesesPanel.setOutputMarkupId(true);
    recipesPanel.setOutputMarkupId(true);
    menu.setOutputMarkupId(true);
    add(menu);
    menu.add(new AjaxLink("cheeseslink") {
      @Override
      public void onClick(AjaxRequestTarget target) {
        current.replaceWith(cheesesPanel);
        current = cheesesPanel;
        target.addComponent(current);
        target.addComponent(menu);
      }

      @Override
      public boolean isEnabled() {
        return current != cheesesPanel;
      }
    });
    menu.add(new AjaxLink("recipeslink") {
      @Override
      public void onClick(AjaxRequestTarget target) {
        current.replaceWith(recipesPanel);
        current = recipesPanel;
        target.addComponent(current);
        target.addComponent(menu);
      }

      @Override
      public boolean isEnabled() {
        return current != recipesPanel;
      }
    });
    add(current);
//    Cart cart = /* get cart */null;
    add(new ShoppingCart("cart"));
  }
}
