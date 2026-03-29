package com.smarthome.energy.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AssignmentResponseDto {
    private Long technicianId;
    private String technicianName;

    private Long userId;
    private String userName;

    private LocalDateTime assignedAt;
}
