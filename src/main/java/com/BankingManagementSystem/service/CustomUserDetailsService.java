package com.BankingManagementSystem.service;

import com.BankingManagementSystem.models.User;
import com.BankingManagementSystem.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Fetch the user from the database using Optional
        Optional<User> optionalUser = userRepository.findByUsername(username);

        // If user is not found, throw UsernameNotFoundException
        User user = optionalUser.orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Map the User object to Spring Security's UserDetails implementation
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                getAuthorities(user)
        );
    }

    // Convert roles/permissions to a collection of GrantedAuthority
    private Collection<? extends GrantedAuthority> getAuthorities(User user) {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
    }
}