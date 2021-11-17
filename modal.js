export default {
    data () {
        return {
            title: '',
            desc: '',
            username: '',
        }
    }
    props: [id],
    mounted () {
        fetch(`image/${this.id}`).then((res) => {
            return res.json()
        }).then
    }

}

