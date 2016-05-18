<template>
    <ul class="complaint_list">
        <template v-for="item in selections">
            <li class="complaint_item" data-index={{$index}} v-on:click="choseItem($event)" v-on:touchstart="focusItem($event)" v-on:touchend="blurItem($event)">
                {{ item.msg }}
                <span class="pj_icon pj_icon_checkbox"></span>
            </li>
        </template>
    </ul>
    <div class="" style="padding: 0 15px;margin-top:-4px;    height: 6rem;    width: 100%;overflow: hidden;box-sizing: border-box;">
        <textarea class="inputarea" placeholder="您的评价是我们前进的动力~" v-model="customContent" v-on:focus="focueInput($event)" v-on:blur="blurInput($event)" ></textarea>
    </div>
    <div class="submit_box" >
        <div class="submit_btn" v-on:click="submit" v-if="itemIndex.length!==0&&customContent.length!==0">
            提交评价
        </div>
        <div class="submit_btn submit_btn-disable" v-else>
            提交评价
        </div>
    </div>
    <div class="alert_pj" v-if="showAlert">
        <div class="cover"></div>
        <div class="panel">
            <p class="title">温馨提示</p>
            <p class="content">{{alertMsg}}</p>
            <a v-if="ajaxSuccess" href='{{detail_url}}{{$route.params.orderid}}' class="closeBtn">确定</a>
            <div v-else class="closeBtn" v-on:click="hideAlert">确定</div>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        let _selections = [{
                id: 101,
                msg: '车辆出现划痕或破损'
            },{
                id: 102,
                msg: '服务效果惨不忍睹'
            },{
                id: 103,
                msg: '满地污水，水流成河'
            }
        ];
        return {
            // 可供选择的投诉项目
            selections: _selections,
            // 已选择的投诉项目index，对应selections
            itemIndex: [],
            // 用户自行输入的投诉内容
            customContent: '',
            // 进行偏移的容器
            container: null,
            // inputarea的高度
            inputHeight: 0,
            // inputarea的offset top
            inputOffsetTop: null,
            // 根据视窗大小判断是否需要进行偏移
            needOffset: false,
            // 是否显示弹层
            showAlert:false,
            // 弹层提示文案
            alertMsg:'',
            ajaxSuccess:false,
            detail_url: "daojia://orderdetail?url=http://" + document.domain + "/api/guagua/order/detail?orderId="
        };
    },
    methods: {
        hideAlert:function(){
            this.showAlert = false;
        },
        focueInput: function(event){
            let _this = this;
            let el = event.target;
            if(!_this.inputHeight){
                _this.inputHeight = $(el).height();
            }
            if(!_this.container){
                _this.container = $('.order_pingjia');
            }
            if(!_this.inputOffsetTop){
                _this.inputOffsetTop = $(el).offset().top;
            }
            if($(window).height() >= _this.inputOffsetTop + _this.inputHeight + 40){
                _this.needOffset = false;
            }else{
                _this.needOffset = true;
            }
            if(_this.needOffset){
                $(_this.container).offset({
                    top: -_this.inputHeight
                });
            }
        },
        blurInput: function(event){
            let _this = this;
            if(_this.needOffset){
                $(_this.container).offset({
                    top: 0
                });
            }
        },
        focusItem: function(event){
            let el = event.target.tagName === 'SPAN'? event.target.parentNode : event.target;
            $(el).addClass('focus');
        },
        blurItem: function(event){
            let el = event.target.tagName === 'SPAN'? event.target.parentNode : event.target;
            $(el).removeClass('focus');
        },
        choseItem: function(event){
            let el = event.target.tagName === 'SPAN'? event.target.parentNode : event.target;
            let _index = el.dataset.index || null;
            let _classList = (el.classList && Array.prototype.slice.call(el.classList)) || el.className.split(' ');
            if(_classList.indexOf('current') !== -1){
                _classList.splice(_classList.indexOf('current'));
            }else{
                _classList.push('current');
            }
            el.className = _classList.join(' ');
            if(!_index){
                return;
            }
            _index = parseInt(_index);
            let __index = this.itemIndex.indexOf(_index);
            if(__index !== -1){
                this.itemIndex.splice(__index);
            }else{
                this.itemIndex.push(_index);
            }
        },
        submit: function(){
            let _this = this;
            let _url = '/api/guagua/comment/addComplaint';
            let _data = null;
            let _orderId = _this.$route.params.orderid,
            _comment_label = [],
            _comment_label_text = [];

            _data = Object.assign({},{
                orderId: _orderId
            });
            if(_this.itemIndex.toString() !== ''){
                _this.itemIndex.forEach(function(value){
                    _comment_label.push(_this.selections[value].id);
                    _comment_label_text.push(encodeURI(encodeURI(_this.selections[value].msg)));
                });
                _data = Object.assign({},_data,{
                    comment_label: _comment_label.join(','),
                    comment_label_text: _comment_label_text.join(',')
                });
            }
            if(_this.customContent.length>100){
                _this.showAlert = true;
                _this.alertMsg = '投诉内容不能超过100字';
                return;
            }
            if(_this.customContent !== ''){
                _data = Object.assign({},_data,{
                    comment_text: encodeURI(encodeURI(_this.customContent))
                });
            }
            // 投诉内容为空不能提交
            if(_comment_label.length === 0 || _this.customContent === ''){
                _this.showAlert = true;
                _this.alertMsg = '请选择并输入投诉内容';
                return;
            }
            // todo 提交数据
            $.ajax({
                url: _url,
                data: _data,
                // dataType: 'jsonp',
                success: function(res){
                    if(!res|res.code !==0){
                        _this.showAlert = true;
                        _this.ajaxSuccess = false;
                        _this.alertMsg = '提交失败';
                        return;
                    }
                    _this.ajaxSuccess = true;
                    _this.showAlert = true;
                    _this.alertMsg = '评价成功';
                },
                error: function(res){
                    _this.showAlert = true;
                    _this.ajaxSuccess = false;
                    _this.alertMsg = '提交失败';
                }
            });
        }
    }
}
</script>

<style scoped>
.complaint_list{
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 1.2rem;
}
.complaint_item{
    padding: 18px 0 17px 15px;
        height: 14px;
        position: relative;
        line-height: 14px;
}
.complaint_item::after{
    content: '';
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background-color: #e8ebf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
.pj_icon_checkbox{
    transform: scale(0.5);
    transform-origin: center right;
    position: absolute;
    top: 50%;
    right: 1em;
    margin-top: -20px;
}
.complaint_item.focus{
    background-color: #e8ebf0;
}
.complaint_item.current .pj_icon_checkbox{
    background-position: -69px -78px;
}
.inputarea{
    width: 100%;
    resize: none;
    height: 6rem;
    padding: 0.5rem;
    box-sizing: border-box;
    margin-top: 1rem;
    border-radius: 5px;
    background-color: #f5f6f8;
    width: 200%;
    height: 200%;
    border: 1px solid #e8ebf0;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: top left;
    transform-origin: top left;
    font-size: 28px;
}
.inputarea:focus{
    outline: none;
}
.submit_box{
    position: static;
    height: 2.5rem;
}
.submit_btn{
    position: fixed;
    bottom: 0.5rem;
    left: 2.5%;
    width: 95%;
    background-color: #e6454a;
    color: #fff;
    text-align: center;
    font-size: 1.3rem;
    box-sizing: border-box;
    height: 2.5rem;
    line-height: 2.5rem;
    border-radius: 4px;    height: 44px;
    line-height: 44px;
}
.submit_btn-disable{
    background-color: #ee8f93;
}
</style>
