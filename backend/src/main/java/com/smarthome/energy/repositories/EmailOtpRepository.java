package com.smarthome.energy.repositories;

import com.smarthome.energy.entities.EmailOtp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailOtpRepository extends JpaRepository<EmailOtp, Long> {
    Optional<EmailOtp> findTopByEmailOrderByExpiryTimeDesc(String email);
}
