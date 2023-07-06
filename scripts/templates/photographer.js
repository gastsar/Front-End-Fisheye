function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price,id } = data;

  const picture = `assets/photographers/${portrait}`;
  const idLink = `photographer.html?id=${id}`;
  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
 
    img.setAttribute("alt","");
 
    const nameUser = document.createElement("h2");
    nameUser.textContent = name; 

    const userImg = document.createElement('a');
userImg.setAttribute("href",idLink )

    const pays = document.createElement("adresss");
    pays.className = "local";
    pays.textContent = `${city}, ${country}`;

    const descript = document.createElement("p");
    descript.textContent = tagline;
    const tarif = document.createElement("p");
    tarif.textContent = `${price}€/jour`;
    
    userImg.append(img,nameUser);
    article.append(userImg,pays,descript,tarif);
 
    return article;
  }
  return { getUserCardDOM };
}
