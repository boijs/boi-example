<template>
    <div class="pingjia_form">
        <div class="range">
            <div class="star" v-bind:rank='range'>
                <span class="pj_icon pj_icon_star {{ 0 | isRankme range}}" v-on:click="rank(0)"></span>
                <span class="pj_icon pj_icon_star {{ 1 | isRankme range}}" v-on:click="rank(1)"></span>
                <span class="pj_icon pj_icon_star {{ 2 | isRankme range}}" v-on:click="rank(2)"></span>
                <span class="pj_icon pj_icon_star {{ 3 | isRankme range}}" v-on:click="rank(3)"></span>
                <span class="pj_icon pj_icon_star {{ 4 | isRankme range}}" v-on:click="rank(4)"></span>
            </div>
            <ul class="selection_list" v-if="comments">
                <template v-for="item in comments">
                    <li class="selection_item" data-index={{$index}} v-on:click="setCommentsIndex($event)">
                        {{ item.desc }}
                        <span class="pj_icon pj_icon_gou"></span>
                        <!-- <span v-if="item.isSatisfied" class="pj_icon pj_icon_satisfied" ></span>
                        <span v-else class="pj_icon pj_icon_dissatisfied"></span> -->
                    </li>
                </template>
            </ul>
        </div>
        <div class="" style="padding: 0 15px;margin-top:-4px;    height: 6rem;    width: 100%;overflow: hidden;box-sizing: border-box;">
            <textarea class="inputarea" placeholder="您的评价是我们前进的动力~" v-model="customComment" v-on:focus="focueInput($event)" v-on:blur="blurInput($event)"></textarea>
        </div>
        <div class="submit_box" >
            <div class="submit_btn" v-on:click="submit" v-if="range!==-1||commentIndex.length!==0||customContent.length!==0">
                提交评价
            </div>
            <div class="submit_btn submit_btn-disable"  v-else>
                提交评价
            </div>
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
    props: {
        info: {
            type: Object,
            required: true
        }
    },
    data: function(){
        return {
            // 每个tank对应的评价项目，以索引形式对应至commentLabels
            comments: null,
            // 当前评分
            range: -1,
            // 已选评价项目的index，对应comments
            commentIndex: [],
            // 用户自行输入的评价内容
            customComment: '',
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
        rank: function(range){
            this.range = range;
            // 显示每个rank对应的可选评价项目
            this.comments = null;
            this.comments = this.info.commentLabels['labels_' + range];
            // 切换rank时清空已选的评价项目
            this.commentIndex = [];
            $('.selection_item').removeClass('current');
        },
        setCommentsIndex: function(event,target){
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
            let __index = this.commentIndex.indexOf(_index);
            if(__index !== -1){
                this.commentIndex.splice(__index);
            }else{
                this.commentIndex.push(_index);
            }
        },
        submit: function(){
            let _this = this;
            let _url = '/api/guagua/comment/addComment';
            let _data = null;
            let _comments_label = [],
            _orderId = _this.$route.params.orderid;
            // 未评分不能提交
            if(_this.range === -1){
                _this.showAlert = true;
                _this.alertMsg = '请您对我们的服务评分';
                return;
            }
            _data = Object.assign({},{
                orderId: _orderId,
                level: _this.range + 1 ,
            });
            // 可选评价项目
            if(_this.commentIndex.toString() !== ''){
                _this.commentIndex.forEach(function(value){
                    _comments_label.push(_this.comments[value].id);
                });
                _data = Object.assign({},_data,{
                    comment_label: _comments_label.join(',')
                });
            }
            // 用户自行输入的评价内容
            if(this.customComment.length>100){
                _this.showAlert = true;
                _this.alertMsg = '评价内容不能超过100字';
                return;
            }
            if(this.customComment !== ''){
                _data = Object.assign({},_data,{
                    comment_text: encodeURI(encodeURI(_this.customComment))
                });
            }
            // 没有评价内容不能提交
            // if(this.range === -1||_comments_label.length === 0 && _this.customComment === ''){
            //     _this.showAlert = true;
            //     _this.alertMsg = '请您选择或输入服务体验';
            //     return;
            // }

            // todo 提交评价
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
        }
    }
};
</script>

<style scoped>
.range{
    overflow: hidden;
    margin-top: 6px;
}
.pj_icon_gou{
    background-position: 0 -202px;
    width: 41px;
    height: 41px;
    position: absolute;
    right: 0;
    bottom: 0;
    transform: scale(0.4);
    transform-origin: right bottom;
    display: none;
}
.pingjia_form{
    position: relative;
    padding-top: 8px;
}
.pingjia_form::before{
    content: '';
  display: block;
  position: absolute;
  left: 15px;
  right: 15px;
  top: 0;
  height: 1px;
  background-color: #e8ebf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
.star{
    text-align: center;
    transform: scale(0.5);
    transform-origin: top center;
    width: 1000%;
    margin-left: -450%;
        margin-top: 10px;
}
@media screen and (max-width=400){
    .star .pj_icon{
        transform: scale(0.5);
    }
}
.star-shine{
    background-color: red !important;
}
.pj_icon_star{
    margin: 0 9px;
}
.selection_list{
    list-style: none;
    margin: 0;
    padding: 0 15px;
margin-top: -24px;
margin-bottom: 20px;
}
.selection_list:after{
    content: '';
    display: block;
    clear: both;
}
.selection_item{
    border: 1px solid #e0e0e0;
    padding: 0 10px;
    float: left;
    margin-right: 5px;
    color: #292d33;
    margin-top: 0.5rem;
    border-radius: 3px;
    position: relative;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
}
.pj_icon_dissatisfied,.pj_icon_satisfied{
    vertical-align: middle;
    transform: scale(0.6);
    transform-origin: top right;
    right: 0.3rem;
    top: 0.2rem;
    position: absolute;
}
.selection_item.current{
    border-color: #e6454a;
    /*color: #e6454a;*/
}
.selection_item.current .pj_icon_gou{
    display: block;
}
.selection_item.current .pj_icon_dissatisfied{
    background-position: -69px 0;
}
.selection_item.current .pj_icon_satisfied{
    background-position: -69px -202px;
}
.inputarea{
    resize: none;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 6px;
    background-color: #f5f6f8;
    width: 200%;
height: 200%;
border: 1px solid #e8ebf0;
transform: scale(0.5);
transform-origin: top left;
font-size: 28px;
}
.inputarea:focus{
    outline: none;
    /*outline-color: #000;
    outline-style: solid;
    outline-width: 1px;*/
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
    border-radius: 4px;
    height: 44px;
line-height: 44px;
}
.submit_btn-disable{
    background-color: #ee8f93;
}
</style>
