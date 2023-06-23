
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
    const contenue = document.createElement("div");
    const nom = document.createElement("h2");
    const pays = document.createElement("p");
    const descript = document.createElement("p");

    nom.className = "nom-shooter";
    nom.textContent = name;
    pays.textContent = city + "," + country;
    descript.textContent = tagline;
    contenue.appendChild(nom);
    contenue.appendChild(pays);
    contenue.appendChild(descript);

    return contenue;
  };

  return { getUserName, getUserPhoto };
}

// Fonction pour créer le template des médias
function mediaTemplate(data) {
  // Destructuring des données
  const { image, title, likes, video, date } = data;

  const picture = `assets/shooter/${image}`;
  const clip = `assets/shooter/${video}`;

  // Fonction pour obtenir la carte média
  const getMediaCardDOM = () => {
    const article = document.createElement("article");
    const profil = document.createElement("div");
    profil.className = "detaille";
    const mediaContainer = document.createElement("div"); // Conteneur pour l'image ou la vidéo

    const titre = document.createElement("p");
    const jaime = document.createElement("p");
    const andro = document.createElement("p");

    article.appendChild(profil);

    titre.textContent = title;
    jaime.innerHTML = likes + ` <i class="fa-solid fa-heart"></i>`;
    /*  andro.textContent = date; */

    if (video) {
      const canvas = document.createElement("canvas"); // Création de l'élément canvas
      canvas.setAttribute("width", "640");
      canvas.setAttribute("height", "360");
      canvas.setAttribute("data-lightbox", "gallery");
      mediaContainer.appendChild(canvas);

      const videoElem = document.createElement("video"); // Création de la vidéo
      videoElem.style.display = "none"; // Masquer la vidéo
      const source = document.createElement("source");
      source.setAttribute("src", clip);
      source.setAttribute("type", "video/mp4");

      videoElem.appendChild(source);
      videoElem.setAttribute("controls", "");

      videoElem.addEventListener("loadeddata", () => {
        const context = canvas.getContext("2d");
        context.drawImage(videoElem, 0, 0, canvas.width, canvas.height); // Dessiner la première image de la vidéo sur le canvas
        videoElem.currentTime = 0; // Réinitialiser le temps de la vidéo
      });

      /*    canvas.addEventListener("click", () => {
        // Événement de clic sur le canvas pour démarrer la vidéo
        videoElem.style.display = "block"; // Afficher la vidéo
        canvas.style.display = "none"; // Masquer le canvas
        videoElem.play();
      }); */

      mediaContainer.appendChild(videoElem);
    } else {
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", title);
      img.setAttribute("data-lightbox", "gallery");
      img.className = "media-item";
      mediaContainer.appendChild(img);
    }

    profil.appendChild(titre);
    profil.appendChild(andro);
    profil.appendChild(jaime);
    article.appendChild(mediaContainer);

    return article;
  };

  return { getMediaCardDOM };
}

function banner() {
  const bannerHtml = document.querySelector("#banner");
  const like = document.createElement("h4");
  const coeurb = document.createElement("i");
  const prix = document.createElement("h4");

  like.id = "total_likes";
  coeurb.className = "fas fa-heart";
  prix.id = "prix";

  bannerHtml.appendChild(like);
  bannerHtml.appendChild(coeurb);
  bannerHtml.appendChild(prix);
  return bannerHtml;
}

banner();