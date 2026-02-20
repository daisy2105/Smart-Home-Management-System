package com.smarthome.energy.services;

import com.smarthome.energy.entities.User;
import com.smarthome.energy.repositories.JpaUserRepository;
import com.smarthome.energy.security.AuthUtil;
import com.smarthome.energy.security.SecurityUser;
import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@AllArgsConstructor
public class ResetPasswordService {
    private final AuthUtil authUtil;
    private final PasswordEncoder passwordEncoder;
    JpaUserRepository jpaUserRepository;
    EmailService emailService;

    private String generateResetPasswordLink(String email) {
        String token = authUtil.generateForgotPasswordToken(email);
        return "http://localhost:5173/reset-password?token=" + token;
    }

    public void createAndSendResetPasswordLink(String email) {
        emailService.sendResetPasswordLink(email, generateResetPasswordLink(email));
    }

    @Transactional
    public void resetPassword(String token , String newPassword) {
        Claims claims = authUtil.extractAllClaims(token);
        String type = claims.get("type", String.class);
        if(!"password-reset".equals(type)) {
            // if type null even the executes
            // type.equals("password-reset) if type null will raise NPE
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid Reset Password Token"
            );
        }
        String email = claims.getSubject();
        User user = jpaUserRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
    }
}
