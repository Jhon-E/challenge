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

    /**
     *
     * @param request
     * @return UserDTO
     */
    public UserDTO login(LoginDTO request){
        try{
            UserDTO logUser = new UserDTO();
            Optional<User> userOptional = authRepository.findByEmail(request.getEmail());

            if(userOptional.isEmpty()) return null;

            User user = userOptional.get();
            if(!user.getPassword().equals(request.getPassword())) return null;

            logUser.setEmail(user.getEmail());
            logUser.setUserName(user.getUserName());
            logUser.setRole(user.getRole());
            logUser.setLastName(user.getLastName());
            logUser.setId(user.getId());
            return logUser;
        } catch (Exception e) {
            throw new RuntimeException("Error al loguearse "+e);
        }
    }

    /**
     *
     * @param request tipo User
     * @return UserDTO
     */
    public UserDTO signin(User request){
        try{
            UserDTO signUser = new UserDTO();
            Optional<User> userOptional = authRepository.findByEmail(request.getEmail());
            if(userOptional.isEmpty()) {

                User user = authRepository.save(request);
                signUser.setEmail(user.getEmail());
                signUser.setUserName(user.getUserName());
                signUser.setRole(user.getRole());
                signUser.setLastName(user.getLastName());
                signUser.setId(user.getId());

                return signUser;
            }
            return null;
        } catch (Exception e) {
            throw new RuntimeException("Error al registrarse: "+e);
        }
    }
}
