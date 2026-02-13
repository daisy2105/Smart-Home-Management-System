package com.smarthome.energy.security;

import com.smarthome.energy.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor

public class SecurityUser implements UserDetails {
    private final User user;

    @Override
    public String getUsername() {
        return user.getEmail() ;
    }


    @Override
    public @Nullable String getPassword() {
        return user.getPassword();
    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_"+user.getRole().name()));
    }

}
