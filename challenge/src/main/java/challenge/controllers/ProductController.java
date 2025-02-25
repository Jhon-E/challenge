package challenge.controllers;

import challenge.DTOs.ProductDTO;
import challenge.models.User;
import challenge.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/create")
    public ResponseEntity createProduct(@RequestBody ProductDTO product){
        String opt = productService.createProduct(product);
        if(opt.equals("userNotFound")){
            return ResponseEntity.status(400).body("Usuario no encontrado.");
        } else if(opt.equals("success")){
            return ResponseEntity.status(200).build();
        } else {
            return ResponseEntity.status(409).body("Error al guardar el producto.");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteProduct(@PathVariable int id){
            if(productService.deleteProduct(id)) {
                return ResponseEntity.status(200).build();
            } else {
                return ResponseEntity.status(300).body("No existe ese producto.");
            }
    }

    @GetMapping("/{id}")
    public ResponseEntity getProductById(@PathVariable int id){
        ProductDTO pro = productService.getProduct(id);
        if(pro == null) return ResponseEntity.status(300).body("Producto no encontrado.");
        return ResponseEntity.ok(pro);
    }

    @PutMapping("/update")
    public ResponseEntity updateUser(@RequestBody ProductDTO request) {
        if(productService.updateProduct(request) != null){
            return ResponseEntity.status(200).body("Datos del producto "+ request.getProduct_name() +" actualizados con exito.");
        } else {
            return ResponseEntity.status(409).body("Error al actualizar.");
        }
    }

    @GetMapping()
    public ResponseEntity getProducts(){
        List<ProductDTO> product_list = productService.getProducts();
        if(product_list.isEmpty()) return ResponseEntity.status(402).body("Aún no hay productos registrados.");
        return ResponseEntity.ok(product_list);
    }
}