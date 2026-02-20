package com.smarthome.energy.services;

import com.smarthome.energy.dto.AuthJwtResponseDto;
import com.smarthome.energy.dto.LoginRequestDto;
import com.smarthome.energy.dto.AuthResponseDto;
import com.smarthome.energy.dto.SignupRequestDto;
import com.smarthome.energy.entities.EmailVerified;
import com.smarthome.energy.entities.User;
import com.smarthome.energy.model.Role;
import com.smarthome.energy.repositories.EmailVerifiedRepository;
import com.smarthome.energy.repositories.JpaUserRepository;
import com.smarthome.energy.security.AuthUtil;
import com.smarthome.energy.security.SecurityUser;
import lombok.AllArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class JwtAuthService {
    private final JpaUserRepository jpaUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private AuthUtil authUtil;
    private final EmailVerifiedRepository emailVerifiedRepo;
    public AuthJwtResponseDto login(LoginRequestDto loginRequestDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(),
                            loginRequestDto.getPassword()));

            SecurityUser securityUser =
                    (SecurityUser) authentication.getPrincipal();

            String token = authUtil.generateJwtToken(securityUser);
            return new AuthJwtResponseDto(
                    securityUser.getUser().getName(),
                    securityUser.getUser().getRole(),token);
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,"Invalid email or password"
            );
        }


    }

    public @Nullable AuthJwtResponseDto signup(SignupRequestDto signupRequestDto) {

        var existingUser = jpaUserRepository.findByEmail(signupRequestDto.getEmail());
        if (existingUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Email already in use");
        }


        String email = signupRequestDto.getEmail();
        EmailVerified emailVerified = emailVerifiedRepo
                .findByEmail(email).orElseThrow(
                        ()->new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email not verified"));

        if(emailVerified.getExpiryTime().isBefore(LocalDateTime.now())){
            emailVerifiedRepo.delete(emailVerified);  // delete before exiting.
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Verification Expired");
        }


        if(signupRequestDto.getRole()==Role.ADMIN) {
            if(jpaUserRepository.existsByRole(Role.ADMIN)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT,"Admin already exists");
            }
        }

        User user = User.builder()
                .name(signupRequestDto.getName())
                .email(signupRequestDto.getEmail())
                .password(passwordEncoder.encode(signupRequestDto.getPassword()))
                .role(signupRequestDto.getRole())
                .preferences(signupRequestDto.getPreferences())
                .build();

        jpaUserRepository.save(user);

        emailVerifiedRepo.delete(emailVerified);  // delete verified email after successfully registration


        SecurityUser su = new SecurityUser(user);

        String token = authUtil.generateJwtToken(su);
        return new AuthJwtResponseDto(
                user.getName(),
                user.getRole(),
                token
        );
    }
}
