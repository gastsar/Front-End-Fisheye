/* eslint-disable no-unused-vars */
// Récupération des éléments du DOM
const modal = document.getElementById("contact_modal"); // Élément de la fenêtre modale
const modalBtn = document.querySelector(".contact_button"); // Élément du bouton d'ouverture de la fenêtre modale
const champ = document.getElementById("surname"); // Champ pour lequel le focus est défini lorsque la modale est affichée
const headerContact = document.querySelector(".info");
const dialog = document.querySelector(".modal");
const close_modal = document.getElementById("close_modal_contact"); // Bouton de fermeture de la fenêtre modale
const main = document.getElementById("main"); // Élément du main
const body = document.getElementById("body");

// Fonction pour afficher la fenêtre modale
function displayModal() {
  modal.style.display = "block"; // Affiche la fenêtre modale
  main.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("no-scroll");
  headerContact.focus();
}

// Fonction pour fermer la fenêtre modale
function closeModal() {
  modal.style.display = "none"; // Masque la fenêtre modale
  main.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("no-scroll");
  modalBtn.focus();
}

// Fonction pour gérer la fermeture de la fenêtre modale avec la touche "Escape"
function modalClavier(e) {
  if (modal.style.display === "block" && e.key === "Escape") {
    closeModal(); // Appelle la fonction de fermeture de la fenêtre modale si la touche "Escape" est pressée et que la fenêtre modale est affichée
  }
}

// Fonction pour créer un élément contact dans le headerContact
function getElementContact(photographer) {
  headerContact.setAttribute("tabindex", "0");
  headerContact.setAttribute("aria-labelledby", "photographer-name");
  const contactName = document.createElement("h2"); // Crée un élément h2
  contactName.id = "photographer-name";
  contactName.textContent = `${photographer.name}`; // Définit le contenu de l'élément h2 avec le nom du contact (mediaItem.shooterName)
  headerContact.appendChild(contactName); // Ajoute l'élément h2 au headerContact
}

// Ajout des écouteurs d'événements pour gérer l'ouverture et la fermeture de la fenêtre modale
close_modal.addEventListener("click", closeModal); // Ferme la fenêtre modale lorsque le bouton "close_modal_contact" est cliqué
document.addEventListener("keydown", modalClavier); // Appelle la fonction modalClavier lorsqu'une touche est pressée (pour gérer la touche "Escape")

// Récupération du formulaire
const form = document.querySelector("form");

// Ajout d'un écouteur d'événement pour gérer la soumission du formulaire
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut

  // Récupération des valeurs des champs
  const surname = document.getElementById("surname").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Vérification des champs vides
  if (
    surname.trim() === "" ||
    name.trim() === "" ||
    email.trim() === "" ||
    message.trim() === ""
  ) {
    console.error("Veuillez remplir tous les champs.");
    return; // Arrête la soumission du formulaire si des champs sont vides
  }

  // Affichage des valeurs dans la console
  console.log("Prénom :", surname);
  console.log("Nom :", name);
  console.log("Email :", email);
  console.log("Message :", message);

  // Vous pouvez également envoyer les données à un serveur ici

  // Réinitialisation du formulaire
  form.reset();
});
