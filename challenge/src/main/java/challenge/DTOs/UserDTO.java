package challenge.DTOs;

public class UserDTO {
    private int id;
    private String userName, lastName, email, role;

    public UserDTO(){}

    public UserDTO(int id, String email, String userName, String role, String lastName) {
        this.id = id;
        this.email = email;
        this.userName = userName;
        this.role = role;
        this.lastName = lastName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
