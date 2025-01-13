// imports 

import{ getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// constants 
const database = getDatabase(app); 
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const messageArea = document.getElementById('messageArea');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

//functions
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const chatLink = document.getElementById('chatLink');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (chatLink && logoutBtn) {
        if (isLoggedIn) {
            chatLink.style.display = 'inline';
            logoutBtn.style.display = 'inline';
        } else {
            chatLink.style.display = 'none';
            logoutBtn.style.display = 'none';
        }
    }
}
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        window.location.href = 'home.html';
    });
}
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        checkLoginStatus();
    });
}

if (sendButton && messageInput && messageArea) {
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        const userEmail = localStorage.getItem('userEmail');
        const messageElement = document.createElement('p');
        messageElement.textContent = `${userEmail}: ${message}`;
        messageArea.appendChild(messageElement);
        messageInput.value = '';
        messageArea.scrollTop = messageArea.scrollHeight;
    }
}

// Run on every page load
checkLoginStatus();
