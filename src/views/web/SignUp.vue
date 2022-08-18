<template>
    <div id="login_card" v-if="!created">
        <div id="g_id_onload"
            :data-client_id="getOAuth"
            data-context="signup"
            data-cancel_on_tap_outside="false">
        </div>
        <div class="title">
            <h1>Create Account</h1>
            <span>It only takes a moment</span>
        </div>
        <form @submit.prevent="">
            <div class="form-row"  :class="{ 'input-has-error' : validation.error && validation.errors.name}">
                <div class="input-wrapper" id="name_wrapper">
                    <label for="nameInput">Full name</label>
                    <input id="nameInput" ref="name" autocomplete="off" v-model="form.name" @input="isFocusedIn('name_wrapper')" @focusin="isFocusedIn('name_wrapper')" @focusout="isFocusedOut('name_wrapper', 'nameInput')"  type="text" name="name" class="form-control">
                </div>
                <span class="span" v-if="validation.error && validation.errors.name">
                    {{ validation.errors.name[0] }}
                </span>
            </div>
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.email}">
                <div class="input-wrapper" id="email_wrapper">
                    <label for="emailInput">Email</label>
                    <input id="emailInput" ref="email" autocomplete="off" v-model="form.email" @input="isFocusedIn('email_wrapper')" @focusin="isFocusedIn('email_wrapper')" @focusout="isFocusedOut('email_wrapper', 'emailInput')" type="email" name="email" class="form-control">
                </div>
                <span class="span" v-if="validation.error && validation.errors.email">
                    {{ validation.errors.email[0] }}
                </span>
            </div>
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.password}">
                <div class="input-wrapper" id="password_wrapper">
                    <label for="passwordInput">Password</label>
                    <input id="passwordInput" ref="password" autocomplete="new-password" v-model="form.password" @input="isFocusedIn('password_wrapper')" @keyup="checkPassword" @focusin="showPassRules" @focusout="hidePassRules" required :type="showPass ? 'text' : 'password'" name="password" class="form-control password">
                </div>
                <i class="hide-show-pass" :class="{ 'hide-pass-active' : showPass }" @click="togglePass">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 26.364 26.364">
                        <g transform="translate(1.182 1.182)">
                            <path d="M16027.619-15079.234a21.431,21.431,0,0,1-4.111-4.4,2.816,2.816,0,0,1,0-3.226,21.339,21.339,0,0,1,4.111-4.406,11.5,11.5,0,0,1,7.129-2.734,11.516,11.516,0,0,1,7.132,2.734,21.4,21.4,0,0,1,4.107,4.4,2.822,2.822,0,0,1,0,3.229,21.4,21.4,0,0,1-4.107,4.4,11.51,11.51,0,0,1-7.132,2.734A11.492,11.492,0,0,1,16027.619-15079.234Zm.927-10.853a19.948,19.948,0,0,0-3.813,4.087,1.32,1.32,0,0,0,0,1.5,19.8,19.8,0,0,0,3.81,4.084,10.018,10.018,0,0,0,6.2,2.412,10.015,10.015,0,0,0,6.2-2.412,19.886,19.886,0,0,0,3.814-4.088,1.322,1.322,0,0,0,0-1.5,19.9,19.9,0,0,0-3.81-4.083,10.011,10.011,0,0,0-6.2-2.413A10.013,10.013,0,0,0,16028.546-15090.087Zm1.454,4.836a4.754,4.754,0,0,1,4.748-4.748,4.758,4.758,0,0,1,4.752,4.748,4.758,4.758,0,0,1-4.752,4.752A4.754,4.754,0,0,1,16030-15085.251Zm1.5,0a3.253,3.253,0,0,0,3.25,3.25,3.253,3.253,0,0,0,3.249-3.25,3.253,3.253,0,0,0-3.249-3.25A3.253,3.253,0,0,0,16031.5-15085.251Z" transform="translate(-16022.748 15097.25)" fill="#7e8596"/>
                            <path v-if="showPass" d="M0,22.121-2.121,20,20-2.121,22.121,0Z" transform="translate(2 2)" fill="#7e8596" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                        </g>
                    </svg>
                </i>
                <transition name="fade">
                    <div v-if="validation.rules || validation.errors.password" class="password-rules" :class="[{ 'all-correct' : validation.allCorrect},{ 'pass-has-error' : validation.error && validation.errors.password}]">
                        <div>Password must be a minimum of <strong :class="{ 'is-valid' : validation.char}">6 characters</strong> and must contain at least one of each of the following;</div>
                        <div class="flex align-items-center" :class="{'is-valid' : validation.number}"><svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 29.25 29.25"><path fill="#C7C8CC" d="M18,3.375A14.625,14.625,0,1,0,32.625,18,14.623,14.623,0,0,0,18,3.375Zm7.488,10.582-9.4,9.443H16.08a1.27,1.27,0,0,1-.816.387,1.231,1.231,0,0,1-.823-.4L10.5,19.448a.28.28,0,0,1,0-.4L11.756,17.8a.272.272,0,0,1,.394,0l3.122,3.122,8.578-8.641a.278.278,0,0,1,.2-.084h0a.255.255,0,0,1,.2.084l1.23,1.273A.277.277,0,0,1,25.488,13.957Z" transform="translate(-3.375 -3.375)"/></svg>[<span class="this-bold">0-9</span>]</div>
                        <div class="flex align-items-center" :class="{'is-valid' : validation.lowercase}"><svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 29.25 29.25"><path fill="#C7C8CC" d="M18,3.375A14.625,14.625,0,1,0,32.625,18,14.623,14.623,0,0,0,18,3.375Zm7.488,10.582-9.4,9.443H16.08a1.27,1.27,0,0,1-.816.387,1.231,1.231,0,0,1-.823-.4L10.5,19.448a.28.28,0,0,1,0-.4L11.756,17.8a.272.272,0,0,1,.394,0l3.122,3.122,8.578-8.641a.278.278,0,0,1,.2-.084h0a.255.255,0,0,1,.2.084l1.23,1.273A.277.277,0,0,1,25.488,13.957Z" transform="translate(-3.375 -3.375)"/></svg>[<span class="this-bold">a-z</span>]</div>
                        <div class="flex align-items-center" :class="{'is-valid' : validation.uppercase}"><svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 29.25 29.25"><path fill="#C7C8CC" d="M18,3.375A14.625,14.625,0,1,0,32.625,18,14.623,14.623,0,0,0,18,3.375Zm7.488,10.582-9.4,9.443H16.08a1.27,1.27,0,0,1-.816.387,1.231,1.231,0,0,1-.823-.4L10.5,19.448a.28.28,0,0,1,0-.4L11.756,17.8a.272.272,0,0,1,.394,0l3.122,3.122,8.578-8.641a.278.278,0,0,1,.2-.084h0a.255.255,0,0,1,.2.084l1.23,1.273A.277.277,0,0,1,25.488,13.957Z" transform="translate(-3.375 -3.375)"/></svg>[<span class="this-bold">A-Z</span>]</div>
                        <div :class="{'is-valid' : validation.special}"><svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 29.25 29.25"><path fill="#C7C8CC" d="M18,3.375A14.625,14.625,0,1,0,32.625,18,14.623,14.623,0,0,0,18,3.375Zm7.488,10.582-9.4,9.443H16.08a1.27,1.27,0,0,1-.816.387,1.231,1.231,0,0,1-.823-.4L10.5,19.448a.28.28,0,0,1,0-.4L11.756,17.8a.272.272,0,0,1,.394,0l3.122,3.122,8.578-8.641a.278.278,0,0,1,.2-.084h0a.255.255,0,0,1,.2.084l1.23,1.273A.277.277,0,0,1,25.488,13.957Z" transform="translate(-3.375 -3.375)"/></svg>Special characters. For example [<span class="this-bold">!, @, #, $, %, &, *</span>]</div>
                    </div>
                </transition>
            </div>
            <span class="disclaimer">By creating an account, I have agreed to Flexsale's <a href="https://www.flexsale.store/terms-and-conditions">Terms</a>, <a href="https://www.flexsale.store/privacy-policy">Privacy policy</a> & <a href="https://www.flexsale.store/cookies-policy">Cookie policy.</a></span>
            <button class="button button-primary logon-btn" @click.prevent="submitSignUp"  :class="{ 'button-disabled' : creating }" :disabled="creating? true : false">
                <span>{{ creating ? 'Creating account' : 'Create Account'}}</span>
                <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
            </button>
            <div class="or">
                <div>
                    <span>Or</span><!--<span class="hide-mob">continue with social sign-up</span>-->
                </div>
            </div>
            <div class="flex social-signin justify-content-center align-items-center">
                <div id="signup_button"></div>
                <!-- <button @click.prevent="">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 20.919 21.262">
                        <path  d="M20.919,11.442c0,6.066-4.154,10.382-10.288,10.382a10.631,10.631,0,1,1,0-21.262A10.223,10.223,0,0,1,17.76,3.345L14.866,6.127C11.081,2.474,4.042,5.218,4.042,11.193a6.659,6.659,0,0,0,6.589,6.713,5.749,5.749,0,0,0,6.036-4.582H10.631V9.667H20.752A9.32,9.32,0,0,1,20.919,11.442Z" transform="translate(0 -0.562)"/>
                    </svg>
                    <span class="show-mob">Sign in with</span><span>Google</span>
                </button>
                <button @click.prevent="">
                    <svg xmlns="http://www.w3.org/2000/svg"  height="18" viewBox="0 0 11.387 21.262">
                        <path d="M12.251,11.96l.591-3.848H9.149v-2.5a1.924,1.924,0,0,1,2.169-2.079H13V.26A20.469,20.469,0,0,0,10.017,0C6.977,0,4.989,1.843,4.989,5.179V8.112H1.609V11.96h3.38v9.3h4.16v-9.3Z" transform="translate(-1.609)"/>
                    </svg>
                    <span class="show-mob">Sign in with</span><span>Facebook</span>
                </button> -->
            </div>
            <div class="flex create-acct justify-content-center">
                <span>Already have an account?</span><a href="/signin">Sign in</a>
                <!--<router-link id="go_hm" :to="{ name: 'Home' }">Back Home</router-link>-->
            </div>
        </form>
    </div>
    <div v-else class="flex justify-content-center align-items-center flex-col after-created" :class="{ 'progress-secondary' : getMobile }">
        <div>
            <h1>Hello!</h1>
            <span>{{ user }}</span>
        </div>
        <div class="flex justify-content-center align-items-center bottom-hold">
            <div v-if="proceeding">
                <svg xmlns="http://www.w3.org/2000/svg" width="259" height="5" viewBox="0 0 259 5">
                    <g transform="translate(-830.5 -590)">
                        <line class="progress-bg" x2="254" transform="translate(833 592.5)" fill="none" stroke="rgba(0,0,0,0.2)" stroke-linecap="round" stroke-width="5"/>
                        <line class="progress" :x2="progressFill" transform="translate(833 592.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="5"/>
                    </g>
                </svg>
            </div>
            <div v-else>
                <button class="button" @click="loadDashboard">Proceed to Dashboard</button>
            </div>
        </div>
    </div>
</template>
<script>
import jwt_decode from "jwt-decode";
import { mapGetters } from 'vuex'
import passwordToggleMixin from '../../mixins/passwordToggle'
import inputMixin from '../../mixins/inputMixin'
import axios from 'axios'
import Spinner from '../../components/app/includes/Spinner.vue'
import router from '../../router'
export default {
  components: { Spinner },
    name: 'SignUp',
    mixins: [passwordToggleMixin, inputMixin],
    computed: {
        ...mapGetters(['getHostname', 'getUser', 'getMobile', 'getOAuth'])
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: ''
            },
            validation: {
                rules: false,
                number: false,
                lowercase: false,
                uppercase: false,
                special: false,
                allCorrect: false,
                char: false,
                error: false,
                errors: '',
                message: ''
            },
            progressFill: 1,
            creating: false,
            created: false,
            proceeding: false,
        }
    },
    created() {
        let user = JSON.parse(localStorage.getItem('newUser'))
        if(user) {
            this.created = true
            this.user = user.name.split(' ')[0]
            this.form.email = user.email
            this.form.password = user.password
        }
        window.addEventListener('load', () => {
            window.google.accounts.id.initialize({
                client_id: this.getOAuth,
                context: "signup",
                callback: this.handleCredentialResponse
            });
            window.google.accounts.id.renderButton(
                document.getElementById("signup_button"),
                { theme: "outline", size: "large", shape: "pill", type: "standard", text: "continue_with" }
            );
        })
    },
    methods: {
        handleCredentialResponse(response) {
            const responsePayload = jwt_decode(response.credential)
            const user = { email: responsePayload.email, sub: responsePayload.sub, verified: responsePayload.email_verified, name: responsePayload.name, given_name: responsePayload.given_name, picture: responsePayload.picture, type: 'google' }
            this.signUpOAuthUser(user)
        },
        submitSignUp() {
            this.resertForm()
            this.creating = true
            if(this.checkForm() && this.checkPassword()){
                axios.post(this.getHostname+'/api/sign-up', this.form)
                .then((res) => {
                    this.creating = false
                    this.created = true
                    this.user = res.data.name.split(' ')[0]
                    localStorage.setItem('newUser', JSON.stringify(this.form))
                }).catch((err) => {
                    this.creating = false
                    if (err.response.status == 401) {
                        this.validation.error = true
                        this.validation.message = err.response.data.status
                    }if(err.response.status == 422){
                        this.validation.error = true
                        this.validation.errors = err.response.data.errors
                    }
                })
            }
        },
        signUpOAuthUser(user) { 
            this.creating = true
            this.$store.dispatch('signUpnOAuthUser', user)
            .then((res) => {
                // console.log(res.data)
                this.creating = false
                if(res.data.token !== null) {
                    this.$store.commit('signInSuccess', res.data.token)
                    this.created = true
                    this.user = res.data.user.name.split(' ')[0]
                    this.loadDashboard2()
                }
            }).catch((err) => {
                console.log(err.response.data)
                this.creating = false
            })
        },
        resertForm() {
            if (this.validation.error === true)
            this.validation.error = false
            this.validation.errors = ''
            this.validation.message = null
        },
        showPassRules() {
            this.validation.rules = true
            this.isFocusedIn('password_wrapper')
        },
        hidePassRules() {
            this.form.password == '' ? this.validation.rules = false : ''
            this.isFocusedOut('password_wrapper', 'passwordInput')
        },
        showErr(payload) {
            this.validation.error = true
            this.validation.errors = payload
        },
        checkForm: function() {
            const payload = { name: '', email: '', password: ''}
            if(this.form.name == '' ) {
                payload.name = ['Name field is required.']
            }
            if(this.form.email == '' ) {
                payload.email = ['Email field is required.']
            }
            if(this.form.password == '' || !this.checkPassword() ) {
                payload.password = ['Password field is required.']
            }
            if(payload.name !=='' || payload.email !=='' || payload.password !== '') {
                this.showErr(payload)
                this.creating = false
                return false
            }else {
                return true
            }
            
        },
        checkPassword: function() {
            let nums = /[0-9]/g
            let lowercase = /[a-z]/g
            let uppercase = /[A-Z]/g
            let special = /[!@#$^&%*()-]/g
            if(this.form.password.match(nums)) {
               this.validation.number = true
            } else {
                this.validation.number = false
            }
            if(this.form.password.match(lowercase)) {
               this.validation.lowercase = true
            } else {
                this.validation.lowercase = false
            }
            if(this.form.password.match(uppercase)) {
               this.validation.uppercase = true
            } else {
                this.validation.uppercase = false
            }
            if(this.form.password.match(special)) {
               this.validation.special = true
            } else {
                this.validation.special = false
            }
            if(this.form.password.length >= 6) {
               this.validation.char = true
            } else {
                this.validation.char = false
            }
            if(this.validation.number && this.validation.lowercase && this.validation.uppercase && this.validation.special && this.validation.char) {
                this.validation.allCorrect = true
                return true
            } else{
                this.validation.allCorrect = false
                this.creating = false
                return false
            }
        },
        loadDashboard() {
            this.proceeding = true
            var interval = setInterval(() => {
                    this.progressFill++
                if(this.progressFill === 250) {
                    this.submitSignin(this.form)
                }
                if (this.progressFill === 254) {
                    clearInterval(interval); //stop that interval
                }
            }, 30)
        },
        loadDashboard2() {
            this.proceeding = true
            var interval = setInterval(() => {
                this.progressFill++
                if ( this.progressFill === 254) {
                    clearInterval(interval)
                    router.push({ name: 'Dashboard'})
                }
            }, 20)
        },
        loaderFinish() {
            if (this.progressFill === 254) {
                router.push({ name: 'Dashboard'})
            }
        },
        async submitSignin(payload) {
            axios.post(this.getHostname+'/api/sign-in', payload)
            .then((res) => {
                this.$store.commit('setAuthToken', res.data.token)
                localStorage.setItem('token', res.data.token)
                this.$store.dispatch('getAuthUser')
                this.progressFill = 254
                localStorage.removeItem('newUser')
                this.loaderFinish()
            })
        }
    }
}
</script>
<style scoped lang="scss">

</style>
