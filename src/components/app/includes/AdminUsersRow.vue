<template>
    <div class="row flex" :class="admin.role == '1' ? 'owner-row' : 'seller-row'">
        <div class="flex-col">
            <div class="flex align-items-center">
                <div class="admin-name">{{ admin.name }}</div>
                <span class="separator-dot"></span>
                <div class="pill">{{ admin.role == '1' ? 'Owner' : 'Seller' }}</div>
            </div>
            <div class="admin-email">{{ admin.email }}</div>
            <div class="access flex-col" v-if="admin.role != '1'">
                <h4>Can access:</h4>
                <div v-for="access in computeAccess1" :key="access.id" class="flex accesses">
                    <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg>
                    <div class="flex-col">
                        <span class="name">{{ access.name }}</span>
                        <span class="address">{{ access.address }}</span>
                    </div>
                </div>
                <div v-for="access in computeAccess2" :key="access.id" class="flex align-items-center accesses">
                    <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 27.028 19.354"><path d="M301.593,2748.482l-9.772-9.461,2.087-2.155,7.652,7.409,15.169-15.146,2.12,2.123Z" transform="translate(-291.821 -2729.128)" fill="#566ff4"></path></svg>
                    <div class="flex-col">
                        <span class="name">{{ access.name }}</span>
                        <span class="address">{{ access.address }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="edit-wrap">
            <button v-if="admin.role != '1'" class="button edit-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 14.62 16.711">
                    <path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#0e142c"></path>
                </svg>
                <span>Edit</span>
            </button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'AdminUsersRow',
    props: ['admin'],
    computed: {
        ...mapGetters(['getStores']),
        computeAccess1() {
            return this.getStores.filter(store => store.id == this.admin.store_1)
        },
        computeAccess2() {
            return this.getStores.filter(store => store.id == this.admin.store_2)
        }
    },
}
</script>
<style scoped lang="scss">
.row{
    border-bottom: 1px solid $dark-light;
    justify-content: space-between;
    padding: 20px;
    margin: 0 -20px 0 -20px;
    border-radius: 2px;
}
.flex-col{
    gap: 6px;
}
.access{
    gap: 10px;
    svg{
        margin-top: 4px;
        margin-right: 10px;
    }
}
.edit-wrap{
    display: flex;
    align-items: flex-start;
}
h4{
    margin: 5px 0;
    text-decoration: underline;
    color: $gray-color;
}
.edit-btn{
    background-color: transparent;
    margin-right: -15px;
    span{
        margin-left: 8px;
    }
    path{
        transition: 0.3s all;
    }
    &:hover{
        color: $primary-color;
        path{
            fill: $primary-color;
        }
    }
}
 .admin-name{
        font-weight: 700;
}
.admin-email{
    color: $gray-color;
}
.pill{
    font-size: 13px;
    font-weight: 600;
    border-radius: 18px;
    padding: 6px 8px;
}
.seller-row{
    &:hover {
        background-color: rgb(250, 250, 250);
    }
    .pill{
        background-color: hsla(195, 91%, 54%, 0.165);
        color: #1DBEF4;
    }

}
.owner-row{
    background-color: #ebedf0;
    opacity: 0.6;
    color: $gray-color;

    .pill{
        background-color: #D4D8DE;
        color: #434752;
    }
}
.accesses{
    align-items: flex-start;
    .name{
        font-weight: 600;
    }
    .address{
        color: $gray-color;
        font-size: 14px;
    }
}
</style>