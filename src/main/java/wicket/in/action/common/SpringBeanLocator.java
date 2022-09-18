package wicket.in.action.common;

import java.lang.ref.WeakReference;

import org.apache.wicket.proxy.IProxyTargetLocator;
import org.apache.wicket.spring.ISpringContextLocator;
import org.apache.wicket.util.lang.Classes;
import org.apache.wicket.util.lang.Objects;
import org.apache.wicket.util.string.Strings;
import org.springframework.beans.factory.BeanFactoryUtils;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.ApplicationContext;

public class SpringBeanLocator implements IProxyTargetLocator {

  private transient WeakReference beanTypeCache;

  private String beanTypeName;

  private String beanName;

  private ISpringContextLocator springContextLocator;

  private Boolean singletonCache = null;

  public SpringBeanLocator(Class beanType,
      ISpringContextLocator locator) {
    this(null, beanType, locator);
  }

  @SuppressWarnings("unchecked")
  public SpringBeanLocator(String beanName, Class beanType,
      ISpringContextLocator locator) {
    if (locator == null) {
      throw new IllegalArgumentException(
          "[locator] argument cannot be null");
    }
    if (beanType == null) {
      throw new IllegalArgumentException(
          "[beanType] argument cannot be null");
    }

    this.beanTypeCache = new WeakReference(beanType);
    this.beanTypeName = beanType.getName();
    this.springContextLocator = locator;
    this.beanName = beanName;
    this.springContextLocator = locator;
  }

  private final String getBeanNameOfClass(ApplicationContext ctx,
      Class clazz) {
    String[] names = BeanFactoryUtils
        .beanNamesForTypeIncludingAncestors(ctx, clazz);
    if (names.length == 0) {
      throw new IllegalStateException("bean of type ["
          + clazz.getName() + "] not found");
    }
    if (names.length > 1) {
      StringBuffer msg = new StringBuffer();
      msg.append("more then one bean of type [");
      msg.append(clazz.getName());
      msg
          .append("] found, you have to specify the name of the bean ");
      msg
          .append("(@SpringBean(name=\"foo\")) in order to resolve this conflict. ");

      msg.append("Matched beans: ");
      msg.append(Strings.join(",", names));

      throw new IllegalStateException(msg.toString());
    }
    return names[0];
  }

  public boolean isSingletonBean() {
    if (singletonCache == null) {
      singletonCache = Boolean.valueOf(getSpringContext()
          .isSingleton(getBeanName()));
    }
    return singletonCache.booleanValue();
  }

  @SuppressWarnings("unchecked")
  public Class getBeanType() {
    Class clazz = beanTypeCache == null ? null
        : (Class) beanTypeCache.get();
    if (clazz == null) {
      beanTypeCache = new WeakReference(clazz = Classes
          .resolveClass(beanTypeName));
      if (clazz == null) {
        throw new RuntimeException(
            "SpringBeanLocator could not find class ["
                + beanTypeName
                + "] needed to locate the ["
                + ((beanName != null) ? (beanName)
                    : ("bean name not specified")) + "] bean");
      }
    }
    return clazz;
  }

  public Object locateProxyTarget() {
    final ApplicationContext context = getSpringContext();

    if (beanName != null && beanName.length() > 0) {
      return lookupSpringBean(context, beanName, getBeanType());
    } else {
      return lookupSpringBean(context, getBeanType());
    }
  }

  private ApplicationContext getSpringContext() {
    final ApplicationContext context = springContextLocator
        .getSpringContext();

    if (context == null) {
      throw new IllegalStateException(
          "spring application context locator returned null");
    }
    return context;
  }

  public final String getBeanName() {
    if (beanName == null || "".equals(beanName)) {
      beanName = getBeanNameOfClass(getSpringContext(), getBeanType());

    }
    return beanName;
  }

  public final ISpringContextLocator getSpringContextLocator() {
    return springContextLocator;
  }

  private final Object lookupSpringBean(ApplicationContext ctx,
      Class clazz) {
    return lookupSpringBean(ctx, getBeanNameOfClass(ctx, clazz),
        clazz);
  }

  private static Object lookupSpringBean(ApplicationContext ctx,
      String name, Class clazz) {
    try {
      return ctx.getBean(name, clazz);
    } catch (NoSuchBeanDefinitionException e) {
      throw new IllegalStateException("bean with name [" + name
          + "] and class [" + clazz.getName() + "] not found");
    }
  }

  @Override
  public boolean equals(Object obj) {
    if (obj instanceof SpringBeanLocator) {
      SpringBeanLocator other = (SpringBeanLocator) obj;
      return beanTypeName.equals(other.beanTypeName)
          && Objects.equal(beanName, other.beanName);
    }
    return false;
  }

  @Override
  public int hashCode() {
    int hashcode = beanTypeName.hashCode();
    if (beanName != null) {
      hashcode = hashcode + (127 * beanName.hashCode());
    }
    return hashcode;
  }
}
