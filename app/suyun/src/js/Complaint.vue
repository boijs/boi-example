<template >
  <div class="order_pingjia" >
      <pingjia-info :info="info" :isshowcomplaint='isshowcomplaint'></pingjia-info>
      <div class="com_seperator"></div>
      <pingjia-form-complaint></pingjia-form-complaint>
  </div>
  <!-- 无数据时显示loading -->
  <!-- <div v-else class="order_pingjia_loading">
      loading
  </div> -->
</template>

<script>
import pingjiaInfo from './components/pingjia_info.vue';
import pingjiaFormComplaint from './components/pingjia_form_complaint.vue';

export default {
    created: function(){
        window.pageIndex = 'ts';
        try{
            window.setTitle('投诉');
        }catch(e){
            document.title = '投诉';
        }

        let _this = this;
        _this.info = Object.assign({},{
            service: '洗车',
            car: {
                type: _this.$route.params.car_type,
                plate: _this.$route.params.plate
            }
        });
    },
    data: function(){
        return {
            // 数据
            info: null,
            // 是否显示投诉入口
            isshowcomplaint: false
        };
    },
    components: {
        pingjiaInfo,
        pingjiaFormComplaint
    }
}
</script>

<style scoped>
.com_seperator{
    height: 8px;
    background-color: #f5f6f8;
    /*width: 150%;*/
    margin-left: -2.5%;
    border-bottom: solid 1px #e8ebf0;
border-top: solid 1px #e8ebf0;
}
</style>
