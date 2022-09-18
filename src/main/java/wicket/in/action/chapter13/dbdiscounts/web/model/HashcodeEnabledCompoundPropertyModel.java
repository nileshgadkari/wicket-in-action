package wicket.in.action.chapter13.dbdiscounts.web.model;

import org.apache.wicket.model.CompoundPropertyModel;
import org.apache.wicket.model.IModel;

import wicket.in.action.common.Objects;

public class HashcodeEnabledCompoundPropertyModel extends
    CompoundPropertyModel {

  public HashcodeEnabledCompoundPropertyModel(Object object) {
    super(object);
  }

  @Override
  public int hashCode() {
    return Objects.hashCode(getObject());
  }

  @Override
  public boolean equals(Object obj) {
    if (obj instanceof IModel) {
      return Objects.equal(getObject(), ((IModel) obj).getObject());
    }
    return false;
  }
}
