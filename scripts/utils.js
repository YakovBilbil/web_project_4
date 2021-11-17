const [
    allPopups,
    addButton,
    popupAddCard
] = [
    document.querySelectorAll(".popup"),
    document.querySelector(".profile__add-button"),
    document.querySelector(".popup_add-card")
];

function openPopup(popupType) {
    popupType.classList.add("popup_opened");
}

function closePopup(popupType) {
    popupType.classList.remove("popup_opened");
}

function escHandler(event) {
    allPopups.forEach((popup) => {
        if ((event.key === "Escape") && (popup.classList.contains("popup_opened"))) {
            closePopup(popup);
            document.removeEventListener("keydown", escHandler);
        }
    });
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
        document.addEventListener("keydown", escHandler);
    });
}


export { openPopup, closePopup, escHandler, clickHandler, addButtonHandler };
