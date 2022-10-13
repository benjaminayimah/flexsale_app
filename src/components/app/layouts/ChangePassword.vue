<template>
    <div id="changepass_hold">
        <h3>Change your password</h3>
        <form @submit.prevent="doSubmitPassword">
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.password }">
                <label>Current password:</label>
                <input v-model="form.password" :class="[{ 'err-exist-border':error.pass }, { 'input-disabled' : getUser.oauth && !getUser.has_pass }]" type="password" name="password" :disabled="getUser.oauth && !getUser.has_pass ? true : false" class="form-control password-field" placeholder="Current password" >
                <span class="span" v-if="validation.error && validation.errors.password">
                    {{ validation.errors.password[0] }}
                </span>
                <div class="forgot-pass">
                    <div v-if="getUser.oauth && !getUser.has_pass" class="flex oauth-provider-wrap gap-8"><span>You are currently logged in with</span><span class="provider">{{ getUser.oauth_provider }}</span></div>
                    <!-- <a v-else href="#" class="">Forgot your password?</a> -->
                </div>
                <div v-if="error.pass" class="error-hold"><span class="error">{{ error.message }}</span></div>
            </div>
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.newPassword }">
                <label>New password:</label>
                <input v-model="form.newPassword" type="password" name="password" class="form-control password-field" placeholder="New password" >
                <span class="span" v-if="validation.error && validation.errors.newPassword">
                    {{ validation.errors.newPassword[0] }}
                </span>
            </div>
            <button class="button button-primary add-sale-btn gap-4" :class="{ 'button-disabled' : submiting }" :disabled="submiting? true : false">
                {{ submiting ? 'Saving password' : 'Save password' }}
                <spinner v-if="submiting" v-bind:size="20" v-bind:white="true" />
            </button>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
import validationMixin from '../../../mixins/validationMixin'
import { mapGetters } from 'vuex';
import Spinner from '../includes/Spinner.vue';
export default {
    name: "ChangePassword",
    components: { Spinner },
    computed: mapGetters(['getUser', 'getToken', 'getHostname']),
    mixins: [validationMixin],
    data() {
        return {
            form: {
                password: "",
                newPassword: "",
            },
            error: { pass: false, message: "" }
        };
    },
    methods: {
        async doSubmitPassword() {
            this.submiting = true
            this.clearErrs()
            this.clearThisErr()
            const putUrl = this.getHostname+'/api/reset-password/'+this.getUser.id+'?token='+this.getToken
                axios.put(putUrl, this.form,
                    {
                        headers: {
                            'Content-Type': ['application/json']
                        },
                    }
            ).then((res) => {
                this.submiting = false
                const payload = {
                    id: 'success',
                    title: res.data.title,
                    body: res.data.message
                }
                if(res.status == 201){
                    this.error.pass = true
                    this.error.message = res.data.message
                }else{
                    this.clearForm()
                    this.$store.commit('showAlert', payload)
                }
            }).catch((err) => {
                this.submiting = false
                if(err.response.status === 422) {
                    this.validation.error = true
                    this.validation.errors = err.response.data.errors
                }
            })
        },
        clearForm() {
            this.form.newPassword = ''
            this.form.password = ''
        },
        clearThisErr() {
            this.error.pass = false
            this.error.message = ''
        }
    },
}
</script>
<style lang="scss" scoped>
h3 {
    margin: 0 0 40px 0;
}
#changepass_hold{
    padding: 0 60px;
}
.forgot-pass{
    padding-top: 10px;
    a{
        color: #566ff4;
        font-weight: 500;
        font-size: 0.9rem;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
}
.oauth-provider-wrap{
    .provider{
        text-transform: capitalize;
        font-weight: 600;
    }
}
.error-hold{
    margin-top: 5px;
    .error{
        color: $danger;
        font-size: 0.97rem;
        font-weight: 500;
    }
}
.err-exist-border{
    border-color: $danger !important;
}
</style>