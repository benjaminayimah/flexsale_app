<template>
    <teleport to="#app">
        <transition name="bounce">
            <div v-if="sold.active" class="sale-compete-wrapper f-f-c" :class="computeWidth ? 'width-active': 'width-inactive'">
            <div class="flex-col align-items-center gap-16">
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 137 137.004">
                <path d="M-18881,10444.5a68.5,68.5,0,0,1,68.5-68.5,68.5,68.5,0,0,1,68.5,68.5,68.5,68.5,0,0,1-68.5,68.5A68.5,68.5,0,0,1-18881,10444.5Zm43.789-58.512a63.7,63.7,0,0,0-10.789,5.857,63.65,63.65,0,0,0-9.4,7.757,63.786,63.786,0,0,0-7.762,9.4,63.754,63.754,0,0,0-5.852,10.784,63.036,63.036,0,0,0-4.99,24.712,63.041,63.041,0,0,0,4.99,24.716,63.763,63.763,0,0,0,5.852,10.785,63.829,63.829,0,0,0,7.762,9.4,63.65,63.65,0,0,0,9.4,7.757,63.7,63.7,0,0,0,10.789,5.857,63.123,63.123,0,0,0,24.711,4.984,63.124,63.124,0,0,0,24.717-4.984,63.517,63.517,0,0,0,10.785-5.857,63.48,63.48,0,0,0,9.4-7.757,63.436,63.436,0,0,0,7.758-9.4,63.488,63.488,0,0,0,5.852-10.785,63.041,63.041,0,0,0,4.99-24.716,63.036,63.036,0,0,0-4.99-24.712,63.479,63.479,0,0,0-5.852-10.784,63.394,63.394,0,0,0-7.758-9.4,63.48,63.48,0,0,0-9.4-7.757,63.517,63.517,0,0,0-10.785-5.857,63.124,63.124,0,0,0-24.717-4.984A63.123,63.123,0,0,0-18837.213,10385.986Zm13.918,81.616-23.012-20.925a2.5,2.5,0,0,1-.17-3.53,2.5,2.5,0,0,1,3.535-.171l21.143,19.229,36.838-41.334a2.5,2.5,0,0,1,3.535-.2,2.508,2.508,0,0,1,.2,3.53l-40.205,45.105Z" transform="translate(18881.002 -10375.998)" fill="#566ff4"/>
              </svg>
              <h1>Sale is recorded!</h1>
              <div class="flex gap-8"><span>Receipt ID:</span><span>{{ sold.receipt }}</span></div>
              <div class="card-outline">
                <div class="flex-row-js">
                  <label>Total</label><h3><span class="currency">{{ getCurrency }}</span><span  class="value">{{ Intl.NumberFormat('en-US').format(sold.total.toFixed(2)) }}</span></h3>
                </div>
                <hr class="mb-16">
                <div class="flex-row-js mb-16">
                  <label>Cash received</label><span>{{ getCurrency }}{{ Intl.NumberFormat('en-US').format(sold.received) }}</span>
                </div>
                <div class="flex-row-js">
                  <label>Change</label><span>{{ getCurrency }}{{ Intl.NumberFormat('en-US').format(sold.change) }}</span>
                </div>
              </div>
              <button class="button print-receipt-btn flex gap-8" @click="makeReceipt">
                  <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 20 18">
                      <path d="M19,8H5a3,3,0,0,0-3,3v6H6v4H18V17h4V11A3,3,0,0,0,19,8ZM16,19H8V14h8Zm3-7a1,1,0,1,1,1-1A1,1,0,0,1,19,12ZM18,3H6V7H18Z" transform="translate(-2 -3)" fill="#212121"/>
                  </svg>
                  Print / Download Receipt
              </button>
              <button class="button button-primary add-sale-btn" @click="this.$emit('closeCompleted')">Done</button>
            </div>
            </div>
            <!--  -->
        </transition>
    </teleport>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    inheritAttrs: false,
    name: 'SaleCompletion',
    props: ['sold'],
    computed: {
        ...mapGetters(['getWindowWidth', 'getCurrency', 'getHostname', 'getUser', 'getCurrentStore', 'getRememberToken']),
        computeWidth() {
            if(this.getWindowWidth <= 540) {
                return true
            }else {
                return false
            }
        },
        
    },
    methods: {
      makeReceipt() {
            window.open(this.getHostname+'/generate-receipt/'+this.getUser.id+'/'+this.getCurrentStore.id+'/'+this.sold.id+'/'+this.getRememberToken,'popup','width=700,height=800'); return false
      }
    }
}
</script>
<style lang="scss" scoped>
.sale-compete-wrapper{
    background-color: #fff;
    padding: 60px 20px;
}
.card-outline{
  padding: 30px;
  width: 100%;
  background-color: $primary-light;
  border: none;
}
h1,h3,label{
  margin: 0;
}
hr{
  border-color: rgb(218, 223, 251);
}
.add-sale-btn {
    width: 120px;
    height: 50px;
}
label{
  font-size: 1rem;
}
.currency{
  font-size: 18px;
}
.value{
  font-size: 1.6rem;
}
.form-control{
  width: 100px;
  height: 48px;
  border-color: rgb(218, 223, 251);
}
.flex-col {
  width: 85%;
}
.width-inactive{
    top: 10%;
    border-radius: 20px;
    width: 540px;
}
.width-active{
    bottom: 0;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    width: 100%;
}
.bounce-enter-active {
  animation: bounce-in 0.3s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

</style>