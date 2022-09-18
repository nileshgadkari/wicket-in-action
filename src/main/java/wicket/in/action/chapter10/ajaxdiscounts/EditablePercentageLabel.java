package wicket.in.action.chapter10.ajaxdiscounts;

import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.util.convert.IConverter;

import wicket.in.action.common.AjaxEditableLabel;
import wicket.in.action.common.DataBase;
import wicket.in.action.common.Discount;
import wicket.in.action.common.PercentageConverter;

public class EditablePercentageLabel extends AjaxEditableLabel {

  private final FeedbackPanel feedbackPanel;

  public EditablePercentageLabel(String id,
      FeedbackPanel feedbackPanel) {
    super(id);
    feedbackPanel.setOutputMarkupId(true);
    this.feedbackPanel = feedbackPanel;
  }

  @Override
  public IConverter getConverter(Class type) {
    return new PercentageConverter();
  }

  @Override
  protected void onError(AjaxRequestTarget target) {
    super.onError(target);
    target.addComponent(feedbackPanel);
  }

  @Override
  protected void onSubmit(AjaxRequestTarget target) {
    super.onSubmit(target);
    target.addComponent(feedbackPanel);
    Discount discount = (Discount) getParent().getModelObject();
    DataBase.getInstance().update(discount);
  }
}
