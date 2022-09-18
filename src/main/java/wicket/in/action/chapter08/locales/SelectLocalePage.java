package wicket.in.action.chapter08.locales;

import java.util.Arrays;
import java.util.Locale;

import wicket.in.action.AbstractBasePage;

public class SelectLocalePage extends AbstractBasePage {

  public SelectLocalePage() {
    add(new LocaleDropDown("localeSelect", Arrays
        .asList(new Locale[] { Locale.ENGLISH, Locale.GERMAN,
            Locale.SIMPLIFIED_CHINESE })));
  }
}
