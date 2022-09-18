package wicket.in.action.chapter02.section_2_1_4.listing01;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;

public class Hello extends WebPage {

  public Hello() {
    add(new Label("message", "Hello Earth"));
  }
}