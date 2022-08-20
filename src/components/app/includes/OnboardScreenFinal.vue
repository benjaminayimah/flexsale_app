<template>
   <teleport to="#onboard_body_content">
        <div class="flex-col align-items-center intro-wrap">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" height="180" viewBox="0 0 204.001 203.999">
                <path id="Path_1805" data-name="Path 1805" d="M1664.741-6809.258a102,102,0,0,1,102-102,102,102,0,0,1,102,102,102,102,0,0,1-102,102A102,102,0,0,1,1664.741-6809.258Zm8,0a94.1,94.1,0,0,0,94,94,94.1,94.1,0,0,0,94-94,94.106,94.106,0,0,0-94-94A94.106,94.106,0,0,0,1672.742-6809.258Zm34.692,5.28,5.3-5.993,38.442,34,69.279-75.293,5.887,5.417-74.59,81.063Z" transform="translate(-1664.741 6911.258)" fill="#4be25d"/>
            </svg> -->
            <lottie-player class="lottie-player" :src="getThisHostname+'/img/mark-correct.json'" background="transparent" style="width: 200px; height: 200px;"  speed="1" autoplay></lottie-player>
            <div class="heading">
                <h2>Completed</h2>
                <span>Store setup is completed. You can begin to upload your products.</span>
            </div>
            <div>
                <button @click.prevent="this.$store.commit('forceCloseOnboard')" class="button button-primary ob-begin-btn">
                    <span>Close</span>
                </button>
            </div>
        </div>
    </teleport>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'OnboardScreenFinal',
    computed: mapGetters(['getThisHostname'])
}
</script>
<style scoped lang="scss">
.intro-wrap{
    padding: 25px;
    svg{
        margin-bottom: 15px;
    }
}
.heading{
    text-align: center;
    h2{
        text-transform: capitalize;
        font-weight: 800;
        font-size: 2rem;
        margin-bottom: 15px;
        margin-top: 0;
    }
    span{
        font-size: 1.1rem;
        font-weight: 500;
        color: $gray-color;
    }
}
.ob-begin-btn {
    height: 52px;
    width: 260px;
}

</style>