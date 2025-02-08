package challenge.services;

import challenge.models.User;
import challenge.DTOs.UserDTO;
import challenge.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO createUser(User user){
        Optional<User> userOptional = userRepository.findByEmail(user.getEmail());
        UserDTO newUser = null;
        if(userOptional.isEmpty()){
            userRepository.save(user);
            newUser = new UserDTO(user.getEmail(), user.getUserName(), user.getRole(), user.getLastName());
            return newUser;
        } else {
            return newUser;
        }
    }

    public boolean deleteUser(int id){
        Optional<User> userOptional = userRepository.findById(id);
        boolean success = false;
        if(!userOptional.isEmpty()){
            User user = userOptional.get();
            userRepository.delete(user);
            success = true;
        }
        return success;
    }

    public UserDTO updateUser(User user){
        Optional<User> userOptional = userRepository.findById(user.getId());
        if(userOptional.isEmpty()){
            return null;
        } else {
            User existing_user = userOptional.get();
            existing_user.setUserName(user.getUserName());
            existing_user.setLastName(user.getLastName());
            existing_user.setRole(user.getRole());
            existing_user.setEmail(user.getEmail());
            if(user.getPassword() != null){
                existing_user.setPassword(user.getPassword());
            }
            User updated_user = userRepository.save(existing_user);

            return new UserDTO(updated_user.getEmail(), updated_user.getUserName(), updated_user.getRole(), updated_user.getLastName());
        }
    }

    public List<User> getUsers(){
        List<User> users = new ArrayList<>();
        users = userRepository.findAll();
        return users;
    }
}
