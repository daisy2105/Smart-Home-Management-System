package com.smarthome.energy.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OtpRequestDto {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid Email format")
    private String email;

}
