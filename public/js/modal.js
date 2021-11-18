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
    props: ["id"],
    template: `<div id="modal" @click="click">
                <img :src="url">
                {{title}}
                {{username}}
                {{description}}
                {{timestamp}}
            </div>
            <comment v-bind:id="id"></comment>`,
    methods: {
        click() {
            this.$emit("close");
        },
    },
    mounted: function () {
        fetch(`image/${this.id}`)
            .then((res) => {
                return res.json(res);
            })
            .then((data) => {
                this.url = data.url;
                this.username = data.username;
                this.title = data.title;
                this.description = data.desc;
                this.timestamp = data.created_at;

                Object.assign(this, data)
            }).catch((err) => {

            });
    },
    components: {
        comment: comment,
    },
};
