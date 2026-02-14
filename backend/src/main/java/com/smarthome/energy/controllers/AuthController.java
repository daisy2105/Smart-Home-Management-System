package com.smarthome.energy.controllers;

import com.smarthome.energy.dto.LoginRequestDto;
import com.smarthome.energy.dto.LoginResponseDto;
import com.smarthome.energy.dto.SignupRequestDto;
import com.smarthome.energy.services.JwtAuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
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
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto loginRequestDto) {
        return ResponseEntity.ok(jwtAuthService.login(loginRequestDto));
    }

    @PostMapping("/signup")
    public ResponseEntity<LoginResponseDto> signup(@Valid @RequestBody SignupRequestDto signupRequestDto) {
        return ResponseEntity.ok(jwtAuthService.signup(signupRequestDto));
    }
}
