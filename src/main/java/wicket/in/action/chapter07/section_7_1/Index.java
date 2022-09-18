package wicket.in.action.chapter07.section_7_1;

import org.apache.wicket.Component;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.AjaxFallbackLink;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.panel.EmptyPanel;
import org.apache.wicket.markup.html.panel.Fragment;

import wicket.in.action.AbstractBasePage;

/**
 * @author dashorst
 */
public class Index extends AbstractBasePage {
  public Index() {
    /* Section 7.1 */
    add(new Label("dexter", "Omelette du fromage"));
    add(new Label("deedee", "That's all you can say!"));

    /* Section 7.1.1 */
    final WebMarkupContainer group = new WebMarkupContainer("group");
    add(group);
    group.add(new Label("dexter", "Omelette du fromage"));
    group.add(new Label("deedee", "That's all you can say!"));
    group.setOutputMarkupPlaceholderTag(true);
    add(new AjaxFallbackLink("link") {
      @Override
      public void onClick(AjaxRequestTarget target) {
        if (target != null) {
          group.setVisible(!group.isVisible());
          target.addComponent(group);
        }
      }
    });

    /* Section 7.1.2 */
    add(new ExamplePanel("example"));
    add(new LabelsGroup("group2"));
    add(new Link("swap") {
      private Component previous = new EmptyPanel("group2");

      @Override
      public void onClick() {
        Component current = getPage().get("group2");
        current.replaceWith(previous);
        previous = current;
      }
    });
    
    /* Section 7.1.3 */
    class LabelsFragment extends Fragment {
      public LabelsFragment(String id) {
        super(id, "labelsgroup", Index.this);
        add(new Label("dexter", "Omelette du fromage"));
        add(new Label("deedee", "That's all you can say!"));
      }
    }
    add(new LabelsFragment("group3"));
  }

}
