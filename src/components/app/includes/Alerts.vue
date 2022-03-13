<template>
<transition name="slide">
<div class="status-alert" v-if="getAlert.status.show">
    <div class="alert-wrap">
        <div class="alert flex align-items-center">
            <div class="flex">
                <svg v-if="getAlert.status.success" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36.998 36.998">
                    <path d="M19189.729-3033a18.383,18.383,0,0,1-7.2-1.454,18.431,18.431,0,0,1-5.879-3.964,18.415,18.415,0,0,1-3.963-5.879,18.364,18.364,0,0,1-1.455-7.2,18.378,18.378,0,0,1,1.455-7.2,18.411,18.411,0,0,1,3.963-5.881,18.433,18.433,0,0,1,5.879-3.965,18.383,18.383,0,0,1,7.2-1.454,18.4,18.4,0,0,1,7.2,1.454,18.447,18.447,0,0,1,5.881,3.965,18.422,18.422,0,0,1,3.963,5.881,18.376,18.376,0,0,1,1.455,7.2,18.364,18.364,0,0,1-1.455,7.2,18.416,18.416,0,0,1-3.963,5.879,18.445,18.445,0,0,1-5.881,3.964A18.4,18.4,0,0,1,19189.729-3033Zm-10.488-20.063a1.474,1.474,0,0,0-1.07.448,1.484,1.484,0,0,0-.428,1.061,1.493,1.493,0,0,0,.451,1.06l8.219,8.031,15.248-14.9a1.487,1.487,0,0,0,.453-1.058,1.481,1.481,0,0,0-.43-1.063,1.483,1.483,0,0,0-1.072-.452,1.5,1.5,0,0,0-1.049.427l-13.15,12.852-6.121-5.982A1.5,1.5,0,0,0,19179.24-3053.065Z" transform="translate(-19171.232 3070)" fill="#20C647"/>
                </svg>
                <svg v-if="getAlert.status.danger" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36.998 36.998">
                    <path d="M19189.729-3033a18.383,18.383,0,0,1-7.2-1.454,18.431,18.431,0,0,1-5.879-3.964,18.415,18.415,0,0,1-3.963-5.879,18.364,18.364,0,0,1-1.455-7.2,18.378,18.378,0,0,1,1.455-7.2,18.411,18.411,0,0,1,3.963-5.881,18.433,18.433,0,0,1,5.879-3.965,18.383,18.383,0,0,1,7.2-1.454,18.4,18.4,0,0,1,7.2,1.454,18.447,18.447,0,0,1,5.881,3.965,18.422,18.422,0,0,1,3.963,5.881,18.376,18.376,0,0,1,1.455,7.2,18.364,18.364,0,0,1-1.455,7.2,18.416,18.416,0,0,1-3.963,5.879,18.445,18.445,0,0,1-5.881,3.964A18.4,18.4,0,0,1,19189.729-3033Zm.006-16.732h0l7.02,7.023a1.231,1.231,0,0,0,.881.366,1.257,1.257,0,0,0,.883-.366,1.249,1.249,0,0,0,.369-.887,1.249,1.249,0,0,0-.369-.887l-7.02-7.019,7.02-7.019a1.259,1.259,0,0,0,0-1.769,1.233,1.233,0,0,0-.881-.362,1.244,1.244,0,0,0-.883.362l-7.02,7.024-7.023-7.024a1.233,1.233,0,0,0-.881-.362,1.252,1.252,0,0,0-.885.362,1.259,1.259,0,0,0,0,1.769l7.02,7.019-7.02,7.019a1.268,1.268,0,0,0,0,1.774,1.245,1.245,0,0,0,.885.365,1.226,1.226,0,0,0,.881-.365l7.023-7.023Z" transform="translate(-19171.232 3070)" fill="#E23636"/>
                </svg>
            </div>
            <div class="alert-body">{{ getAlert.body }}</div>
            <button class="alert-close flex justify-content-center align-items-center" @mousedown="$store.commit('dismisAlert')">
                <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                      <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#7e8596"/>
                </svg>
            </button>
        </div>
    </div>
</div>
</transition>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
    name: 'Alerts',
    computed: mapGetters(['getAlert'])
}
</script>
<style scoped lang="scss">
.status-alert{
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 999;
        display: flex;
        justify-content: center;
    .alert-wrap{
        position: fixed;
            .alert{
                border-radius: 26px;
                position: relative;
                padding: 26px 24px;
                background-color: $white-color;
                justify-content: flex-start;
                width: 100%;
                box-shadow: 3px 10px 20px 7px rgb(7 10 46 / 11%);
                margin-top: 20px;
            h5{
                margin: 0;
                font-weight: 500;
                font-size: 1.1em;
            }
            .alert-body{
                font-size: 1rem;
                max-width: 350px;
                font-weight: 600;
                padding: 0 20px;
            }
            
        }
    }
  
  .success-alert{
    background-color: rgba(58, 173, 116, 0.1);
    color: #064727;
    border-color: rgba(58, 173, 116, 0.5);
    .i-hold{
      background-color: rgba(58, 173, 116, 0.6);
      i{
        background-image: url('/images/mark-correct.svg');
      }
    }
  }
  .danger-alert{
    background-color: rgba(250, 10, 10, 0.1);
    color: #4b0808;
    border-color: rgba(250, 10, 10, 0.5);
    .i-hold{
      background-color: #fa0a0a;
      i{
        background-image: url('/images/danger.svg');
      }
    }
  }
  .warning-alert{
    background-color: rgba(255, 159, 10, 0.1);
    color: #5c3a07;
    border-color:rgba(255, 159, 10, 0.5);
    .i-hold{
      background-color: #ff9f0a;
      i{
        background-image: url('/images/warning.svg');
      }
    }
  }
  .info-alert{
    background-color: rgba(100, 210, 255, 0.1);
    color: #053b50;
    border-color: rgba(100, 210, 255, 0.5);
    .i-hold{
      background-color: #64d2ff;
      i{
        background-image: url('/images/info.svg');
      }
    }
  }
  
  
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-150px);
  
}
</style>