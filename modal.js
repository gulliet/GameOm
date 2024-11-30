/**
 * Sélecteurs centralisés pour les éléments DOM utilisés dans le script.
 * - Facilite la gestion et la modification des identifiants ou classes des éléments.
 * - Réduit la répétition des sélecteurs dans le code, améliorant ainsi la lisibilité et la maintenabilité.
 * - Assure une référence unique pour chaque élément important.
 *
 * Exemple d'utilisation :
 * const modalBackgroundElement = document.querySelector(SELECTORS.modalBackground);
 */
const SELECTORS = {
    navigationMenu: "#myTopnav", // Menu de navigation principal
    modalBackground: ".bground", // Arrière-plan de la boîte de dialogue modale
    modalButton: ".modal-btn", // Boutons pour ouvrir la boîte de dialogue
    closeButton: ".close", // Bouton pour fermer la boîte de dialogue
    form: "form[name='reserve']", // Formulaire principal
    firstNameInput: "#first", // Champ de saisie du prénom
    lastNameInput: "#last", // Champ de saisie du nom
    emailInput: "#email", // Champ de saisie de l'email
    birthdateInput: "#birthdate", // Champ de saisie de la date de naissance
    quantityInput: "#quantity", // Champ de saisie de la quantité
    locationRadio: "input[name='location']", // Boutons radio pour la sélection d'emplacement
    termsCheckbox: "#checkbox1", // Case à cocher pour les conditions générales
    formData: ".formData", // Conteneur pour chaque champ du formulaire
};

/**
 * Attache les gestionnaires d'événements aux éléments interactifs de l'interface utilisateur.
 * - Ajoute un événement `submit` au formulaire pour afficher la boîte de confirmation et masquer le formulaire principal.
 * - Ajoute des événements `click` au bouton de fermeture et à la croix dans la boîte de confirmation.
 * - Vérifie la présence des éléments avant d'attacher les événements pour éviter des erreurs.
 *
 * Fonctionnalité :
 * - Permet de déclencher l'affichage ou la fermeture de la boîte de dialogue modale en fonction des interactions utilisateur.
 *
 * Documentation :
 * - Cette fonction est appelée lors du chargement complet du DOM via `DOMContentLoaded`.
 * - Elle centralise les gestionnaires pour une meilleure lisibilité et évite de dupliquer le code ailleurs.
 */
function attachEventListeners() {
    // Gestionnaire pour soumettre le formulaire
    const form = document.querySelector(SELECTORS.form);
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            // Valide tous les champs du formulaire
            const isFirstNameValid = checkFirstName();
            const isLastNameValid = checkLastName();
            const isEmailValid = checkEmail();
            const isBirthdateValid = checkBirthdate();
            const isQuantityValid = checkQuantity();
            const isRadioValid = checkRadioButtons();
            const isTermsValid = checkTermsAndConditions();

            // Affiche la confirmation uniquement si toutes les validations passent
            const isFormValid =
                isFirstNameValid &&
                isLastNameValid &&
                isEmailValid &&
                isBirthdateValid &&
                isQuantityValid &&
                isRadioValid &&
                isTermsValid;

            if (isFormValid) {
                // Réinitialise le formulaire après une inscription réussie
                form.reset();

                // Supprime les messages d'erreur visibles
                const formDataElements = form.querySelectorAll(
                    SELECTORS.formData
                );
                formDataElements.forEach((formData) => {
                    formData.removeAttribute("data-error");
                    formData.removeAttribute("data-error-visible");
                });

                // Ferme la boîte de dialogue d'inscription
                const modalBackground = document.querySelector(
                    SELECTORS.modalBackground
                );
                if (modalBackground) modalBackground.style.display = "none";

                // Affiche la boîte de confirmation
                showConfirmationModal();
            } else {
                console.log(
                    "Formulaire invalide. La confirmation ne s'affiche pas."
                );
            }
        });
    }

    // Ajout de l'événement pour afficher la modale d'inscription
    const modalButtons = document.querySelectorAll(SELECTORS.modalButton);
    if (modalButtons) {
        modalButtons.forEach((button) => {
            button.addEventListener("click", launchModal);
        });
    }

    // Événement pour fermer la boîte de dialogue d'inscription via la croix
    const closeButton = document.querySelector(SELECTORS.closeButton);
    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }

    // Événements pour la boîte de confirmation
    const confirmationClose = document.querySelector(".confirmation-close");
    const confirmationButton = document.querySelector(".confirmation-button");

    if (confirmationClose) {
        confirmationClose.addEventListener("click", closeConfirmationModal);
    }

    if (confirmationButton) {
        confirmationButton.addEventListener("click", closeConfirmationModal);
    }
}

// Appeler la fonction lors du chargement
document.addEventListener("DOMContentLoaded", attachEventListeners);

/**
 * Bascule l'état "responsive" du menu de navigation.
 * Ajoute ou supprime la classe "responsive" à l'élément de navigation principal.
 */
function toggleNavigationMenu() {
    const navigationElement = document.querySelector(SELECTORS.navigationMenu);

    if (!navigationElement) {
        console.error("Élément de navigation introuvable.");
        return;
    }

    if (navigationElement.className === "topnav") {
        navigationElement.className += " responsive";
    } else {
        navigationElement.className = "topnav";
    }
}

/**
 * Affiche la boîte de dialogue modale.
 * Change la propriété `display` de l'élément modal pour le rendre visible.
 * Empêche le comportement par défaut du formulaire s'il est soumis pendant l'affichage.
 */
function launchModal() {
    const modalBackgroundElement = document.querySelector(
        SELECTORS.modalBackground
    );

    if (!modalBackgroundElement) {
        console.error("Élément modale introuvable.");
        return;
    }

    modalBackgroundElement.style.display = "block";
    console.log("Modale affichée.");
}

/**
 * Ferme la boîte de dialogue modale et réinitialise son contenu.
 * - Réinitialise tous les champs du formulaire à leur état initial.
 * - Supprime les messages d'erreur et les styles d'erreur associés.
 * - Masque la boîte de dialogue.
 */
function closeModal() {
    const modalBackgroundElement = document.querySelector(
        SELECTORS.modalBackground
    );
    const formElement = document.querySelector(SELECTORS.form);

    if (!modalBackgroundElement || !formElement) {
        console.error("Modale ou formulaire introuvable.");
        return;
    }

    // Réinitialiser le formulaire
    formElement.reset();

    // Supprimer les messages d'erreur et styles associés
    const formDataElements = formElement.querySelectorAll(SELECTORS.formData);
    formDataElements.forEach((formData) => {
        formData.removeAttribute("data-error");
        formData.removeAttribute("data-error-visible");
    });

    modalBackgroundElement.style.display = "none";
    console.log("Modale fermée et réinitialisée.");
}

/**
 * Valide tous les champs du formulaire.
 * - Vérifie les prénoms, noms, emails, dates de naissance, quantités, boutons radio, et case à cocher des conditions.
 * - Empêche la soumission du formulaire si l'un des champs est invalide.
 * @returns {boolean} - True si tous les champs sont valides, sinon False.
 */
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
 * Valide le champ du prénom.
 * Vérifie que le prénom contient au moins 2 caractères et respecte les règles de format.
 * @returns {boolean} - True si le prénom est valide, sinon False.
 */
function checkFirstName() {
    try {
        const firstNameElement = document.querySelector(
            SELECTORS.firstNameInput
        );

        if (!firstNameElement) throw new Error("Champ prénom introuvable.");

        const firstName = firstNameElement.value.trim();
        const formDataElement = firstNameElement.closest(SELECTORS.formData);

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
    } catch (error) {
        console.error("Erreur dans checkFirstName:", error.message);
        return false;
    }
}

/**
 * Valide le champ du nom.
 * Vérifie que le nom contient au moins 2 caractères et respecte les règles de format.
 * @returns {boolean} - True si le nom est valide, sinon False.
 */
function checkLastName() {
    try {
        const lastNameElement = document.querySelector(SELECTORS.lastNameInput);

        if (!lastNameElement) throw new Error("Champ nom introuvable.");

        const lastName = lastNameElement.value.trim();
        const formDataElement = lastNameElement.closest(SELECTORS.formData);

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
    } catch (error) {
        console.error("Erreur dans checkLastName:", error.message);
        return false;
    }
}

/**
 * Valide le champ de l'email.
 * Vérifie que l'email respecte un format valide (local@domaine.extension).
 * @returns {boolean} - True si l'email est valide, sinon False.
 */
function checkEmail() {
    try {
        const emailElement = document.querySelector(SELECTORS.emailInput);

        if (!emailElement) throw new Error("Champ email introuvable.");

        const email = emailElement.value.trim();
        const formDataElement = emailElement.closest(SELECTORS.formData);

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
        }

        formDataElement.removeAttribute("data-error");
        formDataElement.removeAttribute("data-error-visible");
        return true;
    } catch (error) {
        console.error("Erreur dans checkEmail:", error.message);
        return false;
    }
}

/**
 * Valide le champ de la date de naissance.
 * Vérifie que la date est valide, que l'utilisateur a au moins 18 ans, et pas plus de 100 ans.
 * @returns {boolean} - True si la date de naissance est valide, sinon False.
 */
function checkBirthdate() {
    try {
        const birthdateElement = document.querySelector(
            SELECTORS.birthdateInput
        );

        if (!birthdateElement)
            throw new Error("Champ date de naissance introuvable.");

        const birthdate = birthdateElement.value.trim();
        const formDataElement = birthdateElement.closest(SELECTORS.formData);

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

        if (isNaN(birthDateObj.getTime())) {
            formDataElement.setAttribute(
                "data-error",
                "Veuillez saisir une date valide."
            );
            formDataElement.setAttribute("data-error-visible", "true");
            return false;
        }

        let age = today.getFullYear() - birthDateObj.getFullYear(); // Remplacement de const par let
        const monthDifference = today.getMonth() - birthDateObj.getMonth();
        const dayDifference = today.getDate() - birthDateObj.getDate();

        if (
            monthDifference < 0 ||
            (monthDifference === 0 && dayDifference < 0)
        ) {
            age--; // Correction : Modification de la variable autorisée
        }

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

        formDataElement.removeAttribute("data-error");
        formDataElement.removeAttribute("data-error-visible");
        return true;
    } catch (error) {
        console.error("Erreur dans checkBirthdate:", error.message);
        return false;
    }
}

/**
 * Valide le champ de la quantité.
 * Vérifie que la valeur est un nombre entier entre 0 et 99 inclus.
 * @returns {boolean} - True si la quantité est valide, sinon False.
 */
function checkQuantity() {
    try {
        const quantityElement = document.querySelector(SELECTORS.quantityInput);

        if (!quantityElement) throw new Error("Champ quantité introuvable.");

        const quantity = quantityElement.value.trim();
        const formDataElement = quantityElement.closest(SELECTORS.formData);

        const quantityNumber = parseFloat(quantity);

        if (
            isNaN(quantityNumber) ||
            !Number.isInteger(quantityNumber) ||
            quantityNumber < 0 ||
            quantityNumber > 99
        ) {
            formDataElement.setAttribute(
                "data-error",
                "Veuillez saisir un nombre entier entre 0 et 99."
            );
            formDataElement.setAttribute("data-error-visible", "true");
            return false;
        }

        formDataElement.removeAttribute("data-error");
        formDataElement.removeAttribute("data-error-visible");
        return true;
    } catch (error) {
        console.error("Erreur dans checkQuantity:", error.message);
        return false;
    }
}

/**
 * Valide si un bouton radio a été sélectionné dans le groupe "location".
 * Vérifie qu'au moins un bouton radio est coché.
 * @returns {boolean} - True si un bouton radio est sélectionné, sinon False.
 */
function checkRadioButtons() {
    try {
        console.log("*** Fonction checkRadioButtons() appelée ***");

        const radioButtons = document.querySelectorAll(SELECTORS.locationRadio);
        if (radioButtons.length === 0)
            throw new Error("Aucun bouton radio 'location' trouvé.");

        const formDataElement = radioButtons[0].closest(SELECTORS.formData);
        const isAnyRadioSelected = Array.from(radioButtons).some(
            (radio) => radio.checked
        );

        if (!isAnyRadioSelected) {
            formDataElement.setAttribute(
                "data-error",
                "Veuillez sélectionner un emplacement pour participer au tournoi."
            );
            formDataElement.setAttribute("data-error-visible", "true");
            return false;
        }

        formDataElement.removeAttribute("data-error");
        formDataElement.removeAttribute("data-error-visible");
        return true;
    } catch (error) {
        console.error("Erreur dans checkRadioButtons:", error.message);
        return false;
    }
}

/**
 * Valide si la case "conditions d'utilisation" est cochée.
 * Vérifie que l'utilisateur a explicitement accepté les conditions générales d'utilisation.
 *
 * Bonne pratique : La case des conditions générales d'utilisation est laissée non cochée par défaut.
 * Cela garantit que l'utilisateur donne un consentement explicite, éclairé et volontaire,
 * conformément aux principes d'éthique, d'expérience utilisateur et aux réglementations légales (comme le RGPD).
 * Pré-remplir cette case pourrait être perçu comme une tentative d'imposer le consentement sans choix réel.
 *
 * @returns {boolean} - True si la case est cochée, sinon False.
 */
function checkTermsAndConditions() {
    try {
        console.log("*** Fonction checkTermsAndConditions() appelée ***");

        const termsCheckbox = document.querySelector(SELECTORS.termsCheckbox);
        if (!termsCheckbox)
            throw new Error("Checkbox des conditions générales introuvable.");

        const formDataElement = termsCheckbox.closest(SELECTORS.formData);

        if (!termsCheckbox.checked) {
            formDataElement.setAttribute(
                "data-error",
                "Vous devez accepter les conditions d'utilisation pour continuer."
            );
            formDataElement.setAttribute("data-error-visible", "true");
            return false;
        }

        formDataElement.removeAttribute("data-error");
        formDataElement.removeAttribute("data-error-visible");
        return true;
    } catch (error) {
        console.error("Erreur dans checkTermsAndConditions:", error.message);
        return false;
    }
}

/**
 * Affiche la boîte de dialogue de confirmation après la soumission du formulaire.
 * - Change la propriété CSS `display` pour rendre la boîte de confirmation visible.
 * - Utilisée pour informer l'utilisateur que l'inscription a été réussie.
 */
function showConfirmationModal() {
    const confirmationModal = document.querySelector(".confirmation-modal");

    if (confirmationModal) {
        confirmationModal.style.display = "block";
    }
}

/**
 * Ferme la boîte de dialogue de confirmation.
 * - Change la propriété CSS `display` pour masquer la boîte de confirmation.
 * - Permet à l'utilisateur de revenir à l'état normal de l'application après l'affichage de la confirmation.
 */
function closeConfirmationModal() {
    const confirmationModal = document.querySelector(".confirmation-modal");

    if (confirmationModal) {
        confirmationModal.style.display = "none";
    }
}
