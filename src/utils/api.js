export default class Api {
    constructor(options) {
            this._baseUrl = options.baseUrl;
            this._token = options.token;
            console.log(`${this._baseUrl}`);
        }
        /*
            getInitialCards() {
                return fetch(`${this._baseUrl}/cards`, {
                        headers: { authorization: this._token }
                    })
                    .then(res => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            throw new Error(`something get wrong. Status: ${response.status}, ${response.statusText}`);
                        }
                    })
                    .catch((error) => {
                        console.log("CAUGHT ERROR", error);
                    });
            }
            */


    async getInitialCards() {
        try {
            const response = await fetch(`${this._baseUrl}/cards`, {
                method: "GET",
                headers: { authorization: this._token }
            });

            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`something get wrong. Status: ${response.status}, ${response.statusText}`);
                //console.log("something get wrong", response.status, response.statusText);
            }
        } catch (error) {
            console.log("CAUGHT ERROR", error);
        }
    }


    async getUserData() {
        try {
            const response = await fetch(`${this._baseUrl}/users/me`, {
                method: "GET",
                headers: { authorization: this._token }
            });

            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`something get wrong. Status: ${response.status}, ${response.statusText}`);
            }
        } catch (error) {
            console.log("CAUGHT ERROR", error);
        }
    }


    async addCard(name, link) {
        try {
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
        } catch (error) {
            console.log("CAUGHT ERROR", error);
        }
    }


    async deleteCard(cardId) {
        try {
            const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
                method: "DELETE",
                headers: { authorization: this._token, "Content-Type": "application/json" },
            });

            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`something get wrong. Status: ${response.status}, ${response.statusText}`);
            }
        } catch (error) {
            console.log("CAUGHT ERROR", error);
        }
    }


    async editProfile(name, about) {
        try {
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
        } catch (error) {
            console.log("CAUGHT ERROR", error);
        }
    }


    async getCardLikesData(cardId) {
        try {
            const response = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
                method: "GET",
                headers: { authorization: this._token }
            });

            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`something get wrong. Status: ${response.status}, ${response.statusText}`);
            }
        } catch (error) {
            console.log("CAUGHT ERROR", error);
        }
    }


    async handleLikePut(cardId) {
        try {
            const response = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
                method: "PUT",
                headers: { authorization: this._token, "Content-Type": "application/json" },
            });

            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`something get wrong. Status: ${response.status}, ${response.statusText}`);
            }
        } catch (error) {
            console.log("CAUGHT ERROR", error);
        }
    }


    async handleLikeDelete(cardId) {
        try {
            const response = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
                method: "DELETE",
                headers: { authorization: this._token, "Content-Type": "application/json" },
            });

            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`something get wrong. Status: ${response.status}, ${response.statusText}`);
            }
        } catch (error) {
            console.log("CAUGHT ERROR", error);
        }
    }


}
