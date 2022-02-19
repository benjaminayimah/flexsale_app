<template>
  <section id="login_page" :class="{ 'mob-view': getMobile}">
      <div class="container-fluid">
          <div class="container">
              <div class="login-wrapper">
                  <header>
                    <svg id="large-logo" xmlns="http://www.w3.org/2000/svg" width="197.728" height="34.824" viewBox="0 0 197.728 34.824">
                        <path d="M16316.071-7712.557l-.025-.025,11.84-11.84a6.066,6.066,0,0,0,1.792-4.329,6.073,6.073,0,0,0-1.792-4.329l-13.346-13.346h6.327a3.259,3.259,0,0,1,2.31.956l10.66,10.76c3.5,3.824,2.487,9.8-.174,12.154l-9.957,10c-.637.637-2.227.956-3.815.956S16316.708-7711.919,16316.071-7712.557Zm-9.713-.608-14.107-14.1a1.521,1.521,0,0,1-.443-1.067v-16.43a1.508,1.508,0,0,1,1.511-1.506h16.425a1.505,1.505,0,0,1,1.068.443l14.111,14.112a4.758,4.758,0,0,1,1.395,3.381,4.757,4.757,0,0,1-1.395,3.381v0l-11.777,11.778a4.78,4.78,0,0,1-3.394,1.4A4.786,4.786,0,0,1,16306.358-7713.165Zm167.661-2.454a10.914,10.914,0,0,1-3.754-3.948,10.944,10.944,0,0,1-1.4-5.487,11.193,11.193,0,0,1,.807-4.259,11.165,11.165,0,0,1,2.23-3.484,10.34,10.34,0,0,1,3.307-2.354,9.679,9.679,0,0,1,4.023-.849,9.765,9.765,0,0,1,4.3.944,9.886,9.886,0,0,1,3.361,2.624,11.245,11.245,0,0,1,2.094,3.894,12.653,12.653,0,0,1,.508,4.751h-16.916a7.468,7.468,0,0,0,1.158,3.141,6.826,6.826,0,0,0,2.334,2.189,6.411,6.411,0,0,0,3.162.828,6.188,6.188,0,0,0,3.381-.964,7.22,7.22,0,0,0,2.445-2.645l3.547.832a10.855,10.855,0,0,1-3.758,4.507,9.555,9.555,0,0,1-5.615,1.755A9.639,9.639,0,0,1,16474.02-7715.619Zm2.02-16.421a7.15,7.15,0,0,0-2.4,2.289,7.518,7.518,0,0,0-1.166,3.228h13.516a6.83,6.83,0,0,0-1.117-3.187,7.443,7.443,0,0,0-2.426-2.309,6.192,6.192,0,0,0-3.215-.874A6.207,6.207,0,0,0,16476.039-7732.04Zm-34.709,17.034a11.327,11.327,0,0,1-3.518-2.384,11.125,11.125,0,0,1-2.371-3.518,10.8,10.8,0,0,1-.848-4.292,10.649,10.649,0,0,1,.828-4.188,10.665,10.665,0,0,1,2.313-3.452,10.823,10.823,0,0,1,3.432-2.321,10.365,10.365,0,0,1,4.166-.84,8,8,0,0,1,4.32,1.15,8.989,8.989,0,0,1,2.98,2.976l-.129-3.546h3.484v20.733h-3.5l-.125-3.5a7.98,7.98,0,0,1-2.682,2.922,7.231,7.231,0,0,1-4.055,1.122A10.733,10.733,0,0,1,16441.33-7715.006Zm.27-16.558a7.32,7.32,0,0,0-2.623,2.777,7.4,7.4,0,0,0-.861,3.877,7.586,7.586,0,0,0,1.162,3.733,7.933,7.933,0,0,0,2.748,2.665,7.161,7.161,0,0,0,3.68.985,6.067,6.067,0,0,0,3.566-1.039,6.475,6.475,0,0,0,2.268-2.777,8.477,8.477,0,0,0,.7-3.857,8.64,8.64,0,0,0-.973-3.753,7.123,7.123,0,0,0-2.4-2.665,6.341,6.341,0,0,0-3.525-.985A6.956,6.956,0,0,0,16441.6-7731.564Zm-63.813,15.945a10.9,10.9,0,0,1-3.753-3.948,10.985,10.985,0,0,1-1.4-5.487,11.1,11.1,0,0,1,.812-4.259,11.119,11.119,0,0,1,2.227-3.484,10.373,10.373,0,0,1,3.307-2.354A9.706,9.706,0,0,1,16383-7736a9.784,9.784,0,0,1,4.3.944,9.917,9.917,0,0,1,3.359,2.624,11.314,11.314,0,0,1,2.1,3.894,12.575,12.575,0,0,1,.5,4.751h-16.918a7.514,7.514,0,0,0,1.163,3.141,6.858,6.858,0,0,0,2.33,2.189,6.44,6.44,0,0,0,3.166.828,6.169,6.169,0,0,0,3.376-.964,7.192,7.192,0,0,0,2.447-2.645l3.545.832a10.8,10.8,0,0,1-3.752,4.507,9.555,9.555,0,0,1-5.616,1.755A9.642,9.642,0,0,1,16377.786-7715.619Zm2.023-16.421a7.156,7.156,0,0,0-2.4,2.289,7.59,7.59,0,0,0-1.172,3.228h13.52a6.857,6.857,0,0,0-1.121-3.187,7.38,7.38,0,0,0-2.424-2.309,6.174,6.174,0,0,0-3.212-.874A6.21,6.21,0,0,0,16379.81-7732.04Zm44.228,17.75a10.754,10.754,0,0,1-3.266-.633,9.22,9.22,0,0,1-2.781-1.556,5.924,5.924,0,0,1-1.73-2.271l2.988-1.283a3.519,3.519,0,0,0,1.117,1.324,6.681,6.681,0,0,0,1.867,1,6.4,6.4,0,0,0,2.135.373,6.313,6.313,0,0,0,2.135-.352,3.916,3.916,0,0,0,1.631-1.047,2.4,2.4,0,0,0,.629-1.668,2.025,2.025,0,0,0-.689-1.63,5.164,5.164,0,0,0-1.742-.931c-.7-.228-1.408-.447-2.129-.654a23.112,23.112,0,0,1-3.814-1.3,7.133,7.133,0,0,1-2.641-1.928,4.555,4.555,0,0,1-.969-3,5.345,5.345,0,0,1,1.072-3.34,6.955,6.955,0,0,1,2.807-2.177,9.139,9.139,0,0,1,3.732-.766,9.756,9.756,0,0,1,4.584,1.076,7.187,7.187,0,0,1,3.088,2.926l-2.8,1.639a3.666,3.666,0,0,0-1.08-1.32,5.93,5.93,0,0,0-1.66-.9,6.159,6.159,0,0,0-1.908-.352,6.351,6.351,0,0,0-2.246.311,3.817,3.817,0,0,0-1.68,1.068,2.577,2.577,0,0,0-.635,1.775,1.909,1.909,0,0,0,.676,1.577,5.113,5.113,0,0,0,1.762.856c.725.215,1.52.463,2.377.737a27.229,27.229,0,0,1,3.521,1.39,7.954,7.954,0,0,1,2.645,1.97,4.285,4.285,0,0,1,.984,2.926,5.153,5.153,0,0,1-1.143,3.327,7.182,7.182,0,0,1-2.955,2.164,9,9,0,0,1-3.48.674Q16424.239-7714.283,16424.037-7714.291Zm37.281-.4v-28.84h3.465v28.84Zm-51.691,0-5.434-7.461-5.455,7.461h-6.555l7.59-10.408-7.545-10.367h6.551l5.414,7.383,5.393-7.383h6.555l-7.549,10.367,7.586,10.408Zm-44.537,0v-28.84h3.46v28.84Zm-20.282,0v-29.026h17.025v3.484h-13.541v8.252h11.551v3.48h-11.551v13.81Z" transform="translate(-16291.808 7746.425)" fill="#fff"/>
                    </svg>
                    <svg id="mini-logo" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 386 386">
                        <g id="logo-icon" transform="translate(-750 -810)">
                            <rect id="Rectangle_2449" data-name="Rectangle 2449" width="386" height="386" rx="193" transform="translate(750 810)" fill="#566ff4"/>
                            <path id="Path_1701" data-name="Path 1701" d="M114.208-1118.587l-.114-.119,55.723-55.724a28.624,28.624,0,0,0,8.439-20.376,28.624,28.624,0,0,0-8.439-20.372L106.994-1278h29.793a15.375,15.375,0,0,1,10.864,4.5l50.172,50.638c16.5,17.995,11.709,46.115-.809,57.223l-46.874,47.056c-3,3-10.485,4.5-17.966,4.5S117.208-1115.588,114.208-1118.587ZM68.5-1121.464,2.084-1187.8A7.086,7.086,0,0,1,0-1192.822v-77.324a7.1,7.1,0,0,1,7.1-7.1H84.424a7.1,7.1,0,0,1,5.019,2.079l66.416,66.42a.052.052,0,0,1,.017.014,22.412,22.412,0,0,1,6.558,15.907,22.418,22.418,0,0,1-6.558,15.907l-.017.016-55.439,55.44a22.421,22.421,0,0,1-15.962,6.612,22.429,22.429,0,0,1-15.958-6.613Z" transform="translate(838.862 2199.105)" fill="#fff"/>
                        </g>
                    </svg>

                  </header>
                  
                  <div id="login_card">
                      <div class="title">
                          <h1>Welcome back!</h1>
                          <span>Provide your email and password</span>
                      </div>
                        <div v-if="validation.error" class="validation-error">
                          <span>{{ validation.message }}</span>
                        </div>
                    <form action="">
                      <div class="form-row">
                          <label>Email:</label>
                          <input v-model="form.email" @mousedown="resertForm" type="email" name="email" class="form-control">
                          <span class="validation-err" v-if="validation.error && validation.errors.email">
                              {{ validation.errors.email[0] }}
                          </span>
                      </div>
                      <div class="form-row">
                          <label>Password:</label>
                          <input v-model="form.password"  @mousedown="resertForm" required type="password" name="password" class="form-control">
                          <span class="validation-err" v-if="validation.error && validation.errors.password">
                              {{ validation.errors.password[0] }}
                          </span>
                          <div class="forgot-pass">
                              <a href="">Forgot password?</a>
                          </div>
                      </div>
                        <button class="button button-primary" @click.prevent="submitSignin">Login</button>
                      <div class="flex create-acct">
                          <span>Don't have an account?</span><a href="">Create Account</a>
                        <!--<router-link id="go_hm" :to="{ name: 'Home' }">Back Home</router-link>-->
                    </div>
                    
                  </form>
                  </div>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
//import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    name: 'Login',
    computed: mapGetters(['getHostname', 'getMobile']),
    data() {
        return {
            form: {
              email: 'benjaminayimah@gmail.com',
              password: 'ajf1432#@!'
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
            axios.post(this.getHostname+'/api/sign-in', this.form)
            .then((res) => {
                this.$store.commit('setAuthToken', res.data.token)
                localStorage.setItem('token', res.data.token)
                location.reload()
            }).catch((err) => {
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
            this.validation.message = null
            return
        }
    }
}
</script>
<style scoped lang="scss">
header{
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
}

#login_page{
    background-color: $primary-color;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    background-image: url('../../assets/images/shapes.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
}
p{
    margin-bottom: 0;
    text-align: center;
    & a{
    color: $dark;
    }
}

.login-wrapper{
    width: 35%;
    min-width: 350px;
    
}
#login_card{
    padding: 60px 40px;
    background-color: $white-color;
    border-radius: 24px;
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
        padding-bottom: 15px;
    }
    span{
        font-weight: 500;
        color: $gray-color;
    }
}
.forgot-pass{
    text-align: right;
    padding-top: 12px;

    a{
        color: $primary-color;
        font-weight: 500;
        text-decoration: none;
        &:hover{
            text-decoration: underline;
        }
    }
   
   
}
.create-acct{
    margin-top: 20px;
       text-align: center;
       justify-content: center;
       a{
           color: $primary-color;
           font-weight: 500;
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
#mini-logo{
    display: none;
}
@media screen and (max-width: 499px){
    #login_page{
        background-color: $white-color;
        background-image: none;
        padding-top: 20%;
        justify-content: flex-start;
        
    }
    #mini-logo{
    display: block;
    }
    #large-logo{
    display: none;
    }
    .container{
        width: 90%;
    }
    .title{
        margin-bottom: 60px;
    }
    #login_card{
       
        padding: 0;
        h1{
            font-size: 2.5rem;
        }
  
        .form-control{
            border-radius: 0;
            background-color: transparent;
            border: none;
            border-bottom: 1px solid $gray-color;
            padding-left: 0;
            transition: all 0.1s linear;
            box-shadow: none;
            &:focus{
                padding: 0 15px;
                border-bottom-width: 2px;
                border-bottom-color: $primary-color;
            }
        }

    }

    .login-wrapper{
        min-width: 100%;
    }
    header{
        margin-bottom: 50px;
        
    }
}
</style>