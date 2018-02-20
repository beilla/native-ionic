export const Constants = {
    SERVER : 'http://localhost:8080/',
    IMG_EVENTS_PATH : `public/img/events/`,
    USER_PATH :`public/img/users/`,

    get imageUrlEvent() {
      return this.baseUrl + this.IMG_EVENTS_PATH
    },
    get imageUrlUser() {
      return this.baseUrl + this.USER_PATH
    },
};
