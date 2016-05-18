<template >
    <div class="pingjia_info">
        <ul class="info_list">
            <li class="info_item">
                <span class="info_item_icon info_item_icon_car"></span>
                <span class="info_item_category">服务车辆</span>
                <span class="info_item_content">{{ info.car.plate }}</span>
                <span class="info_item_content" v-if="info.car.type!==':car_type'">{{ info.car.type }}</span>
            </li>
            <li class="info_item">
                <span class="info_item_icon info_item_icon_service"></span>
                <span class="info_item_category">服务项目</span>
                <span class="info_item_content">{{ info.service }}</span>
            </li>
        </ul>
        <div class="info_complaint" v-if="isshowcomplaint">
            <a class="info_complaint_link" v-if='!!info.car.type' v-link="{ name: 'complaint',params: {orderid: orderid,car_type: info.car.type,plate: info.car.plate} }"></a>
            <a v-else class="info_complaint_link" v-link="{ name: 'complaint',params: {orderid:orderid,plate:info.car.plate} }"></a>
            <div class="pj_icon pj_icon_complaint"></div>
            <div class="info_complaint_content">投诉</div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        info:{
            type:Object,
            required:true
        },
        isshowcomplaint: {
            type: Boolean
        },
        orderid: {}
    }
}
</script>

<style scoped>
.pingjia_info{
    padding: 15px;
    position: relative;
    padding-bottom: 0;
}
.inputarea{
        font-size: 14px;
}
.info_list{
    list-style: none;
    margin: 0;
    margin-bottom: 2px;
    padding: 0;
    font-size: 1.2rem;
}
.info_item{
    margin-bottom: 13px;
}
.info_item_category{
    font-size: 14px;
    color: #848c99;
}
.info_item_content{
    margin-left: 10px;
    font-size: 14px;
}
.info_complaint{
    position: absolute;
    top: 15px;
    right: 1rem;
    text-align: center;
}
.info_complaint_link{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
}
.info_complaint_content{
    margin-top: -27px;
    font-size: 12px;
}
.pj_icon_complaint{
    display: block;
    transform: scale(0.5);
    transform-origin: top center;
}
</style>
