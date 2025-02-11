package challenge.controllers;

import challenge.DTOs.OrderDTO;
import challenge.models.Order;
import challenge.services.OrderService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/create")
    public ResponseEntity createOrder(@RequestBody Order request){
        if(request == null) return ResponseEntity.status(409).body("Body inválido.");

        if(orderService.createOrder(request) == null) return ResponseEntity.status(409).body("Usuario no encontrado.");

        return ResponseEntity.ok("Orden registrada.");

    }

    @GetMapping("/{id}")
    public ResponseEntity getOrderById(@PathVariable int id){
        OrderDTO order = orderService.getOrder(id);
        if(order == null) return ResponseEntity.status(409).body("Esta orden no existe.");

        return ResponseEntity.ok(order);
    }

    @GetMapping("/get_by_user/{id}")
    public ResponseEntity getOrdersByUser(@PathVariable int id){
        List<OrderDTO> orders = orderService.getOrdersByUser(id);
        if(orders == null) return ResponseEntity.status(409).body("Este usuario no existe.");
        return ResponseEntity.ok(orders);
    }

    @GetMapping()
    public ResponseEntity getOrders(){
        return ResponseEntity.ok(orderService.getOrders());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteOrderById(@PathVariable int id){
        if(orderService.deleteOrder(id)) return ResponseEntity.ok("Orden eliminada.");
        return ResponseEntity.status(409).body("Esta orden no existe.");
    }
}
