document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    appendMessage(userInput, 'user-message');
    document.getElementById('user-input').value = '';

    fetchFakeNewsResponse(userInput);
}

function appendMessage(text, className) {
    const chatBox = document.getElementById('chat-box');
    const message = document.createElement('div');
    message.className = `message ${className}`;
    message.innerText = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function fetchFakeNewsResponse(message) {
    // Replace with the URL of your deployed machine learning model API
    const apiUrl = 'https://your-machine-learning-api-url.com/analyze';
    
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: message })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.is_fake ? 'This news seems to be fake.' : 'This news seems to be real.';
        appendMessage(botResponse, 'bot-message');
    })
    .catch(error => {
        console.error('Error:', error);
        appendMessage('Sorry, something went wrong. Please try again later.', 'bot-message');
    });
}
