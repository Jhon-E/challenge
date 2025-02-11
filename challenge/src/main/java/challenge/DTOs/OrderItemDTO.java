package challenge.DTOs;

public class OrderItemDTO {
    int id_pro;
    int id_seller;
    String product_name;
    String seller_username;
    double price;
    int stock;
    char estate;
    int cantidad;

    public OrderItemDTO (){}

    public OrderItemDTO(int cantidad, char estate, int id_pro, int id_seller, double price, String product_name, String seller_username, int stock) {
        this.cantidad = cantidad;
        this.estate = estate;
        this.id_pro = id_pro;
        this.id_seller = id_seller;
        this.price = price;
        this.product_name = product_name;
        this.seller_username = seller_username;
        this.stock = stock;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public char getEstate() {
        return estate;
    }

    public void setEstate(char estate) {
        this.estate = estate;
    }

    public int getId_pro() {
        return id_pro;
    }

    public void setId_pro(int id_pro) {
        this.id_pro = id_pro;
    }

    public int getId_seller() {
        return id_seller;
    }

    public void setId_seller(int id_seller) {
        this.id_seller = id_seller;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public String getSeller_username() {
        return seller_username;
    }

    public void setSeller_username(String seller_username) {
        this.seller_username = seller_username;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }
}
