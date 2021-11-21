export default {
    data() {
        return {
            comments: null,
            commentText: "",
            commentAuthor: "",
        };
    },
    props: ["selectedImageId"],
    template: `<div id="helper-div17">
                    <div id="helper-div12">
                        <div id="helper-div13">
                            <input id="input-comment-text" v-model="commentText" name="commentText">
                            <label class="label" for="commentText">New Comment</label>
                        </div>
                        <div id="helper-div14">
                            <input id="input-comment-author" v-model="commentAuthor" name="commentAuthor">
                            <label class="label" for="commentAuthor">Username</label>
                        </div>
                        <button v-on:click="addComment">Upload</button>
                    </div>
                    <div id="helper-div18">
                        All previous Comments
                        <div v-if="comments" v-for="comment in comments" >
                            <div>
                                <div id="helper-div15">
                                    {{comment.comment_text}}
                                </div>
                                <div id="helper-div16">
                                    ({{comment.comment_author}})
                                </div>
                            </div>
                        </div>
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
            let bodyJson = JSON.stringify({
                commentAuthor: this.commentAuthor,
                commentText: this.commentText,
            });
            this.commentAuthor = "";
            this.commentText = "";

            fetch(`addcomment/${this.selectedImageId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: bodyJson,
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log("New data: ", data);
                    this.comments.push(data);
                });
        },
    },
};
