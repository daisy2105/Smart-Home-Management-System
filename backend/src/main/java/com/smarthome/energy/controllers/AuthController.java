package com.smarthome.energy.controllers;

import com.smarthome.energy.dto.*;
import com.smarthome.energy.repositories.JpaUserRepository;
import com.smarthome.energy.services.JwtAuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    private final JwtAuthService jwtAuthService;
    private final JpaUserRepository jpaUserRepository;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody LoginRequestDto loginRequestDto) {
        AuthJwtResponseDto authJwtResponseDto = jwtAuthService.login(loginRequestDto);
        ResponseCookie cookie = ResponseCookie.from("accessToken", authJwtResponseDto.getToken())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(3600)
                .build();
        AuthResponseDto authResponseDto = new AuthResponseDto(authJwtResponseDto.getName(), authJwtResponseDto.getRole());
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(authResponseDto);
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponseDto> signup(@Valid @RequestBody SignupRequestDto signupRequestDto) {
        AuthJwtResponseDto authJwtResponseDto = jwtAuthService.signup(signupRequestDto);
        ResponseCookie cookie = ResponseCookie.from("accessToken", authJwtResponseDto.getToken())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(3600)
                .build();
        AuthResponseDto authResponseDto = new AuthResponseDto(authJwtResponseDto.getName(), authJwtResponseDto.getRole());
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(authResponseDto);
    }
    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CurrentUserResponseDto> getCurrentUser() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        var user = jpaUserRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        return ResponseEntity.ok(
                CurrentUserResponseDto.builder()
                        .name(user.getName())
                        .role(user.getRole())
                        .email(email)
                        .build()
        );
    }
}
