package com.smarthome.energy.controllers;

import com.smarthome.energy.dto.OtpRequestDto;
import com.smarthome.energy.dto.ResetPasswordRequestDto;
import com.smarthome.energy.services.ResetPasswordService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/")
@AllArgsConstructor
public class ForgotPasswordController {
    private final ResetPasswordService resetPasswordService;

    @PostMapping("/password-forgot")
    public ResponseEntity<String> forgotPassword ( @Valid @RequestBody OtpRequestDto requestForgotPasswordDto) {
        resetPasswordService.createAndSendResetPasswordLink(requestForgotPasswordDto.getEmail());
        return ResponseEntity.ok("If an account with this email exists, a password reset link has been sent.");

    }

    @PostMapping("/password-reset")
    public ResponseEntity<String> resetPassword ( @Valid @RequestBody ResetPasswordRequestDto
                                                              requestForgotPasswordDto) {
        String token = requestForgotPasswordDto.getToken();
        String newPassword = requestForgotPasswordDto.getNewPassword();

        resetPasswordService.resetPassword(token, newPassword);
        return ResponseEntity.ok("Password Reset Successful");
    }

}
