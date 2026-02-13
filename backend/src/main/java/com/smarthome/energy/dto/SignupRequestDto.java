package com.smarthome.energy.dto;

import com.smarthome.energy.model.DevicePreferences;
import com.smarthome.energy.model.Role;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignupRequestDto {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid Email format")
    private String email;


    @NotBlank(message="Password is required")
    @Size(min=8,message = "Password must be at least 8 characters")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&]).*$",
            message = "Password must contain uppercase, lowercase, number and special character"
    )
    private String password;

    @NotNull(message = "Role is required")
    private Role role;

    private DevicePreferences preferences;
}
