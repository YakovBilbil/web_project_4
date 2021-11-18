const allPopups = document.querySelectorAll(".popup");
const addButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_add-card");


function closePopup(popupType) {
    popupType.classList.remove("popup_opened");
    document.removeEventListener("keydown", escHandler);
}


function escHandler(event) {
    if (event.key === "Escape") {
        allPopups.forEach((popup) => {
            if (popup.classList.contains("popup_opened")) {
                closePopup(popup);
            }
        });
    }
}


function openPopup(popupType) {
    popupType.classList.add("popup_opened");
    document.addEventListener("keydown", escHandler);
}


function clickHandler() {
    allPopups.forEach(popup => {
        popup.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-icon")) {
                closePopup(popup);
            }
        });
    });
}


function addButtonHandler() {
    addButton.addEventListener("click", () => {
        openPopup(popupAddCard);
    });
}


export { openPopup, closePopup, clickHandler, addButtonHandler };
