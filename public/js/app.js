import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            images: null,
            title: "",
            username: "",
            desc: "",
            file: null,
        };
    },

    methods: {
        setFile(e) {
            this.file = e.target.files[0];
        },

        upload() {
            const formData = new FormData();
            formData.append("file", this.file);
            formData.append("title", this.title);
            formData.append("desc", this.desc);
            formData.append("username", this.username);
            fetch("/upload", {
                method: "POST",
                body: formData,
            })
                .then((data) => {
                    return data.json();
                })
                .then((data) => {
                    console.log(data);
                    return this.images.unshift(data);
                });
        },
    },

    mounted: function () {
        fetch("/images.json")
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                console.log(data);
                return (this.images = data);
            });
    },
}).mount("#main");
