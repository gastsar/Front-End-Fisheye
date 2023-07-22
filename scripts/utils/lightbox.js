// Fonction pour initialiser la lightbox avec les médias et les éléments DOM
export function initLightbox(mediaCardDOMs, lightbox, lightboxImage, closeButton, prevButton, nextButton, media) {
  let currentIndex = 0;

  // Ajoute les écouteurs d'événements aux médias pour ouvrir la lightbox au clic ou en appuyant sur la touche "Enter"
  mediaCardDOMs.forEach((mediaCardDOM, index) => {
    mediaCardDOM.addEventListener("click", (e) => {
      e.preventDefault();
      openLightbox(index, media, lightboxImage, lightbox);
    });

    mediaCardDOM.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        e.preventDefault();
        openLightbox(index, media, lightboxImage, lightbox);
      }
    });
  });

  // Fonction pour afficher le média suivant dans la lightbox
  const nextLightbox = () => {
    currentIndex = (currentIndex + 1) % media.length;
    displayMediaAtIndex(currentIndex, media, lightboxImage);
    nextButton.classList.add('active');
    prevButton.classList.remove('active'); // Supprimer la classe "active" du bouton précédent
  
  };

  // Fonction pour afficher le média précédent dans la lightbox
  const prevLightbox = () => {
    currentIndex = (currentIndex - 1 + media.length) % media.length;
    displayMediaAtIndex(currentIndex, media, lightboxImage);
    prevButton.classList.add('active');
    nextButton.classList.remove('active'); // Supprimer la classe "active" du bouton suivant
  
  };

  // Fonction pour fermer la lightbox
  const closeLightbox = () => {
    lightbox.style.display = "none";
    lightboxImage.innerHTML = "";
  };

  // Ajoute les écouteurs d'événements pour les boutons de navigation et le bouton de fermeture de la lightbox
  nextButton.addEventListener("click", nextLightbox);
  prevButton.addEventListener("click", prevLightbox);
  closeButton.addEventListener("click", closeLightbox);

  // Ajoute un écouteur d'événement global pour gérer la navigation et la fermeture via les touches fléchées et la touche "Escape"
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "block") {
      if (e.code === "ArrowRight") {
        nextLightbox();
      } else if (e.code === "ArrowLeft") {
        prevLightbox();
      } else if (e.code === "Escape") {
        closeLightbox();
      }
    }
  });
}

// Fonction pour ouvrir la lightbox et afficher le média sélectionné
function openLightbox(index, media, lightboxImage, lightbox) {
  displayMediaAtIndex(index, media, lightboxImage);
  lightbox.style.display = "block";

  // Définir le focus sur la lightbox pour l'accessibilité
  setTimeout(() => {
    lightbox.focus();
  }, 100); // Attendre 100 ms avant de définir le focus
}

// Fonction pour afficher le média à un index donné dans la lightbox
function displayMediaAtIndex(index, media, lightboxImage) {
  const mediaItem = media[index];
  lightboxImage.innerHTML = "";
  const titreLight = document.createElement("figcaption");

  if (mediaItem.hasOwnProperty("image")) {
    const imageLight = document.createElement("img");
    imageLight.src = `assets/shoot/${mediaItem.shooterName}/${mediaItem.image}`;
    imageLight.alt = mediaItem.title;
    titreLight.textContent = mediaItem.title;
    lightboxImage.appendChild(imageLight);
  } else if (mediaItem.hasOwnProperty("video")) {
    const videoLight = document.createElement("video");
    videoLight.src = `assets/shoot/${mediaItem.shooterName}/${mediaItem.video}`;
    videoLight.controls = true;
    titreLight.textContent = mediaItem.title;
    lightboxImage.appendChild(videoLight);
  }

  lightboxImage.appendChild(titreLight);
}
