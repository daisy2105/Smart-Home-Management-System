package com.smarthome.energy.services;

import com.smarthome.energy.entities.EmailOtp;
import com.smarthome.energy.entities.EmailVerified;
import com.smarthome.energy.repositories.EmailOtpRepository;
import com.smarthome.energy.repositories.EmailVerifiedRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class OtpService {
    private static final int otpExpiryMinutes = 5;
    @Autowired
    private final EmailOtpRepository otpRepo;

    @Autowired
    private final EmailService emailService;

    private final EmailVerifiedRepository emailVerifiedRepo;


    public String generateOtp(String email) {
        SecureRandom random = new SecureRandom();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    public void createAndSendOtp(String email) {
        String otp = generateOtp(email);
        EmailOtp emailOtp = new EmailOtp();
        emailOtp.setEmail(email);
        emailOtp.setOtp(otp);
        emailOtp.setExpiryTime(LocalDateTime.now().plusMinutes(otpExpiryMinutes));
        otpRepo.save(emailOtp);
        emailService.sendOtp(email,otp);

    }

    @Transactional
    public void verifyOtp(String email, String otpValue){
        EmailOtp emailOtp = otpRepo
                .findTopByEmailOrderByExpiryTimeDesc(email)
                .orElseThrow(() -> new RuntimeException("Otp not found"));



        if (!emailOtp.getOtp().equals(otpValue)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid OTP");
        }

        if (emailOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
            otpRepo.delete(emailOtp);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "OTP expired");
        }
        // here upon verifying otp we send http error response along with message
        //to display that msg to user
        //if no error means verified
        // deleting the expired or verified records
        // transactional so that any error,rollbacks it and don't delete the records without verification
        otpRepo.delete(emailOtp);


        //emailVerifiedRepo.deleteByEmail(email);  // delete old if exists
        //deleting and creating a similar record causes a race condition ,
        // change approach to update or insert strategy

        //find existing record
        EmailVerified emailVerified = emailVerifiedRepo.findByEmail(email)
                .orElseGet(() -> EmailVerified.builder().email(email).build());
        //update it and then save it.
        emailVerified.setVerifiedAt(LocalDateTime.now());
        emailVerified.setExpiryTime(LocalDateTime.now().plusMinutes(10));


        emailVerifiedRepo.save(emailVerified);
    }



}