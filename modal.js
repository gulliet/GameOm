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
    const isEmailValid = checkEmail();
    const isBirthdateValid = checkBirthdate();
    const isQuantityValid = checkQuantity();

    // Empêche l'envoi du formulaire si un des champs est invalide
    return (
        isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isBirthdateValid &&
        isQuantityValid
    );
}

/**
 * Vérifie si le prénom est valide
 */
function checkFirstName() {
    console.log("*** Fonction checkFirstName() appelée ***");

    const firstNameElement = document.getElementById("first");
    const firstName = firstNameElement.value.trim();
    const formDataElement = firstNameElement.closest(".formData");

    // Expression régulière pour valider les prénoms
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([ '-][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/;

    if (!firstName || firstName.length < 2) {
        formDataElement.setAttribute(
            "data-error",
            "Le prénom doit contenir au moins 2 caractères."
        );
        formDataElement.setAttribute("data-error-visible", "true");
        return false;
    }

    if (!nameRegex.test(firstName)) {
        formDataElement.setAttribute(
            "data-error",
            "Le prénom ne doit contenir que des lettres, espaces ou tirets."
        );
        formDataElement.setAttribute("data-error-visible", "true");
        return false;
    }

    formDataElement.removeAttribute("data-error");
    formDataElement.removeAttribute("data-error-visible");
    return true;
}

/**
 * Vérifie si le nom est valide
 */
function checkLastName() {
    console.log("*** Fonction checkLastName() appelée ***");

    const lastNameElement = document.getElementById("last");
    const lastName = lastNameElement.value.trim();
    const formDataElement = lastNameElement.closest(".formData");

    // Même expression régulière que pour le prénom
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([ '-][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/;

    if (!lastName || lastName.length < 2) {
        formDataElement.setAttribute(
            "data-error",
            "Le nom doit contenir au moins 2 caractères."
        );
        formDataElement.setAttribute("data-error-visible", "true");
        return false;
    }

    if (!nameRegex.test(lastName)) {
        formDataElement.setAttribute(
            "data-error",
            "Le nom ne doit contenir que des lettres, espaces ou tirets."
        );
        formDataElement.setAttribute("data-error-visible", "true");
        return false;
    }

    formDataElement.removeAttribute("data-error");
    formDataElement.removeAttribute("data-error-visible");
    return true;
}

function checkEmail() {
    console.log("*** Fonction checkEmail() appelée ***");

    const emailElement = document.getElementById("email");
    const email = emailElement.value.trim();
    const formDataElement = emailElement.closest(".formData");

    // Validation de base pour l'email (regex simplifiée)
    // Cette expression régulière vérifie si une chaîne est une adresse email valide.
    // - Elle commence par un "nom local" (un ou plusieurs caractères sans espaces ni '@').
    // - Elle contient un '@' suivi d'un domaine (caractères sans espaces ni '@').
    // - Elle se termine par un point '.' suivi d'une extension (ex. ".com", ".fr").
    // - Elle n'autorise pas les espaces ou caractères non conventionnels dans ces parties.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        formDataElement.setAttribute(
            "data-error",
            "Veuillez saisir une adresse e-mail valide."
        );
        formDataElement.setAttribute("data-error-visible", "true");
        return false;
    } else {
        formDataElement.removeAttribute("data-error");
        formDataElement.removeAttribute("data-error-visible");
        return true;
    }
}

function checkBirthdate() {
    console.log("*** Fonction checkBirthdate() appelée ***");

    const birthdateElement = document.getElementById("birthdate");
    const birthdate = birthdateElement.value.trim();
    const formDataElement = birthdateElement.closest(".formData");

    if (!birthdate) {
        formDataElement.setAttribute(
            "data-error",
            "Veuillez saisir votre date de naissance."
        );
        formDataElement.setAttribute("data-error-visible", "true");
        return false;
    }

    const birthDateObj = new Date(birthdate);
    const today = new Date();

    // Vérifier si la date est invalide
    if (isNaN(birthDateObj.getTime())) {
        formDataElement.setAttribute(
            "data-error",
            "Veuillez saisir une date valide."
        );
        formDataElement.setAttribute("data-error-visible", "true");
        return false;
    }

    // Calculer l'âge
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    const dayDifference = today.getDate() - birthDateObj.getDate();

    // Ajustement de l'âge si l'anniversaire n'a pas encore été fêté cette année
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    // Vérifier si l'âge est dans une plage raisonnable
    if (age < 18) {
        formDataElement.setAttribute(
            "data-error",
            "Vous devez avoir au moins 18 ans."
        );
        formDataElement.setAttribute("data-error-visible", "true");
        return false;
    } else if (age > 100) {
        formDataElement.setAttribute(
            "data-error",
            "Veuillez saisir une date de naissance valide (moins de 100 ans)."
        );
        formDataElement.setAttribute("data-error-visible", "true");
        return false;
    }

    // Si tout est valide
    formDataElement.removeAttribute("data-error");
    formDataElement.removeAttribute("data-error-visible");
    return true;
}

function checkQuantity() {
    console.log("*** Fonction checkQuantity() appelée ***");

    const quantityElement = document.getElementById("quantity");
    const quantity = quantityElement.value.trim();
    const formDataElement = quantityElement.closest(".formData");

    // Vérifier si c'est un nombre entier valide
    const quantityNumber = parseFloat(quantity); // Conversion en nombre à virgule flottante

    if (
        isNaN(quantityNumber) || // Pas un nombre valide
        !Number.isInteger(quantityNumber) || // Pas un entier
        quantityNumber < 0 || // Trop petit
        quantityNumber > 99 // Trop grand
    ) {
        formDataElement.setAttribute(
            "data-error",
            "Veuillez saisir un nombre entier entre 0 et 99."
        );
        formDataElement.setAttribute("data-error-visible", "true");
        return false;
    } else {
        formDataElement.removeAttribute("data-error");
        formDataElement.removeAttribute("data-error-visible");
        return true;
    }
}
