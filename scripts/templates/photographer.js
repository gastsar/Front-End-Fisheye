function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const profil = document.createElement("a");
    profil.href = "photographer.html?id=" + data.id; // Redirection vers la page spécifique avec l'ID
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    const pays = document.createElement("p");
    const descript = document.createElement("p");
    const tarif = document.createElement("p");
    article.appendChild(profil);
    pays.className = "local";
    h2.textContent = name;
    pays.textContent = city + "," + country;
    tarif.textContent = price + "€/jour";
    descript.textContent = tagline;

    profil.appendChild(img);
    profil.appendChild(h2);
    article.appendChild(pays);
    article.appendChild(descript);
    article.appendChild(tarif);

    return article;
  }
  return { getUserCardDOM };
}

function photographerProfil(data) {
  const { name, portrait, city, country, tagline, price, id } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserPhoto() {
    const profilImg = document.createElement("div");
    profilImg.className = "photo-profil";
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    profilImg.appendChild(img);

    return profilImg;
  }

  function getUserName() {
    const contenue = document.createElement("div");
    const nom = document.createElement("h2");
    const pays = document.createElement("p");
    const descript = document.createElement("p");

    pays.className = "local";
    nom.className ="nom-shooter"
    nom.textContent = name;
    pays.textContent = city + "," + country;
    descript.textContent = tagline;
    contenue.appendChild(nom);
    contenue.appendChild(pays);
    contenue.appendChild(descript);

    return contenue;
  }

  return { getUserName, getUserPhoto };
}

/* function mediaTemplate(data) {
    const { name, portrait, city, country, tagline, price,id } = data;
  
    const picture = `assets/photographers/${portrait}`;
  
    function getUserCardDOM() {
      const article = document.createElement("article");
      const profil = document.createElement("a");
      profil.href = "photographer.html?id=" + data.id; // Redirection vers la page spécifique avec l'ID
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      const h2 = document.createElement("h2");
      const pays = document.createElement("p");
      const descript = document.createElement("p");
      const tarif = document.createElement("p");
     
      article.appendChild(profil);
      pays.className = "local";
      h2.textContent = name;
      pays.textContent = city + "," + country;
      tarif.textContent = price + "€/jour";
      descript.textContent = tagline;
  
      profil.appendChild(img);
      profil.appendChild(h2);
      article.appendChild(pays);
      article.appendChild(descript);
      article.appendChild(tarif);
  
      return article;
    }
    return {  getUserCardDOM };
  } */
