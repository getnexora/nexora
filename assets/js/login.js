// Login validation
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");
  
  // Hardcoded credentials (you can change these)
  if (username === "admin" && password === "mypassword123") {
    // Set session flag
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("loginTime", new Date().getTime());
    
    // Redirect to dashboard
    window.location.href = "dashboard.html";
  } else {
    // Show error message
    errorMsg.style.display = "block";
    
    // Hide error after 3 seconds
    setTimeout(() => {
      errorMsg.style.display = "none";
    }, 3000);
  }
});

// Clear form on page load
window.addEventListener("load", function() {
  document.getElementById("loginForm").reset();
});
