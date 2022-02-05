<template>
<div class="section">
    <div class="flex align-items-center content-row">
        <div class="row-title">inventory</div>
        <div class="edit-action-2">
            <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 14.62 16.711">
                    <path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#566ff4"/>
                </svg>
                Edit
            </a>
        </div>
    </div>
    <div class="flex lign-items-center item-row">
        <div class="item-label">Total units:</div>
        <div class="item-value">500</div>
    </div>
    <div class="flex lign-items-cente item-row">
        <div class="item-label">Units (Batch number / expiration date):</div>
    </div>
    <div class="units-wrap item-row">
        <div class="flex flex-wrap">
            <li v-for="unit in units" :key="unit.id">
                <div class="unit-pill flex flex-row-js">
                    <span class="batch-no text-overflow-ellipsis">9344739-3934df934</span>
                    <span class="divider">|</span>
                    <span class="expiry-date text-overflow-ellipsis">20-83-20</span>
                    <button v-if="editMode" class="flex align-items-center justify-content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="3" viewBox="0 0 22 4">
                            <path d="M5001-4120a2,2,0,0,1,2-2,2,2,0,0,1,2,2,2,2,0,0,1-2,2A2,2,0,0,1,5001-4120Zm-9,0a2,2,0,0,1,2-2,2,2,0,0,1,2,2,2,2,0,0,1-2,2A2,2,0,0,1,4992-4120Zm-9,0a2,2,0,0,1,2-2,2,2,0,0,1,2,2,2,2,0,0,1-2,2A2,2,0,0,1,4983-4120Z" transform="translate(-4983 4122)" fill="#434752"/>
                        </svg>
                    </button>
                </div>
            </li>
            <a href="">View all</a>
        </div>
    </div>
    <hr>
    <div class="flex align-items-center content-row">
        <div class="row-title">Cost, pricing & profit</div>
        <div class="edit-action-2">
            <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 14.62 16.711">
                    <path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#566ff4"/>
                </svg>
                Edit
            </a>
        </div>
    </div>
    <div class="flex lign-items-center item-row">
        <div class="item-label">Unit Cost:</div>
        <div class="item-value">500</div>
    </div>
    <div class="flex lign-items-center item-row">
        <div class="item-label">Selling Price:</div>
        <div class="item-value">500</div>
    </div>
    <div class="flex lign-items-center item-row">
        <div class="item-label">Profit:</div>
        <div class="item-value">500</div>
    </div>
    <div class="flex lign-items-center item-row">
        <div class="item-label">Profit Margin:</div>
        <div class="item-value">5%</div>
    </div>
    <hr>
    <div class="flex align-items-center content-row">
        <div class="row-title">Discounts</div>
        <div class="edit-action-2">
            <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 14.62 16.711">
                    <path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#566ff4"/>
                </svg>
                Edit
            </a>
        </div>
    </div>
    <div class="flex empty-state">
        <button class="button-secondary">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20.582 20.582"><path d="M-9242.92-183.675v-8.29h-8.29a1,1,0,0,1-1-1,1,1,0,0,1,1-1h8.29v-8.292a1,1,0,0,1,1-1,1,1,0,0,1,1,1v8.292h8.29a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-8.29v8.29a1,1,0,0,1-1,1A1,1,0,0,1-9242.92-183.675Z" transform="translate(9252.211 203.256)" fill="#566ff4"></path></svg>
            </div>
            <span>Add a discount tag</span>
        </button>
    </div>
</div>
</template>
<script>
export default {
    name: 'ProductInfoDetails',
    data() {
        return {
            units: [
                {id: 1},
                {id: 2},
                {id: 3},
                {id: 4}
            ],
            editMode: false
        }
    }
}
</script>
<style scoped lang="scss">
.section{
    padding: 20px 0
}
.edit-action-2{
    margin-left: 20px;
}
a{
    color: $primary-color;
    text-decoration: none;
    font-weight: 600;
    &:hover{
        text-decoration: underline;
    }
}
.row-title{
    text-transform: uppercase;
    font-weight: 700;
    //color: $gray-color;
}
.content-row{
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid $gray-light;
    position: relative
}
.item-row{
    margin-bottom: 18px;
}
.item-label{
    font-weight: 500;
    //color: $gray-color;
}
.item-value{
    margin-left: 20px;
    font-weight: 500;
}
.units-wrap{
    li{
        width: 50%;
        list-style-type: none;
        padding: 0 15px 15px 0;
    }
}
.unit-pill{
    border: 1px solid #D4D8DE;
    border-radius: 27px;
    padding: 4px 4px 4px 18px;
    span{
        align-items: center;
        display: flex;
        //margin-right: 20px;
        height: 38px;
        &:last-child{
            padding-right: 18px;
        }
    }
    .divider{
        color: $gray-color;
    }
    .expiry-date{
        color: $gray-color;
    }
    button{
        width: 38px;
        height: 38px;
        border-radius: 50%;
        display: flex;
        background-color: transparent;
        &:hover{
            background-color: $dark-light;
        }
    }
}
hr{
    border-bottom: none;
    margin: 22px 0;
}
.empty-state button{
    width: 100%;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    flex-direction: column;
    height: 300px;
    border-style: dashed;
    border-width: 1px;
    transition: 0.3s all;
    &:hover{
        background-color: #e9ebf059;
    }
    div{
        height: 60px;
        width: 60px;
        border-radius: 50%;
        background-color: $primary-light;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.3s all;
        &:hover{
            background-color: rgba(86, 110, 244, 0.1);
        }
        &:active{
            box-shadow: 0 0 0 0.2rem rgb(86 111 244 / 20%);
            border: 1px solid $primary-color;
            background-color: $primary-light;
        }
    }
    span{
        font-weight: 500;
        padding: 15px 0;
        color: $gray-color;
    }
}
</style>