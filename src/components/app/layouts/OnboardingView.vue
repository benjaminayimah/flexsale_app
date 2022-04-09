<template>
    <teleport to="body">
        <transition name="fade">
            <tertiary-backdrop v-if="getOnboard"  />
        </transition>
        <transition name="slide">

        <div class="onboarding-wrap" v-if="getOnboard" >
            <div class="ob-hold">
                <button class="button button-secondary cancel-btn" @click.prevent="$store.commit('forceCloseOnboard')">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 20 20">
                        <path d="M5793.4-3003.846l-7.881-7.881-7.879,7.88a1.241,1.241,0,0,1-1.756,0,1.242,1.242,0,0,1,0-1.756l7.88-7.879-7.88-7.879a1.243,1.243,0,0,1,0-1.757,1.241,1.241,0,0,1,1.756,0l7.88,7.88,7.88-7.88a1.24,1.24,0,0,1,1.755,0,1.24,1.24,0,0,1,0,1.756l-7.88,7.88,7.88,7.88a1.241,1.241,0,0,1,0,1.757,1.236,1.236,0,0,1-.877.363A1.236,1.236,0,0,1,5793.4-3003.846Z" transform="translate(-5775.518 3023.483)" fill="#0e142c"/>
                    </svg>
                </button>
                <div class="intro flex-col align-items-center justify-content-center">
                    <svg class="onboard-illustration" xmlns="http://www.w3.org/2000/svg"  height="160" viewBox="0 0 535.908 505.204">
                        <g id="onboarding" transform="translate(96.457 46.954)">
                            <path id="Path_1793" data-name="Path 1793" d="M278.329,11.921c160.982,0,216.626,19.543,216.626,209.487S380.687,517.1,219.7,517.1-32.6,523.755-32.6,333.81,117.347,11.921,278.329,11.921Z" transform="translate(-63.857 -58.875)" fill="#E9EBF0"/>
                            <path id="Path_1782" data-name="Path 1782" d="M703.084,171.875h-422a8.728,8.728,0,0,0-8.72,8.72v411.32a8.728,8.728,0,0,0,8.72,8.72h37v-2.49h-37a6.237,6.237,0,0,1-6.23-6.23V180.6a6.237,6.237,0,0,1,6.23-6.23h422a6.24,6.24,0,0,1,6.24,6.23v411.32a6.179,6.179,0,0,1-1.03,3.42,6.446,6.446,0,0,1-2.36,2.12,6.186,6.186,0,0,1-2.85.69h-37v2.49h37a8.712,8.712,0,0,0,6.63-3.06,1.947,1.947,0,0,0,.19-.24,8.15,8.15,0,0,0,1.25-2.11,8.5,8.5,0,0,0,.66-3.31V180.6A8.73,8.73,0,0,0,703.084,171.875Z" transform="translate(-272.364 -171.875)" fill="#3f3d56"/>
                            <rect id="Rectangle_2463" data-name="Rectangle 2463" width="436.957" height="2.493" transform="translate(1.242 34.953)" fill="#3f3d56"/>
                            <circle id="Ellipse_705" data-name="Ellipse 705" cx="7.478" cy="7.478" r="7.478" transform="translate(14.953 11.222)" fill="#3f3d56"/>
                            <circle id="Ellipse_706" data-name="Ellipse 706" cx="7.478" cy="7.478" r="7.478" transform="translate(36.453 11.222)" fill="#3f3d56"/>
                            <circle id="Ellipse_707" data-name="Ellipse 707" cx="7.478" cy="7.478" r="7.478" transform="translate(57.954 11.222)" fill="#3f3d56"/>
                            <path id="Path_1783" data-name="Path 1783" d="M597.589,264.531h-211a13,13,0,1,1,0-26h211a13,13,0,0,1,0,26Zm-211-24a11,11,0,1,0,0,22h211a11,11,0,0,0,0-22Z" transform="translate(-272.364 -171.875)" fill="#3f3d56"/>
                            <path id="Path_1784" data-name="Path 1784" d="M651.089,446.125h-318a17.019,17.019,0,0,1-17-17v-102a17.019,17.019,0,0,1,17-17h318a17.019,17.019,0,0,1,17,17v102a17.019,17.019,0,0,1-17,17Zm-318-134a15.017,15.017,0,0,0-15,15v102a15.017,15.017,0,0,0,15,15h318a15.017,15.017,0,0,0,15-15v-102a15.017,15.017,0,0,0-15-15Z" transform="translate(-272.364 -171.875)" fill="#3f3d56"/>
                            <path id="Path_1785" data-name="Path 1785" d="M533.789,372.625h-111a8,8,0,1,1,0-16h111a8,8,0,0,1,0,16Z" transform="translate(-272.364 -171.875)" fill="#0e142c"/>
                            <path id="Path_1786" data-name="Path 1786" d="M636.789,399.625h-214a8,8,0,1,1,0-16h214a8,8,0,0,1,0,16Z" transform="translate(-272.364 -171.875)" fill="#0e142c"/>
                            <circle id="Ellipse_708" data-name="Ellipse 708" cx="30" cy="30" r="30" transform="translate(67.024 176.25)" fill="#0e142c"/>
                            <path id="Path_1787" data-name="Path 1787" d="M636.778,432.125h-28a8,8,0,0,1,0-16h28a8,8,0,0,1,0,16Z" transform="translate(-272.364 -171.875)" fill="#fff"/>
                            <path id="Path_1788" data-name="Path 1788" d="M636.778,432.125h-28a8,8,0,0,1,0-16h28a8,8,0,0,1,0,16Z" transform="translate(-272.364 -171.875)" fill="#ccc"/>
                            <path id="Path_1789" data-name="Path 1789" d="M651.084,494.125h-318a17.024,17.024,0,0,0-17,17v102a17.024,17.024,0,0,0,17,17h318a17.018,17.018,0,0,0,17-17v-102a17.018,17.018,0,0,0-17-17Zm15,119a15.012,15.012,0,0,1-15,15h-318a15.018,15.018,0,0,1-15-15v-102a15.018,15.018,0,0,1,15-15h318a15.012,15.012,0,0,1,15,15Z" transform="translate(-272.364 -171.875)" fill="#3f3d56"/>
                            <path id="Path_1790" data-name="Path 1790" d="M533.789,556.625h-111a8,8,0,1,1,0-16h111a8,8,0,0,1,0,16Z" transform="translate(-272.364 -171.875)" fill="#0e142c"/>
                            <path id="Path_1791" data-name="Path 1791" d="M636.789,583.625h-214a8,8,0,1,1,0-16h214a8,8,0,0,1,0,16Z" transform="translate(-272.364 -171.875)" fill="#0e142c"/>
                            <circle id="Ellipse_709" data-name="Ellipse 709" cx="30" cy="30" r="30" transform="translate(67.024 360.25)" fill="#0e142c"/>
                            <path id="Path_1792" data-name="Path 1792" d="M636.778,616.125h-28a8,8,0,0,1,0-16h28a8,8,0,0,1,0,16Z" transform="translate(-272.364 -171.875)" fill="#ccc"/>
                        </g>
                    </svg>

                    <div class="heading">
                        <h2>One last thing</h2>
                        <span>Let's get your first store set up real quick.</span>
                    </div>
                    <button class="button button-primary ob-begin-btn">
                        <span>Create Store</span>
                    </button>
                     <button class="button button-secondary ob-begin-btn" @click.prevent="$store.commit('forceCloseOnboard')">
                        <span>Later</span>
                    </button>
                </div>
            </div>
        </div>
        </transition>

    </teleport>
</template>
<script>
import { mapGetters } from 'vuex'
import TertiaryBackdrop from '../includes/TertiaryBackdrop.vue'
export default {
    components: { TertiaryBackdrop },
    name: 'OnboardingView',
    computed: mapGetters(['getOnboard']),
}
</script>
<style scoped lang="scss">
.onboarding-wrap{
    position: fixed;
    z-index: 300;
    top: 10%;
    background-color: #ffffff;
    width: 540px;
    height: 660px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 18px;
    .ob-hold{
        width: 100%;
        padding: 30px;
        position: relative;
        height: 100%;
        display: flex;
        .cancel-btn{
            position: absolute;
            right: 15px;
            top: 15px;
        }
        .intro{
            width: 100%;
        }
    }
    .heading{
        text-align: center;
        margin-bottom: 30px;
        h2{
            text-transform: capitalize;
            margin: 12px 0;
            font-weight: 900;
        }
        span{
            font-size: 1.1rem;
            font-weight: 500;
            color: $gray-color;
        }
    }
    .ob-begin-btn {
        margin: 8px 0;
        height: 52px;
        width: 260px;
    }
    .onboard-illustration{
        margin-bottom: 50px;

    }
}

.slide-enter-from,
.slide-leave-to {
  transform: translate(-50%, -600px);
}
  
</style>