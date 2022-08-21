<template>
    <teleport to="#add_title">
        <span v-if="getEditContainer.active">Update store details</span>
        <span v-else>Create new store</span>
    </teleport>
    <teleport to="#add_submit_button">
        <button class="button button-primary top-submit-btn" @click.prevent="doSubmitUpdate" :class="{ 'button-disabled' : submiting }" :disabled="submiting? true : false">
            {{ submiting ? 'Saving' : 'Save' }}
            <spinner v-if="submiting" v-bind:size="20" v-bind:white="true" />
        </button>
    </teleport>
    <teleport to="#add_master_body_container">
        <form id="product_form" @submit.prevent="" class="overlay-hero-form">
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.name}">
                <label>Store name:</label>
                <input v-model="form.name" type="text" name="name" class="form-control" placeholder="Full name" required>
                <span class="span" v-if="validation.error && validation.errors.name">
                    {{ validation.errors.name[0] }}
                </span>
            </div>
            <div class="form-row">
                <label>Phone 1:</label>
                <input v-model="form.phone1" type="text" name="phone" class="form-control" placeholder="Phone number" required>
            </div>
            <div class="form-row">
                <label>Phone 2:</label>
                <input v-model="form.phone2" type="text" name="Otherphone" class="form-control" placeholder="Phone number" required>
            </div>
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.address}">
                <label>Address:</label>
                <input v-model="form.address" type="text" name="address" class="form-control" placeholder="Store address" required>
                <span class="span" v-if="validation.error && validation.errors.address">
                    {{ validation.errors.address[0] }}
                </span>
            </div>
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.city}">
                <label>City:</label>
                <input v-model="form.city" type="text" name="city" class="form-control" placeholder="City" required>
                <span class="span" v-if="validation.error && validation.errors.city">
                    {{ validation.errors.city[0] }}
                </span>
            </div>
            <div class="form-row">
                <label>Region:</label>
                <input v-model="form.region" type="text" name="region" class="form-control" placeholder="Region" required>
            </div>
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.country}">
                <label>Country:</label>
                <select v-model="form.country" class="form-control select" required>
                    <option selected="selected" :value="form.country">{{ form.country }}</option>
                    <option v-for="country in getCountries" :key="country" :value="country.country">{{ country.country }}</option>
                </select>
                <div v-if="computedCurrency" class="flex gap-4 mt-4"><span>Currency:</span><strong ref="currencyCode">{{ computedCurrency }}</strong></div>
                <span class="span" v-if="validation.error && validation.errors.country">
                    {{ validation.errors.country[0] }}
                </span>
            </div>
        </form>
</teleport>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import validationMixin from '../../../mixins/validationMixin'
import Spinner from '../includes/Spinner.vue'
export default {
    name: "AddNewStore",
    mixins: [validationMixin],
    computed: {
        ...mapGetters(["getToken", "getHostname", "getEditContainer", "getCurrentStore", 'getCountries']),
        computedCurrency() {
            let country = this.form.country
            if(country != null) {
                const country_code = this.getCountries.find(list => list.country == country).currency_code
                return country_code
            }
            else
            return null
        }
    },
    data() {
        return {
            form: {
                name: "",
                phone1: "",
                phone2: "",
                address: "",
                city: "",
                region: "",
                country: "",
                currency_code: ""
            },
        };
    },
    methods: {
        doSubmitUpdate() {
            this.submiting = true;
            let id = this.getCurrentStore.id;
            this.$refs.currencyCode ? this.form.currency_code = this.$refs.currencyCode.innerHTML : ''
            console.log(this.form)
            const putUrl = this.getHostname + "/api/store/" + id + "?token=" + this.getToken;
            axios.put(putUrl, this.form, {
                headers: {
                    "Content-Type": ["application/json"]
                },
            }).then((res) => {
                this.submiting = false;
                const payload = {
                    id: "success",
                    title: res.data.title,
                    body: res.data.message
                };
                this.$store.commit("updateStore", res.data.store);
                this.$store.commit("showAlert", payload);
                this.$store.commit("unsetMainHomeWidth", true);
            }).catch((err) => {
                this.submiting = false;
                if (err.response.status === 422) {
                    this.validation.error = true;
                    this.validation.errors = err.response.data.errors;
                }
            });
        },
        preloadForEdit() {
            if (this.getEditContainer.active) {
                this.form.name = this.getEditContainer.data.name;
                this.form.phone1 = this.getEditContainer.data.phone_1;
                this.form.phone2 = this.getEditContainer.data.phone_2;
                this.form.address = this.getEditContainer.data.address;
                this.form.city = this.getEditContainer.data.city;
                this.form.region = this.getEditContainer.data.region;
                this.form.country = this.getEditContainer.data.country;
            }
        }
    },
    created() {
        this.preloadForEdit();
    },
    components: { Spinner }
}
</script>
<style scoped lang="scss">

</style>