package com.smarthome.energy.services;

import com.smarthome.energy.exceptions.EmailSendingException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Service
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    // when spring reads the spring.mail properties , it automatically adds a bean of it.
    private final SpringTemplateEngine templateEngine;

    public void sendOtp(String to,  String otp)  {

        try {
            Context context = new Context();
            context.setVariable("otp", otp);

            String htmlContent = templateEngine.process("otp-email", context);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("Verify Your Email - Smart Home Energy Management System");
            helper.setText(htmlContent, true);

            mailSender.send(message);

        } catch (Exception ex) {
            throw new EmailSendingException(
                    "Failed to send OTP email to: " + to,
                    ex
            );
        }
    }

    public void sendResetPasswordLink(String toEmail, String resetPasswordLink) {
        try {
            Context context = new Context();
            context.setVariable("resetLink", resetPasswordLink);

            String htmlContent = templateEngine.process("reset-password-email", context);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("Reset Your Password - Smart Home Energy Management System");
            helper.setText(htmlContent, true);

            mailSender.send(message);

        } catch (Exception ex) {
            throw new EmailSendingException("Failed to send reset password email", ex);
        }

    }

}
