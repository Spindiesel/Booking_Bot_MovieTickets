async function sendMessage() {

    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const message = input.value.trim();

    function newBooking() {

    const chatBox = document.getElementById("chat-box");

    chatBox.innerHTML = `
        <div class="bot-message">
            Hello! How can I help you today?
        </div>
    `;
}

    if (!message) {
        return;
    }

    chatBox.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;

    input.value = "";

    try {

        const response = await fetch(
            "http://localhost:8081/api/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message
                })
            }
        );

        const data = await response.json();

        chatBox.innerHTML += `
            <div class="bot-message">
                ${data.reply}
            </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {

        chatBox.innerHTML += `
            <div class="bot-message">
                Unable to connect to backend.
            </div>
        `;
    }
    document.getElementById("user-input")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {
            sendMessage();
        }

    });
}