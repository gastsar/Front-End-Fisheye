async function getPhotographerById(photographerId) {
  const response = await fetch("data/photographers.json");
  const data = await response.json();
  const photographer = data.photographers.find(
    (photographer) => photographer.id == photographerId
  );
  return photographer;
}

async function displayData(photographer) {
  const photographersSection = document.querySelector(".photograph-header");

  const photographerModel = photographerProfil(photographer);
  const userCardDOM = photographerModel.getUserPhoto();
  photographersSection.appendChild(userCardDOM);

  var btnElement = document.querySelector(".contact_button");

  // Sélectionnez le parent de l'élément avant
  var parent = btnElement.parentNode;

  // Insérez le nouvel élément avant l'élément cible
  
  const userNameDOM = photographerModel.getUserName();
  
  parent.insertBefore(userNameDOM, btnElement);
}

async function init() {
  const url = new URL(window.location.href);
  const photographerId = url.searchParams.get("id");

  try {
    const photographer = await getPhotographerById(photographerId);

    if (photographer) {
      displayData(photographer);
    } else {
      console.log("Aucun photographe trouvé avec l'ID spécifié");
    }
  } catch (error) {
    console.error(error);
  }
}

init();
