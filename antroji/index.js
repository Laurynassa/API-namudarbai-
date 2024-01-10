"use strict";
const API = "89d00b94";
const button = document.createElement("button");
button.innerText = "Get Country";
// button.type = "submit";
document.body.appendChild(button);

let input = document.createElement("input");
input.type = "text";
input.placeholder = "search for a country ";

document.body.appendChild(input);

const getCountry = async (event) => {
  event.preventDefault();

  const inputValue = input.value.trim().replace(/[^a-zA-Z0-9\s]/g, "");
  console.log(inputValue);

  const result = await fetch(
    `https://www.omdbapi.com/?apikey=${API}&s=${inputValue}`
  );
  console.log(result);

  const data = await result.json();
  console.log(data);

  if (result.redirected === "False") {
    // const infoElement = document.createElement("h2");
    // infoElement.textContent = "Filmas nerastas";
    // document.body.appendChild(infoElement);
    console.log("Atsiprasome, fimas nerastas!");
  } else {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach((card) => card.remove());
    data.Search.map((moovie) => {
      console.log(`country:`, moovie);
      const card = document.createElement("div");
      card.style.width = "400px";
      card.style.height = "auto";
      card.className = "card";
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.objectFit = "cover";

      const poster = document.createElement("img");
      poster.src = moovie.Poster;
      poster.alt = moovie.Title;
      poster.style.borderRadius = "20px";

      const title = document.createElement("h3");
      title.innerText = moovie.Title;

      const movieYear = document.createElement("h4");
      movieYear.innerText = moovie.Year;

      card.append(poster, title, movieYear);
      document.body.append(card);
    });
  }
};

button.addEventListener("click", getCountry);
