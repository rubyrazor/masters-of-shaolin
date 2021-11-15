import * as Vue from './vue.js';

Vue.createApp({
    data(){
        return {
            images: null,
        };
    },
    mounted: function () {
        fetch("/images.json").then((data) => {
            data.json().then((data) => {
                this.images = data;
            });
        });
    }
}).mount("#main");