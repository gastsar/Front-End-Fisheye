function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const profil = document.createElement("a");
    profil.href = `photographer.html?id=${data.id}`;

    const img = document.createElement("img");
    img.src = picture;

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const pays = document.createElement("p");
    pays.className = "local";
    pays.textContent = `${city}, ${country}`;
    
    const descript = document.createElement("p");
    descript.textContent = tagline;
    const tarif = document.createElement("p");
    tarif.textContent = `${price}€/jour`;

    profil.append(img, h2);
    article.append(profil, pays, descript, tarif);

    return article;
  }
  return { getUserCardDOM };
}
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