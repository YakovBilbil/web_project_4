export default class UserInfo {
    constructor({ profileName, profileProfession }) {
        this._profileName = profileName;
        this._profileProfession = profileProfession;
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
}
