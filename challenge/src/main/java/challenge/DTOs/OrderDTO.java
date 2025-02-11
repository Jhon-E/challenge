package challenge.DTOs;
import challenge.models.OrderItem;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class OrderDTO {

    private int id;
    private int id_user;
    private String userName;
    private LocalDateTime date;
    private double total;
    private List<OrderItemDTO> products = new ArrayList<>();

    public OrderDTO(String userName, int id, LocalDateTime date, int id_user, double total, List<OrderItemDTO> products) {
        this.products = products;
        this.userName = userName;
        this.id = id;
        this.date = date;
        this.id_user = id_user;
        this.total = total;
    }

    public List<OrderItemDTO> getProducts() {
        return products;
    }

    public void setProducts(List<OrderItemDTO> products) {
        this.products = products;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public OrderDTO(){}

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public int getId_user() {
        return id_user;
    }

    public void setId_user(int id_user) {
        this.id_user = id_user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
