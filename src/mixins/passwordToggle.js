export default {
    data() {
        return {
            showPass: false
        }
    },
    methods: {
        togglePass() {
            this.showPass = !this.showPass
        }
    }
}