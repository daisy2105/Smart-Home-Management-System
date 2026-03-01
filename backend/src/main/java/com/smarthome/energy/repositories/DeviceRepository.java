package com.smarthome.energy.repositories;


import com.smarthome.energy.entities.Device;
import com.smarthome.energy.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface  DeviceRepository extends JpaRepository<Device, Long> {

    @Query("select d from Device d where d.id= :id")
    Optional<Device> findDeviceById(Long id);

    @Query("select d from Device  d where d.user= :user")
    List<Device> findByUser(User user);
}
