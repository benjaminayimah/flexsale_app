<template>
    <div id="login_card">
        <div class="title">
            <h1>{{ emailSent ? 'Check your email!' : 'Forgot password' }}</h1>
            <span v-if="!emailSent">Enter your email to continue</span>
        </div>
        <form v-if="!emailSent" @submit.prevent="forgotPassword">
            <div class="form-row">
                <!-- <label>Email:</label> -->
                <input v-model="form.email"  type="email" name="email" class="form-control" placeholder="Enter email" :class="{ 'input-has-error' : validation.error && validation.errors.email}">
                <span class="validation-err" v-if="validation.error && validation.errors.email">
                    {{ validation.errors.email[0] }}
                </span>
            </div>
                <button class="button button-primary logon-btn" :class="{ 'button-disabled' : creating }" :disabled="creating? true : false">
                    <span>{{ creating ? 'Please wait' : 'Continue'}}</span>
                    <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
                </button>
        </form>
        <div v-else class="email-sent">
            <p>An email is sent to <strong>{{ form.email }}</strong>, open the mail and follow the link to reset your password.</p>
            <p><span>Email not received?</span><a href="#" @click.prevent="toggleBack">Resend</a></p>
        </div>
        <div class="flex create-acct">
            <router-link :to="{ name: 'SignIn'}">Back to Sign in page</router-link>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Spinner from '../../components/app/includes/Spinner.vue'
import { mapGetters } from 'vuex'
export default {
  components: { Spinner },
    name: 'ForgotPassword',
    computed: mapGetters(['getHostname', '']),
    data() {
        return {
            form: {
              email: '',
            },
            emailSent: true,
            validation: {
                error: false,
                errors: '',
                message: ''
            },
            creating: false,
        }
    },
    methods: {
        async forgotPassword() {
            this.creating = true
            try {
                const res = await axios.post(this.getHostname+'/api/forgot-password', this.form)
                res.data.email ? this.emailSent = true : ''
            } catch (e) {
                console.log(e.response.data)
            }
            this.creating = false

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