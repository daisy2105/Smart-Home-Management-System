package com.smarthome.energy.services;

import com.smarthome.energy.entities.User;
import com.smarthome.energy.repositories.JpaUserRepository;
import com.smarthome.energy.security.SecurityUser;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CustomUserDetailsService  implements UserDetailsService {
    private final JpaUserRepository jpaUserRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = jpaUserRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User Not Found"));
        return new SecurityUser(user);
    }
}
