// js/auth.js

// Login functionality (only runs on index.html)
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    login(username, password);
  });
}

function login(username, password) {
  loadJSON('data/users.json')
    .then(users => {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        localStorage.setItem('user', JSON.stringify({ username: user.username, role: user.role }));
        window.location.href = 'main-menu.html';
      } else {
        document.getElementById('error').innerText = 'Invalid credentials. Please try again.';
      }
    })
    .catch(error => {
      document.getElementById('error').innerText = 'Error loading user data.';
      console.error(error);
    });
}

// Global logout functionality
if (document.getElementById('logout')) {
  document.getElementById('logout').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  });
}
