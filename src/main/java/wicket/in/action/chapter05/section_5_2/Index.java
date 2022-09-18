package wicket.in.action.chapter05.section_5_2;

import java.io.Serializable;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.basic.MultiLineLabel;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.model.ResourceModel;

import wicket.in.action.AbstractBasePage;

/**
 */
public class Index extends AbstractBasePage {
    public static class Person implements Serializable {
        private String name = "Johnson";

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public Index() {
      add(new Label("message", "Hello, World!"));

      add(new Label("label1", "Hello, World!"));
      Person person = new Person();
      add(new Label("label2", new PropertyModel(person, "name")));
      add(new Label("label3", "Wicket in Action"));
      add(new Label("name"));
      add(new Label("label4", new ResourceModel("key", "default value")));
      
      add(new Label("message1", "Hello,\nWorld!\nIÕm super!"));
      add(new MultiLineLabel("message2", "Hello,\nWorld!\nIÕm super!"));

      add(new Label("message3", "<h1>Hello!</h1>"));
      add(new Label("message4", "<h1>Hello!</h1>").setEscapeModelStrings(false));
      add(new Label("message5", "<h1 onclick='alert(\"clicked!\");'>Click me</h1>"));
      add(new Label("message6", "<h1 onclick='alert(\"clicked!\");'>Click me</h1>").setEscapeModelStrings(false));
    }
}
