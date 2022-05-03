<template>
<teleport to="#onboarding_title">
    <span>Store Details</span>
</teleport>
<teleport to="#onboarding_top_button">
    <!-- this.$store.commit('forceSetOnboard', 'avatar') -->
    <button class="button button-primary top-submit-btn" @click.prevent="submitStore">Create</button>
</teleport>
<teleport to="#onboard_body_content">
    <div class="flex-col align-items-center ob-wrap">
       <form>
            <div class="form-row">
                <label>Store name:</label>
                <input v-model="getOnboard.form.name" type="text" name="name" class="form-control" placeholder="Full name" required>
            </div>
            <div class="form-row">
                <label>Phone 1:</label>
                <input v-model="getOnboard.form.phone1" type="text" name="phone" class="form-control" placeholder="Phone number" required>
            </div>
            <div class="form-row">
                <label>Phone 2:</label>
                <input v-model="getOnboard.form.phone2" type="text" name="Otherphone" class="form-control" placeholder="Phone number" required>
            </div>
            <div class="form-row">
                <label>Address:</label>
                <input v-model="getOnboard.form.address" type="text" name="address" class="form-control" placeholder="Store address" required>
            </div>
            <div class="form-row">
                <label>City:</label>
                <input v-model="getOnboard.form.city" type="text" name="city" class="form-control" placeholder="City" required>
            </div>
            <div class="form-row">
                <label>Region:</label>
                <input v-model="getOnboard.form.region" type="text" name="region" class="form-control" placeholder="Region" required>
            </div>
            <div class="form-row">
                <label>Country:</label>
                <input v-model="getOnboard.form.country" type="text" name="country" class="form-control" placeholder="Country" required>
            </div>
        </form>
    </div>
</teleport>
    
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    name: 'OnboardScreenBasicInfo',
    computed: mapGetters(['getOnboard', 'getHostname', 'getToken']),
    methods: {
        async submitStore() {
            axios.post( this.getHostname+'/api/store?token='+this.getToken,
                    this.getOnboard.form,
                    {
                        headers: {
                            'Content-Type': ['application/json']
                        },
                    }
            ).then((res) => {
                const newPayload = {
                    store: res.data.store,
                    user: res.data.user
                }
                this.$store.commit('addStore', newPayload)
                 const payload = {
                    id: 'success',
                    title: res.data.title,
                    body: res.data.message
                }
                this.$store.commit('showAlert', payload)
                this.$store.commit('forceSetOnboard', 'avatar')
                
            }).catch((err) => {
                if(err.response.status === 422) {
                    const payload = {
                        id: 'danger',
                        title: 'Error!',
                        body: err.response.data.message
                    }
                    this.$store.commit('showAlert', payload)
                }
                console.log(err.response.data.errors)
            })
        },
    }
}
</script>
<style scoped lang="scss">


.flex-col{
    width: 100%;
}
</style>