package com.smarthome.energy.repositories;

import com.smarthome.energy.entities.Device;
import com.smarthome.energy.entities.UsageLog;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface UsageLogRepository extends CrudRepository<UsageLog, Long> {

    
    List<UsageLog> findByDeviceAndTimestampBetween(
            Device device,
            LocalDateTime start,
            LocalDateTime end
    );
}
