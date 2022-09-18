/*
 * $Id: HelloWorld.java 5394 2006-04-16 13:36:52 +0000 (Sun, 16 Apr 2006)
 * jdonnerstag $ $Revision: 1.1 $ $Date: 2006-04-16 13:36:52 +0000 (Sun, 16 Apr
 * 2006) $
 * 
 * ==================================================================== Licensed
 * under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the
 * License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package wicket.in.action.chapter09.jcaptchacomp;

import java.util.UUID;

import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.validation.IValidatable;
import org.apache.wicket.validation.validator.AbstractValidator;

import com.octo.captcha.service.image.ImageCaptchaService;

public abstract class CaptchaForm extends Panel {

  private final class CaptchaInputForm extends Form {

    @SuppressWarnings("unused")
    private String challengeResponse;

    public CaptchaInputForm(String id) {
      super(id);
      String challengeId = UUID.randomUUID().toString();
      add(new CaptchaImage("captchaImage", challengeId) {
        @Override
        public ImageCaptchaService getImageCaptchaService() {
          return CaptchaForm.this.getImageCaptchaService();
        }
      });

      add(new CaptchaInput("response", new PropertyModel(this,
          "challengeResponse"), challengeId) {
        @Override
        protected ImageCaptchaService getImageCaptchaService() {
          return getImageCaptchaService();
        }

        @Override
        protected void onError(AbstractValidator validator,
            IValidatable validatable) {
          CaptchaForm.this.onError(validator, validatable);
        }
      });

      add(new FeedbackPanel("feedback"));
    }

    @Override
    protected void onSubmit() {
      onSuccess();
    }
  }

  public CaptchaForm(String id) {
    super(id);
    add(new CaptchaInputForm("form"));
  }

  protected abstract ImageCaptchaService getImageCaptchaService();

  protected void onError(AbstractValidator validator,
      IValidatable validatable) {
    validator.error(validatable, "captcha.validation.failed");
  }

  protected void onSuccess() {
    info(getLocalizer().getString("captcha.validation.succeeded",
        this));
  }
}