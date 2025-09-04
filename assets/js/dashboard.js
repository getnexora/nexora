// Check if user is logged in
function checkAuth() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const loginTime = sessionStorage.getItem("loginTime");
  
  // If not logged in, redirect to login
  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.href = "login.html";
    return;
  }
  
  // Optional: Add session timeout (30 minutes)
  const currentTime = new Date().getTime();
  const timeDiff = currentTime - parseInt(loginTime);
  const thirtyMinutes = 30 * 60 * 1000;
  
  if (timeDiff > thirtyMinutes) {
    sessionStorage.clear();
    alert("Session expired. Please login again.");
    window.location.href = "login.html";
  }
}

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", function(e) {
  e.preventDefault();
  
  if (confirm("Are you sure you want to logout?")) {
    sessionStorage.clear();
    window.location.href = "index.html";
  }
});

// Check auth on page load
window.addEventListener("load", checkAuth);
