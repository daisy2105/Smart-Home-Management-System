package com.smarthome.energy.entities;

import com.smarthome.energy.model.DeviceStatus;
import com.smarthome.energy.model.DeviceType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@SQLDelete(sql = "UPDATE devices SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?")
// this query will be executed instead of std delete query
// in for this entity; //it changed how delete works
@SQLRestriction("deleted_at IS NULL") //this applies to only select(read) queries as extra,
// scope of both queries is only upto where
// they are declared , where ever this entity is used;
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
                       // in Watts
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DeviceStatus status;

    private LocalDateTime deletedAt;


}
