export default {
    data() {
        return {
            comments: null,
            commentText: "",
            commentAuthor: "",
        };
    },
    props: ["selectedImageId"],
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
        fetch(`/comments/${this.selectedImageId}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("Logging in mounted, comment.js: ", data);
                this.comments = data;
            })
            .catch((err) => {
                console.log(
                    "Exception thrown when retrieving comments-data by id, comment.js: ",
                    err
                );
            });
    },
    methods: {
        addComment() {
            console.log(this.commentAuthor);
            console.log(this.commentText);
            console.log(this.selectedImageId);
            fetch(`addcomment/${this.selectedImageId}`, {
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
                    console.log("Logging in addComment, comment.js: ", data);
                    return this.comments.push(data);
                });
        },
    },
};
