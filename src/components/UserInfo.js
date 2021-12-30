export default class UserInfo {
    constructor({ profileName, profileProfession }) {
        this._profileName = profileName;
        this._profileProfession = profileProfession;
        this._profileAvatar = document.querySelector(".profile__avatar");
    }

    getUserInfo() {
        this._userInfoValues = {
            name: this._profileName.textContent,
            profession: this._profileProfession.textContent
        };
        return this._userInfoValues;
    }

    setUserInfo({ popupInputName, popupInputProfession }) {
        this._profileName.textContent = popupInputName;
        this._profileProfession.textContent = popupInputProfession;
    }

    setUserAvatar({ popupInputAvatarLink }) {
        this._profileAvatar.src = popupInputAvatarLink;
    }
}
