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
                return res.json(res);
            })
            .then((data) => {
                if (data.length < 1) {
                    this.$emit("notFound");
                } else {
                    this.url = data[0].url;
                    this.username = data[0].username;
                    this.title = data[0].title;
                    this.description = data[0].desc;
                    this.timestamp = data[0].created_at;
                    this.notFound = false;
                }
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

//  console.log("Logging data: ", data);
//  this.url = data.url;
//  this.username = data.username;
//  this.title = data.title;
//  this.description = data.desc;
//  this.timestamp = data.created_at;
