package com.rohit.bot_booking_backend.repository;

import com.rohit.bot_booking_backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {

}