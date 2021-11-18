export default {
    data() {
        return {
            comments: null,
            commentText: "",
            commentAuthor: "",
        };
    },
    props: ["id"],
    template: `<div>
                    <label for="commentText">Comment</label>
                    <input v-model="commentText" name="commentText">
                    <label for="commentAuthor">Username</label>
                    <input v-model="commentAuthor" name="commentAuthor">
                    <button v-on:click="addComment">Upload</button>
                </div>
                <div v-if="comments" v-for="comment in comments" >
                    <div>
                    <p>{{comment.comment_author}}</p>
                    <p>{{comment.comment_text}}</p>
                    </div>
                </div>`,
    mounted: function () {
        fetch("/comments.json")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return (this.comments = data); //Check how data locks like
            });
    },
    methods: {
        addComment() {
            console.log(this.commentAuthor);
            console.log(this.commentText);
            console.log(this.id);
            fetch(`comments/${this.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    commentAuthor: this.commentAuthor,
                    commentText: this.commentText,
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    return this.comments.push(data);
                });
        },
    },
};
