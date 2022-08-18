<template>
    <div class="wlc-container flex wlc-cont-1">
        <div class="wlc-wrap flex-col w-50 justify-content-center align-items-start">
            <h1>Welcome on board, <strong>{{ computedUser }}</strong></h1>
            <div>Flexsale offers you a flexible way to manage your store's inventory, record sales, perform sales analysis, get notified of expiring products and more.</div>
            <button @click.prevent="this.$store.commit('forceSetOnboard', 'intro')" class="button">Set up your store</button>
        </div>
        <div class="w-50">
            <lottie-player class="lottie-player" :src="getThisHostname+'/img/setupanime.json'" background="transparent"  speed="1" loop autoplay></lottie-player>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'WelcomeScreenTop',
    computed: {
        ...mapGetters(['getUser', 'getThisHostname']),
        computedUser() {
            if(this.getUser.name) {
                return this.getUser.name.split(' ')[0]
            }else
            return ''
        }
    },
    created() {
         window.addEventListener('load', () => {
            // let lottiePlayer = document.createElement('script')
            // lottiePlayer.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js'
            // document.head.appendChild(lottiePlayer)
        })
    }
}
</script>