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

/* jmg */
function validate() {
    console.log("Fonction validate() appelée");

    checkFirstName();
}

/**
 * Cette fonction vérifie si le prénom est valid
 */
function checkFirstName() {
    console.log("*** function checkFirstName() ***");

    try {
        const firstNameElement = document.getElementById("first");
        console.log(firstNameElement);

        const firstName = firstNameElement.value;
        console.log(`first name: ${firstName}`);

        const formDataElement = document.querySelector("formData");
        formDataElement.classList.add("data-error");
    } catch (error) {
        console.log(`Une erreur est survenue : ${error.message}`);
    }
}
