<template>
    <teleport to="#add_title">
        <span v-if="getEditContainer.password">Reset Password</span>
        <span v-else-if="getEditContainer.active && getUser.id !== getEditContainer.data.id">Edit User</span>
        <span v-else-if="getUser.id == getEditContainer.data.id">Edit Profile</span>
        <span v-else>Add New User</span>
    </teleport>
    <teleport to="#add_submit_button">
        <button v-if="getEditContainer.password" class="button button-primary top-submit-btn" @click.prevent="doSubmitPassword" :class="{ 'button-disabled' : submiting }" :disabled="submiting? true : false">
            {{ submiting ? 'Saving' : 'Save' }}
            <spinner v-if="submiting" v-bind:size="20" v-bind:white="true" />
        </button>
        <button v-else class="button button-primary top-submit-btn" @click.prevent="doSubmit" :class="{ 'button-disabled' : submiting }" :disabled="submiting? true : false">
            <span v-if="getEditContainer.active">{{ submiting? 'Saving' : 'Save' }}</span>
            <span v-else>{{ submiting ? 'Submitting' : 'Submit user' }}</span>
            <spinner v-if="submiting" v-bind:size="20" v-bind:white="true" />
        </button>
    </teleport>
    <teleport to="#add_master_body_container">
        <form id="product_form" @submit.prevent="" class="overlay-hero-form">
            <div class="form-row" v-if="!getEditContainer.password" :class="{ 'input-has-error' : validation.error && validation.errors.name }">
                <label>Name:</label>
                <input v-model="form.name" type="text" name="name" class="form-control" placeholder="Full name" required>
                <span class="span" v-if="validation.error && validation.errors.name">
                    {{ validation.errors.name[0] }}
                </span>
            </div>
            <div class="form-row" v-if="!getEditContainer.password" :class="{ 'input-has-error' : validation.error && validation.errors.email }">
                <label>Email:</label>
                <input v-model="form.email" type="email" name="email" class="form-control" placeholder="example@gmail.com" required>
                <span class="span" v-if="validation.error && validation.errors.email">
                    {{ validation.errors.email[0] }}
                </span>
            </div>
            <div class="form-row" v-if="getUser.id !== getEditContainer.data.id && !getEditContainer.password">
                <label>Select Store:</label>
                <span class="sub-info">Your users (sellers) can only access the stores you grant them access to. Please select from your stores below.</span>
                <ul>
                    <store-selected-check v-for="store in getStores" :key="store.id" v-bind:store="store" v-bind:checked="this.form.store" v-on:check="check" />
                </ul>
            </div>
            <div class="form-row" v-if="!getEditContainer.active" :class="{ 'input-has-error' : validation.error && validation.errors.password }">
                <label>Password:</label>
                <input v-model="form.password" type="password" name="password" class="form-control password-field"  placeholder="Enter password" required>
                <span class="span" v-if="validation.error && validation.errors.password">
                    {{ validation.errors.password[0] }}
                </span>
            </div>
            <div class="form-row" v-if="getEditContainer.active && getEditContainer.password && getUser.id === getEditContainer.data.id" :class="{ 'input-has-error' : validation.error && validation.errors.password }">
                <label>Current password:</label>
                <input v-model="form.password" :class="[{ 'err-exist-border':error.pass }, { 'input-disabled' : getUser.oauth && !getUser.has_pass }]" type="password" name="password" :disabled="getUser.oauth && !getUser.has_pass ? true : false" class="form-control password-field" placeholder="Current password" required>
                <span class="span" v-if="validation.error && validation.errors.password">
                    {{ validation.errors.password[0] }}
                </span>
                <div class="forgot-pass">
                    <div v-if="getUser.oauth && !getUser.has_pass" class="flex oauth-provider-wrap gap-8"><span>You are currently logged in with</span><span class="provider">{{ getUser.oauth_provider }}</span></div>
                    <!-- <a v-else href="#" class="">Forgot your password?</a> -->
                </div>
                <div v-if="error.pass" class="error-hold"><span class="error">{{ error.message }}</span></div>
            </div>
            <div class="form-row" v-if="getEditContainer.active && getEditContainer.password" :class="{ 'input-has-error' : validation.error && validation.errors.newPassword }">
                <label>New password:</label>
                <input v-model="form.newPassword" type="password" name="password" class="form-control password-field" placeholder="New password" required>
                <span class="span" v-if="validation.error && validation.errors.newPassword">
                    {{ validation.errors.newPassword[0] }}
                </span>
            </div>
        </form>
    </teleport>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import StoreSelectedCheck from '../includes/StoreSelectedCheck.vue'
import validationMixin from '../../../mixins/validationMixin'
import Spinner from '../includes/Spinner.vue'
export default {
  components: { StoreSelectedCheck, Spinner },
    name: 'AddNewUser',
    mixins: [ validationMixin ],
    computed: {
        ...mapGetters(['getToken', 'getHostname', 'getStores', 'getEditContainer', 'getUser'])
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                newPassword: '',
                store: []
            },
            error: { pass: false, message: ''}
        }
    },
    methods: {
        doSubmit() {
            this.submiting = true
            this.clearErrs()
            if(this.getEditContainer.active) {
                let id = this.getEditContainer.data.id
                const putUrl = this.getHostname+'/api/edit-admin-user/'+id+'?token='+this.getToken
                    axios.put(putUrl, this.form,
                        {
                            headers: {
                                'Content-Type': ['application/json']
                            },
                        }
                ).then((res) => {
                    this.submiting = false
                    if(this.getUser.id === this.getEditContainer.data.id ){
                        this.$store.commit('setUser', res.data.admin)
                    }else{
                        this.$store.commit('updateAdmins', res.data.admin)
                    }
                    const payload = {
                        id: 'success',
                        title: res.data.title,
                        body: res.data.message
                    }
                    this.$store.commit('showAlert', payload)
                    this.$store.commit('unsetMainHomeWidth', true)
                }).catch((err) => {
                    this.submiting = false
                    if(err.response.status === 422) {
                        this.validation.error = true
                        this.validation.errors = err.response.data.errors
                    }
                })
                   
            }else{
                axios.post(this.getHostname+'/api/create-admin-user?token='+this.getToken,
                        this.form,
                        {
                            headers: {
                                'Content-Type': ['application/json']
                            },
                        }
                ).then((res) => {
                    this.submiting = false
                    this.$store.commit('addToAdmins', res.data.admin)
                    const payload = {
                        id: 'success',
                        title: res.data.title,
                        body: res.data.message
                    }
                    this.$store.commit('showAlert', payload)
                    this.$store.commit('unsetMainHomeWidth', true)
                }).catch((err) => {
                    this.submiting = false
                    if(err.response.status === 422) {
                        this.validation.error = true
                        this.validation.errors = err.response.data.errors
                    }
                })
            }
        },
        async doSubmitPassword() {
            this.submiting = true
            this.clearErrs()
            let id = this.getEditContainer.data.id
            const putUrl = this.getHostname+'/api/reset-password/'+id+'?token='+this.getToken
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
                if(res.data.status == 1) {
                    this.$store.dispatch('resfreshUser')
                }
                if(res.status == 201){
                    this.error.pass = true
                    this.error.message = res.data.message
                }else{
                    this.$store.commit('showAlert', payload)
                    this.$store.commit('unsetMainHomeWidth', true)
                }
            }).catch((err) => {
                this.submiting = false
                if(err.response.status === 422) {
                    this.validation.error = true
                    this.validation.errors = err.response.data.errors
                }
            })
        },
        check(item) {
            let array = this.form.store
            if(array.length > 0){
                let check = array.filter(data => data.id == item.id)
                if(check == '') {
                    this.form.store.push(item)
                }else{
                    this.form.store = array.filter(data => data.id != item.id)
                }
            }else{
                this.form.store.push(item)
            }
        },
        preloadForEdit() {
            if(this.getEditContainer.active){
                this.form.name = this.getEditContainer.data.name
                this.form.email = this.getEditContainer.data.email
                if(this.getEditContainer.data.store_1 != null){
                    const newObj = {
                        id: this.getEditContainer.data.store_1
                    }
                this.check(newObj)
                }
                if(this.getEditContainer.data.store_2 != null){
                    const newObj = {
                        id: this.getEditContainer.data.store_2
                    }
                this.check(newObj)
                }
            }
        }
    },
    created() {
        this.preloadForEdit()
    },
}
</script>
<style scoped lang="scss">
.sub-info{
    color: $gray-color;
}
ul{
    margin-left: 0;
    padding: 0;
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
.profile-pg-avatar{
    height: 200px;
    width: 200px;
    border-radius: 50%;
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