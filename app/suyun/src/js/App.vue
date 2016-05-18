<template>
  <div class="order_pingjia" >
      <pingjia-info :info='info' :isshowcomplaint='isshowcomplaint' :orderid='orderid'></pingjia-info>
      <pingjia-form :info='info'></pingjia-form>
  </div>
  <!-- 无数据时显示loading -->
  <!-- <div v-else class="order_pingjia_loading">
      loading
  </div> -->
</template>

<script>
import pingjiaInfo from './components/pingjia_info.vue';
import pingjiaForm from './components/pingjia_form.vue';
var pageData =  {"carVo":{"carmodelid":0,"id":-1,"plate":"冀000005"},"map":{"comment_five":[{"desc":"服务热情","id":"690"},{"desc":"洗车干净","id":"691"},{"desc":"准时","id":"692"}],"comment_four":[{"desc":"服务热情","id":"687"},{"desc":"清洗干净","id":"688"},{"desc":"准时","id":"689"}],"comment_one":[{"desc":"未清洗干净","id":"677"},{"desc":"服务态度恶劣","id":"678"},{"desc":"不准时","id":"679"},{"desc":"满地污水","id":"680"}],"comment_three":[{"desc":"服务态度尚可","id":"684"},{"desc":"不准时","id":"685"},{"desc":"洗车一般","id":"686"}],"comment_two":[{"desc":"未清洗干净","id":"680"},{"desc":"服务态度差","id":"682"},{"desc":"不准时","id":"683"}]}};
export default {
    created: function(){
        window.pageIndex = 'pj';
        try{
            window.setTitle('订单评价');
        }catch(e){
            document.title = '订单评价';
        }

        let _this = this;
        _this.orderid = _this.$route.params.orderid;
        let _data = pageData || window.pageData;
        _this.info = Object.assign({},{
            service: '洗车',
            car: {
                plate: _data.carVo.plate,
                type: _data.carVo.carModel
            },
            commentLabels: {
                labels_0: _data.map.comment_one,
                labels_1: _data.map.comment_two,
                labels_2: _data.map.comment_three,
                labels_3: _data.map.comment_four,
                labels_4: _data.map.comment_five
            }
        });
    },
    data: function(){
        return {
            // 数据
            info: null,
            // 是否显示投诉入口
            isshowcomplaint: true,
            orderid: ''
        };
    },
    components: {
        pingjiaInfo,
        pingjiaForm
    }
}
</script>

<style>
input { -webkit-appearance: none; }
* {
-webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-tap-highlight-color: transparent;outline:none; }
html{
    font-size: 16px;
}
a,a:hover,a:visited{
        text-decoration: none;
}
body{
    margin: 0;
    /*background-color: #f5f6f8;*/
}
.order_pingjia{
    /*padding: 0 2.5%;*/
    transition: top 0.3s ease-in-out;
    position: relative;
    background-color: #fff;
}
@media screen and (max-width: 375px){
    html{
        font-size: 14px;
    }
}
.order_pingjia *{
    font-size: 1rem;
    color: #222930;
}
.pj_icon {
    background: url('../assets/images/pj_icons.png') no-repeat;
    display: inline-block;
}
.pj_icon_complaint{
    background-position: 0 0;
    width: 60px;
    height: 60px;
}
.pj_icon_star{
    background-position: 0 -135px;
    width: 67px;
    height: 64px;
}
.pj_icon_star.current{
    background-position: 0 -65px;
}
.pj_icon_dissatisfied{
    background-position: -69px -39px;
    width: 38px;
    height: 38px;
}
.pj_icon_dissatisfied.current{
    background-position: -69px 0;
}
.pj_icon_satisfied{
    background-position: -69px -162px;
    width: 38px;
    height: 38px;
}
.pj_icon_satisfied.current{
    background-position: -69px -202px;
}
.pj_icon_checkbox{
    background-position: -69px -120px;
    width: 40px;
    height: 40px;
}
.pj_icon_checkbox.current{
    background-position: -69px -78px;
}
.alert_pj{

    position: fixed;
width: 100%;
height: 100%;
top: 0;
left: 0;
z-index: 99;
}
.alert_pj .cover{
    position: absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;
background-color: #000;
opacity: 0.5;
z-index: -1;
}
.alert_pj .panel{
    width: 80%;
background-color: #fff;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-80%);
}
.alert_pj .panel .title{
    font-size: 24px;
text-align: center;
margin: 15px 0 10px;
}
.alert_pj .panel .content{
    text-align: center;
    font-size: 20px;
    margin: 15px 0 20px 0;
}
.alert_pj .panel .closeBtn{
    display: block;
    font-size: 19px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #e6454a;
    color: #fff;
    border-radius: 4px;
    margin: 10px auto;
        width: 90%;
}
</style>
