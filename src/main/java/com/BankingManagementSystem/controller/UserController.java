package com.BankingManagementSystem.controller;

import com.BankingManagementSystem.Dto.UserDTO;
import com.BankingManagementSystem.JWTSecurity.JwtUtil;
import com.BankingManagementSystem.models.User;
import com.BankingManagementSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;  // Autowire the PasswordEncoder


    // Endpoint to register a regular User
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
        userDTO.setRole("USER");  // Set the role as USER for regular users
        userService.registerUser(userDTO);
        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

    // Endpoint to register an Admin
    @PostMapping("/register/admin")
    public ResponseEntity<String> registerAdmin(@RequestBody UserDTO userDTO) {
        userDTO.setRole("ADMIN");  // Set the role as ADMIN for admin users
        userService.registerUser(userDTO);
        return new ResponseEntity<>("Admin registered successfully", HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO userDTO) {
        System.out.println("Login attempt for: " + userDTO.getUsername());
        // Fetch the user by username from the database
        Optional<User> optionalUser = userService.getUserByUsername(userDTO.getUsername());

        // Check if the user exists
        if (optionalUser.isEmpty()) {
            System.out.println("User not found: " + userDTO.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        // Get the user and validate the password
        User user = optionalUser.get();
        System.out.println("User found. Checking password...");

        if (!passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
            System.out.println("Password mismatch for user: " + userDTO.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        // Generate JWT token if authentication is successful
        String token = jwtUtil.generateToken(userDTO.getUsername());
        System.out.println("JWT token generated for user: " + userDTO.getUsername());

        // Create a UserDTO for the response
        UserDTO responseUserDTO = mapToUserDTO(user);

        // Add the token to the response as well
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("user", responseUserDTO);  // Include the UserDTO
        responseBody.put("token", token);  // Include the JWT token
        // Log successful login
        System.out.println("Login successful for user: " + userDTO.getUsername());
        // Return the response with user info and token
        return ResponseEntity.ok(responseBody);
    }

    @GetMapping("/profile/{username}")
    public UserDTO getUserProfile(@PathVariable String username) {
        User user = userService.getUserByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        return mapToUserDTO(user);
    }

    private UserDTO mapToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setPassword(user.getPassword());
        userDTO.setRole(user.getRole());
        return userDTO;
    }
}
