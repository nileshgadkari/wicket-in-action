package wicket.in.action;

import org.apache.wicket.Application;
import org.apache.wicket.Component;
import org.apache.wicket.Page;
import org.apache.wicket.Request;
import org.apache.wicket.RequestCycle;
import org.apache.wicket.Response;
import org.apache.wicket.Session;
import org.apache.wicket.application.IComponentInstantiationListener;
import org.apache.wicket.protocol.http.WebApplication;
import org.apache.wicket.protocol.http.WebRequest;
import org.apache.wicket.protocol.http.WebResponse;
import org.apache.wicket.settings.ISecuritySettings;
import org.apache.wicket.spring.injection.annot.SpringComponentInjector;
import org.apache.wicket.util.io.IObjectStreamFactory;
import org.apache.wicket.util.lang.Objects;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import wicket.in.action.chapter05.section_5_3.CheeseDetailsPage;
import wicket.in.action.chapter09.resdiscounts.DiscountsPage;
import wicket.in.action.chapter14.section_14_3.CheesrRequestCycle;
import wicket.in.action.common.SigninPage;
import wicket.in.action.common.WiaAuthorizationStrategy;

public abstract class WicketInActionApplication extends
    WebApplication implements ApplicationContextAware {

  public static WicketInActionApplication get() {
    return (WicketInActionApplication) Application.get();
  }

  /**
   * Boolean for the examples of section 15.3, when true, the
   * CheesrRequestCycle is created by the newRequestCycle factory
   * method.
   * 
   * @see #newRequestCycle(Request, Response)
   */
  private boolean cheesrRequestCycle = false;

  @SuppressWarnings("unused")
  private ApplicationContext ctx;

  public void setApplicationContext(
      ApplicationContext applicationContext) throws BeansException {
    this.ctx = applicationContext;
  }

  @Override
  protected void init() {

    Objects
        .setObjectStreamFactory(new IObjectStreamFactory.DefaultObjectStreamFactory());

    getDebugSettings().setAjaxDebugModeEnabled(false);
    getMarkupSettings().setStripWicketTags(true);
    getResourceSettings().setThrowExceptionOnMissingResource(false);

    WiaAuthorizationStrategy authStrat = new WiaAuthorizationStrategy();
    ISecuritySettings securitySettings = getSecuritySettings();
    securitySettings.setAuthorizationStrategy(authStrat);
    securitySettings
        .setUnauthorizedComponentInstantiationListener(authStrat);

    // apply general mounts for the application

    mountBookmarkablePage("/home", Index.class);
    mountBookmarkablePage("/book", Book.class);
    mountBookmarkablePage("/examples", Examples.class);
    mountBookmarkablePage("/shop", Shop.class);
    mountBookmarkablePage("/support", Support.class);

    // apply chapter specific mounts

    mountBookmarkablePage("/examples-1.3",
        wicket.in.action.chapter01.section_1_3.Index.class);

    mountBookmarkablePage("/examples-3.1",
        wicket.in.action.chapter03.section_3_1.Index.class);
    mountBookmarkablePage("/examples-3.2",
        wicket.in.action.chapter03.section_3_2.Index.class);
    mountBookmarkablePage("/examples-3.3",
        wicket.in.action.chapter03.section_3_3.Index.class);

    mountBookmarkablePage("/examples-4.2",
        wicket.in.action.chapter04.section_4_2.Index.class);
    mountBookmarkablePage("/examples-4.3",
        wicket.in.action.chapter04.section_4_3.Index.class);
    mountBookmarkablePage("/examples-4.4",
        wicket.in.action.chapter04.section_4_4.Index.class);

    mountBookmarkablePage("/examples-5.1",
        wicket.in.action.chapter05.section_5_2.Index.class);
    mountBookmarkablePage("/examples-5.2",
        wicket.in.action.chapter05.section_5_2.Index.class);
    mountBookmarkablePage("/examples-5.2/details", CheeseDetailsPage.class);
    mountBookmarkablePage("/examples-5.3",
        wicket.in.action.chapter05.section_5_3.Index.class);
    mountBookmarkablePage("/examples-5.4",
        wicket.in.action.chapter05.section_5_4.Index.class);
    mountBookmarkablePage("/examples-5.5",
        wicket.in.action.chapter05.section_5_5.Index.class);
    mountBookmarkablePage("/examples-5.6",
        wicket.in.action.chapter05.section_5_6.Index.class);

    mountBookmarkablePage("/examples-6.1",
        wicket.in.action.chapter06.section_6_1.FormsPage.class);
    mountBookmarkablePage(
        "/examples-6.2",
        wicket.in.action.chapter06.section_6_2.FormProcessingPage.class);
    mountBookmarkablePage(
        "/examples-6.3",
        wicket.in.action.chapter06.section_6_3.TextComponentsPage.class);
    mountBookmarkablePage(
        "/examples-6.4",
        wicket.in.action.chapter06.section_6_4.SelectionComponentsPage.class);
    mountBookmarkablePage(
        "/examples-6.5",
        wicket.in.action.chapter06.section_6_5.SubmitComponentsPage.class);
    mountBookmarkablePage("/examples-6.6",
        wicket.in.action.chapter06.section_6_6.ValidationsPage.class);
    mountBookmarkablePage("/examples-6.7",
        wicket.in.action.chapter06.section_6_7.FeedbackPage.class);

    mountBookmarkablePage("/examples-7.1",
        wicket.in.action.chapter07.section_7_1.Index.class);
    mountBookmarkablePage("/examples-7.2",
        wicket.in.action.chapter07.section_7_2.Index.class);

    mountBookmarkablePage("/examples-9.1", DiscountsPage.class);
    mountBookmarkablePage("/examples-14.1",
        wicket.in.action.chapter14.section_14_1.Index.class);
    mountBookmarkablePage("/examples-14.2",
        wicket.in.action.chapter14.section_14_2.Index.class);
    mountBookmarkablePage("/examples-14.3",
        wicket.in.action.chapter14.section_14_3.Index.class);
    mountBookmarkablePage("/examples-14.4",
        wicket.in.action.chapter14.section_14_4.Index.class);

    // securitySettings.setEnforceMounts(true);
    mountBookmarkablePage("/signin", SigninPage.class);

    addComponentInstantiationListener(new IComponentInstantiationListener() {
      public void onInstantiation(final Component component) {
        if (!getSecuritySettings().getAuthorizationStrategy()
            .isInstantiationAuthorized(component.getClass())) {
          getSecuritySettings()
              .getUnauthorizedComponentInstantiationListener()
              .onUnauthorizedInstantiation(component);
        }
      }
    });

    // template method for overriding in a unit test, see examples of section 14.1
    initSpringInjector();
  }

  protected void initSpringInjector() {
    addComponentInstantiationListener(new SpringComponentInjector(
        this));
  }

  /**
   * Gets the home page for the application.
   */
  @Override
  public Class<? extends Page> getHomePage() {
    return Index.class;
  }

  /**
   * Factory method for creating a new session, overridden in
   * CheesrApplication.
   */
  @Override
  public abstract Session newSession(Request request,
      Response response);

  /**
   * Factory method for creating a new request cycle. This method is
   * overridden for use in the examples of section 15.3 where the
   * request cycle is used to generate specific error pages.
   * 
   * @See {@link wicket.in.action.chapter15.section_15_3.Index}
   */
  @Override
  public RequestCycle newRequestCycle(Request request,
      Response response) {

    if (isCheesrRequestCycle()) {
      return new CheesrRequestCycle(this, (WebRequest) request,
          (WebResponse) response);
    }
    return super.newRequestCycle(request, response);
  }

  /**
   * Sets the flag that determines whether to create a cheesr
   * request cycle or a normal Wicket request cycle.
   * 
   * @param cheesrRequestCycle
   *          true when the {@link CheesrRequestCycle} must be
   *          created.
   * @See {@link wicket.in.action.chapter15.section_15_3.Index}
   */
  public void setCheesrRequestCycle(boolean cheesrRequestCycle) {
    this.cheesrRequestCycle = cheesrRequestCycle;
  }

  /**
   * Gets the flag that determines whether to create a cheesr
   * request cycle or a normal Wicket request cycle.
   * 
   * @return true when the {@link CheesrRequestCycle} must be
   *         created.
   * @See {@link wicket.in.action.chapter15.section_15_3.Index}
   */
  public boolean isCheesrRequestCycle() {
    return cheesrRequestCycle;
  }
}