package wicket.in.action.common;

import java.io.Serializable;

class Entity implements Serializable {

  int id;

  @Override
  public boolean equals(Object obj) {
    if (obj == null) {
      return false;
    }
    if (getClass() == obj.getClass()) {
      return ((Entity) obj).id == id;
    }
    return false;
  }

  @Override
  public int hashCode() {
    return id;
  }
}
