function addEventListeners(media) {
  // Sélection des éléments DOM nécessaires
  const mediaCardDOMs = document.querySelectorAll("[data-lightbox]");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const closeButton = document.querySelector(".close-button");
  const prevButton = document.querySelector(".lightbox-prev-button");
  const nextButton = document.querySelector(".lightbox-next-button");
  let currentIndex = 0;

  // Ajout des écouteurs d'événements aux cartes média
  mediaCardDOMs.forEach((mediaCardDOM, index) => {
    mediaCardDOM.addEventListener("click", (e) => {
      e.preventDefault();
      // Mise à jour de l'index courant et affichage du média correspondant
      currentIndex = index;
      displayMediaAtIndex(currentIndex);
      lightbox.style.display = "block";
    });

    // Ajout de l'écouteur d'événement pour la touche "Entrée"
    mediaCardDOM.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        // Mise à jour de l'index courant et affichage du média correspondant
        currentIndex = index;
        displayMediaAtIndex(currentIndex);
        lightbox.style.display = "block";
      }
    });
  });

  // Fonction pour passer au média suivant dans la lightbox
  function nextLightbox() {
    currentIndex = (currentIndex + 1) % media.length;
    displayMediaAtIndex(currentIndex);
    nextButton.classList.add("next");
    prevButton.classList.remove("prev");
  }

  // Fonction pour passer au média précédent dans la lightbox
  function prevLightbox() {
    currentIndex = (currentIndex - 1 + media.length) % media.length;
    displayMediaAtIndex(currentIndex);
    prevButton.classList.add("prev");
    nextButton.classList.remove("next");
  }

  // Fonction pour fermer la lightbox
  function close() {
    lightbox.style.display = "none";
    lightboxImage.innerHTML = '';
  }

  // Ajout des écouteurs d'événements aux boutons de navigation et de fermeture
  nextButton.addEventListener("click", nextLightbox);
  prevButton.addEventListener("click", prevLightbox);
  closeButton.addEventListener("click", close);

  // Ajout de l'écouteur d'événement pour la navigation clavier
  document.addEventListener("keydown", lightboxNavClavier);

  // Fonction de navigation clavier pour la lightbox
  function lightboxNavClavier(e) {
    if (lightbox.style.display === "block") {
      if (e.code === "ArrowRight") {
        nextLightbox();
      } else if (e.code === "ArrowLeft") {
        prevLightbox();
      } else if (e.code === "Escape") {
        close();
      }
    }
  }

  // Fonction pour afficher le média à l'index spécifié dans la lightbox
  function displayMediaAtIndex(index) {
    const mediaItem = media[index];
    lightboxImage.innerHTML = '';

    if (mediaItem.hasOwnProperty('image')) {
      // Affichage d'une image
      const imageLight = document.createElement('img');
      imageLight.src = `assets/shoot/${mediaItem.shooterName}/${mediaItem.image}`;
      imageLight.alt = mediaItem.title;
      const textLight = document.createElement('figcaption');
      textLight.textContent = mediaItem.title;

      lightboxImage.appendChild(imageLight);
      lightboxImage.appendChild(textLight);
    } else if (mediaItem.hasOwnProperty('video')) {
      // Affichage d'une vidéo
      const videoLight = document.createElement('video');
      videoLight.src = `assets/shoot/${mediaItem.shooterName}/${mediaItem.video}`;
      videoLight.controls = true;
      lightboxImage.appendChild(videoLight);
    }
  }


}
