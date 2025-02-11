package challenge.services;

import challenge.DTOs.OrderDTO;
import challenge.DTOs.OrderItemDTO;
import challenge.models.Order;
import challenge.models.OrderItem;
import challenge.models.Product;
import challenge.models.User;
import challenge.repositories.OrderRepository;
import challenge.repositories.ProductRepository;
import challenge.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    /**
     *
     * @param id de la orden
     * @return OrderDTO
     *
     */
    public OrderDTO getOrder(int id) {
        try{
            Optional<Order> found_order_optional = orderRepository.findById(id);

            if(found_order_optional.isEmpty()) return null;

            Order found_order = found_order_optional.get();

            Optional<Order> order = orderRepository.findById(found_order.getId());
            List<OrderItemDTO> products = new ArrayList<>();

            if (order.isPresent()) {
                //Obtengo los items de producto de la orden cada item tiene una relacion con un producto
                List<OrderItem> orderItems = order.get().getOrderItems();

                for(OrderItem item : orderItems) {

                    //por cada item obtengo su producto y lo agrego a la lista de productos
                    Product pro = item.getProduct();
                    OrderItemDTO pro_res = new OrderItemDTO();
                    pro_res.setId_seller(pro.getSeller().getId());
                    pro_res.setId_pro(pro.getId());
                    pro_res.setEstate(pro.getEstate());
                    pro_res.setPrice(pro.getPrice());
                    pro_res.setStock(pro.getStock());
                    pro_res.setProduct_name(pro.getProduct_name());
                    pro_res.setSeller_username(pro.getSeller().getUserName());
                    pro_res.setCantidad(item.getCantidad());

                    products.add(pro_res);
                }

                return new OrderDTO(found_order.getSeller().getUserName(),found_order.getId(),found_order.getDate(),found_order.getSeller().getId(), found_order.getTotal(), products);
            }
            return null;
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener la orden: "+e);
        }
    }

    /**
     *
     * @param id usuario
     * @return List<OrderDTO>
     */
    public List<OrderDTO> getOrdersByUser(int id) {
        try{
            Optional<User> user = userRepository.findById(id);
            if(user.isEmpty()) return null;

            //obtengo las ordenes de un usuario
            List<Order> found_orders = user.get().getOrders();
            List<OrderDTO> orders = new ArrayList<>();

            for(Order order : found_orders){
                //por cada orden registrada voy a cinstanciar un orderDTO para retornar
                OrderDTO temp = new OrderDTO();
                temp.setDate(order.getDate());
                temp.setId(order.getId());
                temp.setId_user(order.getSeller().getId());
                temp.setTotal(order.getTotal());
                orders.add(temp);
            }

            return orders;
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener la orden: "+e);
        }
    }

    /**
     *
     * @return List<OrderDTO>
     */
    public List<OrderDTO> getOrders() {
        try{
            List<Order> found_orders = orderRepository.findAll();
            List<OrderDTO> orders = new ArrayList<>();
            List<OrderItemDTO> products = new ArrayList<>();

            for(Order order : found_orders){
                // instancio un orderDTO por cada order para retornar
                OrderDTO temp = new OrderDTO();
                temp.setDate(order.getDate());
                temp.setId(order.getId());
                temp.setUserName(order.getSeller().getUserName());
                temp.setId_user(order.getSeller().getId());
                temp.setTotal(order.getTotal());
                List<OrderItem> items = order.getOrderItems();

                for(OrderItem item : items){
                    //Cada order tiene orderItems con productos aca recorro cada orderItem de cada orden para obtener sus productos

                    OrderItemDTO pro_res = new OrderItemDTO();
                    Product pro_item = item.getProduct();

                    pro_res.setSeller_username(pro_item.getSeller().getUserName());
                    pro_res.setProduct_name(pro_item.getProduct_name());
                    pro_res.setStock(pro_item.getStock());
                    pro_res.setPrice(pro_item.getPrice());
                    pro_res.setEstate(pro_item.getEstate());
                    pro_res.setId_pro(pro_item.getId());
                    pro_res.setId_seller(pro_item.getSeller().getId());
                    pro_res.setCantidad((item.getCantidad()));

                    products.add(pro_res);
                }
                temp.setProducts(products);
                orders.add(temp);
            }

            return orders;

        } catch (Exception e) {
            throw new RuntimeException("Error al obtener la orden: "+e);
        }
    }

    /**
     *
     * @param request type Order
     * @return OrderDTO
     */
    public OrderDTO createOrder(Order request){
        try {
            Optional<User> found_user = userRepository.findById(request.getSeller().getId());

            if(found_user.isEmpty()) return null;

            User seller = found_user.get();

            request.setSeller(seller);

            List<OrderItem> orderItems = request.getOrderItems();

            List<OrderItemDTO> products = new ArrayList<>();

            /**
             * El request tiene una propiedad con un array de items, los itero para obtener los productos.
             */
            for(OrderItem item : orderItems){

                item.setOrder(request);

                Optional<Product> pro_optional = productRepository.findById(item.getProduct().getId());

                if(pro_optional.isEmpty()) return null;

                Product pro = pro_optional.get();

                //actualizo su stock
                int updated_stock = pro.getStock() - item.getCantidad();
                pro.setStock(updated_stock);

                item.setProduct(pro);
                item.setOrder(request);
            }

            orderRepository.save(request);

            return new OrderDTO(found_user.get().getUserName(),request.getId(),request.getDate(), found_user.get().getId(), request.getTotal(), products);
        } catch (Exception e) {

            throw new RuntimeException("Error al registrar Orden "+ e);
        }
    }

    /**
     *
     * @param id orden
     * @return boolean
     */
    public boolean deleteOrder(int id){
        try{
            Optional<Order> orderOptional = orderRepository.findById(id);
            if(orderOptional.isEmpty()) return false;
            Order order = orderOptional.get();
            orderRepository.delete(order);
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar orden: "+e);
        }
    }

}
