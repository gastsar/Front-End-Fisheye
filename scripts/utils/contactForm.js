const modal = document.getElementById("contact_modal");
const champ = document.getElementById("surname");
const headerContact = document.getElementById("header-contact");

function displayModal() {
  modal.style.display = "block";
  champ.focus();
}

function closeModal() {
  modal.style.display = "none";
}

function modalClavier(e) {
  if (modal.style.display === "block" && e.key === "Escape") {
    closeModal();
  }
}

function getElementContact(mediaItem) {
  const contactName = document.createElement('h2');
  contactName.textContent = mediaItem.shooterName;
  headerContact.appendChild(contactName);
}


// Ajout des écouteurs d'événements
document.addEventListener("keydown", modalClavier);

const form = document.querySelector("form");
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut
  
  // Récupération des valeurs des champs
  const surname = document.getElementById("surname").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  
  // Affichage des valeurs dans la console
  console.log("Prénom :", surname);
  console.log("Nom :", name);
  console.log("Email :", email);
  console.log("Message :", message);
  
  // Vous pouvez également envoyer les données à un serveur ici
  
  // Réinitialisation du formulaire
  form.reset();
});
