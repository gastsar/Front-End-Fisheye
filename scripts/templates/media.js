// Fonction pour créer le profil du photographe
function photographerProfil(data) {
  // Destructuring des données
  const { name, portrait, city, country, tagline } = data;
  const picture = `assets/photographers/${portrait}`;

  // Fonction pour obtenir la photo de l'utilisateur
  const getUserPhoto = () => {
    const profilImg = document.createElement("div");
    profilImg.className = "photo-profil";
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    profilImg.appendChild(img);

    return profilImg;
  };

  // Fonction pour obtenir le nom et la description de l'utilisateur
  const getUserName = () => {
    const contenu = document.createElement("div");
    const nom = document.createElement("h1");
    const pays = document.createElement("p");
    pays.className ="local";
    const descript = document.createElement("p");

    nom.className = "nom-shooter";
    nom.textContent = name;
    pays.textContent = city + ", " + country;
    descript.textContent = tagline;
    contenu.appendChild(nom);
    contenu.appendChild(pays);
    contenu.appendChild(descript);

    return contenu;
  };

  return { getUserName, getUserPhoto };
}

// Fonction pour créer le template des médias
function mediaTemplate(mediaItem /* , photographers */) {
  const { image, title, likes, video, shooterName, date, id } = mediaItem;

  const picture = `assets/shoot/${shooterName}/${image}`;
  const clip = `assets/shoot/${shooterName}/${video}`;
  // Fonction pour obtenir la carte média
  const getMediaCardDOM = () => {
    const article = document.createElement("article");
    const profil = document.createElement("div");
    profil.className = "detaille";
    const mediaContainer = document.createElement("div"); // Conteneur pour l'image ou la vidéo

    const titre = document.createElement("h2");
    const likeCount = document.createElement("span");
    const likeElement = document.createElement("span");
    const likeIcone = document.createElement("i");
    likeIcone.className = "fas fa-heart";
    likeIcone.setAttribute("role", "button");
    likeIcone.setAttribute("aria-label", "likes");
    likeIcone.setAttribute("tabindex", "0");
    likeElement.className = "like_add";
    likeCount.append(likeElement,likeIcone);
    article.appendChild(profil);

    titre.textContent = title;
    likeElement.textContent = likes;

    if (video) {
      const videoElem = document.createElement("video");
      videoElem.setAttribute("src", clip);
      videoElem.setAttribute("type", "video/mp4");
      videoElem.setAttribute("alt", `${title}, closeup view`);
      videoElem.className = "media-item";
      videoElem.textContent ="Votre navigateur ne prend pas en charge la balise vidéo.";
      videoElem.setAttribute("tabindex", "0");
     /*  mediaContainer.setAttribute("href", clip); */
      mediaContainer.appendChild(videoElem);
    } else {
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", `${title}, closeup view`);
      img.setAttribute("tabindex", "0");
      img.className = "media-item";
    /*   mediaContainer.setAttribute("href", picture); */
      mediaContainer.appendChild(img);
    }
    mediaContainer.setAttribute("data-lightbox", "gallery");
    
    profil.appendChild(titre);
    profil.appendChild(likeCount);
    article.appendChild(mediaContainer);

    return article;
  };

  return { getMediaCardDOM };
}






