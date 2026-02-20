package com.smarthome.energy.dto;

import com.smarthome.energy.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthJwtResponseDto {
    private String name;
    private Role role;
    private String token;
}
