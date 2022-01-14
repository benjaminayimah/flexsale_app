<template>
    <div class="table-row flex-row-js">
        <div class="flex-row-st">
            <div class="img-hold">
                <div class="img" :style="{backgroundImage: 'url('+require('@/assets/images/product-1.png')+')'}">
                </div>
            </div>
            <div class="prod-capt-hold">
                <div class="itm-name">{{ product.name }}</div>
                <div class="flex-row-st">
                    <label>Price:</label>
                    <div class="itm-price"><span>GH₵</span>500</div>
                </div>
                <div class="flex-row-st">
                    <div class="flex-row-st">
                        <label>Qty:</label>
                        <div class="qty">500</div>
                    </div>
                    
                    <div class="edit-action">
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 14.62 16.711">
                                <path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#566ff4"/>
                            </svg>
                            Edit stock
                        </a>
                    </div>
                </div>
            </div>
            <div class="batch-no">3847494-3827293-93e</div>
        </div>
        <div class="menu-toggle">
            <button>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ProductRow',
    props: ['product'],
    
}
</script>

<style scoped lang="scss">
.table-row{
    padding: 20px 0;
    border-bottom: 1px solid $dark-light;
}
.img-hold{
    .img{
        height: 100px;
        width: 100px;
        border-radius: 16px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
}.prod-capt-hold{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    .itm-name{
        font-weight: 700;
    }
    label{
        margin-right: 5px;
        color: $gray-color;
    }
}
.flex-row-st{
    align-items: center;
}
.edit-action{
    margin-left: 10px;
    a{
        color: $primary-color;
        text-decoration: none;
        &:hover{
            text-decoration: underline;
        }
    }
}
.batch-no{
    padding: 20px;
}

.menu-toggle{
    align-items: center;
    display: flex;
    button{
        height: 40px;
        width: 40px;
        border-radius: 20px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        transition: 0.4s;
        &:hover{
            background-color: $primary-light;
            span{
                background-color: $primary-color;
            }
        }
        span{
            height: 4px;
            width: 4px;
            background-color: $dark;
            border-radius: 50%;
            margin-right: 4px;
            &:last-child{
                margin-right: 0;
            }
        }
    }
}

</style>