package com.smarthome.energy.entities;

import com.smarthome.energy.converters.DevicePreferencesConverter;
import com.smarthome.energy.model.DevicePreferences;
import com.smarthome.energy.model.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name="users")
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true,nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Convert(converter = DevicePreferencesConverter.class)
    @Column(columnDefinition = "JSON")
    private DevicePreferences preferences;   //without converter hibernate will not understand the type

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Device> devices = new ArrayList<>();

}
