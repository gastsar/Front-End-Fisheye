// Importation d'une fonction "initLightbox" à partir du module personnalisé "../utils/lightbox.js"
import { initLightbox } from '../utils/lightbox.js';

// Définition d'une classe appelée "PhotographerGallery"
class PhotographerGallery {
  // Fonction constructeur qui met en place l'état initial
  constructor() {
    this.photographer = null; // Les informations du photographe sélectionné
    this.media = []; // Un tableau contenant les éléments multimédias appartenant au photographe sélectionné
    this.menuSelect = document.getElementById("filtre"); // L'élément select pour filtrer les éléments multimédias
    this.likesCountElement = document.querySelector("#total_likes"); // Élément pour afficher le nombre total de "j'aime"
    this.mediaSection = document.querySelector(".list-img"); // Élément pour afficher les éléments multimédias
  }

  // Fonction asynchrone pour récupérer les données d'un photographe spécifique et de ses médias
  async getPhotographerAndMediaById(photographerId) {
    try {
      // Récupérer les données à partir de "data/photographers.json" en utilisant l'API Fetch
      const response = await fetch("data/photographers.json");

      // Vérifier si la réponse est réussie, sinon déclencher une erreur
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données des photographes.");
      }

      // Parser le corps de la réponse en tant que données JSON
      const data = await response.json();

      // Trouver l'objet du photographe avec l'ID de photographe donné
      this.photographer = data.photographers.find((photographer) => photographer.id == photographerId);

      // Filtrer les éléments multimédias qui appartiennent au photographe sélectionné et enrichir les données avec le nom du photographe
      this.media = data.media
        .filter((mediaItem) => mediaItem.photographerId == photographerId)
        .map((mediaItem) => {
          const photographer = data.photographers.find((p) => p.id == mediaItem.photographerId);
          const shooterName = photographer ? photographer.name : "";
          return {
            ...mediaItem,
            shooterName: shooterName,
          };
        });
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la récupération des données du photographe et des médias.");
    }
  }

  // Fonction pour filtrer et afficher les éléments multimédias en fonction de l'option de filtre sélectionnée
  filterAndDisplayMedia() {
    const selectedValue = this.menuSelect.value;

    // Switch basé sur l'option de filtre sélectionnée
    switch (selectedValue) {
      case "filter-date":
        this.media.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;

      case "filter-like":
        this.media.sort((a, b) => b.likes - a.likes);
        break;

      case "filter-titre":
        this.media.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    // Appeler la fonction pour afficher les éléments multimédias
    this.displayMedia();
  }

  // Fonction pour afficher les informations du photographe sur la page
  displayPhotographer() {
    // Trouver la section où les informations du photographe seront affichées
    const photographersSection = document.querySelector(".photograph-header");

    // Créer des éléments pour le profil du photographe (par exemple, photo et nom) en utilisant la fonction photographerProfil (non fournie dans ce code)
    const photographerModel = photographerProfil(this.photographer);
    const userCardDOM = photographerModel.getUserPhoto();
    const userNameDOM = photographerModel.getUserName();

    // Ajouter les éléments de photo et de nom à la section des photographes
    photographersSection.appendChild(userCardDOM);
    photographersSection.prepend(userNameDOM);

    // Mettre à jour les éléments du nom et du prix du photographe avec les données correspondantes
    const photographerNameElement = document.getElementById("photographer-name");
    photographerNameElement.textContent = this.photographer.name;
    const nameElementprice = document.getElementById("price");
    nameElementprice.textContent = this.photographer.price + "€ / jour";
  }

  // Fonction pour afficher les éléments multimédias sur la page
  displayMedia() {
    // Effacer la section multimédia actuelle avant d'afficher les éléments multimédias mis à jour
    while (this.mediaSection.firstChild) {
      this.mediaSection.removeChild(this.mediaSection.firstChild);
    }

    // Parcourir chaque élément multimédia et créer les éléments DOM correspondants en utilisant la fonction mediaTemplate (non fournie dans ce code)
    this.media.forEach((mediaItem, index) => {
      const mediaModel = mediaTemplate(mediaItem);
      const mediaCardDOM = mediaModel.getMediaCardDOM();
      this.mediaSection.appendChild(mediaCardDOM);

      // Ajouter des écouteurs d'événements pour le bouton "j'aime" de chaque élément multimédia pour mettre à jour le nombre de "j'aime"
      const likeButton = mediaCardDOM.querySelector(".fa-heart");
      const likesCountElement = mediaCardDOM.querySelector(".like_add");
      let likesCount = mediaItem.likes;

      likesCountElement.textContent = likesCount.toString();

      // Utiliser la fonction "updateLikes" pour mettre à jour le nombre de "j'aime" lorsque le bouton "j'aime" est cliqué ou lorsque la touche Entrée est pressée sur le bouton
      const updateLikesHandler = this.updateLikes.bind(this, index);
      likeButton.addEventListener("click", updateLikesHandler);
      likeButton.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
          updateLikesHandler();
        }
      });
    });

    // Initialiser la fonctionnalité lightbox pour les éléments multimédias
    initLightbox(
      document.querySelectorAll("[data-lightbox]"),
      document.querySelector(".lightbox"),
      document.querySelector(".lightbox-image"),
      document.querySelector(".close-button"),
      document.querySelector(".lightbox-prev-button"),
      document.querySelector(".lightbox-next-button"),
      this.media
    );

    // Mettre à jour le nombre total de "j'aime" sur la page
    this.updateTotalLikes();
  }

  // Fonction pour mettre à jour le nombre de "j'aime" pour un élément multimédia
  updateLikes(index) {
    // Incrémenter le nombre de "j'aime" pour l'élément multimédia à l'index spécifié
    let likesCount = this.media[index].likes;
    likesCount++;
    this.media[index].likes = likesCount;

    // Réafficher les éléments multimédias pour mettre à jour le nombre de "j'aime" sur la page
    this.displayMedia();

    // Après la mise à jour du DOM avec displayMedia(), mettre le focus sur le bouton "j'aime" pour maintenir l'accessibilité au clavier
    const likeButton = document.getElementById(`like-button-${index}`);
    if (likeButton) {
      likeButton.focus();
    }
  }

  // Fonction pour mettre à jour le nombre total de "j'aime" sur la page
  updateTotalLikes() {
    let sumLikes = this.media.reduce((totalLikes, mediaItem) => totalLikes + mediaItem.likes, 0);
    this.likesCountElement.textContent = sumLikes.toString();
  }

  // Fonction d'initialisation pour configurer la galerie lorsque la page se charge
  async init() {
    // Obtenir l'ID du photographe à partir du paramètre de requête d'URL
    const url = new URL(window.location.href);
    const photographerId = url.searchParams.get("id");

    try {
      // Récupérer les données pour le photographe sélectionné et ses éléments multimédias
      await this.getPhotographerAndMediaById(photographerId);

      // Si des éléments multimédias sont disponibles pour le photographe, afficher leurs informations et éléments multimédias
      if (this.media.length > 0) {
        this.displayPhotographer();

        // S'il y a un élément de sélection de filtre, ajouter un écouteur d'événement pour filtrer et afficher les éléments multimédias
        if (this.menuSelect) {
          this.menuSelect.addEventListener("change", this.filterAndDisplayMedia.bind(this));
        }

        // Utilisation d'une fonction fléchée pour lier correctement le contexte "this" à initLightbox
        const initLightboxWithContext = () => {
          initLightbox(
            document.querySelectorAll("[data-lightbox]"),
            document.querySelector(".lightbox"),
            document.querySelector(".lightbox-image"),
            document.querySelector(".close-button"),
            document.querySelector(".lightbox-prev-button"),
            document.querySelector(".lightbox-next-button"),
            this.media
          );
        };

        // Initialiser la lightbox pour les éléments multimédias
        initLightboxWithContext();

        // Afficher les éléments multimédias
        this.displayMedia();
      } else {
        console.log("Aucune image trouvée pour l'ID du photographe spécifié");
      }
    } catch (error) {
      console.error(error);
    }
  }
}

// Création d'une instance de la classe PhotographerGallery et appel de la fonction d'initialisation "init()"
const gallery = new PhotographerGallery();
gallery.init();