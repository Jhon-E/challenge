package challenge.services;

import challenge.DTOs.LoginDTO;
import challenge.DTOs.UserDTO;
import challenge.models.User;
import challenge.repositories.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private AuthRepository authRepository;

    @Autowired
    public AuthService(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    public UserDTO login(LoginDTO request){
        UserDTO newUser;
        Optional<User> userOptional = authRepository.findByEmail(request.getEmail());

        if(userOptional.isEmpty()) return null;

        User user = userOptional.get();
        if(!user.getPassword().equals(request.getPassword())) return null;

        newUser = new UserDTO(user.getUserName(),user.getRole(),user.getLastName(),user.getEmail());
        return newUser;
    }

    public UserDTO signin(User request){
        UserDTO newUser = null;
        Optional<User> userOptional = authRepository.findByEmail(request.getEmail());
        if(userOptional.isEmpty()) {
            User save = authRepository.save(request);
            newUser = new UserDTO(save.getUserName(), save.getRole(), save.getLastName(), save.getEmail());
            return newUser;
        }
        return newUser;
    }
}
