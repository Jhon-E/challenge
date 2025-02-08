package challenge.models;

import jakarta.persistence.*;
import org.hibernate.annotations.Check;


@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String product_name;

    @Column(name = "price", columnDefinition = "DECIMAL(10,2)")
    private double price;

    private int stock;

    @OneToOne
    @JoinColumn(name = "seller", referencedColumnName = "id")
    private User seller;

    /**
     * DEBE SER 1 CARACTER
     */
    @Column(name = "estate")
    private char estate;

    public Product () {}

    public Product(char estate, double price, String product_name, User seller, int stock) {
        this.estate = estate;
        this.price = price;
        this.product_name = product_name;
        this.seller = seller;
        this.stock = stock;
    }

    public char getEstate() {
        return estate;
    }

    public void setEstate(char estate) {
        this.estate = estate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }
}
