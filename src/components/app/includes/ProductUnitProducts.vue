<template>
    <li>
        <div class="unit-pill flex" :class="{'expired-prod' :  computeExpiry }">
            <span class="pill-batch-no text-overflow-ellipsis">{{ unit.batch_no }}</span>
        </div>
        <div class="pop-over">
            <div class="has-expired" v-if="computeExpiry">
                <span>
                    This product has expired. <br /> Please remove from stock.
                </span>
                <hr>
            </div>
            <div class="flex mb-8">
                <label>Batch No:</label><span>{{ unit.batch_no }}</span>
            </div>
            <div class="flex" v-if="unit.expires">
                <label>Expiry Date:</label><span>{{ unit.expiry_date }}</span>
            </div>
        </div>
    </li>
</template>
<script>
export default {
    name: 'ProductUnitProducts',
    props: ['unit'],
    computed: {
        computeExpiry() {
            if(this.unit.expires && this.unit.active == 0) {
                return true
            }else {
                return false
            }
        }
    }
}
</script>
<style scoped lang="scss">
.unit-pill{
    border: 1px solid $gray-light;
    border-radius: 27px;
    padding: 0 10px;
    background-color: #fff;
    span{
        align-items: center;
        display: flex;
        height: 38px;
        color: $dark;
        font-weight: 500;
        font-size: 15px;
    }
}
.expired-prod{
    background-color: rgba(230, 50, 50, 0.1) !important;
    border-color: transparent !important ;
    span{
        color: $danger !important;
    }
}
li{
    &:hover{
        .pop-over{
            display: block;
        }
    }
}
.pop-over{
    position: absolute;
    transition: 0.4s all;
    z-index: 10;
    border-radius: 8px;
    background-color: $white-color;
    padding: 15px;
    box-shadow: 0 0 40px rgb(0 0 0 / 13%);
    display: none;
    font-size: 0.9rem;
    label{
        margin: 0 5px 0 0;
    }
    &::after{
        content: " ";
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -8px;
        border-width: 8px;
        border-style: solid;
        border-color: transparent transparent #fff transparent;
    }
}
hr{
    margin: 10px 0;
}
.has-expired{
    span{
        color: $danger;
        font-size: 0.98rem;
        font-weight: 500;
    }
}

</style>