<template>
    <div id="login_card">
        <div class="title">
            <h1>{{ emailSent ? 'Check your email!' : 'Forgot password' }}</h1>
            <span v-if="!emailSent">Enter your email to continue</span>
        </div>
        <div v-if="userError.error" class="invalid-credentials">
            <span>{{ userError.message }}</span>
        </div>
        <form v-if="!emailSent" @submit.prevent="forgotPassword">
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.email}">
                <div class="input-wrapper" id="email_wrapper">
                    <label for="emailInput">Email</label>
                    <input v-model="form.email" id="emailInput"  @input="isFocusedIn('email_wrapper')" @focusin="isFocusedIn('email_wrapper')" @focusout="isFocusedOut('email_wrapper', 'emailInput')" type="email" name="email" class="form-control">
                </div>
                <span class="span" v-if="validation.error && validation.errors.email">
                    {{ validation.errors.email[0] }}
                </span>
            </div>
                <button class="button button-primary logon-btn" :class="{ 'button-disabled' : creating }" :disabled="creating? true : false">
                    <span>{{ creating ? 'Please wait' : 'Continue'}}</span>
                    <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
                </button>
        </form>
        <div v-else class="email-sent">
            <p>An email has been sent to <strong>{{ form.email }}</strong>, open the mail and follow the link to reset your password.</p>
            <p><span>Haven't received the email?</span><a href="#" @click.prevent="toggleBack">Resend it</a></p>
        </div>
        <div class="flex create-acct">
            <a href="/signin">Back to Sign in page</a>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Spinner from '../../components/app/includes/Spinner.vue'
import passwordToggle from '../../mixins/passwordToggle'
import inputMixin from '../../mixins/inputMixin'
import { mapGetters } from 'vuex'
export default {
  components: { Spinner },
    name: 'ForgotPassword',
    mixins: [passwordToggle, inputMixin],
    computed: mapGetters(['getHostname', '']),
    data() {
        return {
            form: {
              email: '',
            },
            emailSent: false,
            validation: {
                error: false,
                errors: '',
                message: ''
            },
            userError: {
                error: false,
                message: ''
            },
            creating: false,
        }
    },
    methods: {
        async forgotPassword() {
            this.clearErr()
            this.creating = true
            try {
                const res = await axios.post(this.getHostname+'/api/forgot-password', this.form)
                res.data.email ? this.emailSent = true : ''
                this.creating = false
            } catch (err) {
                this.creating = false
                if(err.response.status == 422){
                    this.validation.error = true
                    this.validation.errors = err.response.data.errors
                    this.validation.message = err.response.data.message
                }
                if (err.response.status == 404) {
                    this.userError.error = true
                    this.userError.message = err.response.data.email+' does not exist in our system.'
                }
            }

        },
        clearErr() {
            if (this.validation.error === true || this.userError.error === true)
            this.validation.error = false
            this.userError.error = false
            this.validation.errors = ''
            this.validation.message = null
            this.userError.message = null
            return
        },
        toggleBack () {
            this.emailSent = !this.emailSent
        }
    }
}
</script>
<style lang="scss" scoped>
.email-sent{
    p {
        font-weight: 500;
    }
    a{
        margin-left: 5px;
        color: $primary-color;
        font-weight: 600;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
}
</style>