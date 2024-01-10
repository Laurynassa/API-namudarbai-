"use strict";

const button = document.createElement("button");
button.innerText = "get photo";
document.body.appendChild(button);
button.style.backgroundColor = "lime";
button.style.width = "50px";
button.style.height = "50px";

const container = document.createElement("div");
document.body.appendChild(container);

let imgElement = document.createElement("img");
imgElement.style.width = "400px";
imgElement.style.height = "400px";
imgElement.style.display = "flex";
imgElement.style.flexDirection = "column";
imgElement.style.objectFit = "cover";
imgElement.style.borderRadius = "100px";
imgElement.style.borderColor = "green";
imgElement.style.borderWidth = "10px";

container.appendChild(imgElement);

const getPhoto = async () => {
  const result = await fetch("https://dog.ceo/api/breeds/image/random");
  console.log(result);

  const data = await result.json();
  console.log(data);

  imgElement.src = data.message;

  document.body.appendChild(imgElement);
};

button.addEventListener("click", getPhoto);
// getPhoto();
