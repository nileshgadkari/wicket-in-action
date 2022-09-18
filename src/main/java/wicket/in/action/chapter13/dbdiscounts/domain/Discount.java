package wicket.in.action.chapter13.dbdiscounts.domain;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import wicket.in.action.common.Objects;

@Entity
@Table(name = "discount")
public class Discount implements DomainObject {

  @Id
  @GeneratedValue
  private Long id;

  @ManyToOne
  private Cheese cheese;

  @Lob
  @Column(name = "description")
  private String description;

  @Column(name = "discount", nullable = false)
  private double discount;

  @Column(name = "from_date")
  private Date from;

  @Column(name = "until_date")
  private Date until;

  public Discount() {
    from = new Date();
    Calendar cal = Calendar.getInstance();
    cal.add(Calendar.MONTH, 1);
    until = cal.getTime();
  }

  public Discount(Cheese cheese, double discount, String description) {
    this();
    this.cheese = cheese;
    this.discount = discount;
    this.description = description;
  }

  public Discount(Cheese cheese, double discount, Date from,
      Date until, String description) {
    this.cheese = cheese;
    this.discount = discount;
    this.from = from;
    this.until = until;
    this.description = description;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Cheese getCheese() {
    return cheese;
  }

  public Date getFrom() {
    return from;
  }

  public String getDescription() {
    return description;
  }

  public double getDiscount() {
    return discount;
  }

  public Date getUntil() {
    return until;
  }

  public void setCheese(Cheese cheese) {
    this.cheese = cheese;
  }

  public void setFrom(Date date) {
    this.from = date;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setDiscount(double discount) {
    this.discount = discount;
  }

  public void setUntil(Date until) {
    this.until = until;
  }

  // I'll burn in hell for doing this according to the Hibernate
  // docs, but guess what, it's the only thing that consistently
  // works

  @Override
  public int hashCode() {
    if (id == null) {
      return super.hashCode();
    }
    return Objects.hashCode(id);
  }

  @Override
  public boolean equals(Object obj) {
    if (id == null) {
      return super.equals(obj);
    }
    if (obj instanceof Discount) {
      return Objects.equal(id, ((Discount) obj).id);
    }
    return false;
  }

  @Override
  public String toString() {
    return "Discount[" + id + "]";
  }
}
