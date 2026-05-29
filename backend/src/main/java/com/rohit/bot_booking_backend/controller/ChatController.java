package com.rohit.bot_booking_backend.controller;

import com.rohit.bot_booking_backend.model.ChatRequest;
import com.rohit.bot_booking_backend.service.ChatService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/chat")
    public String test() {
        return "Backend is running!";
    }

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody ChatRequest request) {

        String reply = chatService.getReply(request.getMessage());

        return Map.of("reply", reply);
    }
}