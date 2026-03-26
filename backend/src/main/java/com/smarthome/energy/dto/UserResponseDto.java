package com.smarthome.energy.dto;

import com.smarthome.energy.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserResponseDto {
    Long id;
    String name;
    String email;
    Role role;
}
