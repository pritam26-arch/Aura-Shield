fetch('http://localhost:5000/api/ai/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Yeh wo dummy text hai jo hum AI ko bhej rahe hain
    body: JSON.stringify({ text: "Help me, I think someone is following me!" })
})
    .then(response => response.json())
    .then(data => console.log("🤖 AI Engine Result:", data))
    .catch(error => console.error("Error:", error));