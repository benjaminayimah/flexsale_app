export default {
    data() {
        return {
            validation: {
                error: false,
                errors: '',
                message: ''
            },
            submiting: false,
        }
    },
    methods: {
        clearErrs() {
            if (this.validation.error === true)
            this.validation.error = false
            this.validation.errors = ''
            this.validation.message = null
        },
    }
}