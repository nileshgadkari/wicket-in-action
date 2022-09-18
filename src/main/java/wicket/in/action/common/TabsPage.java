package wicket.in.action.common;

import java.util.ArrayList;
import java.util.List;

import org.apache.wicket.extensions.markup.html.tabs.AbstractTab;
import org.apache.wicket.extensions.markup.html.tabs.ITab;
import org.apache.wicket.extensions.markup.html.tabs.TabbedPanel;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.Model;

public class TabsPage extends WebPage {

  private static class AccountsPanel extends Panel {

    public AccountsPanel(String id) {
      super(id);
    }
  };

  private static class ComponentsPanel extends Panel {

    public ComponentsPanel(String id) {
      super(id);
    }
  };

  public TabsPage() {

    List<ITab> tabs = new ArrayList<ITab>();
    tabs.add(new AbstractTab(new Model("accounts in this group")) {
      @Override
      public Panel getPanel(String panelId) {
        return new ComponentsPanel(panelId);
      }
    });
    tabs.add(new AbstractTab(new Model(
        "components available to this group")) {
      @Override
      public Panel getPanel(String panelId) {
        return new AccountsPanel(panelId);
      }
    });
    add(new TabbedPanel("tabs", tabs));
  }
}
