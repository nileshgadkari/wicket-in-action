package wicket.in.action.chapter13.dbdiscounts.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User implements DomainObject {

  @Id
  @GeneratedValue
  private Long id;

  @Column(name = "is_admin")
  private boolean admin = false;

  @Column(name = "full_name")
  private String fullname;

  @Column(name = "pwd")
  private String wiaPassword;

  @Column(name = "uid")
  private String wiaUsername;

  public User() {
  }

  public User(String username, String password, String fullname,
      boolean isAdmin) {
    this.wiaUsername = username;
    this.wiaPassword = password;
    this.fullname = fullname;
    this.admin = isAdmin;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getFullname() {
    return fullname;
  }

  public String getWiaPassword() {
    return wiaPassword;
  }

  public String getWiaUsername() {
    return wiaUsername;
  }

  public boolean isAdmin() {
    return admin;
  }

  public void setAdmin(boolean admin) {
    this.admin = admin;
  }

  public void setFullname(String fullname) {
    this.fullname = fullname;
  }

  public void setWiaPassword(String password) {
    this.wiaPassword = password;
  }

  public void setWiaUsername(String username) {
    this.wiaUsername = username;
  }

  @Override
  public String toString() {
    return "User[" + id + "]";
  }
}
