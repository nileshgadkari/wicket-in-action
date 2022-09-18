package wicket.in.action.chapter14.section_14_2;

import org.apache.wicket.PageParameters;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.BookmarkablePageLink;
import org.apache.wicket.markup.html.link.ILinkListener;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.model.CompoundPropertyModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.protocol.http.WebApplication;
import org.apache.wicket.request.target.coding.MixedParamUrlCodingStrategy;
import org.apache.wicket.request.target.coding.QueryStringUrlCodingStrategy;

import wicket.in.action.AbstractBasePage;
import wicket.in.action.chapter05.section_5_3.Cheese;
import wicket.in.action.chapter05.section_5_3.CheeseDetailsPage;

/**
 * @author dashorst
 */
public class Index extends AbstractBasePage {
  public Index() {
    CompoundPropertyModel model = new CompoundPropertyModel(this);
    setModel(model);

    Cheese cheese = new Cheese();
    cheese.setName("edam");

    add(new Link("details1", new Model(cheese)) {
      @Override
      public void onClick() {
        Cheese cheese = (Cheese) getModelObject();
        setResponsePage(new CheeseDetailsPage(cheese));
      }
    });
    add(new Label("url1", getRequestCycle().urlFor(get("details1"), ILinkListener.INTERFACE).toString()));

    PageParameters pars = new PageParameters();
    pars.add("cheese", cheese.getName());

    ((WebApplication)getApplication()).unmount("cheeses");
    ((WebApplication)getApplication()).mountBookmarkablePage("cheeses", CheeseDetailsPage.class);
    ((WebApplication)getApplication()).unmount("cheeses");
    ((WebApplication)getApplication()).mount(new QueryStringUrlCodingStrategy("cheeses", CheeseDetailsPage.class));
    ((WebApplication)getApplication()).unmount("cheeses");
    ((WebApplication)getApplication()).mount(new MixedParamUrlCodingStrategy("cheeses", CheeseDetailsPage.class, new String[]{}));
    
    add(new BookmarkablePageLink("details2", CheeseDetailsPage.class, pars));
    add(new Label("url2", getRequestCycle().urlFor(null, CheeseDetailsPage.class, pars).toString()));
  }
}
