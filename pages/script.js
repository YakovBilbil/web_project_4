let profileName = document.querySelector(".profile__value_type_name");

let profileProfession = document.querySelector(".profile__value_type_profession");

let editButton = document.querySelector(".profile__edit-button");

let addButton = document.querySelector(".profile__add-button");

let popup = document.querySelector(".popup");

let saveButton = popup.querySelector(".popup__form-save-button");

let closeButton = popup.querySelector(".popup__form-close-button");

let popupInputName = popup.querySelector(".popup__form-input_type_name");

let popupInputProfession = popup.querySelector(".popup__form-input_type_profession");

let formToSubmit = document.querySelector(".form-to-submit");




function openPopup(event) {
    event.preventDefault();
    popup.classList.add("popup_opened");
    popupInputName.value = profileName.textContent;
    popupInputProfession.value = profileProfession.textContent;
}

function closePopup(event) {
    event.preventDefault();
    popup.classList.remove("popup_opened");
}

function save(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileProfession.textContent = popupInputProfession.value;
    popup.classList.remove("popup_opened");
}

function handleFormSubmit(event) {
    event.preventDefault();
}




addButton.addEventListener("click", openPopup);

editButton.addEventListener("click", openPopup);

closeButton.addEventListener("click", closePopup);

saveButton.addEventListener("click", save);

formToSubmit.addEventListener('submit', handleFormSubmit);
