package com.smarthome.energy.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "technician_assignments",
uniqueConstraints = @UniqueConstraint(columnNames = {"user_id"}))
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TechnicianAssignment { //DOMAIN-LEVEL AUTHORIZATION IS IMPLEMENTED
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long technicianId;
    private Long userId;
    private LocalDateTime assignedAt;
}
