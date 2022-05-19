<template>
    <div id="login_card">
        <div class="title">
            <h1>Create Account</h1>
        </div>
        <div v-if="validation.error" class="validation-error">
            <span>{{ validation.message }}</span>
        </div>
        <form @submit.prevent="">
        <div class="form-row">
            <div class="form-row">
                <!-- <label>Email:</label> -->
                <input v-model="form.name" @mousedown="resertForm" type="text" name="name" class="form-control" placeholder="Full name">
                <span class="validation-err" v-if="validation.error && validation.errors.name">
                    {{ validation.errors.name[0] }}
                </span>
            </div>
            <!-- <label>Email:</label> -->
            <input v-model="form.email" @mousedown="resertForm" type="email" name="email" class="form-control" placeholder="Email">
            <span class="validation-err" v-if="validation.error && validation.errors.email">
                {{ validation.errors.email[0] }}
            </span>
        </div>
        <div class="form-row">
            <!-- <label>Password:</label> -->
            <input v-model="form.password"  @mousedown="resertForm" required type="password" name="password" class="form-control password" placeholder="Enter password">
            <span class="validation-err" v-if="validation.error && validation.errors.password">
                {{ validation.errors.password[0] }}
            </span>
        </div>
            <button class="button button-primary" @click.prevent="submitSignin">Create Account</button>
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
</template>
<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    name: 'SignUp',
    computed: mapGetters(['getHostname']),
    data() {
        return {
            form: {
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                password: 'Sha!@#$dow1432Fs'
            },
            validation: {
                error: false,
                errors: [],
                message: ''
            }
        }
    },
    methods: {
        submitSignin() {
            this.resertForm()
            axios.post(this.getHostname+'/api/sign-up', this.form)
            .then((res) => {
                console.log(res.data)
                //this.$store.commit('setAuthToken', res.data.token)
                //localStorage.setItem('token', res.data.token)
                //location.reload()
                // this.$router.push({ name: 'SignIn', replace: true })

            }).catch((err) => {
                
                if (err.response.status == 401) {
                    this.validation.error = true
                    this.validation.message = err.response.data.status
                }if(err.response.status == 422){
                    this.validation.error = true
                    this.validation.errors = err.response.data.errors
                    this.validation.message = err.response.data.message
                }
                console.log(err)

            })
        },
        resertForm() {
            if (this.validation.error === true)
            this.validation.error = false
            this.validation.message = null
            return
        }
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


.validation-error {
    padding: 15px;
    border-radius: 6px;
    background-color: rgba(230, 50, 50, 0.1);
    border: 1px solid rgba(230, 50, 50, 0.5);
    color: $danger;
    margin-bottom: 20px;
    & span{
        font-size: 0.9rem;
    }
}
.validation-err{
    color: $danger;
    padding-top: 8px;
    display: flex;
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


</style>
