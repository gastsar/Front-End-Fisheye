function photographerTemplate(data) {
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
      // CREATION DU LIEN ENTRE INDEX.HTML ET PHOTOGRAPHER.HTML
    //AU CLICK
   /*   article.addEventListener("click", () => {
        window.location.href = `photographer.html?id=${id}`;
      });  */
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
