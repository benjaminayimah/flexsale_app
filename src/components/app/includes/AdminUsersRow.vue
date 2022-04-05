<template>
    <div class="flex-row-js row">
        <div class="flex-col">
            <div class="flex align-items-center">
                <div class="admin-name">{{ admin.name }}</div>
                <span class="separator-dot"></span>
                <div class="pill">{{ admin.role == '1' ? 'Owner' : 'Seller' }}</div>
            </div>
            <div class="admin-email">{{ admin.email }}</div>
        </div>
        <button class="button edit-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 14.62 16.711">
                <path d="M-8807.809-385.606a.691.691,0,0,1-.692-.69.692.692,0,0,1,.692-.692h13.237a.692.692,0,0,1,.69.692.691.691,0,0,1-.69.69Zm-.489-2.477a.691.691,0,0,1-.146-.759l1.781-4.153a.706.706,0,0,1,.145-.216l8.367-8.4a2.379,2.379,0,0,1,1.7-.7,2.375,2.375,0,0,1,1.693.7,2.4,2.4,0,0,1,0,3.384l-8.4,8.37a.647.647,0,0,1-.216.145l-4.155,1.781a.667.667,0,0,1-.271.057A.692.692,0,0,1-8808.3-388.083Zm2.852-4.247-1.048,2.446,2.446-1.05,6.716-6.686-1.428-1.426Zm8.767-5.94.942-.938a1.017,1.017,0,0,0,0-1.433,1,1,0,0,0-.717-.3,1,1,0,0,0-.718.3l-.936.94Z" transform="translate(8808.501 402.318)" fill="#0e142c"></path>
            </svg>
            <span>Edit</span>
        </button>
    </div>
</template>
<script>
export default {
    name: 'AdminUsersRow',
    props: ['admin']
}
</script>
<style scoped lang="scss">
.row{
    border-bottom: 1px solid $dark-light;
    padding: 20px 0;
    &:hover {
        background-color: rgb(250, 250, 250);
    }
}
.flex-col{
    gap: 6px;
}
.edit-btn{
    background-color: transparent;
    // color: $gray-color;
    span{
        margin-left: 8px;
    }
    path{
        fill: $gray-color;
        transition: 0.3s all;
    }
    &:hover{
        // color: $dark;
        path{
            fill: $dark;
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
    background-color: hsla(195, 91%, 54%, 0.165);
    color: #1DBEF4;
    font-size: 13px;
    font-weight: 600;
    border-radius: 18px;
    padding: 6px 8px;
}
</style>