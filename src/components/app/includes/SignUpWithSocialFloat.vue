<template>
    <transition name="fade">
        <div v-if="getOAuthModal.active" class="backdrop delete-backdrop" @click.prevent="$store.commit('closeOAuthModal')"></div>
    </transition>
    <transition name="slide" appear>
        <div v-if="getOAuthModal.active" class="floating-container">
            <div class="floating-wrap flex-col gap-32">
                <a href="#" class="alert-close flex justify-content-center align-items-center" @click.prevent="$store.commit('closeOAuthModal')">
                    <svg xmlns="http://www.w3.org/2000/svg"  height="13" viewBox="0 0 14 14">
                        <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#7e8596"/>
                    </svg>
                </a>
                <div class="flex-col gap-8">
                    <h3 class="mg-0">This email is not found in our system.</h3>
                    <h2 class="mg-0">Do you wish to Sign Up to Flexsale with {{ getOAuthModal.type }}?</h2>
                </div>
                <div class="flex-col align-items-center justify-content-center">
                    
                    <div class="flex align-items-center w-100 gap-8 oauth-user">
                        <div class="oauth-user-img-wrap br-50"><img :src="getOAuthModal.user.picture" :alt="getOAuthModal.user.given_name"></div>
                        <div class="flex-col osr-info-hold">
                            <div class="oauth-user-name text-overflow-ellipsis">{{ getOAuthModal.user.name }}</div>
                            <div class="oauth-user-email text-overflow-ellipsis">{{ getOAuthModal.user.email }}</div>
                        </div>
                        <i class="horizontal-separator"></i>
                        <div>
                            <svg v-if="getOAuthModal.type == 'google'" xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 0 31.341 32.021">
                                <g id="Google__G__Logo" transform="translate(26.754 -39.239)">
                                    <path d="M.576,52.268a18.55,18.55,0,0,0-.254-3.029H-14.754v6.017h8.632a7.433,7.433,0,0,1-3.2,4.777v4h5.15A15.654,15.654,0,0,0,.576,52.268Z" transform="translate(4.011 3.342)" fill="#4285f4"/>
                                    <path d="M-11.174,66.484A15.251,15.251,0,0,0-.594,62.6l-5.15-4a9.659,9.659,0,0,1-5.43,1.548,9.562,9.562,0,0,1-8.979-6.618h-5.31v4.123A15.987,15.987,0,0,0-11.174,66.484Z" transform="translate(0.431 4.776)" fill="#34a853"/>
                                    <path d="M-19.723,56.093a9.291,9.291,0,0,1-.507-3.055,9.652,9.652,0,0,1,.507-3.055V45.859h-5.31a15.825,15.825,0,0,0-1.721,7.178,15.825,15.825,0,0,0,1.721,7.178Z" transform="translate(0 2.213)" fill="#fbbc05"/>
                                    <path d="M-11.174,45.577a8.687,8.687,0,0,1,6.137,2.4l4.563-4.563a15.308,15.308,0,0,0-10.7-4.176,15.987,15.987,0,0,0-14.29,8.833l5.31,4.123A9.562,9.562,0,0,1-11.174,45.577Z" transform="translate(0.431)" fill="#ea4335"/>
                                </g>
                            </svg>
                            <svg v-else-if="getOAuthModal.type == 'facebook'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="26" viewBox="0 0 32.021 31.86">
                                <defs>
                                    <linearGradient id="linear-gradient" x1="-6.934" y1="10.216" x2="-6.934" y2="10.241" gradientUnits="objectBoundingBox">
                                    <stop offset="0" stop-color="#0062e0"/>
                                    <stop offset="1" stop-color="#19afff"/>
                                    </linearGradient>
                                </defs>
                                <path d="M8883.8-1584.7h0a16.356,16.356,0,0,1-9.535-5.464,15.959,15.959,0,0,1-2.812-4.758,15.907,15.907,0,0,1-1.02-5.628,15.815,15.815,0,0,1,1.263-6.216,16.056,16.056,0,0,1,3.439-5.091,16.042,16.042,0,0,1,5.092-3.44,15.809,15.809,0,0,1,6.217-1.263,15.812,15.812,0,0,1,6.216,1.263,16.046,16.046,0,0,1,5.091,3.44,16.023,16.023,0,0,1,3.439,5.091,15.794,15.794,0,0,1,1.264,6.216,15.907,15.907,0,0,1-1.02,5.628,15.987,15.987,0,0,1-2.812,4.758,16.355,16.355,0,0,1-9.537,5.463l-.064-.053.029-.005h.008l.107-.019v-11.289h3.521l.722-4.482h-4.243v-3.121c0-1.551.741-2.243,2.4-2.243h2.082V-1610a25.919,25.919,0,0,0-3.523-.319,6.325,6.325,0,0,0-4.5,1.621,6.222,6.222,0,0,0-1.742,4.622v3.523h-4v4.482h4v11.289l.009,0-.09.077Z" transform="translate(-8870.438 1616.563)" fill="url(#linear-gradient)"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <button class="button button-primary logon-btn" @click.prevent="signUpOAuthUser"  :class="{ 'button-disabled' : getSignInStatus.creating }" :disabled="getSignInStatus.creating? true : false">
                    <span class="text-overflow-ellipsis">{{ getSignInStatus.creating ? 'Creating account' : 'Sign Up with '+ getOAuthModal.user.given_name }}</span>
                    <spinner v-if="getSignInStatus.creating" v-bind:size="20" v-bind:white="true" />
                </button>
            </div>
        </div>
    </transition>
</template>
<script>
import { mapGetters } from 'vuex';
import Spinner from './Spinner.vue';
export default {
    name: "SignUpWithSocialFloat",
    computed: mapGetters(['getOAuthModal', 'getHostname', 'getSignInStatus']),
    components: { Spinner },
    methods: {
        signUpOAuthUser() { 
            this.$store.commit('setCreating')
            this.$store.dispatch('signUpnOAuthUser', this.getOAuthModal.user)
            .then((res) => {
                this.$store.commit('unSetCreating')
                if(res.data.token !== null) {
                    this.$store.commit('signInSuccess', res.data.token)
                    this.$store.commit('closeOAuthModal')
                    this.$store.commit('setCreated')
                    this.$store.commit('loadDashboard')
                }
            }).catch((err) => {
                console.log(err.response.data)
                this.$store.commit('unSetCreating')
            })
        } 
    }
}
</script>
<style lang="scss" scoped>
.floating-container {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 30%;
    z-index: 999999;
    height: auto;
    max-width: 340px;
    .floating-wrap{
        border-radius: 24px;
        background-color: #ffffff;
        padding: 50px 40px;
        width: 100%;
        height: 100%;
        position: relative;
        
        .logon-btn{
            margin-top: 0;
            span {
                width: 80%;
            }
        }
        h2{
            font-size: 1.1rem;
        }
        h3{
            font-size: 1rem;
            font-weight: 500;
        }
    }
    .alert-close{
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        margin-right: -6px;
        transition: 0.3s all;
        height: 38px;
        width: 38px;
        border-radius: 50%;
        position: absolute;
        right: 20px;
        top: 15px;
    }
    .oauth-user{
        padding: 10px 0;
    }
    .osr-info-hold{
        div{
            max-width: 157px;
        }
    }
    .oauth-user-img-wrap{
        display: flex;
        height: 35px;
        width: 35px;
        border: 1px solid $dark-light;
        flex-shrink: 0;
        img{
            height: inherit;
            width: inherit;
            border-radius: inherit;
        }
    }
    .oauth-user-name{
        font-weight: 700;
        margin-bottom: 4px;
    }
    .oauth-user-email{
        color: $gray-color;
        font-size: 0.9rem;
        
    }
}
.delete-backdrop{
    background-color: rgba(0, 0, 0, 0.8);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(10px);
    z-index: 99999;
}

.slide-enter-from,
.slide-leave-to {
    transform: translate(-50%, -10%);
    opacity: 0;
}
</style>