<template>
<div>
    <div id="g_id_onload"
        :data-client_id="getOAuth"
        data-cancel_on_tap_outside="false">
    </div>
    <div v-if="!getSignInStatus.created" id="login_card">
        <div class="title">
            <h1>Welcome back!</h1>
            <span>Sign in to continue</span>
        </div>
        <div v-if="userError.error" class="invalid-credentials">
            <span>{{ userError.message }}</span>
        </div>
        <form @submit.prevent="">
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.email}">
                <div class="input-wrapper" id="email_wrapper">
                    <label for="emailInput">Email</label>
                    <input id="emailInput" ref="email" v-model="form.email" @input="isFocusedIn('email_wrapper')" @focusin="isFocusedIn('email_wrapper')" @focusout="isFocusedOut('email_wrapper', 'emailInput')" type="email" name="email" class="form-control">
                </div>
                <span class="span" v-if="validation.error && validation.errors.email">
                    {{ validation.errors.email[0] }}
                </span>
            </div>
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.password}">
                <div class="input-wrapper" id="password_wrapper">
                    <label for="passwordInput">Password</label>
                    <input id="passwordInput" ref="password" v-model="form.password" @input="isFocusedIn('password_wrapper')" @focusin="isFocusedIn('password_wrapper')" @focusout="isFocusedOut('password_wrapper', 'passwordInput')" required :type="showPass ? 'text' : 'password'" name="password" class="form-control password-field">
                    <i class="hide-show-pass" :class="{ 'hide-pass-active' : showPass }" @click="togglePass">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 26.364 26.364">
                        <g transform="translate(1.182 1.182)">
                            <path d="M16027.619-15079.234a21.431,21.431,0,0,1-4.111-4.4,2.816,2.816,0,0,1,0-3.226,21.339,21.339,0,0,1,4.111-4.406,11.5,11.5,0,0,1,7.129-2.734,11.516,11.516,0,0,1,7.132,2.734,21.4,21.4,0,0,1,4.107,4.4,2.822,2.822,0,0,1,0,3.229,21.4,21.4,0,0,1-4.107,4.4,11.51,11.51,0,0,1-7.132,2.734A11.492,11.492,0,0,1,16027.619-15079.234Zm.927-10.853a19.948,19.948,0,0,0-3.813,4.087,1.32,1.32,0,0,0,0,1.5,19.8,19.8,0,0,0,3.81,4.084,10.018,10.018,0,0,0,6.2,2.412,10.015,10.015,0,0,0,6.2-2.412,19.886,19.886,0,0,0,3.814-4.088,1.322,1.322,0,0,0,0-1.5,19.9,19.9,0,0,0-3.81-4.083,10.011,10.011,0,0,0-6.2-2.413A10.013,10.013,0,0,0,16028.546-15090.087Zm1.454,4.836a4.754,4.754,0,0,1,4.748-4.748,4.758,4.758,0,0,1,4.752,4.748,4.758,4.758,0,0,1-4.752,4.752A4.754,4.754,0,0,1,16030-15085.251Zm1.5,0a3.253,3.253,0,0,0,3.25,3.25,3.253,3.253,0,0,0,3.249-3.25,3.253,3.253,0,0,0-3.249-3.25A3.253,3.253,0,0,0,16031.5-15085.251Z" transform="translate(-16022.748 15097.25)" fill="#7e8596"/>
                            <path v-if="showPass" d="M0,22.121-2.121,20,20-2.121,22.121,0Z" transform="translate(2 2)" fill="#7e8596" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                        </g>
                    </svg>
                </i>
                </div>
                <span class="span" v-if="validation.error && validation.errors.password">
                    {{ validation.errors.password[0] }}
                </span>
                <div class="forgot-pass">
                    <router-link :to="{ name: 'ForgotPassword'}">Forgot your password?</router-link>
                </div>
            </div>
                <button class="button button-primary logon-btn" @click.prevent="submitSignin" :class="{ 'button-disabled' : getSignInStatus.creating }" :disabled="getSignInStatus.creating? true : false">
                    <span>{{ getSignInStatus.creating ? 'Signing in' : 'Sign in'}}</span>
                    <spinner v-if="getSignInStatus.creating" v-bind:size="20" v-bind:white="true" />
                </button>
                <div class="or">
                    <div>
                        <span>Or</span>
                    </div>
                </div>
            <div class="flex social-signin justify-content-center align-items-center">
                <!-- <button @click.prevent="signInWithGoogle">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 20.919 21.262">
                        <path  d="M20.919,11.442c0,6.066-4.154,10.382-10.288,10.382a10.631,10.631,0,1,1,0-21.262A10.223,10.223,0,0,1,17.76,3.345L14.866,6.127C11.081,2.474,4.042,5.218,4.042,11.193a6.659,6.659,0,0,0,6.589,6.713,5.749,5.749,0,0,0,6.036-4.582H10.631V9.667H20.752A9.32,9.32,0,0,1,20.919,11.442Z" transform="translate(0 -0.562)"/>
                    </svg>
                    <span class="show-mob">Sign in with</span><span>Google</span>
                </button> -->
                <div id="signin_button"></div>
                <!-- <button @click.prevent="">
                    <svg xmlns="http://www.w3.org/2000/svg"  height="18" viewBox="0 0 11.387 21.262">
                        <path d="M12.251,11.96l.591-3.848H9.149v-2.5a1.924,1.924,0,0,1,2.169-2.079H13V.26A20.469,20.469,0,0,0,10.017,0C6.977,0,4.989,1.843,4.989,5.179V8.112H1.609V11.96h3.38v9.3h4.16v-9.3Z" transform="translate(-1.609)"/>
                    </svg>
                    <span class="show-mob">Sign in with</span><span>Facebook</span>
                </button> -->
            </div>
            <div class="flex create-acct justify-content-center">
                <span>New to Flexsale?</span><a href="/signup">Create an account</a>
            </div>
            <span class="disclaimer">This application is protected by Flexsale's <a href="https://www.flexsale.store/terms-and-conditions">Terms</a>, <a href="https://www.flexsale.store/privacy-policy">Privacy policy</a> & <a href="https://www.flexsale.store/cookies-policy">Cookie policy.</a></span>
        </form>
    </div>
    <div v-else class="flex justify-content-center align-items-center flex-col after-created" :class="{ 'progress-secondary' : getMobile }">
        <div v-if="computedUser">
            <h1>Hello!</h1>
            <span>{{ computedUser }}</span>
        </div>
        <div class="flex justify-content-center align-items-center bottom-hold">
            <div v-if="getSignInStatus.proceeding">
                <svg xmlns="http://www.w3.org/2000/svg" width="259" height="5" viewBox="0 0 259 5">
                    <g transform="translate(-830.5 -590)">
                        <line class="progress-bg" x2="254" transform="translate(833 592.5)" fill="none" stroke-linecap="round" stroke-width="5"/>
                        <line class="progress" :x2="getSignInStatus.progressFill" transform="translate(833 592.5)" fill="none" stroke-linecap="round" stroke-width="5"/>
                    </g>
                </svg>
                <!-- <div>{{ ((progressFill/254)*100).toFixed(0) }}%</div> -->
            </div>
            <div v-else>
                <button class="button" @click="this.$store.commit('loadDashboard')">Proceed to Dashboard</button>
            </div>
        </div>
    </div>
    <sign-up-with-social-float />
</div>
</template>
<script>
import jwt_decode from "jwt-decode";
import { mapGetters } from 'vuex'
import axios from 'axios'
import Spinner from '../../components/app/includes/Spinner.vue'
import passwordToggleMixin from '../../mixins/passwordToggle'
import inputMixin from '../../mixins/inputMixin'
import SignUpWithSocialFloat from '../../components/app/includes/SignUpWithSocialFloat.vue';
export default {
  components: { Spinner, SignUpWithSocialFloat },
    name: 'SignIn',
    mixins: [passwordToggleMixin, inputMixin],
    computed: {
        ...mapGetters(['getHostname', 'getUser', 'getSignInStatus', 'getMobile', 'getOAuth']),
        computedUser() {
            if(this.getUser.name) {
                return this.getUser.name.split(' ')[0]
            }else
            return ''
        }
    },
    data() {
        return {
            form: {
              email: '',
              password: ''
            },
            validation: {
                error: false,
                errors: '',
                message: ''
            },
            userError: {
                error: false,
                message: ''
            }
        }
    },
    created() {
        window.addEventListener('load', () => {
            window.google.accounts.id.initialize({
                client_id: this.getOAuth,
                callback: this.handleCredentialResponse
            });
            window.google.accounts.id.renderButton(
                document.getElementById("signin_button"),
                { theme: "outline", size: "large", shape: "pill", type: "standard", text: "signin_with" }
            );
        })
    },
    methods: {
        handleCredentialResponse(response) {
            const responsePayload = jwt_decode(response.credential)
            const user = { email: responsePayload.email, sub: responsePayload.sub, verified: responsePayload.email_verified, name: responsePayload.name, given_name: responsePayload.given_name, picture: responsePayload.picture, type: 'google' }
            // const user = { token: response.credential }
            // console.log(user)
            this.OAuthAttemptSignIn(user)
        },
        async OAuthAttemptSignIn(user) {
            axios.post(this.getHostname+'/api/oauth-signin', user)
            .then((res) => {
                // console.log(res.data)
                if(res.data.status === 1) {
                    this.setSuccessRes(res.data.token)
                }else {
                    const payload = { user: user }
                    this.$store.commit('showOAuthModal', payload)
                }
            }).catch((err) => {
                console.log(err.response.status)
                
            })
        },
        async submitSignin() {
            this.resertForm()
            this.$store.commit('setCreating')
            axios.post(this.getHostname+'/api/sign-in', this.form)
            .then((res) => {
                this.$store.commit('unSetCreating')
                this.setSuccessRes(res.data.token)
            }).catch((err) => {
                this.$store.commit('unSetCreating')
                if (err.response.status == 401) {
                    this.userError.error = true
                    this.userError.message = 'Invalid email or password. Please try again or try resetting your password.'
                }
                if(err.response.status == 422){
                    this.validation.error = true
                    this.validation.errors = err.response.data.errors
                    this.validation.message = err.response.data.message
                }
            })
        },
        setSuccessRes(token) {
            this.$store.commit('signInSuccess', token)
            this.$store.commit('unSetCreating')
            this.$store.commit('setCreated')
            this.$store.commit('loadDashboard')
        },
        resertForm() {
            if (this.validation.error === true || this.userError.error === true)
            this.validation.error = false
            this.userError.error = false
            this.validation.errors = ''
            this.validation.message = null
            this.userError.message = null
            this.$store.commit('unSetCreating')
            return
        }
    }
}
</script>
<style scoped lang="scss">


</style>
