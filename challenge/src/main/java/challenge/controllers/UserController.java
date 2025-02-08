package challenge.controllers;

import challenge.services.UserService;
import challenge.DTOs.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import challenge.models.User;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity registerUser(@RequestBody User user){
        UserDTO created_user = userService.createUser(user);
        return ResponseEntity.ok(created_user);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteUser(@PathVariable int id){
        if(userService.deleteUser(id)){
            return ResponseEntity.status(200).body("Eliminado con exito");
        } else {
            return ResponseEntity.status(200).body("Error al eliminar usuario");
        }
    }

    @PutMapping("/update")
    public ResponseEntity updateUser(@RequestBody User user) {
        if(userService.updateUser(user) != null){
            return ResponseEntity.status(200).body("Datos de "+ user.getUserName()+" actualizados con exito.");
        } else {
            return ResponseEntity.status(200).body("Error al actualizar.");
        }
    }

    @GetMapping()
    public ResponseEntity getUsers(){
        return ResponseEntity.ok(userService.getUsers());
    }

}
