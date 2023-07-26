/* eslint-disable no-prototype-builtins */

// eslint-disable-next-line no-unused-vars
function addEventListeners(media) {
  // Sélection des éléments DOM nécessaires
  const mediaCardDOMs = document.querySelectorAll("[data-lightbox]");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const closeButton = document.querySelector(".close-button");
  const prevButton = document.querySelector(".lightbox-prev-button");
  const nextButton = document.querySelector(".lightbox-next-button");
  const main = document.getElementById("main"); // Élément du main
  const body = document.getElementById("body");
  let currentIndex = 0;

  // Ajout des écouteurs d'événements aux cartes média
  mediaCardDOMs.forEach((mediaCardDOM, index) => {
    function openMediaLightbox(index) {
      currentIndex = index;
      displayMediaAtIndex(currentIndex);
      lightbox.style.display = "block";
      main.setAttribute("aria-hidden", "true");
      lightbox.setAttribute("aria-hidden", "false");
      body.classList.add("no-scroll");
      prevButton.focus();
    }

    mediaCardDOM.addEventListener("click", (e) => {
      e.preventDefault();
      openMediaLightbox(index);
    });

    mediaCardDOM.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        openMediaLightbox(index);
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
    main.setAttribute("aria-hidden", "false");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    lightbox.style.display = "none";
    lightboxImage.innerHTML = "";
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
    lightboxImage.innerHTML = "";
    const textLight = document.createElement("figcaption");
    textLight.textContent = mediaItem.title;

    if (mediaItem.hasOwnProperty("image")) {
      // Affichage d'une image
      const imageLight = document.createElement("img");
      imageLight.src = `assets/shoot/${mediaItem.shooterName}/${mediaItem.image}`;
      imageLight.alt = mediaItem.title;

      lightboxImage.appendChild(imageLight);
      lightboxImage.appendChild(textLight);
    } else if (mediaItem.hasOwnProperty("video")) {
      // Affichage d'une vidéo
      const videoLight = document.createElement("video");
      videoLight.src = `assets/shoot/${mediaItem.shooterName}/${mediaItem.video}`;
      videoLight.controls = true;
      lightboxImage.appendChild(videoLight);
      lightboxImage.appendChild(textLight);
    }
  }
}
