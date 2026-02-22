package com.smarthome.energy.entities;

import com.smarthome.energy.model.DeviceStatus;
import com.smarthome.energy.model.DeviceType;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="devices")
@Builder
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="user_id",nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DeviceType type;

    @Column(nullable = false)
    private BigDecimal powerRating;     //hibernate automatically maps to power_rating. so we must follow java naming Convention.
                       // in kW
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DeviceStatus status;


}
