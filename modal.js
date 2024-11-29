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

function closeModal() {
    console.log("La boîte de dialogue a été fermée !");

    const modalBackgroundElement = document.querySelector(".bground");
    const formElement = document.querySelector("form[name='reserve']");

    if (modalBackgroundElement) {
        // Réinitialiser le formulaire
        if (formElement) {
            formElement.reset(); // Réinitialise tous les champs du formulaire

            // Supprimer les messages d'erreur et les styles liés
            const formDataElements = formElement.querySelectorAll(".formData");
            formDataElements.forEach((formData) => {
                formData.removeAttribute("data-error");
                formData.removeAttribute("data-error-visible");

                const input = formData.querySelector("input, textarea, select");
                if (input) {
                    input.classList.remove("error-border");
                }
            });
        }

        // Masquer la boîte de dialogue
        modalBackgroundElement.style.display = "none";
    }
}

const closeButtonElement = document.querySelector(".close");
if (closeButtonElement) {
    closeButtonElement.addEventListener("click", closeModal);
}

function validate() {
    console.log("Fonction validate() appelée");

    const isFirstNameValid = checkFirstName();
    const isLastNameValid = checkLastName();
    const isEmailValid = checkEmail();
    const isBirthdateValid = checkBirthdate();
    const isQuantityValid = checkQuantity();
    const isRadioValid = checkRadioButtons();
    const isTermsValid = checkTermsAndConditions();

    // Empêche l'envoi du formulaire si un des champs est invalide
    return (
        isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isBirthdateValid &&
        isQuantityValid &&
        isRadioValid &&
        isTermsValid
    );
}

/**
 * Vérifie si une chaîne est un nom ou prénom valide.
 * @param {string} name - Le nom ou prénom à valider.
 * @returns {boolean} - True si le nom est valide, sinon False.
 */
function isValidName(name) {
    // Expression régulière pour valider un nom ou prénom :
    // - Commence et se termine par une lettre (a-z, A-Z, ou lettres accentuées comme é, è, ô, etc.).
    // - Permet les espaces, apostrophes ('), et tirets (-) à l'intérieur, mais pas en début ou en fin.
    // - N'autorise pas les caractères spéciaux autres que ceux cités, ni les chiffres.
    // - Les espaces, apostrophes, et tirets ne doivent pas apparaître consécutivement.
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([ '-][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/;

    // Vérifie la longueur et la correspondance avec l'expression régulière
    return name.length >= 2 && nameRegex.test(name);
}

/**
 * Vérifie si le prénom est valide
 */
function checkFirstName() {
    console.log("*** Fonction checkFirstName() appelée ***");

    const firstNameElement = document.getElementById("first");
    const firstName = firstNameElement.value.trim();
    const formDataElement = firstNameElement.closest(".formData");

    if (!isValidName(firstName)) {
        formDataElement.setAttribute(
            "data-error",
            "Le prénom doit contenir au moins 2 caractères, et ne peut contenir que des lettres, espaces ou tirets."
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

    if (!isValidName(lastName)) {
        formDataElement.setAttribute(
            "data-error",
            "Le nom doit contenir au moins 2 caractères, et ne peut contenir que des lettres, espaces ou tirets."
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

/**
 * Valide si un bouton radio a été sélectionné dans le groupe "location".
 * @returns {boolean} - True si un bouton radio est sélectionné, sinon False.
 */
function checkRadioButtons() {
    console.log("*** Fonction checkRadioButtons() appelée ***");

    // Sélectionne tous les boutons radio du groupe "location"
    const radioButtons = document.querySelectorAll('input[name="location"]');
    const formDataElement = radioButtons[0].closest(".formData");

    // Vérifie si au moins un bouton est coché
    const isAnyRadioSelected = Array.from(radioButtons).some(
        (radio) => radio.checked
    );

    if (!isAnyRadioSelected) {
        // Affiche un message d'erreur si aucun bouton n'est sélectionné
        formDataElement.setAttribute(
            "data-error",
            "Veuillez sélectionner un emplacement pour participer au tournoi."
        );
        formDataElement.setAttribute("data-error-visible", "true");
        return false;
    }

    // Supprime le message d'erreur si un bouton est sélectionné
    formDataElement.removeAttribute("data-error");
    formDataElement.removeAttribute("data-error-visible");
    return true;
}

/**
 * Valide si la case "conditions d'utilisation" est cochée.
 *
 * Bonne pratique : La case des conditions générales d'utilisation est laissée non cochée par défaut.
 * Cela garantit que l'utilisateur donne un consentement explicite, éclairé et volontaire,
 * conformément aux principes d'éthique, d'expérience utilisateur et aux réglementations légales (comme le RGPD).
 * Pré-remplir cette case pourrait être perçu comme une tentative d'imposer le consentement sans choix réel.
 *
 * @returns {boolean} - True si la case est cochée, sinon False.
 */
function checkTermsAndConditions() {
    console.log("*** Fonction checkTermsAndConditions() appelée ***");

    // Sélectionne la première case à cocher (conditions d'utilisation)
    const termsCheckbox = document.getElementById("checkbox1");
    const formDataElement = termsCheckbox.closest(".formData");

    if (!termsCheckbox.checked) {
        // Affiche un message d'erreur si la case n'est pas cochée
        formDataElement.setAttribute(
            "data-error",
            "Vous devez accepter les conditions d'utilisation pour continuer."
        );
        formDataElement.setAttribute("data-error-visible", "true");
        return false;
    }

    // Supprime le message d'erreur si la case est cochée
    formDataElement.removeAttribute("data-error");
    formDataElement.removeAttribute("data-error-visible");
    return true;
}
