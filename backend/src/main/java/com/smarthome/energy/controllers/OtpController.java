package com.smarthome.energy.controllers;

import com.smarthome.energy.dto.OtpRequestDto;
import com.smarthome.energy.dto.VerifyOtpRequestDto;
import com.smarthome.energy.services.EmailService;
import com.smarthome.energy.services.OtpService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/otp")
@AllArgsConstructor
public class OtpController {
    private final EmailService emailService;
    private final OtpService otpService;
    @PostMapping("/send")
    public ResponseEntity<String> sendOtp(
            @Valid @RequestBody OtpRequestDto otpRequestDto)
    {
        otpService.createAndSendOtp(otpRequestDto.getEmail());
        return ResponseEntity.ok("OTP sent successfully");
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(
            @Valid @RequestBody VerifyOtpRequestDto verifyOtpRequestDto)
    {
        otpService.verifyOtp(verifyOtpRequestDto.getEmail(),verifyOtpRequestDto.getOtp());
        return ResponseEntity.ok("OTP verified successfully");
    }

}
