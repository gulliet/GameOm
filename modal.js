function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";

    console.log("function launchModal()");
    modalbg.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("Comportement par défaut enlevé");
    });
}

/* jmg */
const crossMarkElement = document.querySelector(".close");
crossMarkElement.addEventListener("click", () => {
    console.log("La croix a été clickée !");
    modalbg.style.display = "none";
});

function validate() {
    console.log("Fonction validate() appelée");

    const isFirstNameValid = checkFirstName();
    const isLastNameValid = checkLastName();

    // Ajoutez ici d'autres fonctions de validation si nécessaire

    // Empêche l'envoi du formulaire si des erreurs sont détectées
    return isFirstNameValid && isLastNameValid;
}

/**
 * Vérifie si le prénom est valide
 */
function checkFirstName() {
    console.log("*** Fonction checkFirstName() appelée ***");

    const firstNameElement = document.getElementById("first");
    const firstName = firstNameElement.value.trim(); // Supprime les espaces inutiles
    const formDataElement = firstNameElement.closest(".formData"); // Trouve le parent avec la classe .formData

    if (firstName.length < 2) {
        formDataElement.setAttribute(
            "data-error",
            "Le prénom doit contenir au moins 2 caractères."
        );
        formDataElement.setAttribute("data-error-visible", "true");
        return false;
    } else {
        formDataElement.removeAttribute("data-error");
        formDataElement.removeAttribute("data-error-visible");
        return true;
    }
}

/**
 * Vérifie si le nom est valide
 */
function checkLastName() {
    console.log("*** Fonction checkLastName() appelée ***");

    const lastNameElement = document.getElementById("last");
    const lastName = lastNameElement.value.trim();
    const formDataElement = lastNameElement.closest(".formData");

    if (lastName.length < 2) {
        formDataElement.setAttribute(
            "data-error",
            "Le nom doit contenir au moins 2 caractères."
        );
        formDataElement.setAttribute("data-error-visible", "true");
        return false;
    } else {
        formDataElement.removeAttribute("data-error");
        formDataElement.removeAttribute("data-error-visible");
        return true;
    }
}
