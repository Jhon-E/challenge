package challenge.controllers;

import challenge.DTOs.LoginDTO;
import challenge.DTOs.UserDTO;
import challenge.models.User;
import challenge.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity logUser(@RequestBody LoginDTO request){
        UserDTO user = authService.login(request);
        if(user != null){
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(301).body("Usuario inválido");
        }
    }

    @PostMapping("/signin")
    public ResponseEntity signUser(@RequestBody User user_request){
        UserDTO user = authService.signin(user_request);
        if(user != null){
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(301).body("Este usuario ya existe.");
        }
    }
}
