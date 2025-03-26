// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZP5kAl9Ak6LbQOPpaCd9crD71mW802OE",
    authDomain: "message-koi.firebaseapp.com",
    databaseURL: "https://message-koi-default-rtdb.firebaseio.com",
    projectId: "message-koi",
    storageBucket: "message-koi.firebasestorage.app",
    messagingSenderId: "496307645004",
    appId: "1:496307645004:web:e9d11a4d5eef68088be2e9",
    measurementId: "G-W14DR5NQLB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to send a message
function sendMessage() {
    let username = document.getElementById("username").value.trim();
    let message = document.getElementById("message").value.trim();

    if (username === "" || message === "") {
        alert("Both name and message are required!");
        return;
    }

    db.collection("messages").add({
        username,
        message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    document.getElementById("message").value = "";
}

// Function to display messages in real-time
db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
    let messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = "";

    snapshot.forEach(doc => {
        let msg = doc.data();
        let isUser = msg.username === document.getElementById("username").value.trim(); // Check if current user

        let messageClass = isUser ? "user-message" : "other-message";
        messagesDiv.innerHTML += `<p class="message ${messageClass}"><strong>${msg.username}:</strong> ${msg.message}</p>`;
    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
