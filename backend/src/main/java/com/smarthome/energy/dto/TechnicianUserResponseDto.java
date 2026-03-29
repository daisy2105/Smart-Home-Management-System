package com.smarthome.energy.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TechnicianUserResponseDto {
    private Long userId;
    private String name;
    private String email;
}
