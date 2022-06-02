<template>
    <div id="login_card" v-if="!created">
        <div class="title">
            <h1>Create Account</h1>
            <span>It only takes a minute</span>
        </div>
        <!-- <div v-if="validation.error" class="validation-error">
            <span>{{ validation.message }}</span>
        </div> -->
        <form @submit.prevent="">
            <div class="form-row">
                <input v-model="form.name" @mousedown="resertForm" type="text" name="name" class="form-control" placeholder="Full name" :class="{ 'has-error' : validation.error && validation.errors.name}">
                <span class="validation-err" v-if="validation.error && validation.errors.name">
                    {{ validation.errors.name[0] }}
                </span>
            </div>
            <div class="form-row">
                <input v-model="form.email" @mousedown="resertForm" type="email" name="email" class="form-control" placeholder="Email" :class="{ 'has-error' : validation.error && validation.errors.email}">
                <span class="validation-err" v-if="validation.error && validation.errors.email">
                    {{ validation.errors.email[0] }}
                </span>
            </div>
            <div class="form-row">
                <input v-model="form.password" @keyup="checkPassword" @focusin="showPassRules" @focusout="hidePassRules"  @mousedown="resertForm" required type="password" name="password" class="form-control password" placeholder="Enter password" :class="{ 'has-error' : validation.error && validation.errors.password}">
                <transition name="fade">
                    <div v-if="validation.rules || validation.errors.password" class="password-rules" :class="[{ 'all-correct' : validation.allCorrect},{ 'pass-has-error' : validation.error && validation.errors.password}]">
                        <div>Password must be a minimum of <strong :class="{ 'is-valid' : validation.char}">6 characters</strong> and must contain at least one of each of the following;</div>
                        <div class="flex align-items-center" :class="{'is-valid' : validation.number}">[<span class="this-bold">0-9</span>]<svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 29.25 29.25"><path fill="#C7C8CC" d="M18,3.375A14.625,14.625,0,1,0,32.625,18,14.623,14.623,0,0,0,18,3.375Zm7.488,10.582-9.4,9.443H16.08a1.27,1.27,0,0,1-.816.387,1.231,1.231,0,0,1-.823-.4L10.5,19.448a.28.28,0,0,1,0-.4L11.756,17.8a.272.272,0,0,1,.394,0l3.122,3.122,8.578-8.641a.278.278,0,0,1,.2-.084h0a.255.255,0,0,1,.2.084l1.23,1.273A.277.277,0,0,1,25.488,13.957Z" transform="translate(-3.375 -3.375)"/></svg></div>
                        <div class="flex align-items-center" :class="{'is-valid' : validation.lowercase}">[<span class="this-bold">a-z</span>]<svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 29.25 29.25"><path fill="#C7C8CC" d="M18,3.375A14.625,14.625,0,1,0,32.625,18,14.623,14.623,0,0,0,18,3.375Zm7.488,10.582-9.4,9.443H16.08a1.27,1.27,0,0,1-.816.387,1.231,1.231,0,0,1-.823-.4L10.5,19.448a.28.28,0,0,1,0-.4L11.756,17.8a.272.272,0,0,1,.394,0l3.122,3.122,8.578-8.641a.278.278,0,0,1,.2-.084h0a.255.255,0,0,1,.2.084l1.23,1.273A.277.277,0,0,1,25.488,13.957Z" transform="translate(-3.375 -3.375)"/></svg></div>
                        <div class="flex align-items-center" :class="{'is-valid' : validation.uppercase}">[<span class="this-bold">A-Z</span>]<svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 29.25 29.25"><path fill="#C7C8CC" d="M18,3.375A14.625,14.625,0,1,0,32.625,18,14.623,14.623,0,0,0,18,3.375Zm7.488,10.582-9.4,9.443H16.08a1.27,1.27,0,0,1-.816.387,1.231,1.231,0,0,1-.823-.4L10.5,19.448a.28.28,0,0,1,0-.4L11.756,17.8a.272.272,0,0,1,.394,0l3.122,3.122,8.578-8.641a.278.278,0,0,1,.2-.084h0a.255.255,0,0,1,.2.084l1.23,1.273A.277.277,0,0,1,25.488,13.957Z" transform="translate(-3.375 -3.375)"/></svg></div>
                        <div class="flex align-items-center" :class="{'is-valid' : validation.special}">Special characters. For example [<span class="this-bold">!, @, #, $, %, &, *</span>]<svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 29.25 29.25"><path fill="#C7C8CC" d="M18,3.375A14.625,14.625,0,1,0,32.625,18,14.623,14.623,0,0,0,18,3.375Zm7.488,10.582-9.4,9.443H16.08a1.27,1.27,0,0,1-.816.387,1.231,1.231,0,0,1-.823-.4L10.5,19.448a.28.28,0,0,1,0-.4L11.756,17.8a.272.272,0,0,1,.394,0l3.122,3.122,8.578-8.641a.278.278,0,0,1,.2-.084h0a.255.255,0,0,1,.2.084l1.23,1.273A.277.277,0,0,1,25.488,13.957Z" transform="translate(-3.375 -3.375)"/></svg></div>
                    </div>
                </transition>
            </div>
                <button class="button button-primary logon-btn" @click.prevent="submitSignUp">
                <span>{{ creating ? 'Creating account' : 'Create Account'}}</span>
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
                <span>Already have an account?</span><router-link :to="{ name: 'SignIn'}">Sign in</router-link>
                <!--<router-link id="go_hm" :to="{ name: 'Home' }">Back Home</router-link>-->
            </div>
        </form>
    </div>
    <div v-else class="flex justify-content-center align-items-center flex-col after-created">
        <div>
            <h1>Hello!</h1>
            <span>{{ user }}</span>
        </div>
        <div class="flex justify-content-center align-items-center bottom-hold">
            <div v-if="proceeding">
                <svg xmlns="http://www.w3.org/2000/svg" width="259" height="5" viewBox="0 0 259 5">
                    <g transform="translate(-830.5 -590)">
                        <line x2="254" transform="translate(833 592.5)" fill="none" stroke="rgba(0,0,0,0.2)" stroke-linecap="round" stroke-width="5"/>
                        <line :x2="progressFill" transform="translate(833 592.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="5"/>
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
import { mapGetters } from 'vuex'
import axios from 'axios'
import Spinner from '../../components/app/includes/Spinner.vue'
import router from '../../router'
export default {
  components: { Spinner },
    name: 'SignUp',
    computed: {
        ...mapGetters(['getHostname', 'getUser'])
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
            user: ''
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
    },
    methods: {
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
                    console.log(err.response.data)
                })
            }
        },
        resertForm() {
            if (this.validation.error === true)
            this.validation.error = false
            this.validation.message = null
        },
        showPassRules() {
            this.validation.rules = true
        },
        hidePassRules() {
            this.form.password == '' ? this.validation.rules = false : ''
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
                if (this.progressFill === 250) {
                    clearInterval(interval); //stop that interval
                }
            }, 30)
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
        },
    }
}
</script>
<style scoped lang="scss">
#login_card{
    padding: 60px 40px;
    background-color: $white-color;
    border-radius: 24px;
.form-row{
    margin-bottom: 20px;
}
.create-acct{
    flex-wrap: wrap;
    margin-top: 20px;
    text-align: center;
    justify-content: center;
    font-weight: 500;
    a{
        font-weight: 600;
        color: $primary-color;
        text-decoration: none;
        &:hover{
            text-decoration: underline;
        }
    }
    span{
        margin-right: 5px;
    }
}
.password-rules{
    padding: 10px;
    font-size: 14px;
    background-color: $dark-light;
    border-radius: 8px;
    margin-top: 8px;
    border: 1px solid #e6e7eb;
    .this-bold{
        font-weight: 600;
        margin: 0 4px;
    }
    svg{
        margin-left: 8px;
    }
    .is-valid{
        color: #189f38;
        path {
            fill: #189f38;
        }
    }
}
.all-correct{
    background-color: #f0f7f1;
    color: #0f6824;
    border-color: #e0eee4;
}
.has-error{
    border-color: $danger;
}
.pass-has-error{
    color: $danger;
    background-color: rgba(230, 50, 50, 0.05);
    border-color: #fce9e9;
    svg path{
        fill: rgba(230, 50, 50, 0.1);
    }
}

// .validation-error {
//     padding: 15px;
//     border-radius: 6px;
//     background-color: rgba(230, 50, 50, 0.1);
//     // border: 1px solid rgba(230, 50, 50, 0.5);
//     color: $danger;
//     margin-bottom: 20px;
//     & span{
//         font-size: 14px;
//     }
// }
.validation-err{
    color: $danger;
    padding-top: 8px;
    display: flex;
    font-size: 14px;
}

.hide-mob{
    margin-left: 5px;
}
button{
    width: 100%;
    line-height: 2.5;
}
.title{
        text-align: center;
        margin-bottom: 40px;
        h1{
            margin: 0;
            font-weight: 700;
            text-align: center;
            padding-bottom: 10px;
            font-size: 1.8rem;
        }
        span{
            font-weight: 500;
            color: $gray-color;
            font-size: 1.1rem;
        }
    }
    .social-signin{
    flex-direction: row;
    button{
        box-shadow: 0 1px 3px 0 rgb(14 20 44 / 15%);
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 52px;
        border-radius: 14px;
        //border: 2px solid $gray-light;
        background-color: $white-color;
        &:first-child{
            margin-right: 8px;
        }
        &:last-child{
            margin-left: 8px;
        }
        &:hover{
            background-color: $primary-light;
            border-color: $primary-color;
            span{
                color:$primary-color;
            }
            path{
                fill: $primary-color ;
            }
        }
        svg{
        margin-right: 10px
        }
        span{
            font-weight: 600;
            color: $dark;
        }
    }
    
    }
    .password{
        font-family: 'Helvetica', sans-serif;
    }
    .show-mob{
        display: none;
    }
}

@media screen and (max-width: 499px){
    .show-mob{
        display: block;
        margin-right: 5px;
    }
    .hide-mob{
        display: none;
    }
    
    .social-signin{
        flex-direction: column !important;
        button{
            &:first-child{
            margin-right: 0 !important;
            margin-bottom: 15px;
            }
            &:last-child{
                margin-left: 0 !important;
            }
        }
    }
    .or div{
         background-color: $primary-light;
    }
   
    #login_card{
       background-color: transparent;
        padding: 0;
        
        .title{
            h1{
                font-size: 1.6rem;
                    padding-bottom: 5px;
            }
        }
        .form-control{
            border-radius: 0;
            background-color: transparent;
            border: none;
            border-bottom: 1px solid $gray-color;
            padding-left: 0;
            transition: all 0.1s linear;
            box-shadow: none;
            height: 50px;
            &:focus{
                border-bottom-width: 2px;
                border-bottom-color: $primary-color;
            }
        }

    }
  
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
