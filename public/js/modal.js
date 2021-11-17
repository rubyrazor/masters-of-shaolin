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
                {{url}}
                {{title}}
                {{username}}
                {{description}}
                {{timestamp}}</div>`,
    methods: {
        click() {
            this.$emit("close");
        },
    },
    mounted() {
        console.log("Mouted in modal got called");
        console.log("Hello: ", this.id);
        fetch(`image/${this.id}`)
            .then((res) => {
                return res.json(res);
            })
            .then((data) => {
                console.log("Data in mounted: ", data);
                return (
                    (this.url = data.url),
                    (this.username = data.username),
                    (this.title = data.title),
                    (this.description = data.desc),
                    (this.timestamp = data.created_at)
                );
            });
    },
};
