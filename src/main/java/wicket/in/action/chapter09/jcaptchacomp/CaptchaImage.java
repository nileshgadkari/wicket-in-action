package wicket.in.action.chapter09.jcaptchacomp;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;

import javax.imageio.ImageIO;

import org.apache.wicket.Session;
import org.apache.wicket.markup.html.image.Image;
import org.apache.wicket.markup.html.image.resource.DynamicImageResource;

import com.octo.captcha.service.image.ImageCaptchaService;

public abstract class CaptchaImage extends Image {

  public CaptchaImage (String id,
      final String challengeId) {

    super(id);
    setImageResource(new DynamicImageResource() {
      @Override
      protected byte[] getImageData() {
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        BufferedImage challenge = getImageCaptchaService()
            .getImageChallengeForID(challengeId,
                Session.get().getLocale());
        try {
          ImageIO.write(challenge, "jpeg", os);
          return os.toByteArray();
        } catch (Exception e) {
          throw new RuntimeException(e);
        }
      }
    });
  }

  protected abstract ImageCaptchaService getImageCaptchaService();
}
