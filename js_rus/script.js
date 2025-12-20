// document.addEventListener("contextmenu", (event) => {
//   event.preventDefault(); // отключаем меню браузера
// });

// document.addEventListener("mousedown", (event) => {
//   console.log(event.button);
// })

const loadBtn = document.getElementById("loadBtn");
const spinner = document.getElementById("spinner");
const charactersContainer = document.getElementById("characters");

const API_URL = "https://thesimpsonsapi.com/api/characters";

function showSpinner() {
  spinner.style.display = "block";
}

function hideSpinner() {
  spinner.style.display = "none";
}

function renderCharacters(characters) {
  charactersContainer.innerHTML = "";

  characters.forEach(character => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <h3>${character.name}</h3>
      <p>${character.description || "No description"}</p>
    `;

    charactersContainer.appendChild(card);
  });
}

async function loadCharacters() {
  showSpinner();

  try {
    const response = await fetch(API_URL);
    console.log(response);
    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    const data = await response.json();
    console.log(data)
    renderCharacters(data.results);

  } catch (error) {
    console.error("Error:", error.message);
    alert("Failed to load characters");
  } finally {
    hideSpinner();
  }
}

loadBtn.addEventListener("click", loadCharacters);
