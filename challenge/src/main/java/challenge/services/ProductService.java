package challenge.services;

import challenge.DTOs.ProductDTO;
import challenge.models.Product;
import challenge.models.User;
import challenge.repositories.ProductRepository;
import org.springframework.stereotype.Service;
import challenge.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductService(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    /**
     * @param pro
     * @return 'userNotFound' || 'success'
     */
    public String createProduct(ProductDTO pro){
        try{
            String username = pro.getSeller_username();
            Optional<User> user = userRepository.findByUserName(username);

            if(user.isEmpty()){
                return "userNotFound";
            }
            User found_user = user.get();
            Product new_pro = new Product();
            new_pro.setProduct_name(pro.getProduct_name());
            new_pro.setEstate(pro.getEstate());
            new_pro.setPrice(pro.getPrice());
            new_pro.setSeller(found_user);
            new_pro.setStock(pro.getStock());
            productRepository.save(new_pro);
            return "success";

        } catch (Exception e) {
            throw new RuntimeException("Error al crear producto ",e);
        }
    }

    /**
     * @param id
     * @return isSuccess
     */
    public boolean deleteProduct(int id){
        try{
            Optional<Product> temp = productRepository.findById(id);
            boolean isSuccess = false;
            if(temp.isEmpty()) return isSuccess;
            isSuccess = true;
            Product pro = temp.get();
            productRepository.delete(pro);
            return isSuccess;
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar producto",e);
        }
    }

    /**
     * @param id
     * @return null || ProductDTO
     */
    public ProductDTO getProduct (Integer id){
        try{
            Optional<Product> temp_pro = productRepository.findById(id);
            if(temp_pro.isEmpty()) return null;

            Product found_pro = temp_pro.get();

            ProductDTO product = new ProductDTO();
            product.setProduct_name(found_pro.getProduct_name());
            product.setEstate(found_pro.getEstate());
            product.setPrice(found_pro.getPrice());
            product.setStock(found_pro.getStock());
            product.setId_pro(found_pro.getId());
            product.setSeller_username(found_pro.getSeller().getUserName());

            return product;
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener producto ",e);
        }
    }

    public List<ProductDTO> getProducts () {
        List<ProductDTO> products = new ArrayList<>();
        try{
            List<Product> products_request = productRepository.findAll();

            for(Product pro : products_request){
                ProductDTO temp = new ProductDTO();
                temp.setSeller_username(pro.getSeller().getUserName());
                temp.setProduct_name(pro.getProduct_name());
                temp.setStock(pro.getStock());
                temp.setPrice(pro.getPrice());
                temp.setEstate(pro.getEstate());
                temp.setId_pro(pro.getId());
                products.add(temp);
            }
            return products;
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener productos ",e);
        }
    }
}
