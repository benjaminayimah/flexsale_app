<template>
    <div class="activity-row flex">
        <div class="icon-hold flex">
            <a href="" class="flex">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 16 16">
                    <path d="M12,16V14H10V12h2V10h2v2h2v2H14v2ZM0,16V15a4.952,4.952,0,0,1,5-5H8v2H5a2.913,2.913,0,0,0-2.8,2H8v2ZM3,5V4a4,4,0,0,1,8,0V5A4,4,0,1,1,3,5ZM5,4V5A2,2,0,1,0,9,5V4A2,2,0,1,0,5,4Z" fill="#4ad991"/>
                </svg>
            </a>
            <i></i>
        </div>
        <div class="description-hold flex">
            <div class="acti-heading"><strong>John Doe</strong>, added a new account user</div>
            <div class="acti-footer">4 hours ago</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ActivityListRow'
}
</script>
<style scoped lang="scss">
.activity-row{
    
    .icon-hold{
        flex-direction: column;
        align-items: center;
        a{
            height: 50px;
            width: 50px;
            border-radius: 50%;
            
            justify-content: center;
            align-items: center;
            background-color: $white-color;
        }
        i{
            background-color: $white-color;
            height: 30px;
            width: 1px;
            margin: 5px;
        }
    }
    .description-hold{
        color: #ffffff;
        flex-direction: column;
        margin-left: 20px;
        .acti-heading{
            font-weight: 500;
            font-size: 1rem;
            margin-bottom: 5px;
        }
        .acti-footer{
            color: $gray-light;
        }
    }
}
</style>