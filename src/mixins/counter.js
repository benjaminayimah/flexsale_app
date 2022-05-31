import { mapGetters } from "vuex"
export default {
    computed: {
        ...mapGetters([''])
    },
    data() {
        return {
            count: 0
        }
    },
    methods: {
        incrementCount() {
            this.count += 1
        }
    }
}