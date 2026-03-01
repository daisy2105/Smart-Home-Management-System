package com.smarthome.energy.dto;

import com.smarthome.energy.model.Role;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class CurrentUserResponseDto {
    private String name;
    private String email;
    private Role role;
}
