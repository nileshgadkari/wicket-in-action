package wicket.in.action.chapter09.jcaptchacomp;

import org.apache.wicket.markup.ComponentTag;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.model.IModel;
import org.apache.wicket.validation.IValidatable;
import org.apache.wicket.validation.validator.AbstractValidator;

import com.octo.captcha.service.image.ImageCaptchaService;

public abstract class CaptchaInput extends TextField {

  public CaptchaInput (String id,
      IModel challengeResponseModel, final String challengeId) {

    super(id, challengeResponseModel);

    add(new AbstractValidator() {

      @Override
      protected void onValidate(IValidatable validatable) {
        if (!getImageCaptchaService().validateResponseForID(
            challengeId, validatable.getValue())) {
          onError(this, validatable);
        }
      }
    });
  }

  protected abstract ImageCaptchaService getImageCaptchaService();

  @Override
  protected void onComponentTag(final ComponentTag tag) {
    super.onComponentTag(tag);
    tag.put("value", "");
  }

  protected abstract void onError(
      AbstractValidator validator,
      IValidatable validatable);
}
