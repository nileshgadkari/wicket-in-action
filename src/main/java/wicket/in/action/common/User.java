package wicket.in.action.common;

import java.io.Serializable;

public class User implements Serializable {

  private boolean admin = false;

  private String fullname;

  private String wiaPassword;

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
}
