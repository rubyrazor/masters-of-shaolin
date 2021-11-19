import * as Vue from "./vue.js";
import modal from "./modal.js";

Vue.createApp({
    data() {
        return {
            images: [],
            title: "",
            username: "",
            desc: "",
            file: null,
            selectedImageId: "",
            lowestId: null,
        };
    },

    methods: {
        setFile(e) {
            this.file = e.target.files[0];
        },

        upload() {
            const formData = new FormData();
            formData.append("title", this.title);
            formData.append("username", this.username);
            formData.append("desc", this.desc);
            formData.append("file", this.file);
            fetch("/upload", {
                method: "POST",
                body: formData,
            })
                .then((data) => {
                    return data.json();
                })
                .then((data) => {
                    return this.images.unshift(data);
                });
        },
        openModal(id) {
            this.selectedImageId = id;
        },
        closeModal() {
            this.selectedImageId = "";
        },
        more() {
            fetch(`/nextImages/${this.images[this.images.length - 1].id}`)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    this.lowestId = data[0].lowestId;
                    this.images = [...this.images, ...data];
                })
                .catch((err) => {
                    console.log(
                        "Exception thrown when fetching more images, app.js: ",
                        err
                    );
                });
        },
    },

    mounted: function () {
        fetch("/images.json")
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                this.images = data;
                this.lowestId = data[0].lowestId;
                console.log(this.lowestId);
            })
            .catch((err) => {
                console.log(
                    "Exception thrown when fetching data in mounted, app.js: ",
                    err
                );
            });
    },

    components: {
        modal: modal,
    },
}).mount("#main");

// //
// //get the id from URL
// location.pathname.slice(1)

// //prevent default in vue
// <a href="/5" @click.prevent=""
