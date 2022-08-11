export default {
    // created() {
    //     //
    // },
    methods: {
        $_(x) {
            return document.getElementById(x)
        },
        isFocusedIn(id) {
            this.$_(id).classList.remove('is-filled')
            this.$_(id).classList.remove('is-iddle')
            this.$_(id).classList.add('input-is-focused')
        },
        isFocusedOut(id, input) {
            if(this.checkInputHasValue(input)) {
                this.$_(id).classList.add('is-iddle')
            }
            this.$_(id).classList.remove('input-is-focused')
        },
        checkInputHasValue(input){
            if(this.$_(input).value !== '')
            return true
            else
            return false
        },
        checkThisInputOnload(id,input) {
          if(this.checkInputHasValue(input)) {
                this.isFocusedIn(id)
            }
        },
    },
    mounted () {
        if(this.form.email && this.form.email != '') {
            this.isFocusedOut('email_wrapper', 'emailInput')
        }if(this.form.name && this.form.name != '') {
            this.isFocusedOut('name_wrapper', 'nameInput')
        }if(this.form.password && this.form.password != '') {
            this.isFocusedOut('password_wrapper', 'passwordInput')
        }
    }
}