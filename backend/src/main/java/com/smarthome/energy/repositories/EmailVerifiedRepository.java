package com.smarthome.energy.repositories;

import com.smarthome.energy.entities.EmailVerified;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailVerifiedRepository extends JpaRepository<EmailVerified, Integer> {
    Optional<EmailVerified> findByEmail(String email);

    void deleteByEmail(String email);
}
