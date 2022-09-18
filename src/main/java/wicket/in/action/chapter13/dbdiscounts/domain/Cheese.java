package wicket.in.action.chapter13.dbdiscounts.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import wicket.in.action.common.Objects;

@Entity
@Table(name = "cheese")
public final class Cheese implements DomainObject {

  @Id
  @GeneratedValue
  private Long id;

  @Lob
  @Column(name = "description")
  private String description;

  @Column(name = "name", length = 100, unique = true)
  private String name;

  @Column(name = "price")
  private double price;

  public Cheese() {
  }

  public Cheese(String name, String description, double price) {
    super();
    this.name = name;
    this.description = description;
    this.price = price;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getDescription() {
    return description;
  }

  public String getName() {
    return name;
  }

  public double getPrice() {
    return price;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setPrice(double price) {
    this.price = price;
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
    if (obj instanceof Cheese) {
      return Objects.equal(id, ((Cheese) obj).id);
    }
    return false;
  }

  @Override
  public String toString() {
    return "Cheese[" + id + "]";
  }
}
