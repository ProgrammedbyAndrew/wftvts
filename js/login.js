document.getElementById("login-button").addEventListener("click", () => {
  const manager = document.getElementById("manager-select").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  // Password check (demo: "1234")
  if (!manager || password !== "1234") {
    errorMessage.style.display = "block";
    return;
  }

  // Save manager's name to sessionStorage
  sessionStorage.setItem("manager", manager);

  // Redirect to the violation form
  window.location.href = "form.html";
});