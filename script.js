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

// Reference to the Realtime Database
const db = firebase.database();

// Sign in the user anonymously
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("Signed in as:", user.uid);
    } else {
        firebase.auth().signInAnonymously().catch(error => {
            console.error("Authentication error:", error);
        });
    }
});

// Function to send a message
function sendMessage() {
    let username = document.getElementById("username").value.trim();
    let message = document.getElementById("message").value.trim();

    if (username === "" || message === "") {
        alert("Both name and message are required!");
        return;
    }

    // Save message to Realtime Database
    db.ref("messages").push({
        username: username,
        message: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });

    document.getElementById("message").value = "";
}

// Function to display messages in real-time
db.ref("messages").orderByChild("timestamp").on("child_added", snapshot => {
    let messagesDiv = document.getElementById("messages");
    let msg = snapshot.val();
    let isUser = msg.username === document.getElementById("username").value.trim(); // Check if current user

    let messageClass = isUser ? "user-message" : "other-message";
    messagesDiv.innerHTML += `<p class="message ${messageClass}"><strong>${msg.username}:</strong> ${msg.message}</p>`;

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
