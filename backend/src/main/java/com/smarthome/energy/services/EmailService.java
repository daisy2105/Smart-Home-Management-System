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

    public void sendResetPasswordLink(String toEmail, String resetPasswordLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Reset Your Password - Smart Home Energy Management");

        message.setText(
                "Hello,\n\n" +
                        "We received a request to reset your password for your Smart Home Energy Management account.\n\n" +
                        "To reset your password, please click the link below:\n\n" +
                        resetPasswordLink + "\n\n" +
                        "This link will expire in 10 minutes for security reasons.\n\n" +
                        "If you did not request a password reset, please ignore this email. " +
                        "Your account will remain secure.\n\n" +
                        "For security reasons, do not share this link with anyone.\n\n" +
                        "Regards,\n" +
                        "Smart Home Energy Management Team"
        );

        mailSender.send(message);
    }

}
