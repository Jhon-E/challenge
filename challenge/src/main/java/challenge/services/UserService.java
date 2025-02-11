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

    /**
     *
     * @param user
     * @return userDTO
     */
    public UserDTO createUser(User user){
        try {
            Optional<User> userOptional = userRepository.findByEmail(user.getEmail());
            UserDTO newUser = null;
            if(userOptional.isEmpty()){
                userRepository.save(user);
                newUser = new UserDTO(user.getId(),user.getEmail(), user.getUserName(), user.getRole(), user.getLastName());
                return newUser;
            } else {
                return newUser;
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al registrar usuario: "+e);
        }
    }

    /**
     *
     * @param id de usuario
     * @return boolean
     */
    public boolean deleteUser(int id){
        try {
            Optional<User> userOptional = userRepository.findById(id);
            boolean success = false;
            if(!userOptional.isEmpty()){
                User user = userOptional.get();
                userRepository.delete(user);
                success = true;
            }
            return success;
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar usuario: "+e);
        }
    }

    public UserDTO updateUser(User user){
        try{
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

                return new UserDTO(updated_user.getId(), updated_user.getEmail(), updated_user.getUserName(), updated_user.getRole(), updated_user.getLastName());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al actualizar ususario: "+e);
        }
    }

    /**
     *
     * @return List<User>
     */
    public List<UserDTO> getUsers(){
            List<UserDTO> users = new ArrayList<>();
            List<User> f_users = userRepository.findAll();

            for(User u: f_users){
                UserDTO temp = new UserDTO();
                temp.setId(u.getId());
                temp.setUserName(u.getUserName());
                temp.setRole(u.getRole());
                temp.setEmail(u.getEmail());
                temp.setLastName(u.getLastName());
                users.add(temp);
            }
            return users;
    }
}
