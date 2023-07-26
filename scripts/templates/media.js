/* eslint-disable no-unused-vars */
// Fonction pour créer le profil du photographe
function photographerProfil(data) {
  // déstructuration des données pour extraire les informations du photographe
  const { name, portrait, city, country, tagline } = data;

  // Construire le chemin d'accès vers la photo du photographe
  const picture = `assets/photographers/${portrait}`;

  // Fonction pour obtenir la photo du photographe sous forme d'élément DOM
  const getUserPhoto = () => {
    const profilImg = document.createElement("img");
    profilImg.className = "photo-profil";
    profilImg.setAttribute("src", picture);
    profilImg.setAttribute("alt", "photo" + " " + name);

    return profilImg;
  };

  // Fonction pour obtenir le nom et la description du photographe sous forme d'élément DOM
  const getUserName = () => {
    const contenu = document.createElement("div");
    const nom = document.createElement("h1");
    const pays = document.createElement("p");
    pays.className = "local";
    const descript = document.createElement("p");
    nom.className = "nom-photographe";
    nom.textContent = name;
    pays.textContent = city + ", " + country;
    descript.textContent = tagline;
    contenu.appendChild(nom);
    contenu.appendChild(pays);
    contenu.appendChild(descript);
    return contenu;
  };
  // Retourne un objet contenant les fonctions getUserPhoto et getUserName
  return { getUserPhoto, getUserName };
}
// Factory Method pour créer les objets médias en fonction du type (vidéo ou photo)
function createMedia(mediaItem) {
  const { video } = mediaItem;

  if (video) {
    // Si c'est une vidéo, retourner un objet vidéo
    return createVideo(mediaItem);
  } else {
    // Sinon, retourner un objet photo
    return createPhoto(mediaItem);
  }
}

// Fonction pour créer un objet vidéo
function createVideo(mediaItem) {
  const { title, likes, shooterName, video } = mediaItem;
  const clip = `assets/shoot/${shooterName}/${video}`;

  return {
    getTitle: () => title,
    getLikes: () => likes,
    getShooterName: () => shooterName,
    getVideoURL: () => clip,
    isVideo: true,
  };
}

// Fonction pour créer un objet photo
function createPhoto(mediaItem) {
  const { title, likes, shooterName, image } = mediaItem;
  const picture = `assets/shoot/${shooterName}/${image}`;

  return {
    getTitle: () => title,
    getLikes: () => likes,
    getShooterName: () => shooterName,
    getImageURL: () => picture,
    isVideo: false,
  };
}

// Fonction pour créer le template des médias
function mediaTemplate(mediaItem /* , photographers */) {
  // Utiliser la Factory Method pour créer un objet média spécifique
  const media = createMedia(mediaItem);

  // Utiliser les méthodes de l'objet média pour obtenir les URL et autres informations spécifiques
  const mediaTitle = media.getTitle();
  const mediaLikes = media.getLikes();

  const isVideo = media.isVideo;

  // Fonction pour obtenir la carte média sous forme d'élément DOM
  const getMediaCardDOM = () => {
    const article = document.createElement("article");
    const profil = document.createElement("div");
    profil.className = "detaille";
    const mediaContainer = document.createElement("div"); // Conteneur pour l'image ou la vidéo

    const titre = document.createElement("h2");
    const likeCount = document.createElement("p");
    const likeElement = document.createElement("span");
    const iconeContent = document.createElement("span");
    const likeIcone = document.createElement("i");
    likeIcone.className = "fas fa-heart";
    iconeContent.setAttribute("role", "button");
    iconeContent.setAttribute("aria-label", "likes");
    likeIcone.setAttribute("tabindex", "0");
    iconeContent.className = "btn likes";
    likeElement.className = "like_add";
    likeElement.setAttribute("title", "nombre de like");

    iconeContent.appendChild(likeIcone);
    likeCount.appendChild(likeElement);
    likeCount.appendChild(iconeContent);
    titre.textContent = mediaTitle;
    likeElement.textContent = mediaLikes;
    profil.appendChild(titre);
    profil.appendChild(likeCount);
    if (isVideo) {
      // Si le média est une vidéo
      const videoElem = document.createElement("video");
      videoElem.setAttribute("src", media.getVideoURL());
      videoElem.setAttribute("type", "video/mp4");
      videoElem.setAttribute("alt", `video ${mediaTitle}, closeup view`);
      videoElem.className = "media-item";
      videoElem.textContent =
        "Votre navigateur ne prend pas en charge la balise vidéo.";
      videoElem.setAttribute("tabindex", "0");
      mediaContainer.appendChild(videoElem);
    } else {
      // Si le média est une image
      const img = document.createElement("img");
      img.setAttribute("src", media.getImageURL());
      img.setAttribute("alt", `photo ${mediaTitle}, closeup view`);
      img.setAttribute("tabindex", "0");
      img.className = "media-item";
      mediaContainer.appendChild(img);
    }
    // Ajout de l'attribut data-lightbox pour la galerie

    mediaContainer.setAttribute("data-lightbox", "gallery");
    article.appendChild(mediaContainer);
    article.appendChild(profil);

    return article;
  };

  // Retourne un objet contenant la fonction getMediaCardDOM
  return { getMediaCardDOM };
}
