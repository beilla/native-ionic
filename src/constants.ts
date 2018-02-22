export const Constants = {
    //SERVER : 'http://192.168.1.124:8585/',
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
