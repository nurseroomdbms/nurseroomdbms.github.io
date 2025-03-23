// js/auth.js
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  login(username, password);
});

function login(username, password) {
  loadJSON('data/users.json')
    .then(users => {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        // Save user session in localStorage
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
