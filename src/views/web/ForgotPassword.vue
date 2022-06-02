<template>
    <div id="login_card">
        <div class="title">
            <h1>Reset password</h1>
            <span>Enter your email to continue</span>
        </div>
        <form @submit.prevent="">
            <div class="form-row">
                <!-- <label>Email:</label> -->
                <input v-model="form.email"  type="email" name="email" class="form-control" placeholder="Enter email" :class="{ 'has-error' : validation.error && validation.errors.email}">
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