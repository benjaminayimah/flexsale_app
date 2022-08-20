<template>
<teleport to="#onboarding_title">
    <span>Store Photo</span>
</teleport>
<teleport to="#onboarding_top_button">
    <div class="flex">
        <button class="button button-primary top-submit-btn" v-if="getOnboard.imageForm.storeID == ''" @click.prevent="afterOnboardImageUpdate">
            <span>Save</span>
            <spinner v-if="submiting" v-bind:size="16" v-bind:white="true" />
        </button>
        <button class="button button-primary top-submit-btn" v-else @click.prevent="onboardImageUpload" :class="{ 'button-disabled' : !imageUploaded }" :disabled="!imageUploaded? true : false">
            <span>Upload image</span>
            <spinner v-if="submiting" v-bind:size="16" v-bind:white="true" />
        </button>
    </div>
</teleport>
<teleport to="#onboard_body_content">
     <div class="flex-col align-items-center ob-wrap">
        <div class="ob-content">
            <div class="image bg-img" :style="getOnboard.uploaded? { backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/temp/'+getOnboard.imageForm.image+')'} : { backgroundImage: 'url('+getDefaultImage+')'}" >
                <div class="overlay">
                    <div class="flex cam justify-content-center align-items-center">
                        <div class="btn-holder">
                            <input class="hide" @change="uploadTemp" name="image" id="avatar_img" type="file" ref="img">
                            <button class="button cancel-btn flex" v-if="getOnboard.uploaded" @click.prevent="deltmp(getOnboard.imageForm.image)">
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 20 20">
                                    <path d="M5793.4-3003.846l-7.881-7.881-7.879,7.88a1.241,1.241,0,0,1-1.756,0,1.242,1.242,0,0,1,0-1.756l7.88-7.879-7.88-7.879a1.243,1.243,0,0,1,0-1.757,1.241,1.241,0,0,1,1.756,0l7.88,7.88,7.88-7.88a1.24,1.24,0,0,1,1.755,0,1.24,1.24,0,0,1,0,1.756l-7.88,7.88,7.88,7.88a1.241,1.241,0,0,1,0,1.757,1.236,1.236,0,0,1-.877.363A1.236,1.236,0,0,1,5793.4-3003.846Z" transform="translate(-5775.518 3023.483)" fill="#ffffff"></path>
                                </svg>
                            </button>
                            <button class="button upload-btn flex" @click.prevent="uploadClick('avatar_img')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18">
                                    <path d="M20,4H16.83L15,2H9L7.17,4H4A2.006,2.006,0,0,0,2,6V18a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V6A2.006,2.006,0,0,0,20,4Zm0,14H4V6H8.05L9.88,4h4.24l1.83,2H20ZM12,7a5,5,0,1,0,5,5A5,5,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3.009,3.009,0,0,1,12,15Z" transform="translate(-2 -2)" fill="#ffffff"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="instruction">The file type must be <strong>"png, jpg or jpeg"</strong> and <strong>Less than 1MB</strong></div>
            <image-status-overlay v-if="imageStatus.status" v-bind:imageStatus="imageStatus" @clrError="clrError" />
        </div>
    </div>
</teleport>

   
</template>
<script>
import axios from 'axios'
import validationMixin from '../../../mixins/validationMixin'
import { mapGetters } from 'vuex'
import Spinner from './Spinner.vue'
import ImageStatusOverlay from './ImageStatusOverlay.vue'
export default {
    name: "OnboardScreenAvatar",
    mixins: [validationMixin],
    components: { Spinner, ImageStatusOverlay },
    computed: mapGetters(["getDefaultImage", "getOnboard", "getHostname", "getToken", "getUser", "getUserAdminID", 'getCurrentStore']),
    data() {
        return {
            imageStatus: { status: false, msg: "" },
            doingtempUpload: false,
            imageUploaded: false,
            deleting: false,
            load: false,
        };
    },
    methods: {
        uploadClick(id) {
            document.getElementById(id).click();
        },
        showError(msg) {
            this.imageStatus.status = true;
            this.imageStatus.msg = msg;
            return;
        },
        clrError() {
            this.imageStatus.status = false;
            this.imageStatus.msg = "";
            document.getElementById("avatar_img").value = null;
            return;
        },
        uploadTemp() {
            if (this.imageStatus.status) {
                this.clrError();
            }
            let file = this.$refs.img.files[0];
            if (file) {
                if (!(file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg")) {
                    return this.showError("Unsupported file. The file type must be \"png, jpg or jpeg\"");
                }
                else {
                    if (file.size > 1000000) {
                        return this.showError("This file is too large. The file size must be less than 1MB");
                    }
                    else {
                        this.doingtempUpload = true;
                        this.load = true;
                        let formData = new FormData();
                        formData.append("image", file);
                        axios.post(this.getHostname + "/api/store-temp-upload?token=" + this.getToken, formData, {
                            headers: {
                                "Content-Type": ["multipart/form-data", "application/json"]
                            },
                        }).then((res) => {
                            this.afterTempUpload(res.data.image);
                        }).catch((err) => {
                            console.log(err.response);
                        });
                    }
                }
            }
        },
        afterTempUpload(res) {
            this.$store.commit("setStoreTempImg", res);
            document.getElementById("avatar_img").value = null;
            this.load = false;
            this.imageUploaded = true;
            this.doingtempUpload = false;
        },
        alertMsg(id, title, msg) {
            const payload = {
                id: id,
                title: title,
                body: msg
            };
            this.$store.commit("showAlert", payload);
        },
        onboardImageUpload() {
            this.submiting = true
            const url = this.getHostname + "/api/submit-store-image?token=" + this.getToken;
            return this.doSubmitImage(url);
        },
        afterOnboardImageUpdate() {
            this.submiting = true
            const url = this.getHostname + "/api/update-store-image?token=" + this.getToken;
            return this.doSubmitImage(url);
        },
        async doSubmitImage(Url) {
            axios.post(Url, this.getOnboard.imageForm, {
                headers: {
                    "Content-Type": ["application/json"]
                },
            }).then((res) => {
                this.submiting = false
                console.log(res.data)
                if (res.data.store != "") {
                    this.$store.commit("updateAvatar", res.data.store);
                }
                if (this.getOnboard.imageForm.storeID == "") {
                    const payload = {
                        id: "success",
                        title: res.data.title,
                        body: res.data.message
                    };
                    this.$store.commit("forceCloseOnboard");
                    this.$store.commit("showAlert", payload);
                }
                else {
                    this.$store.commit("forceSetOnboard", "final");
                }
            }).catch((err) => {
                this.submiting = false
                console.log(err.response.data.errors);
            });
        },
        deltmp(id) {
            this.deleting = true;
            this.load = true;
            axios.delete(this.getHostname + "/api/del-store-temp/" + id + "?token=" + this.getToken)
                .then(() => {
                this.$store.commit("delStoreTempImg")
                this.imageUploaded = false
                // this.deleting = false
                // this.load = false
            }).catch((err) => {
                // this.deleting = false
                // this.load = false
                console.log(err);
            });
        },
    },
}
</script>
<style scoped lang="scss">
.ob-content{
    width: 100%;
}
.image{
    height: 280px;
    width: 100%;
    border-radius: 14px;
    position: relative;
    .overlay{
        background-color: rgba(0, 0, 0, 0);
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: inherit;
        transition: 0.3s all;
        &:hover{
            background-color: rgba(0, 0, 0, 0.2);
        }
        .cam{
            height: 100%;
        }
        button{
            align-items: center;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.6);
            &:hover{
                background-color: rgba(0, 0, 0, 0.8);
            }
            &:active{
                background-color: rgba(0, 0, 0, 0.5);
            }
        }
    }
}
.btn-holder{
    position: relative;
    .upload-btn{
        height: 50px;
        width: 50px;
    }
    .cancel-btn{
        position: absolute;
        top: -50px;
        left: 15px;
        height: 40px;
        width: 40px;
    }
}
.instruction{
    color: $gray-color;
    font-size: 0.98rem;
    padding: 15px 0;
}

</style>