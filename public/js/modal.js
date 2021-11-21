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
    template: `<div id="modal" v-on:click.self="click">
    <div id="helper-div10">
        <div id="helper-div4">
            <img :src="url">
            <div id=helper-div11>
                <div id="helper-div-title">
                    {{title}}
                </div>
                <div id="helper-div-description">
                    {{description}}
                </div>
                <div id="helper-div-username-date">
                    ({{username}} | {{timestamp.slice(0,10)}}, {{timestamp.slice(11,16)}})
                </div>
            </div>
        </div>
        <comment v-bind:selected-image-id="selectedImageId" ></comment>
    </div>
</div>`,
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
                console.log("Logging in modal: ", data);
                if (data.length < 1) {
                    this.$emit("notFound");
                } else {
                    console.log(data);
                    this.url = data[0].url;
                    this.username = data[0].username;
                    this.title = data[0].title;
                    this.description = data[0].description;
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
