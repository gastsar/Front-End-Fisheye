// Fonction asynchrone pour récupérer les données du photographe et des médias en utilisant l'ID du photographe
async function getPhotographerAndMediaById(photographerId) {
  try {
    const response = await fetch("data/photographers.json"); // Récupérer les données des photographes à partir du fichier JSON
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données des photographes.");
    }
    const data = await response.json(); // Convertir la réponse en format JSON

    const photographer = data.photographers.find((photographer) => photographer.id == photographerId); // Trouver le photographe correspondant à l'ID

    const media = data.media
      .filter((mediaItem) => mediaItem.photographerId == photographerId) // Filtrer les médias pour le photographe spécifique
      .map((mediaItem) => {
        const photographer = data.photographers.find((p) => p.id == mediaItem.photographerId);
        const shooterName = photographer ? photographer.name : "";

        return {
          ...mediaItem,
          shooterName: shooterName,
        };
      }); // Ajouter le nom du photographe à chaque média
    return { photographer, media }; // Retourner le photographe et les médias
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la récupération des données du photographe et des médias.");
  }
}

const menuSelect = document.getElementById("filtre"); // Élément de liste déroulante pour le filtre des médias

// Fonction pour filtrer et afficher les médias en fonction de la valeur sélectionnée dans la liste déroulante


function filterAndDisplayMedia(media) {
  const selectedValue = menuSelect.value; // Valeur sélectionnée dans la liste déroulante

  switch (selectedValue) {
    case "filter-date":
      media.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;

    case "filter-like":
      media.sort((a, b) => b.likes - a.likes);
      break;

    case "filter-titre":
      media.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  displayMedia(media); // Afficher les médias filtrés
}

function updateLikesCount(media) {
  const likes = document.querySelector("#total_likes");
  const price = document.querySelector("#price");

  let sommeLikes = 0;

  media.forEach((mediaItem, index) => {
    const likeButton = mediaItem.querySelector(".fa-heart");
    const likesCountElement = mediaItem.querySelector(".like_add");
    let likesCount = mediaItem.likes;

    likesCountElement.textContent = likesCount.toString();

    function updateLikes() {
      likesCount++;
      likesCountElement.textContent = likesCount.toString();
      media[index].likes = likesCount;
      sommeLikes += 1;
      likes.textContent = sommeLikes.toString();
    }

    likeButton.addEventListener("keydown", updateLikes);
    likeButton.addEventListener("click", updateLikes);
  });

  price.textContent = `${photographer.price}€/jour`;
}
// Fonction pour afficher le profil du photographe et ses médias
function displayPhotographerAndMedia(photographer, media) {
  const photographersSection = document.querySelector(".photograph-header");
  const photographerModel = photographerProfil(photographer);
  const userCardDOM = photographerModel.getUserPhoto();
  const userNameDOM = photographerModel.getUserName();
  photographersSection.appendChild(userCardDOM);
  photographersSection.prepend(userNameDOM);

  const photographerNameElement = document.getElementById("photographer-name");
  photographerNameElement.textContent = photographer.name;

  const mediaSection = document.querySelector(".list-img");

  media.forEach((mediaItem, index) => {
    const mediaModel = mediaTemplate(mediaItem);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);

    const likeButton = mediaCardDOM.querySelector(".fa-heart");
    const likesCountElement = mediaCardDOM.querySelector(".like_add");
    let likesCount = mediaItem.likes;

    likesCountElement.textContent = likesCount.toString();

    function updateLikes() {
      // Incrémenter le compteur de likes pour ce média
      likesCount++;

      // Mettre à jour le texte de l'élément HTML avec le nouveau nombre de likes
      likesCountElement.textContent = likesCount.toString();

      // Mettre à jour la valeur de j'aime dans le tableau des médias
      media[index].likes = likesCount;

      // Mettre à jour la somme des likes
      sommeLikes += 1;
      likes.textContent = sommeLikes.toString();
    }

    likeButton.addEventListener("click", updateLikes);
    likeButton.addEventListener("keydown", function(e) {
  
      if (e.code === "Enter") {
       
        updateLikes();
        
      }
    });
    
    
    const likes = document.querySelector("#total_likes");
  const price = document.querySelector("#price");

  let sommeLikes = 0;

  media.forEach((mediaLike) => {
    sommeLikes += mediaLike.likes;
  });

  likes.textContent = sommeLikes.toString();
  price.textContent = `${photographer.price}€/jour`;
  });

 

  // Mettre à jour les écouteurs d'événements
  addEventListeners(media);
}

// Fonction pour afficher les médias
function displayMedia(media) {
  const mediaSection = document.querySelector(".list-img");

  // Supprimer les médias existants
  while (mediaSection.firstChild) {
    mediaSection.removeChild(mediaSection.firstChild);
  }

  // Afficher les médias filtrés
  media.forEach((mediaItem, index) => {
    const mediaModel = mediaTemplate(mediaItem);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);

    const likeButton = mediaCardDOM.querySelector(".fa-heart");
    const likesCountElement = mediaCardDOM.querySelector(".like_add");
    let likesCount = mediaItem.likes;

    likesCountElement.textContent = likesCount.toString();

    function updateLikes() {
      // Incrémenter le compteur de likes pour ce média
      likesCount++;

      // Mettre à jour le texte de l'élément HTML avec le nouveau nombre de likes
      likesCountElement.textContent = likesCount.toString();

      // Mettre à jour la valeur de j'aime dans le tableau des médias
      media[index].likes = likesCount;

      // Mettre à jour la somme des likes
      sommeLikes += 1;
      likes.textContent = sommeLikes.toString();
    }

    likeButton.addEventListener("keydown", updateLikes);
    likeButton.addEventListener("click", updateLikes);
  });

  // Mettre à jour les écouteurs d'événements
  addEventListeners(media);
}

// Fonction d'initialisation
async function init() {
  const url = new URL(window.location.href);
  const photographerId = url.searchParams.get("id"); // Récupérer l'ID du photographe dans l'URL

  try {
    const { photographer, media } = await getPhotographerAndMediaById(photographerId);

    if (media.length > 0) {
      // Afficher le photographe et ses médias
      displayPhotographerAndMedia(photographer, media);

      if (menuSelect) {
        // Ajouter un écouteur d'événement pour la liste déroulante de filtrage
        menuSelect.addEventListener("change", function () {
          filterAndDisplayMedia(media);
        });
      }
    } else {
      console.log("Aucune image trouvée pour l'ID du photographe spécifié");
    }
  } catch (error) {
    console.error(error);
  }
}

init(); // Appeler la fonction d'initialisation pour démarrer l'application
