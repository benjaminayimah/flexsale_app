<template>
    <div v-if="!created" id="login_card">
        <div class="title">
            <h1>Welcome back!</h1>
            <span>Sign in to continue</span>
        </div>
        <!-- <div v-if="validation.error" class="validation-error">
            <span>{{ validation.message }}</span>
        </div> -->
        <form @submit.prevent="">
            <div class="form-row">
                <!-- <label>Email:</label> -->
                <input v-model="form.email" @mousedown="resertForm" type="email" name="email" class="form-control" placeholder="Enter email" :class="{ 'has-error' : validation.error && validation.errors.email}">
                <span class="validation-err" v-if="validation.error && validation.errors.email">
                    {{ validation.errors.email[0] }}
                </span>
            </div>
            <div class="form-row">
                <!-- <label>Password:</label> -->
                <input v-model="form.password"  @mousedown="resertForm" required type="password" name="password" class="form-control password-field" placeholder="Enter password" :class="{ 'has-error' : validation.error && validation.errors.password}">
                <span class="validation-err" v-if="validation.error && validation.errors.password">
                    {{ validation.errors.password[0] }}
                </span>
                <div class="forgot-pass">
                    <router-link :to="{ name: 'ForgotPassword'}">Forgot your password?</router-link>
                </div>
            </div>
                <button class="button button-primary logon-btn" @click.prevent="submitSignin" :class="{ 'button-disabled' : creating }" :disabled="creating? true : false">
                    <span>{{ creating ? 'Signing in' : 'Sign in'}}</span>
                    <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
                </button>
                <div class="or">
                    <div>
                        <span>Or</span><span class="hide-mob">continue with social sign-in</span>
                    </div>
                </div>
            <div class="flex social-signin">
                <button @click.prevent="">
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
                </button>
            </div>
            <div class="flex create-acct">
                <span>Don't have an account?</span><router-link :to="{ name: 'SignUp'}">Create account</router-link>
                <!--<router-link id="go_hm" :to="{ name: 'Home' }">Back Home</router-link>-->
            </div>
        </form>
    </div>
    <div v-else class="flex justify-content-center align-items-center flex-col after-created">
        <div v-if="computedUser">
            <h1>Hello!</h1>
            <span>{{ computedUser }}</span>
        </div>
        <div class="flex justify-content-center align-items-center bottom-hold">
            <div v-if="proceeding">
                <svg xmlns="http://www.w3.org/2000/svg" width="259" height="5" viewBox="0 0 259 5">
                    <g transform="translate(-830.5 -590)">
                        <line x2="254" transform="translate(833 592.5)" fill="none" stroke="rgba(0,0,0,0.2)" stroke-linecap="round" stroke-width="5"/>
                        <line :x2="progressFill" transform="translate(833 592.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="5"/>
                    </g>
                </svg>
                <!-- <div>{{ ((progressFill/254)*100).toFixed(0) }}%</div> -->
            </div>
            <div v-else>
                <button class="button" @click="loadDashboard">Proceed to Dashboard</button>
            </div>
        </div>
    </div>

</template>
<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import Spinner from '../../components/app/includes/Spinner.vue'
import router from '../../router'
export default {
  components: { Spinner },
    name: 'SignIn',
    computed: {
        ...mapGetters(['getHostname', 'getUser']),
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
              email: 'benjaminayimah@gmail.com',
              password: 'ajf1432#@!'
            },
            validation: {
                error: false,
                errors: '',
                message: ''
            },
            progressFill: 1,
            creating: false,
            created: false,
            proceeding: false,
            user: ''
        }
    },
    methods: {
        submitSignin() {
            this.resertForm()
            this.creating = true
            axios.post(this.getHostname+'/api/sign-in', this.form)
            .then((res) => {
                this.$store.commit('setAuthToken', res.data.token)
                localStorage.setItem('token', res.data.token)
                this.$store.dispatch('getAuthUser')
                this.created = true
                this.creating = false
                this.loadDashboard()
            }).catch((err) => {
                console.log(err.response.status)
                this.creating = false
                if (err.response.status == 401) {
                    this.validation.error = true
                    this.validation.message = err.response.data.status
                }if(err.response.status == 422){
                    this.validation.error = true
                    this.validation.errors = err.response.data.errors
                    this.validation.message = err.response.data.message
                }

            })
        },
        resertForm() {
            if (this.validation.error === true)
            this.validation.error = false
            this.validation.errors = ''
            this.validation.message = null
            this.creating = false
            return
        },
        loadDashboard() {
            this.proceeding = true
            var interval = setInterval(() => {
                    this.progressFill++
                if (this.progressFill === 254) {
                    clearInterval(interval)
                    router.push({ name: 'Dashboard'})
                }
            }, 20)
        },
    }
}
</script>
<style scoped lang="scss">

</style>
