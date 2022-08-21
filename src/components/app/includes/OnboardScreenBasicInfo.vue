<template>
<teleport to="#onboarding_title">
    <span>Store Details</span>
</teleport>
<teleport to="#onboarding_top_button">
    <button class="button button-primary top-submit-btn" @click.prevent="submitStore" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
        <span>{{ submiting ? 'Submiting' : 'Submit store'}}</span>
        <spinner v-if="submiting" v-bind:size="16" v-bind:white="true" />
    </button>
</teleport>
<teleport to="#onboard_body_content">
    <div class="flex-col align-items-center ob-wrap">
       <form @submit.prevent="">
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.name}">
                <label>Store name*:</label>
                <input v-model="getOnboard.form.name" type="text" name="name" class="form-control" placeholder="Eg. ABC Enterprise" required>
                <span class="span" v-if="validation.error && validation.errors.name">
                    {{ validation.errors.name[0] }}
                </span>
            </div>
            <div class="form-row">
                <label>Phone 1:</label>
                <input v-model="getOnboard.form.phone1" type="tel" name="phone" class="form-control" placeholder="Phone number">
            </div>
            <div class="form-row">
                <label>Phone 2:</label>
                <input v-model="getOnboard.form.phone2" type="tel" name="Otherphone" class="form-control" placeholder="Phone number">
            </div>
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.address}">
                <label>Address*:</label>
                <input v-model="getOnboard.form.address" type="text" name="address" class="form-control" placeholder="Store address" required>
                <span class="span" v-if="validation.error && validation.errors.address">
                    {{ validation.errors.address[0] }}
                </span>
            </div>
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.city}">
                <label>City*:</label>
                <input v-model="getOnboard.form.city" type="text" name="city" class="form-control" placeholder="City" required>
                <span class="span" v-if="validation.error && validation.errors.city">
                    {{ validation.errors.city[0] }}
                </span>
            </div>
            <div class="form-row">
                <label>Region:</label>
                <input v-model="getOnboard.form.region" type="text" name="region" class="form-control" placeholder="Region">
            </div>
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.country}">
                <label>Country*:</label>
                <select v-model="getOnboard.form.country" class="form-control select">
                    <option selected="selected" :value="null">Select your country</option>
                    <option v-for="country in getCountries" :key="country" :value="country.country">{{ country.country }}</option>
                </select>
                <div v-if="computedCurrency" class="flex gap-4 mt-4"><span>Currency:</span><strong ref="currencyCode">{{ computedCurrency }}</strong></div>
                <span class="span" v-if="validation.error && validation.errors.country">
                    {{ validation.errors.country[0] }}
                </span>
            </div>
        </form>
    </div>
</teleport>
    
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import validationMixin from '../../../mixins/validationMixin'
import Spinner from './Spinner.vue'
export default {
    name: "OnboardScreenBasicInfo",
    mixins: [validationMixin],
    components: { Spinner },
    computed: {
        ...mapGetters(['getOnboard', 'getHostname', 'getToken', 'getCountries', 'getCurrentStore']),
        computedCurrency() {
            let country = this.getOnboard.form.country
            if(country != null) {
                const country_code = this.getCountries.find(list => list.country == country).currency_code
                return country_code
            }
            else
            return null
        }
    },
    methods: {
        async submitStore() {
            this.validation.error ? this.clearErrs() : ''
            this.submiting = true
            this.$refs.currencyCode ? this.getOnboard.form.currency_code = this.$refs.currencyCode.innerHTML : ''
            axios.post(this.getHostname + "/api/store?token=" + this.getToken, this.getOnboard.form, {
                headers: {
                    "Content-Type": ["application/json"]
                },
            }).then((res) => {
                console.log(res.data)
                this.submiting = false
                const newPayload = {
                    store: res.data.store,
                    user: res.data.user
                };
                this.$store.commit('addStore', newPayload);
                const payload = {
                    id: "success",
                    title: res.data.title,
                    body: res.data.message
                };
                this.$store.commit('showAlert', payload);
                this.$store.commit('forceSetOnboard', 'avatar');
            }).catch((err) => {
                this.submiting = false
                if (err.response.status == 422) {
                    this.validation.error = true;
                    this.validation.errors = err.response.data.errors
                }
                console.log(err.response.data.errors)
            });
        }
    },
}
</script>
<style scoped lang="scss">
.ob-wrap{
    border-top: 1px solid $dark-light;
}
.flex-col{
    width: 100%;
}
</style>