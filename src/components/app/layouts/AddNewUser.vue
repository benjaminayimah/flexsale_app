<template>
    <teleport to="#add_title">
        <span v-if="getEditContainer.password">Reset Password</span>
        <span v-else-if="getEditContainer.active && getUser.id !== getEditContainer.data.id">Edit User</span>
        <span v-else-if="getUser.id == getEditContainer.data.id">Edit Profile</span>
        <span v-else>Add New User</span>
    </teleport>
    <teleport to="#add_submit_button">
        <button v-if="getEditContainer.password" class="button button-primary top-submit-btn" @click.prevent="doSubmitPassword">Save</button>
        <button v-else class="button button-primary top-submit-btn" @click.prevent="doSubmit">{{ getEditContainer.active ? 'Save' : 'Submit user'}}</button>
    </teleport>
    <teleport to="#add_master_body_container">
        <form id="product_form" @submit.prevent="" class="overlay-hero-form">
            <div class="form-row justify-content-center flex" v-if="getEditContainer.active && !getEditContainer.password && getUser.id === getEditContainer.data.id && getUser.role == 1">
                <div v-if="getStores.length > 0" class="justify-content-center align-items-center profile-pg-avatar" :class="getCurrentStore.image? 'bg-img': 'no-store-profile-large'" v-bind:style="getCurrentStore.image ? {backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/'+getCurrentStore.id+'/'+getCurrentStore.image+')'} : ''">{{ !getCurrentStore.image ? computeInitials: '' }}</div>
                <div v-else class="no-store-profile-large justify-content-center align-items-center">{{ computeInitials }}</div>
            </div>
            <div class="form-row" v-if="!getEditContainer.password">
                <label>Name:</label>
                <input v-model="form.name" type="text" name="name" class="form-control" placeholder="Full name" required>
            </div>
            <div class="form-row" v-if="!getEditContainer.password">
                <label>Email:</label>
                <input v-model="form.email" type="email" name="email" class="form-control" placeholder="example@gmail.com" required>
            </div>
            <div class="form-row" v-if="getUser.id !== getEditContainer.data.id && !getEditContainer.password">
                <label>Select Store:</label>
                <span class="sub-info">Your users (sellers) can only access the selected stores.</span>
                <ul>
                    <store-selected-check v-for="store in getStores" :key="store.id" v-bind:store="store" v-bind:checked="this.form.store" v-on:check="check" />
                </ul>
            </div>
            <div class="form-row" v-if="!getEditContainer.active">
                <label>Password:</label>
                <input v-model="form.password" type="password" name="password" class="form-control password-field"  placeholder="Enter password" required>
            </div>
            <div class="form-row" v-if="getEditContainer.active && getEditContainer.password && getUser.id === getEditContainer.data.id">
                <label>Current password:</label>
                <input v-model="form.password" @mousedown="resetError" :class="[{ 'err-exist-border':error.pass }, { 'input-disabled' : getUser.oauth && !getUser.has_pass }]" type="password" name="password" :disabled="getUser.oauth && !getUser.has_pass ? true : false" class="form-control password-field" placeholder="Current password" required>
                <div class="forgot-pass">
                    <div v-if="getUser.oauth && !getUser.has_pass" class="flex oauth-provider-wrap gap-8"><span>You are currently logged in with</span><span class="provider">{{ getUser.oauth_provider }}</span></div>
                    <a v-else href="#" class="">Forgot your password?</a>
                </div>
                <div v-if="error.pass" class="error-hold"><span class="error">{{ error.message }}</span></div>
            </div>
            <div class="form-row" v-if="getEditContainer.active && getEditContainer.password">
                <label>New password:</label>
                <input v-model="form.newPassword" type="password" name="password" class="form-control password-field" placeholder="New password" required>
            </div>
        </form>
    </teleport>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import StoreSelectedCheck from '../includes/StoreSelectedCheck.vue'
export default {
  components: { StoreSelectedCheck },
    name: 'AddNewUser',
    computed: {
        ...mapGetters(['getToken', 'getHostname', 'getStores', 'getEditContainer', 'getUser', 'getCurrentStore', 'getUserAdminID']),
        computeInitials() {
            if(this.getUser.name && this.getStores.length < 1) {
                let name = this.getUser.name.split(' ')
                let initial = name[0].charAt(0).toUpperCase() + (name[1] ? name[1].charAt(0).toUpperCase() : '')
                return initial
            }else if(this.getCurrentStore.name){
              let name = this.getCurrentStore.name.split(' ')
              let initial = name[0].charAt(0).toUpperCase() + (name[1] ? name[1].charAt(0).toUpperCase() : '')
              return initial
            }
            return ''
        }
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
                    if(err.response.status === 422) {
                        const payload = {
                            id: 'danger',
                            title: 'Error!',
                            body: err.response.data.message
                        }
                        this.$store.commit('showAlert', payload)
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
                    this.$store.commit('addToAdmins', res.data.admin)
                    const payload = {
                        id: 'success',
                        title: res.data.title,
                        body: res.data.message
                    }
                    this.$store.commit('showAlert', payload)
                    this.$store.commit('unsetMainHomeWidth', true)
                }).catch((err) => {
                    console.log(err.response)
                    if(err.response.status === 422) {
                        const payload = {
                            id: 'danger',
                            title: 'Error!',
                            body: err.response.data.message
                        }
                        this.$store.commit('showAlert', payload)
                    }
                })
            }
        },
        async doSubmitPassword() {
            let id = this.getEditContainer.data.id
            const putUrl = this.getHostname+'/api/reset-password/'+id+'?token='+this.getToken
                axios.put(putUrl, this.form,
                    {
                        headers: {
                            'Content-Type': ['application/json']
                        },
                    }
            ).then((res) => {
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
                console.log(err.data)
                if(err.response.status === 422) {
                    const payload = {
                        id: 'danger',
                        title: 'Error!',
                        body: err.response.data.message
                    }
                    this.$store.commit('showAlert', payload)
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
        },
        resetError() {
            if(this.error.pass) {
                this.error.pass = false
                this.error.message = ''
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