package com.rohit.bot_booking_backend.service;

import com.rohit.bot_booking_backend.model.BookingSession;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final BookingSession session = new BookingSession();

    public String getReply(String message) {

        if (message.equalsIgnoreCase("book tickets")) {

            session.setStep("MOVIE");
            return "Which movie would you like to watch?";
        }

        switch (session.getStep()) {

            case "MOVIE":

                session.setMovie(message);
                session.setStep("TICKETS");

                return "How many tickets would you like?";

            case "TICKETS":

                session.setTickets(message);
                session.setStep("DATE");

                return "What date would you like?";

            case "DATE":

                session.setDate(message);
                session.setStep("TIME");

                return "What time would you like?";

            case "TIME":

                session.setTime(message);
                session.setStep("CONFIRM");

                return String.format(
                        """
                        Booking Summary

                        Movie: %s
                        Tickets: %s
                        Date: %s
                        Time: %s

                        Confirm? (Yes/No)
                        """,
                        session.getMovie(),
                        session.getTickets(),
                        session.getDate(),
                        session.getTime()
                );

            case "CONFIRM":

                if (message.equalsIgnoreCase("yes")) {

                    session.setStep("NONE");

                    return "Booking confirmed! 🎉";
                }

                session.setStep("NONE");

                return "Booking cancelled.";

            default:

                return """
                        Hello!

                        Type:
                        Book Tickets

                        to start a booking.
                        """;
        }
    }
}