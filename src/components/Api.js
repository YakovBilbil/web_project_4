export default class Api {
    constructor({ baseUrl, token }) {
        this._baseUrl = baseUrl;
        this._token = token;
    }


    async getInitialCards() {
        const response = await fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: { authorization: this._token }
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`something get wrong. Status: ${response.status}, ${response.statusText}`);
        }
    }


    async getUserData() {
        const response = await fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: { authorization: this._token }
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`something get wrong. Status: ${response.status}, ${response.statusText}`);
        }
    }


    async addCard(name, link) {
        const response = await fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: { authorization: this._token, "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, link: link })
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`something get wrong. Status: ${response.status}, ${response.statusText}`);
        }
    }




    async deleteCard(cardId) {
        const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: { authorization: this._token, "Content-Type": "application/json" },
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`something get wrong. Status: ${response.status}, ${response.statusText}`);
        }
    }



    async editProfile(name, about) {
        const response = await fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: { authorization: this._token, "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, about: about })
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`something get wrong. Status: ${response.status}, ${response.statusText}`);
        }
    }


    async getCardLikesData(cardId) {
        const response = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "GET",
            headers: { authorization: this._token }
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`something get wrong. Status: ${response.status}, ${response.statusText}`);
        }
    }


    async handleLikePut(cardId) {
        const response = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: { authorization: this._token, "Content-Type": "application/json" },
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`something get wrong. Status: ${response.status}, ${response.statusText}`);
        }
    }


    async handleLikeDelete(cardId) {
        const response = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: { authorization: this._token, "Content-Type": "application/json" },

        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`something get wrong. Status: ${response.status}, ${response.statusText}`);
        }
    }


    async changeProfilePicture(avatar) {
        const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: { authorization: this._token, "Content-Type": "application/json" },
            body: JSON.stringify({ avatar: avatar })
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`something get wrong. Status: ${response.status}, ${response.statusText}`);
        }
    }


}
