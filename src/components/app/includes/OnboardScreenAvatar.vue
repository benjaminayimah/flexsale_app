<template>
<teleport to="#onboarding_title">
    <span>Upload Store Photo</span>
</teleport>
<teleport to="#onboarding_top_button">
    <div class="flex">
        <!-- <button class="button button-secondary top-submit-btn" @click.prevent="this.$store.commit('forceSetOnboard', 'basicInfo')">Back</button> -->
        <button class="button button-primary top-submit-btn" v-if="getOnboard.imageForm.store == ''" @click.prevent="afterOnboardImageUpdate">Save</button>
        <button class="button button-primary top-submit-btn" v-else @click.prevent="onboardImageUpload">Done</button>
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
            <div v-if="imageStatus.status" class="status-div-backdrop" @click="clrError">
                <div class="status-div">
                    <button @click.prevent="">
                        <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                            <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#ffffff"/>
                        </svg>
                    </button>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 39.159 34.195">
                            <path d="M-12866.661-2756.781h-30.138a4.567,4.567,0,0,1-3.908-2.3,4.571,4.571,0,0,1,.014-4.536.025.025,0,0,0,.006-.013l15.066-25.148s0,0,0,0a4.579,4.579,0,0,1,3.895-2.2,4.579,4.579,0,0,1,3.9,2.2s0,0,0,0l15.063,25.148a.138.138,0,0,1,.01.013,4.571,4.571,0,0,1,.014,4.536,4.567,4.567,0,0,1-3.908,2.3Zm-17.248-30.967-15.056,25.139a2.572,2.572,0,0,0-.007,2.539,2.581,2.581,0,0,0,2.189,1.292h30.118a2.57,2.57,0,0,0,2.186-1.292,2.562,2.562,0,0,0,0-2.539l-15.057-25.139a2.574,2.574,0,0,0-2.186-1.227A2.576,2.576,0,0,0-12883.909-2787.748Zm.975,23.452a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1A1,1,0,0,1-12882.935-2764.3Zm0-7v-8a1,1,0,0,1,1-1,1,1,0,0,1,1,1v8a1,1,0,0,1-1,1A1,1,0,0,1-12882.935-2771.3Z" transform="translate(12901.303 2790.976)" fill="#e63232"/>
                        </svg>
                    </div>
                    <div><span>{{ imageStatus.msg }}</span></div>
                </div>
            </div>
        </div>
    </div>
</teleport>

   
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    name: 'OnboardScreenAvatar',
    computed: mapGetters(['getDefaultImage', 'getOnboard', 'getHostname', 'getToken', 'getUser', 'getUserAdminID']),
    data() {
        return {
            imageStatus: {status: false, msg: ''},
            doingtempUpload: false,
            imageUploaded: false,
            deleting: false,
            load: false,
        }
    },
    methods: {
        uploadClick(id) {
            document.getElementById(id).click()
        },
        showError(msg) {
            this.imageStatus.status = true
            this.imageStatus.msg = msg
            return
        },
        clrError() {
            this.imageStatus.status = false
            this.imageStatus.msg = ''
            document.getElementById('avatar_img').value = null
            return
        },
        uploadTemp() {
            if(this.imageStatus.status) {
                this.clrError()
            }
            let file = this.$refs.img.files[0]
            if(file) {
                if(!(file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg")){
                    return this.showError('Unsupported file. The file type must be "png, jpg or jpeg"')
                }else{
                    if(file.size > 1000000) {
                        return this.showError('This file is too large. The file size must be less than 1MB') 
                    }else {
                        this.doingtempUpload = true
                        this.load = true
                        let formData = new FormData();
                        formData.append('image', file);
                        axios.post( this.getHostname+'/api/store-temp-upload?token='+this.getToken,
                                formData,
                                {
                                    headers: {
                                        'Content-Type': ['multipart/form-data', 'application/json']
                                    },
                                }
                        ).then((res) => {
                            this.afterTempUpload(res.data.image)
                        }).catch((err) => {
                            console.log(err.response)
                                
                        })
                    }
                    
                }
                
            }
            
        },
        afterTempUpload(res) {
            this.$store.commit('setStoreTempImg', res)
            document.getElementById('avatar_img').value = null
            this.load = false
            this.imageUploaded = true
            this.doingtempUpload = false
        },
        alertMsg(id, title, msg) {
            const payload = {
                id: id,
                title: title,
                body: msg
            }
            this.$store.commit('showAlert', payload)
        },
        onboardImageUpload() {
            const url = this.getHostname+'/api/submit-store-image?token='+this.getToken
            return this.doSubmitImage(url)
        },
        afterOnboardImageUpdate() {
            const url = this.getHostname+'/api/update-store-image?token='+this.getToken
            return this.doSubmitImage(url)
        },
        async doSubmitImage(Url) {
            axios.post( Url, this.getOnboard.imageForm,
                    {
                        headers: {
                            'Content-Type': ['application/json']
                        },
                    }
            ).then((res) => {
                if(res.data.store != '') {
                    this.$store.commit('updateAvatar', res.data.store)
                }
                if(this.getOnboard.imageForm.store == '') {
                    const payload = {
                        id: 'success',
                        title: res.data.title,
                        body: res.data.message
                    }
                    this.$store.commit('forceCloseOnboard')
                    this.$store.commit('showAlert', payload)
                }else{
                    this.$store.commit('forceSetOnboard', 'final')
                }
                
            }).catch((err) => {
                console.log(err.response.data.errors)
            })
        },
        deltmp(id) {
            this.deleting = true
            this.load = true
            axios.delete(this.getHostname+'/api/del-store-temp/'+id+'?token='+this.getToken)
            .then(() => {
                this.$store.commit('delStoreTempImg')

                // this.deleting = false
                // this.load = false
            }).catch((err) => {
                // this.deleting = false
                // this.load = false
                console.log(err)

            })
        },
    }
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

 .status-div-backdrop{
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 500;
                display: flex;
                flex-direction: column;
                justify-content: center;
                background-color: rgba(0, 0, 0, 0.5);
                align-items: center;
            .status-div{
                position: relative;
                max-width: 300px;
                background-color: $white-color;
                padding: 20px;
                align-items: center;
                justify-content: center;
                border-radius: 16px;
                box-shadow: 0 1px 15px 0 rgb(14 20 44 / 12%);
                display: flex;
                flex-direction: row;
                div{
                    padding-right: 15px;
                }
                span{
                    margin: 0;
                    font-weight: 400;
                }
                button{
                    background-color: $dark;
                    position: absolute;
                    right: -10px;
                    top: -10px;
                    height: 30px;
                    width: 30px;
                }
        }

    }

</style>