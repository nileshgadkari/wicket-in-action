package wicket.in.action.chapter07.section_7_2;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Recipe implements Serializable {
  private String name;
  private String serves;
  private List<String> ingredients = new ArrayList<String>();

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getServes() {
    return serves;
  }

  public void setServes(String serves) {
    this.serves = serves;
  }

  public List<String> getIngredients() {
    return ingredients;
  }

  public void setIngredients(List<String> ingredients) {
    this.ingredients = ingredients;
  }
}
