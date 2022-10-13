<template>
    <h1 id="page_title">{{ title }}</h1>
    <div class="main-page-body settings">
        <ul>
            <li class="li">
                <div class="flex gap-16">
                    <div class="image-hold">
                        <div class="bg-img">
                            <span>{{ computeInitials }}</span>
                        </div>
                    </div>
                    <div class="flex-col gap-4">
                        <h3>{{ getUser.name}}</h3>
                        <div class="text-gray">{{ getUser.email }}</div>
                        <router-link :to="{ name: 'SettingsProfile' }" class="text-primary text-600">Basic profile</router-link>
                    </div>
                </div>
            </li>
            <hr>
            <li>
                <router-link :to="{ name: 'SettingsAccount' }" class="flex">
                    <div class="icon-hold">
                        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 19.994 18">
                            <path d="M21.9,8.89,20.85,4.52A1.964,1.964,0,0,0,18.94,3H5.05a1.964,1.964,0,0,0-1.9,1.52L2.1,8.89a3.375,3.375,0,0,0,.62,2.88,3.834,3.834,0,0,0,.28.29V19a2.006,2.006,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V12.06a3.7,3.7,0,0,0,.28-.28,3.364,3.364,0,0,0,.62-2.89Zm-2.99-3.9,1.05,4.37a1.356,1.356,0,0,1-.25,1.17,1.173,1.173,0,0,1-.94.47,1.25,1.25,0,0,1-1.21-1.14L16.98,5l1.93-.01ZM13,5h1.96l.54,4.52a1.344,1.344,0,0,1-.33,1.07,1.193,1.193,0,0,1-.95.41A1.272,1.272,0,0,1,13,9.69ZM8.49,9.52,9.04,5H11V9.69A1.285,1.285,0,0,1,9.71,11a1.2,1.2,0,0,1-.89-.41A1.42,1.42,0,0,1,8.49,9.52ZM4.04,9.36,5.05,5H7.02L6.44,9.86A1.257,1.257,0,0,1,5.23,11a1.151,1.151,0,0,1-.93-.47,1.322,1.322,0,0,1-.26-1.17ZM5,19V12.97a1.81,1.81,0,0,0,.23.03,3.129,3.129,0,0,0,2.24-.95A3.216,3.216,0,0,0,9.78,13a3.17,3.17,0,0,0,2.23-.93A3.278,3.278,0,0,0,14.3,13a3.175,3.175,0,0,0,2.24-.95,3.129,3.129,0,0,0,2.24.95,1.81,1.81,0,0,0,.23-.03V19Z" transform="translate(-2.005 -3)" fill="#212121"/>
                        </svg>
                    </div>
                    <div class="flex-row-js info-section-hold">
                        <div class="flex-col gap-4">
                            <h3>Account</h3>
                            <div class="text-gray font-14">Store details</div>
                        </div>
                        <div class="arrow-right">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 11.241 20.331">
                                <path d="M766.473,24.661a.934.934,0,0,1-.677-1.578l8.374-8.812-8.357-8.346a.934.934,0,1,1,1.32-1.322l9.646,9.634-9.63,10.133A.931.931,0,0,1,766.473,24.661Z" transform="translate(-765.539 -4.33)"/>
                            </svg>
                        </div>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'SettingsAdministrators' }" class="flex">
                    <div class="icon-hold">
                        <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 38.501 32.979">
                            <path d="M10549,4537.862l-1-.2v-1.025a11.272,11.272,0,0,1,3.613-8.252,12.717,12.717,0,0,1,17.272,0,11.272,11.272,0,0,1,3.613,8.252v1.025l-1,.2a57.1,57.1,0,0,1-22.49,0Zm1.557-2.264a53.488,53.488,0,0,0,19.377,0,9.845,9.845,0,0,0-19.377,0Zm24.85-3.815-1.249-.059.117-2.5,1.249.059a49.112,49.112,0,0,0,8.4-.483,8.126,8.126,0,0,0-1.225-3.316,8.612,8.612,0,0,0-3.522-3.1,9.1,9.1,0,0,0-4.722-.858,9.007,9.007,0,0,0-4.479,1.655l-1.012.731-1.464-2.027,1.015-.733a11.584,11.584,0,0,1,11.743-1.02,11.107,11.107,0,0,1,4.546,4,10.594,10.594,0,0,1,1.692,5.731v1.052l-1.036.181a55.791,55.791,0,0,1-8.433.717C10576.492,4531.818,10575.95,4531.807,10575.411,4531.783Zm-19.647-10.877a7.3,7.3,0,0,1-1.764-4.655,6.25,6.25,0,1,1,12.5,0,7.3,7.3,0,0,1-1.764,4.655,5.657,5.657,0,0,1-8.973,0Zm.736-4.655a4.831,4.831,0,0,0,1.166,3.032,3.17,3.17,0,0,0,5.168,0,4.831,4.831,0,0,0,1.166-3.032,3.75,3.75,0,1,0-7.5,0Zm13.5-5a5.25,5.25,0,1,1,5.25,5.25A5.256,5.256,0,0,1,10570,4511.251Zm2.5,0a2.75,2.75,0,1,0,2.75-2.75A2.754,2.754,0,0,0,10572.5,4511.251Z" transform="translate(-10548 -4506.001)" fill="#212121"/>
                        </svg>
                    </div>
                    <div class="flex-row-js info-section-hold">
                        <div class="flex-col gap-4">
                            <h3>Administrators</h3>
                            <div class="text-gray font-14">Administrators, Access and Roles</div>
                        </div>
                        <div class="arrow-right">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 11.241 20.331">
                                <path d="M766.473,24.661a.934.934,0,0,1-.677-1.578l8.374-8.812-8.357-8.346a.934.934,0,1,1,1.32-1.322l9.646,9.634-9.63,10.133A.931.931,0,0,1,766.473,24.661Z" transform="translate(-765.539 -4.33)"/>
                            </svg>
                        </div>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'SettingsAlerts'}" class="flex">
                    <div class="icon-hold">
                        <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24.172 26.286">
                            <path d="M10502.632,4613.875a1,1,0,1,1,2,0,1.409,1.409,0,0,0,2.407,1,1.4,1.4,0,0,0,.415-1,1,1,0,0,1,1-1h0a1,1,0,0,1,1,1,3.411,3.411,0,1,1-6.821,0Zm13.457-1.993h-22.134l1.257-1.613c.023-.034,2.6-3.39,2.6-6.216v-4.82a8.232,8.232,0,1,1,16.464,0v4.82c0,2.827,2.576,6.182,2.6,6.216l1.249,1.613Zm-16.276-12.649v4.82a12.283,12.283,0,0,1-1.942,5.831h16.348a12.271,12.271,0,0,1-1.94-5.831v-4.82a6.232,6.232,0,0,0-12.465,0Z" transform="translate(-10493.955 -4591)" fill="#0e142c"/>
                        </svg>

                    </div>
                    <div class="flex-row-js info-section-hold">
                        <div class="flex-col gap-4">
                            <h3>Alerts & Notifications</h3>
                            <div class="text-gray font-14">Low stock alert, Expiring alert</div>
                        </div>
                        <div class="arrow-right">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 11.241 20.331">
                                <path d="M766.473,24.661a.934.934,0,0,1-.677-1.578l8.374-8.812-8.357-8.346a.934.934,0,1,1,1.32-1.322l9.646,9.634-9.63,10.133A.931.931,0,0,1,766.473,24.661Z" transform="translate(-765.539 -4.33)"/>
                            </svg>
                        </div>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'SettingsSubscription'}" class="flex">
                    <div class="icon-hold">
                        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 22.86 18.465">
                            <g transform="translate(1.414 1.039)">
                                <path d="M14945.049,4701.91v-4.464h-4.464a1,1,0,0,1,0-2h5.465a1,1,0,0,1,1,1v5.462a1,1,0,1,1-2,0Zm-19.034-8.106a1,1,0,0,1-1-1v-5.465a1,1,0,0,1,2,0v4.464h4.464a1,1,0,1,1,0,2Z" transform="translate(-14926.017 -4686.433)"/>
                                <path d="M19.248,9.965A8.2,8.2,0,0,0,5.725,6.905L1.5,10.875m20.033,3.642-4.225,3.97a8.2,8.2,0,0,1-13.522-3.06" transform="translate(-1.5 -4.503)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                            </g>
                        </svg>
                    </div>
                    <div class="flex-row-js info-section-hold">
                        <div class="flex-col gap-4">
                            <h3>Subscription</h3>
                            <div class="text-gray font-14">Free plan</div>
                        </div>
                        <div class="arrow-right">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 11.241 20.331">
                                <path d="M766.473,24.661a.934.934,0,0,1-.677-1.578l8.374-8.812-8.357-8.346a.934.934,0,1,1,1.32-1.322l9.646,9.634-9.63,10.133A.931.931,0,0,1,766.473,24.661Z" transform="translate(-765.539 -4.33)"/>
                            </svg>
                        </div>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'SettingsSecurity'}" class="flex">
                    <div class="icon-hold">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 18.997 23.219">
                            <path d="M15.925,3.856l-9.5,4.222V14.41c0,5.863,4.047,11.33,9.5,12.665,5.451-1.335,9.5-6.8,9.5-12.665V8.078Zm0,11.6h7.388c-.559,4.348-3.456,8.222-7.388,9.43V15.466H8.538V9.45l7.388-3.282v9.288Z" transform="translate(-6.427 -3.856)"/>
                        </svg>

                    </div>
                    <div class="flex-row-js info-section-hold">
                        <div class="flex-col gap-4">
                            <h3>Security</h3>
                            <div class="text-gray font-14">Change your password</div>
                        </div>
                        <div class="arrow-right">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 11.241 20.331">
                                <path d="M766.473,24.661a.934.934,0,0,1-.677-1.578l8.374-8.812-8.357-8.346a.934.934,0,1,1,1.32-1.322l9.646,9.634-9.63,10.133A.931.931,0,0,1,766.473,24.661Z" transform="translate(-765.539 -4.33)"/>
                            </svg>
                        </div>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'SettingsPaymentInfo' }" class="flex">
                    <div class="icon-hold">
                        <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 20.033 16.027">
                            <path d="M20.03,4H4A1.988,1.988,0,0,0,2.01,6L2,18.023a2,2,0,0,0,2,2H20.03a2,2,0,0,0,2-2V6A2,2,0,0,0,20.03,4Zm0,14.023H4v-6.01H20.03Zm0-10.017H4V6H20.03Z" transform="translate(-2 -4)"/>
                        </svg>
                    </div>
                    <div class="flex-row-js info-section-hold">
                        <div class="flex-col gap-4">
                            <h3>Payment information</h3>
                            <div class="text-gray font-14">Mobile Money, Card payments</div>
                        </div>
                        <div class="arrow-right">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 11.241 20.331">
                                <path d="M766.473,24.661a.934.934,0,0,1-.677-1.578l8.374-8.812-8.357-8.346a.934.934,0,1,1,1.32-1.322l9.646,9.634-9.63,10.133A.931.931,0,0,1,766.473,24.661Z" transform="translate(-765.539 -4.33)"/>
                            </svg>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Settings',
    data() {
        return {
            title: 'Settings'
        }
    },
    computed: {
        ...mapGetters(['getUser']),
        computeInitials() {
            if(this.getUser.name) {
                let name = this.getUser.name.split(' ')
                let initial = name[0].charAt(0).toUpperCase() + (name[1] ? name[1].charAt(0).toUpperCase() : '')
                return initial
            }
            return ''
        }
    },
    created() {
        window.scrollTo(0,0)
        this.setPage()
    },
    methods: {
        setPage() {
            const title = { title: this.title, back: false}
            this.$store.commit('setPagetitle', title)
        }
    }
}
</script>
<style scoped lang="scss">
.image-hold{
    .bg-img{
        background-color: $gray-color;
    }
    span{
        color: #fff;
    }
}
.icon-hold{
    width: 50px;
    display: flex;
    align-items: center;
}
ul{
    padding: 0 40px;
}
.li{
    padding: 20px 0;
}
h3{
    margin: 0;
    font-size: 18px;
    font-weight: 600;
}
a{
    text-decoration: none;
    color: unset;
    &:hover {
        .arrow-right{
            path{
                fill: $dark;
            }
        }
    }
}
.arrow-right{
    path{
        transition: 0.3s all;
        fill: $gray-light;
    }
}
.text-primary:hover{
    text-decoration: underline;
}
hr{
    margin: 0;
}
</style>