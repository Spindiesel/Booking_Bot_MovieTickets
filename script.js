const API_URL = "http://localhost:8081/api/chat";

async function sendMessage() {

    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const message = input.value.trim();

    if (message === "") return;

    chatBox.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;

    input.value = "";

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        await new Promise(resolve =>
            setTimeout(resolve, 700)
        );

        chatBox.innerHTML += `
            <div class="bot-message">
                ${data.reply.replace(/\n/g, "<br>")}
            </div>
        `;

        if (data.reply.includes("Booking confirmed")) {

            document
                .getElementById("new-booking-btn")
                .style.display = "inline-block";

            loadMovies();
        }

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {

        chatBox.innerHTML += `
            <div class="bot-message">
                Unable to connect to server.
            </div>
        `;

        console.error(error);
    }
}

async function loadMovies() {

    try {

        const response = await fetch(
            "http://localhost:8081/api/movies"
        );

        const movies = await response.json();

        const container =
            document.getElementById("movie-container");

        container.innerHTML = "";

        movies.forEach(movie => {

            container.innerHTML += `
                <div class="movie-card">

                    <h3>${movie.name}</h3>

                    <p>
                        🎟 Seats:
                        ${movie.availableSeats}
                    </p>

                    <p>
                        🕒 Show:
                        ${movie.showTime}
                    </p>

                    <button
                        onclick="bookMovie('${movie.name}')">
                        Book Now
                    </button>

                </div>
            `;
        });

    } catch (error) {

        console.error(
            "Failed to load movies",
            error
        );
    }
}

function bookMovie(movieName) {

    const input =
        document.getElementById("user-input");

    input.value = "Book Tickets";

    sendMessage();

    setTimeout(() => {

        input.value = movieName;

        sendMessage();

    }, 1000);
}

function startNewBooking() {

    const chatBox =
        document.getElementById("chat-box");

    chatBox.innerHTML += `
        <div class="bot-message">
            Starting a new booking...
        </div>
    `;

    document
        .getElementById("new-booking-btn")
        .style.display = "none";

    document
        .getElementById("user-input")
        .value = "Book Tickets";

    sendMessage();
}

document
    .getElementById("user-input")
    .addEventListener("keypress", function (event) {

        if (event.key === "Enter") {
            sendMessage();
        }
    });

loadMovies();