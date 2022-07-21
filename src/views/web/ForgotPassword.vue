<template>
    <div id="login_card">
        <div class="title">
            <h1>Reset password</h1>
            <span>Enter your email to continue</span>
        </div>
        <!-- <div id="g_id_onload"
         data-client_id="749226126008-jhs808q75ioafn76o109qcuh4peav4jl.apps.googleusercontent.com"
         data-login_uri="http://localhost:8080"
         data-cancel_on_tap_outside="false">
      </div>
      <div class="g_id_signin"
         data-type="icon"
         data-size="large"
         data-theme="outline"
         data-text="signup_with"
         data-shape="pill"
         data-logo_alignment="left">
      </div> -->
        <form @submit.prevent="">
            <div class="form-row">
                <!-- <label>Email:</label> -->
                <input v-model="form.email"  type="email" name="email" class="form-control" placeholder="Enter email" :class="{ 'input-has-error' : validation.error && validation.errors.email}">
                <span class="validation-err" v-if="validation.error && validation.errors.email">
                    {{ validation.errors.email[0] }}
                </span>
            </div>
                <button class="button button-primary logon-btn" @click.prevent="sendEmail" :class="{ 'button-disabled' : creating }" :disabled="creating? true : false">
                    <span>{{ creating ? 'Please wait' : 'Continue'}}</span>
                    <spinner v-if="creating" v-bind:size="20" v-bind:white="true" />
                </button>
            <div class="flex create-acct">
                <router-link :to="{ name: 'SignIn'}">Go back</router-link>
            </div>
        </form>
    </div>
</template>
<script>
import Spinner from '../../components/app/includes/Spinner.vue'
export default {
  components: { Spinner },
    name: 'ForgotPassword',
    data() {
        return {
            form: {
              email: '',
            },
            validation: {
                error: false,
                errors: '',
                message: ''
            },
            creating: false,
        }
    },
    methods: {
        sendEmail() {
            this.creating = !this.creating
        }
    }
}
</script>
<style lang="scss" scoped>

</style>