<template>
    <li>
        <div class="unit-pill flex" :class="{'expired-prod' :  unit.active == 0 }">
            <span class="pill-batch-no text-overflow-ellipsis">{{ unit.batch_no }}</span>
            <button v-if="unit.active == 0" class="flex align-items-center justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 21.5 23.166">
                    <path d="M-162.427-433a2.727,2.727,0,0,1-2.714-2.539l-.912-13.682,1.5-.1.912,13.683a1.222,1.222,0,0,0,1.217,1.138h9.118a1.222,1.222,0,0,0,1.217-1.139l.912-13.682,1.5.1-.912,13.682A2.727,2.727,0,0,1-153.309-433Zm-6.039-18v-1.5h6.4v-3.666h8.394v3.666h6.705v1.5Zm13.295-1.5v-2.165h-5.394v2.165Z" transform="translate(168.466 456.167)" fill="#e63232">
                    </path>
                </svg>
            </button>
        </div>
        <div class="pop-over">
            <div class="has-expired" v-if="unit.active == 0">
                <span>
                    This product has expired. <br /> Please remove from stock.
                </span>
                <hr>
            </div>
            <div class="flex mb-8">
                <label>Batch No:</label><span>{{ unit.batch_no }}</span>
            </div>
            <div class="flex">
                <label>Expiry Date:</label><span>{{ unit.expiry_date }}</span>
            </div>
        </div>
    </li>
</template>
<script>
export default {
    name: 'ProductUnitProducts',
    props: ['unit']
}
</script>
<style scoped lang="scss">
.unit-pill{
    border: 1px solid $gray-light;
    border-radius: 27px;
    padding: 0 10px;
    background-color: #fff;
    //box-shadow: 0 1px 3px 0 rgb(14 20 44 / 15%);
    span{
        align-items: center;
        display: flex;
        //margin-right: 20px;
        height: 38px;
        color: $dark;
        font-weight: 500;
        font-size: 15px;
    }
    button{
        width: 38px;
        height: 38px;
        border-radius: 50%;
        display: flex;
        background-color: transparent;
        margin-right: -10px;
        &:hover{
            background-color: rgba(206, 58, 58, 0.1);
        }
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
    cursor: pointer;
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