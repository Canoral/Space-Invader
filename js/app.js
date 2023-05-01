// * Définition d'un tableau de styles
let styles = ["empty", "plain", "light", "highlight"];

// * Initialisation du style sélectionné à "empty"
let selectedStyle = styles[0];

// * Récupération des éléments HTML nécessaires
const formArea = document.querySelector(".configuration"); // formulaire de configuration
const gridSizeInput = document.createElement("input"); // champ de saisie pour la taille de la grille
const pixelSizeInput = document.createElement("input"); // champ de saisie pour la taille des pixels
const formButton = document.createElement("button"); // bouton de validation
const colorButtons = document.querySelectorAll(".switchcolor button"); // tous les boutons de couleur

// * Configuration des éléments HTML
gridSizeInput.id = "gridsize";
gridSizeInput.placeholder = "Taille de la grille";
pixelSizeInput.id = "pixelsize";
pixelSizeInput.placeholder = "Taille des pixels";
formButton.classList.add("button");
formButton.textContent = "Validez";

// * Ajout des éléments HTML au formulaire
formArea.appendChild(gridSizeInput);
formArea.appendChild(pixelSizeInput);
formArea.appendChild(formButton);

// * Création d'une grille 8 lignes * 8 colonnes avec une taille de pixels de 50px pour chaque cellule
createGrid(8, 50);

// ! LES FONCTIONS

// * Fonction qui crée une grille de pixels
function createGrid(gridSize, pixelSize) {
  // * Vider le contenu de la page HTML après chaque création de grille
  // * Pour ne pas garder l'ancienne grille
  const grid = document.querySelector("#invader");
  grid.innerHTML = "";

  // * Création de la grille
  for (let i = 0; i < gridSize; i++) {
    // * Création d'une ligne de la grille
    const row = document.createElement("div"); // ligne de la grille
    row.classList.add("grid");
    grid.appendChild(row); // élément HTML où insérer la grille
    for (let j = 0; j < gridSize; j++) {
      // * Création d'une cellule de la grille
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.appendChild(cell);
      cell.style.width = `${pixelSize}px`;
      cell.style.height = `${pixelSize}px`;
    }
  }

  // * Ajout d'un événement "click" sur le bouton de validation
  formButton.addEventListener("click", (event) => {
    event.preventDefault(); // Empêche la page de se recharger
    const gridSize = document.querySelector("#gridsize").value; // Récupération de la valeur saisie pour la taille de la grille
    const pixelSize = document.querySelector("#pixelsize").value; // Récupération de la valeur saisie pour la taille des pixels
    createGrid(gridSize, pixelSize); // Appel de la fonction de création de la grille avec les valeurs saisies
  });

  // * Sélectionne toutes les cellules
  const cells = document.querySelectorAll(".cell");

  // * Ajoute un événement "click" à chaque cellule
  cells.forEach((cell) => {
    cell.addEventListener("click", function () {
      // * Applique la classe correspondant au style sélectionné

      // Applique la classe correspondant au style sélectionné
      cell.classList.toggle(selectedStyle);
    });
  });

  // Ajoute un événement "click" à chaque bouton de couleur
  colorButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Lorsque le bouton est cliqué, stocke sa classe dans la variable globale "selectedStyle"
      selectedStyle = button.classList[0];
      // Parcourt tous les boutons de couleur et retire la classe "focused"
      colorButtons.forEach((button) => {
        button.classList.remove("focused");
      });
      // Ajoute la classe "focused" au bouton qui a été cliqué
      button.classList.add("focused");
    });
  });

  // Ajoute un événement "click" à chaque cellule de la grille
  cells.forEach((cell) => {
    cell.addEventListener("click", function () {
      if (cell.classList.contains("empty")) {
        // Retire la classe "empty" si elle est déjà présente
        cell.classList.remove("empty");
      } else {
        // Applique la couleur sélectionnée à la cellule
        cell.className = "cell " + selectedStyle; // Utilise className pour remplacer toutes les classes de la cellule
        // Ajoute la classe "empty"
        cell.classList.add("empty");
      }
    });
  });
}
