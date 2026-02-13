package com.smarthome.energy.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ResetPasswordRequestDto {

    @NotBlank
    private String token;

    @NotBlank(message="Password is required")
    @Size(min=8,message = "Password must be at least 8 characters")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&]).*$",
            message = "Password must contain uppercase, lowercase, number and special character"
    )
    private String newPassword;

}
