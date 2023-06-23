async function getPhotographerAndMediaById(photographerId) {
  const response = await fetch("data/photographers.json");
  const data = await response.json();

  const photographer = data.photographers.find(
    (photographer) => photographer.id == photographerId
  );
  console.log(photographer);

  const media = data.media.filter(
    (mediaItem) => mediaItem.photographerId == photographerId
  );
  console.log(media);

  return { photographer, media };
}

function displayPhotographerAndMedia(photographer, media) {
  // Affichage du profil du photographe
  const photographersSection = document.querySelector(".photograph-header");
  const photographerModel = photographerProfil(photographer);
  const userCardDOM = photographerModel.getUserPhoto();
  photographersSection.appendChild(userCardDOM);

  // Affichage du nom du photographe et du bouton de contact
  const btnElement = document.querySelector(".contact_button");
  const parent = btnElement.parentNode;
  const userNameDOM = photographerModel.getUserName();
  parent.insertBefore(userNameDOM, btnElement);

  const mediaSection = document.querySelector(".list-img");
  const select = document.querySelector("select");

  select.addEventListener("change", function () {
    console.log(select.options);
  });

  // Affichage des photos du photographe
  media.forEach((mediaItem) => {
    const mediaModel = mediaTemplate(mediaItem);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
}

async function init() {
  const url = new URL(window.location.href);
  const photographerId = url.searchParams.get("id");

  try {
    const { photographer, media } = await getPhotographerAndMediaById(
      photographerId
    );

    if (media.length > 0) {
      // Affichage du photographe et de ses photos
      displayPhotographerAndMedia(photographer, media);
      addEventListeners(media);
    } else {
      console.log("Aucune image trouvée pour l'ID du photographe spécifié");
    }
  } catch (error) {
    console.error(error);
  }
}

init();