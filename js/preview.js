// Retrieve violation details from sessionStorage
const ticketDetails = JSON.parse(sessionStorage.getItem("ticketDetails"));

function loadDetails() {
  const detailsDiv = document.getElementById("details");
  const photosDiv = document.getElementById("photos-preview");

  if (!ticketDetails) {
    alert("No violation details found. Redirecting to form...");
    window.location.href = "form.html";
    return;
  }

  // Populate violation details
  detailsDiv.innerHTML = `
    <p><strong>Ticket ID:</strong> ${ticketDetails.id}</p>
    <p><strong>Date/Time:</strong> ${ticketDetails.date}</p>
    <p><strong>Business Name:</strong> ${ticketDetails.businessName}</p>
    <p><strong>Truck:</strong> ${ticketDetails.truck}</p>
    <p><strong>Issued By:</strong> ${ticketDetails.manager}</p>
    <p><strong>Violation Code:</strong> ${ticketDetails.violationCode}</p>
    <p><strong>Amount Due:</strong> $${ticketDetails.violationAmount.toFixed(2)}</p>
    <p><strong>Description:</strong> ${ticketDetails.description}</p>
  `;

  // Display photos
  ticketDetails.photos.forEach(photo => {
    const img = document.createElement("img");
    img.src = photo;
    photosDiv.appendChild(img);
  });
}

function printDetails() {
  const printWindow = window.open("", "_blank");
  const details = document.getElementById("details").innerHTML;
  const photos = document.getElementById("photos-preview").innerHTML;

  printWindow.document.write(`
    <html>
      <head>
        <title>Violation Ticket</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          h1 {
            text-align: center;
          }
          .photos {
            margin-top: 20px; 
            display: flex; 
            flex-wrap: wrap; 
            gap: 10px;
          }
          .photos img {
            width: 80px; 
            height: 80px; 
            object-fit: cover; 
            border: 1px solid #ddd; 
            border-radius: 5px;
          }
          p {
            font-size:14px;
            margin: 5px 0;
          }
          p strong {
            color: #555;
          }
        </style>
      </head>
      <body>
        <h1>Violation Ticket</h1>
        <div>${details}</div>
        <div class="photos">${photos}</div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

document.addEventListener("DOMContentLoaded", loadDetails);
document.getElementById("print-button").addEventListener("click", printDetails);
document.getElementById("email-button").addEventListener("click", () => {
  alert("Email feature not implemented yet.");
});
document.getElementById("text-button").addEventListener("click", () => {
  alert("Text feature not implemented yet.");
});