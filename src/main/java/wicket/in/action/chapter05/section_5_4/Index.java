package wicket.in.action.chapter05.section_5_4;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.wicket.Page;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.AjaxFallbackLink;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.PropertyListView;

import wicket.in.action.AbstractBasePage;

/**
 * @author dashorst
 */
public class Index extends AbstractBasePage {
  public class SomeItem implements Serializable {
    private String value;

    public SomeItem(String value) {
      this.value = value;
    }
  }

  public Index() {
    /* 5.4.1 */
    add(new Link("link1") {

      @Override
      public void onClick() {
        // do something important
        Page page = new Page1(null);
        setResponsePage(page);
      }
    });

    /* 5.4.2 */
    List<SomeItem> items = Arrays.asList(new SomeItem("item 1"),
        new SomeItem("item 2"), new SomeItem("item 3"));
    final List<SomeItem> selected = new ArrayList<SomeItem>();

    final WebMarkupContainer example542 = new WebMarkupContainer(
        "example542");
    example542.setOutputMarkupId(true);
    add(example542);
    
    example542.add(new PropertyListView("items", items) {
      @Override
      protected void populateItem(final ListItem item) {
        item.add(new Label("value"));
        item.add(new AjaxFallbackLink("add") {
          @Override
          public void onClick(AjaxRequestTarget target) {
            selected.add((SomeItem) item.getModelObject());
            target.addComponent(example542);
          }
        });
      }
    });

    example542.add(new PropertyListView("selected", selected) {
      @Override
      protected void populateItem(final ListItem item) {
        item.add(new Label("value"));
        item.add(new AjaxFallbackLink("remove") {
          @Override
          public void onClick(AjaxRequestTarget target) {
            selected.remove(item.getModelObject());
            target.addComponent(example542);
          }
        });
      }
    });
  }
}
