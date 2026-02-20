package com.smarthome.energy.controllers;

import com.smarthome.energy.dto.AuthJwtResponseDto;
import com.smarthome.energy.dto.LoginRequestDto;
import com.smarthome.energy.dto.AuthResponseDto;
import com.smarthome.energy.dto.SignupRequestDto;
import com.smarthome.energy.services.JwtAuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    private final JwtAuthService jwtAuthService;

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
}
