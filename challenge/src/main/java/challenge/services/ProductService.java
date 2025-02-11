package challenge.services;

import challenge.DTOs.ProductDTO;
import challenge.DTOs.UserDTO;
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
            int userId = pro.getId_seller();
            Optional<User> user = userRepository.findById(userId);

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
     * @return isSuccess => true || false
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

    /**
     *
     * @return List<ProductDTO>
     */
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
                temp.setId_seller(pro.getSeller().getId());
                products.add(temp);
            }
            return products;
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener productos ",e);
        }
    }

    /**
     *
     * @param pro ProductDTO
     * @return ProductDTO
     */
    public ProductDTO updateProduct(ProductDTO pro){
        Optional<Product> proOptional = productRepository.findById(pro.getId_pro());
        int idSeller = pro.getId_seller();
        Optional<User> userOptional = userRepository.findById(idSeller);
        Product updated_pro;
        if(proOptional.isEmpty()){
            return null;
        } else {

            if (userOptional.isEmpty()) return null;

            Product existing_pro = proOptional.get();
            existing_pro.setStock(pro.getStock());
            existing_pro.setProduct_name(pro.getProduct_name());
            existing_pro.setPrice(pro.getPrice());
            existing_pro.setEstate(pro.getEstate());
            existing_pro.setSeller(userOptional.get());

            updated_pro = productRepository.save(existing_pro);

            return new ProductDTO(userOptional.get().getId(), updated_pro.getEstate(), updated_pro.getId(), updated_pro.getPrice(), updated_pro.getProduct_name(), updated_pro.getSeller().getUserName(), updated_pro.getStock());
        }
    }
}
