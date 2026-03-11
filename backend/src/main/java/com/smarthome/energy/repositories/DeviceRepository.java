package com.smarthome.energy.repositories;


import com.smarthome.energy.entities.Device;
import com.smarthome.energy.entities.User;
import com.smarthome.energy.model.DeviceStatus;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.Year;
import java.util.List;
import java.util.Optional;

public interface  DeviceRepository extends JpaRepository<Device, Long> {

    @Query("select d from Device d where d.id= :id")
    Optional<Device> findDeviceById(Long id);

    @Query("select d from Device  d where d.user= :user")
    List<Device> findByUser(User user);

    List<Device> findByStatus(DeviceStatus deviceStatus);

    List<Device> findByIdAndStatus(Long userId, DeviceStatus deviceStatus);


// coalesce returns 0, (this tells ( ,0) )  instead of null if no ON devices are found
    @Query("""
select coalesce(sum(d.powerRating),0)
from Device d
where d.user.id = :userId
and d.status = 'ON'
""")
    BigDecimal getCurrentPowerConsumption(Long userId);


}


