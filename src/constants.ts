export const Constants = {
    SERVER : 'http://localhost:8080/',
    IMG_EVENTS_PATH : `public/images/events/`,
    USER_PATH :`public/images/users/`,

    get imageUrlEvent() {
      return this.SERVER + this.IMG_EVENTS_PATH
    },
    get imageUrlUser() {
      return this.SERVER + this.USER_PATH
    },
};
