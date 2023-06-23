function addEventListeners(media) {
  const mediaCardDOMs = document.querySelectorAll("[data-lightbox]");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const closeButton = document.querySelector(".close-button");
  const prevButton = document.querySelector(".lightbox-prev-button");
  const nextButton = document.querySelector(".lightbox-next-button");
  let currentIndex = 0;

  mediaCardDOMs.forEach((mediaCardDOM, index) => {
    mediaCardDOM.addEventListener("click", () => {
      currentIndex = index;
      displayMediaAtIndex(currentIndex);
      lightbox.style.display = "block";
    });
  });

  function nextLightbox() {
    currentIndex = (currentIndex + 1) % media.length;
    displayMediaAtIndex(currentIndex);
  }

  function prevLightbox() {
    currentIndex = (currentIndex - 1 + media.length) % media.length;
    displayMediaAtIndex(currentIndex);
  }

  function close() {
    lightbox.style.display = "none";
    lightboxImage.innerHTML = '';
  }

  nextButton.addEventListener("click", nextLightbox);
  prevButton.addEventListener("click", prevLightbox);
  closeButton.addEventListener("click", close);

  document.addEventListener("keydown", lightboxNavClavier);

  function lightboxNavClavier(e) {
    if (lightbox.style.display === "block") {
      if (e.code === "ArrowRight") {
        nextLightbox();
      } else if (e.code === "ArrowLeft") {
        prevLightbox();
      } else if (e.code === "Escape") {
        close();
      }
    }
  }

  function displayMediaAtIndex(index) {
    const mediaItem = media[index];
    lightboxImage.innerHTML = '';
  
    if (mediaItem.hasOwnProperty('image')) {
      const imageLight = document.createElement('img');
      imageLight.src = `assets/shooter/${mediaItem.image}`;
       imageLight.alt= mediaItem.title;
      lightboxImage.appendChild(imageLight);
     
    } else {
      const videoLight = document.createElement('video');
      videoLight.src = `assets/shooter/${mediaItem.video}`;
      videoLight.controls = true;
      lightboxImage.appendChild(videoLight);
    }
  }
}
