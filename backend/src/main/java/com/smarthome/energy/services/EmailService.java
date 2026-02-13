package com.smarthome.energy.services;

import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    // when spring reads the spring.mail properties , it automatically adds a bean of it.

    public void sendOtp(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Email Verification OTP");
        message.setText("Your OTP for Smart Home Management System Registration : " + otp
    +"\n\n This OTP is valid for 5 minutes");
        mailSender.send(message);
    }

}
