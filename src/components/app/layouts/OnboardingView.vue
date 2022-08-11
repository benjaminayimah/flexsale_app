<template>
    <transition name="fade">
        <tertiary-backdrop v-if="getOnboard.status" v-bind:zIndex="300"/>
    </transition>
    <div class="onboarding-wrap" v-if="getOnboard.status" :class="computeWidth ? 'width-active': 'width-inactive'">
        <div class="ob-hold">
            <div id="onboard_header" class="ob-head flex-row-js">
                <button class="button button-secondary cancel-btn" @click.prevent="$store.commit('forceCloseOnboard')">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 20 20">
                        <path d="M5793.4-3003.846l-7.881-7.881-7.879,7.88a1.241,1.241,0,0,1-1.756,0,1.242,1.242,0,0,1,0-1.756l7.88-7.879-7.88-7.879a1.243,1.243,0,0,1,0-1.757,1.241,1.241,0,0,1,1.756,0l7.88,7.88,7.88-7.88a1.24,1.24,0,0,1,1.755,0,1.24,1.24,0,0,1,0,1.756l-7.88,7.88,7.88,7.88a1.241,1.241,0,0,1,0,1.757,1.236,1.236,0,0,1-.877.363A1.236,1.236,0,0,1,5793.4-3003.846Z" transform="translate(-5775.518 3023.483)" fill="#0e142c"/>
                    </svg>
                </button>
                <h1 id="onboarding_title" class="text-overflow-ellipsis"></h1>
                <div id="onboarding_top_button"></div>
            </div>
            <div id="onboard_body_content" class="intro flex justify-content-center" :style="{height: (winHeight-250)+'px'}"></div>
        </div>
    </div>
    <onboard-screen-intro v-if="getOnboard.intro" />
    <onboard-screen-basic-info v-else-if="getOnboard.basicInfo" />
    <onboard-screen-avatar v-else-if="getOnboard.avatar" />
    <onboard-screen-final v-else-if="getOnboard.final" />
</template>
<script>
import { mapGetters } from 'vuex'
import OnboardScreenAvatar from '../includes/OnboardScreenAvatar.vue'
import OnboardScreenBasicInfo from '../includes/OnboardScreenBasicInfo.vue'
import OnboardScreenFinal from '../includes/OnboardScreenFinal.vue'
import OnboardScreenIntro from '../includes/OnboardScreenIntro.vue'
import TertiaryBackdrop from '../includes/TertiaryBackdrop.vue'
export default {
    components: { TertiaryBackdrop, OnboardScreenIntro, OnboardScreenBasicInfo, OnboardScreenAvatar, OnboardScreenFinal },
    name: 'OnboardingView',
    props: ['winHeight'],
    computed: {
        ...mapGetters(['getOnboard', 'getWindowWidth']),
        computeWidth() {
            if(this.getWindowWidth <= 600) {
                return true
            }else {
                return false
            }
        }
    },
}
</script>
<style scoped lang="scss">
.onboarding-wrap{
    position: fixed;
    z-index: 300;
    background-color: #ffffff;
    .ob-hold{
        width: 100%;
        position: relative;
        height: 100%;
        .intro{
            width: 100%;
      
        }
    }
    
}
.width-inactive{
    border-radius: 18px;
    top: 10%;
    width: 550px;
    left: 50%;
    transform: translateX(-50%);
    .ob-head{
        height: 75px;
    }
    #onboard_body_content{
        height: 600px;
    }
}
.width-active{
    width: 100%;
    top: 0;
    height: 100%;
    .ob-head{
        height: 65px;
    }
     #onboard_body_content{
        height: 100% !important;
    }
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.8, 0.5, 0.5, 0.8);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
  
  
</style>