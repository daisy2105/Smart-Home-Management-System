package com.smarthome.energy.repositories;


import com.smarthome.energy.entities.User;
import com.smarthome.energy.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByRole(Role role);
}
