import comment from "./comment.js";

export default {
    data() {
        return {
            url: "",
            username: "",
            title: "",
            description: "",
            timestamp: "",
        };
    },
    props: ["selectedImageId"],
    template: `<div><div id="modal" @click="click">
                <img :src="url">
                {{title}}
                {{username}}
                {{description}}
                {{timestamp}}
            </div>
            <comment v-bind:selected-image-id="selectedImageId" ></comment></div>`,
    methods: {
        click() {
            this.$emit("close");
        },
    },
    mounted: function () {
        fetch(`image/${this.selectedImageId}`)
            .then((res) => {
                console.log(res);
                return res.json(res);
            })
            .then((data) => {
                console.log("Logging in mounted, modal.js: ", data);
                this.url = data.url;
                this.username = data.username;
                this.title = data.title;
                this.description = data.desc;
                this.timestamp = data.created_at;
            })
            .catch((err) => {
                console.log(
                    "Exception when fetching selected image-data in modal.js: ",
                    err
                );
            });
    },
    components: {
        comment: comment,
    },
};
