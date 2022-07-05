<template>
    <div v-if="imageStatus.status" class="status-div-backdrop" @click="$emit('clrError')">
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
</template>
<script>
export default {
    name: 'ImageStatusOverlay',
    props: ['imageStatus']
}
</script>
<style lang="scss" scoped>
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
            border-radius: 50%;
        }
    }

}

</style>