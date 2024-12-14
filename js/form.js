// Ensure manager is logged in
const manager = sessionStorage.getItem("manager");
if (!manager) {
  alert("Please log in first.");
  window.location.href = "index.html";
}

// Display manager name
document.getElementById("manager-name").textContent = manager;

// Generate a random ticket ID
function generateTicketID() {
  return 'TCK-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
}

// Pre-populate the date/time field with current datetime (YYYY-MM-DDThh:mm)
function setCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth()+1).padStart(2,'0');
  const day = String(now.getDate()).padStart(2,'0');
  const hours = String(now.getHours()).padStart(2,'0');
  const minutes = String(now.getMinutes()).padStart(2,'0');
  const dateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
  document.getElementById("violation-date").value = dateTime;
}

// Set initial values
document.getElementById("ticket-id").value = generateTicketID();
setCurrentDateTime();

// Violation dropdown logic
const violationCodeSelect = document.getElementById("violation-code");
const violationAmountInput = document.getElementById("violation-amount");

violationCodeSelect.addEventListener("change", () => {
  const selectedOption = violationCodeSelect.options[violationCodeSelect.selectedIndex];
  const amount = selectedOption.getAttribute("data-amount");
  violationAmountInput.value = amount ? amount : "";
});

// Photo preview functionality
const photosInput = document.getElementById("photos");
const photosPreviewContainer = document.getElementById("form-photos-preview");

photosInput.addEventListener("change", (event) => {
  photosPreviewContainer.innerHTML = "";
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    photosPreviewContainer.appendChild(img);
  }
});

document.getElementById("submit-ticket").addEventListener("click", () => {
  const id = document.getElementById("ticket-id").value.trim();
  const date = document.getElementById("violation-date").value.trim();
  const businessName = document.getElementById("business-name").value.trim();
  const truck = document.getElementById("truck-number").value.trim();
  const violationCode = violationCodeSelect.value.trim();
  const violationAmount = parseFloat(violationAmountInput.value.trim());
  const description = document.getElementById("description").value.trim();

  if (!id || !date || !businessName || !truck || !violationCode || isNaN(violationAmount) || violationAmount <= 0 || !description) {
    alert("Please fill out all required fields correctly.");
    return;
  }

  const ticketDetails = {
    id,
    date,
    businessName,
    truck,
    manager,
    violationCode,
    violationAmount,
    description,
    photos: []
  };

  // Handle Photos
  const files = photosInput.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const url = URL.createObjectURL(file);
    ticketDetails.photos.push(url);
  }

  // Save ticket details to sessionStorage
  sessionStorage.setItem("ticketDetails", JSON.stringify(ticketDetails));

  // Redirect to preview page
  window.location.href = "preview.html";
});