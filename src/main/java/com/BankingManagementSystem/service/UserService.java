package com.BankingManagementSystem.service;

import com.BankingManagementSystem.Dto.UserDTO;
import com.BankingManagementSystem.Repository.UserRepository;
import com.BankingManagementSystem.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Method to save a user after encoding the password
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));  // Encode password before saving
        return userRepository.save(user);
    }

    // Method to register a new user using the UserDTO
    public void registerUser(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));  // Encode password
        user.setRole(userDTO.getRole());  // Set role (USER or ADMIN)

        userRepository.save(user);  // Save the user to the database
    }

    // Method to find a user by username
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
