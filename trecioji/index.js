const url = "https://openaccess-api.clevelandart.org/api/artworks";
const API = "vO34kJhFalEgny4osdghw3MiHxV2S2n50TLjsuwJZTI";

const container = document.getElementById("container");
const button = document.createElement("button");
button.innerText = "Get Photos";

let input = document.createElement("input");
input.type = "text";
input.placeholder = "Search term";

container.append(button, input);

const getPhoto = async (event) => {
  event.preventDefault();
  const inputValue = input.value.trim();
  console.log(inputValue);

  const result = await fetch(
    `https://openaccess-api.clevelandart.org/api/artworks?q=${inputValue}&limit=20`
  );
  console.log(result);

  const data = await result.json();
  console.log(data);

  if (data.total === 0) {
    const infoElement = document.createElement("h2");
    infoElement.innerText = "Data not found";
    container.appendChild(infoElement);
  } else {
    const allImages = document.querySelectorAll(".foto");

    allImages.forEach((image) => image.remove());

    const shuffledArtworks = shuffleArray(data.data);

    shuffledArtworks.forEach((artwork) => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.borderRadius = "50px";
      card.style.display = "inline-block";
      card.style.textOverflow = "ellipsis";
      card.style.overflow = "hidden";
      card.style.whiteSpace = "nowrap";
      //   card.style.flexDirection = "column";
      //   card.style.objectFit = "cover";
      container.appendChild(card);
      console.log(card);

      const cardImage = document.createElement("img");
      cardImage.className = "foto";
      cardImage.src = artwork.images.web.url;
      cardImage.alt = artwork.title;
      cardImage.style.height = "400px";
      cardImage.style.width = "400px";
      cardImage.style.borderRadius = "15px";

      const title = document.createElement("h3");
      title.innerText = artwork.title;
      title.style.textOverflow = "ellipsis";
      title.style.overflow = "hidden";
      title.style.whiteSpace = "nowrap";

      const creator = document.createElement("h4");
      creator.innerText = artwork.creditline;

      const createdYear = document.createElement("h4");
      createdYear.innerText = artwork.creation_date;

      card.append(cardImage, title, creator, createdYear);
    });
  }
};

button.addEventListener("click", getPhoto);

window.addEventListener("load", getPhoto);

function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
