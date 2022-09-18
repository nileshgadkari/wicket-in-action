/*
 * $Id: HelloWorld.java 5394 2006-04-16 13:36:52 +0000 (Sun, 16 Apr 2006)
 * jdonnerstag $ $Revision: 1.3 $ $Date: 2006-04-16 13:36:52 +0000 (Sun, 16 Apr
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
package wicket.in.action.chapter09.jcaptcha;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.rmi.server.UID;

import javax.imageio.ImageIO;

import org.apache.wicket.Session;
import org.apache.wicket.markup.ComponentTag;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.image.Image;
import org.apache.wicket.markup.html.image.resource.DynamicImageResource;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.validation.IValidatable;
import org.apache.wicket.validation.validator.AbstractValidator;

import wicket.in.action.AbstractBasePage;
import wicket.in.action.common.RequiredTextField;

import com.octo.captcha.service.image.DefaultManageableImageCaptchaService;
import com.octo.captcha.service.image.ImageCaptchaService;

public class JCaptcha extends AbstractBasePage {

  private static final class CaptchaForm extends Form {

    private String challengeId = null;

    private String challengeResponse;

    public CaptchaForm(String id) {
      super(id);

      DynamicImageResource res = new DynamicImageResource() {
        @Override
        protected byte[] getImageData() {
          ByteArrayOutputStream os = new ByteArrayOutputStream();
          challengeId = new UID().toString();
          BufferedImage challenge = captchaService
              .getImageChallengeForID(challengeId, Session.get()
                  .getLocale());

          try {
            ImageIO.write(challenge, "jpeg", os);
            return os.toByteArray();
          } catch (Exception e) {
            throw new RuntimeException(e);
          }
        }
      };
      add(new Image("captchaImage", res));

      add(new RequiredTextField("response", new PropertyModel(this,
          "challengeResponse")) {
        @Override
        protected final void onComponentTag(final ComponentTag tag) {
          super.onComponentTag(tag);
          tag.put("value", "");
        }
      }.add(new AbstractValidator() {

        @Override
        protected void onValidate(IValidatable validatable) {
          if (!captchaService.validateResponseForID(challengeId,
              validatable.getValue())) {
            error(validatable);
          }
        }

        @Override
        protected String resourceKey() {
          return "captcha.validation.failed";
        }
      }));

      add(new FeedbackPanel("feedback"));
    }

    public String getChallengeResponse() {
      return challengeResponse;
    }

    public void setChallengeResponse(String challengeResponse) {
      this.challengeResponse = challengeResponse;
    }

    @Override
    protected void onSubmit() {
      info(getLocalizer().getString("captcha.validation.succeeded",
          this));
    }
  }

  private static final ImageCaptchaService captchaService = new DefaultManageableImageCaptchaService();

  public JCaptcha() {
    add(new CaptchaForm("form"));
  }
}