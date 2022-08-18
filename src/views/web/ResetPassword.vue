<template>
<div>
    <div v-if="!getSignInStatus.created" id="login_card">
        <div class="title">
            <h1>Almost done!</h1>
            <span>Enter your new password</span>
        </div>
        <div v-if="userError.error" class="invalid-credentials">
            <span>{{ userError.message }}</span>
            <div class="forgot-pass">
                    <router-link :to="{ name: 'ForgotPassword'}">Forgot password.</router-link>
                </div>
        </div>
        
        <form @submit.prevent="doSubmit">
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.email}">
                <div class="input-wrapper" id="email_wrapper">
                    <label for="emailInput">Email</label>
                    <input autocomplete="off" id="emailInput" v-model="form.email" @input="isFocusedIn('email_wrapper')" @focusin="isFocusedIn('email_wrapper')" @focusout="isFocusedOut('email_wrapper', 'emailInput')" type="email" name="email" class="form-control">
                </div>
                <span class="span" v-if="validation.error && validation.errors.email">
                    {{ validation.errors.email[0] }}
                </span>
            </div>
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.password}">
                <div class="input-wrapper" id="password_wrapper">
                    <label for="passwordInput">New password</label>
                    <input id="passwordInput" autocomplete="new-password" v-model="form.password" @focusin="isFocusedIn('password_wrapper')" @focusout="isFocusedOut('password_wrapper', 'passwordInput')" required :type="showPass ? 'text' : 'password'" name="password" class="form-control password-field">
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
            </div>
             <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.password}">
                <!--  -->
                <div class="input-wrapper" id="confirm_pass_wrapper">
                    <label for="confirmPassInput">Confirm password</label>
                    <input id="confirmPassInput" autocomplete="new-password" v-model="form.password_confirmation" @focusin="isFocusedIn('confirm_pass_wrapper')" @focusout="isFocusedOut('confirm_pass_wrapper', 'confirmPassInput')" required :type="showPass ? 'text' : 'password'" name="password" class="form-control password-field">
                    <i class="hide-show-pass" :class="{ 'hide-pass-active' : showPass }" @click="togglePass">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 26.364 26.364">
                        <g transform="translate(1.182 1.182)">
                            <path d="M16027.619-15079.234a21.431,21.431,0,0,1-4.111-4.4,2.816,2.816,0,0,1,0-3.226,21.339,21.339,0,0,1,4.111-4.406,11.5,11.5,0,0,1,7.129-2.734,11.516,11.516,0,0,1,7.132,2.734,21.4,21.4,0,0,1,4.107,4.4,2.822,2.822,0,0,1,0,3.229,21.4,21.4,0,0,1-4.107,4.4,11.51,11.51,0,0,1-7.132,2.734A11.492,11.492,0,0,1,16027.619-15079.234Zm.927-10.853a19.948,19.948,0,0,0-3.813,4.087,1.32,1.32,0,0,0,0,1.5,19.8,19.8,0,0,0,3.81,4.084,10.018,10.018,0,0,0,6.2,2.412,10.015,10.015,0,0,0,6.2-2.412,19.886,19.886,0,0,0,3.814-4.088,1.322,1.322,0,0,0,0-1.5,19.9,19.9,0,0,0-3.81-4.083,10.011,10.011,0,0,0-6.2-2.413A10.013,10.013,0,0,0,16028.546-15090.087Zm1.454,4.836a4.754,4.754,0,0,1,4.748-4.748,4.758,4.758,0,0,1,4.752,4.748,4.758,4.758,0,0,1-4.752,4.752A4.754,4.754,0,0,1,16030-15085.251Zm1.5,0a3.253,3.253,0,0,0,3.25,3.25,3.253,3.253,0,0,0,3.249-3.25,3.253,3.253,0,0,0-3.249-3.25A3.253,3.253,0,0,0,16031.5-15085.251Z" transform="translate(-16022.748 15097.25)" fill="#7e8596"/>
                            <path v-if="showPass" d="M0,22.121-2.121,20,20-2.121,22.121,0Z" transform="translate(2 2)" fill="#7e8596" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                        </g>
                    </svg>
                </i>
                </div>
            </div>
            <button class="button button-primary logon-btn" :class="{ 'button-disabled' : getSignInStatus.creating }" :disabled="getSignInStatus.creating? true : false">
                <span>{{ getSignInStatus.creating ? 'Resetting password, please wait' : 'Reset password'}}</span>
                <spinner v-if="getSignInStatus.creating" v-bind:size="20" v-bind:white="true" />
            </button>
            <span class="disclaimer">This application is protected by Flexsale's <a href="https://www.flexsale.store/terms-and-conditions">Terms</a>, <a href="https://www.flexsale.store/privacy-policy">Privacy policy</a> & <a href="https://www.flexsale.store/cookies-policy">Cookie policy.</a></span>
        </form>
    </div>
    <div v-else class="flex justify-content-center align-items-center flex-col after-created" :class="{ 'progress-secondary' : getMobile }">
        <!-- <div v-if="computedUser">
            <h1>Hello!</h1>
            <span>{{ computedUser }}</span>
        </div> -->
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
</div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Spinner from '../../components/app/includes/Spinner.vue'
import passwordToggle from '../../mixins/passwordToggle'
import inputMixin from '../../mixins/inputMixin'
export default {
    name: 'ResetPassword',
    mixins: [passwordToggle, inputMixin],
    computed: mapGetters(['getMobile', 'getSignInStatus', 'getHostname']),
    components: { Spinner },
    data() {
        return {
            form: {
                email: '',
                password: '',
                password_confirmation: '',
                token: ''
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
    methods: {
        async doSubmit () {
            this.clearErr()
            this.$store.commit('setCreating')
            try {
                const res = await axios.post(this.getHostname+'/api/reset-forgotten-password', this.form)
                this.setSuccessRes(res.data.token)
            } catch (err) {
                console.log(err.response)
                if (err.response.status == 401) {
                    this.userError.error = true
                    this.userError.message = err.response.data.status
                }
                if(err.response.status == 422){
                    this.validation.error = true
                    this.validation.errors = err.response.data.errors
                    this.validation.message = err.response.data.message
                }
            }
            this.$store.commit('unSetCreating')
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
        setSuccessRes(token) {
            this.$store.commit('signInSuccess', token)
            this.$store.commit('setCreated')
            this.$store.commit('loadDashboard')
        },
    },
    created() {
        this.form.email = this.$route.params.email
        this.form.token = this.$route.params.token
    }
}
</script>
<style lang="scss" scoped>
#login_card .forgot-pass {
    text-align: left;
    padding-top: 8px;
}
</style>