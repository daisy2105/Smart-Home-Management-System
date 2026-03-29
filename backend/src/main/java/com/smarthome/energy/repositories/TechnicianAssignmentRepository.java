package com.smarthome.energy.repositories;

import com.smarthome.energy.dto.AssignmentResponseDto;
import com.smarthome.energy.entities.TechnicianAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TechnicianAssignmentRepository extends JpaRepository<TechnicianAssignment,Long> {
    boolean existsByTechnicianIdAndUserId(Long technicianId, Long userId);
    List<TechnicianAssignment> findByTechnicianId(Long technicianId);

    void deleteByTechnicianIdAndUserId(Long technicianId, Long userId);

    boolean existsByUserId(Long userId);

    Optional<TechnicianAssignment> findByUserId(Long userId);
    Optional<TechnicianAssignment> findByTechnicianIdAndUserId(Long technicianId, Long userId);

    @Query("""
SELECT new com.smarthome.energy.dto.AssignmentResponseDto(
    tech.id,
    tech.name,
    u.id,
    u.name,
    t.assignedAt
    )
FROM TechnicianAssignment t
JOIN User tech ON tech.id = t.technicianId
JOIN User u ON u.id = t.userId
""")
    List<AssignmentResponseDto> findAllAssignments();
}
