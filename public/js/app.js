import * as Vue from "./vue.js";
import modal from "./modal.js";

Vue.createApp({
    data() {
        return {
            images: null,
            title: "",
            username: "",
            desc: "",
            file: null,
            selectedImageId: "",
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
            console.log("Click on image: ", id);
            this.selectedImageId = id;
        },
        closeModal() {
            this.selectedImageId = "";
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

    components: {
        modal: modal,
    },
}).mount("#main");
