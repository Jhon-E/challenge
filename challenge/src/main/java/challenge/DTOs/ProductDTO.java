package challenge.DTOs;

import challenge.models.User;

/*{
        "product_name": "Laptop Lenovo ThinkPad",
        "seller_username": "tech_store123",
        "price": 999.99,
        "stock": 25,
        "category": {
        "id": 3,
        "name": "Electronics"
        },
        "estate": "A"
        }

        */

public class ProductDTO {
    private int id_pro;
    private String product_name, seller_username;
    private double price;
    private int stock;
    /**
     * DEBE SER 1 CARACTER
     */
    private char estate;

    public ProductDTO(){}

    public ProductDTO(char estate, int id_pro, double price, String product_name, User seller, String seller_username, int stock) {
        this.estate = estate;
        this.id_pro = id_pro;
        this.price = price;
        this.product_name = product_name;
        this.seller_username = seller_username;
        this.stock = stock;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getSeller_username() {
        return seller_username;
    }

    public void setSeller_username(String seller_username) {
        this.seller_username = seller_username;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
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
}
