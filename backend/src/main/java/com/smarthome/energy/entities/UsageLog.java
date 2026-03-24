package com.smarthome.energy.entities;

import com.smarthome.energy.model.DeviceType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "usage_logs")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UsageLog {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "device_id")
    private Long deviceId;  //main field

    @Column(nullable = false)
    private Long userId; //snapshot of user

    @Column(nullable = false)
    private String deviceName;  //snapshot of device
    //so when the device gets deleted, we can know the ownership and device

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeviceType deviceType;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Column(nullable = false, precision = 10, scale = 5)
    private BigDecimal energyUsed;

    @Column(nullable = false)
    private BigDecimal cost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="device_id",nullable = false, insertable = false, updatable = false)
    private Device device; //read-only relation
}
