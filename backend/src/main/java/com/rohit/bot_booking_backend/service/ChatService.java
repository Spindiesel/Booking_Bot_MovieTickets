package com.rohit.bot_booking_backend.service;

import org.springframework.stereotype.Service;

@Service
public class ChatService {

    public String getReply(String message) {

        message = message.toLowerCase();

        if (message.contains("book")) {
            return "Sure! Which movie would you like to book?";
        }

        if (message.contains("cancel")) {
            return "Please provide your booking ID.";
        }

        if (message.contains("hello") || message.contains("hi")) {
            return "Hello! How can I help you today?";
        }

        return "Sorry, I didn't understand that.";
    }
}