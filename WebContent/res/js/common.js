
/*下拉框组件*/
Vue.component('select-option', {
    props: ['option', 'width', 'selectKey'],
    data() {
        return {
            showMenu: false,
            selectIndex: 1000,
        }
    },
    created: function () {
        if (this.selectKey) {
            this.selectIndex = this.selectKey
        }
    },
    computed: {
        select() {
            if (this.option instanceof Array) {
                return this.option.length > 0 ? this.option[this.selectIndex] : ''
            } else {
                return this.option[this.selectIndex];
            }
        },
    },
    template:
        `<div class="select-option" :style="{width:width}" @click="showOption($event)">
            <div style="position:relative;">
                <input class="select-option-input" type="text" v-model="select" readonly="readonly" @click="showMenu=!showMenu"/>
                <i class="ivu-icon ivu-icon-ios-arrow-down ivu-select-arrow"></i>
            </div>
            <transition name="fade">
                <ul class="select-option-ul" v-show="showMenu">
                    <li v-for="(item,index) in option" :key="index" :class="item == select?'select':''"  @click="changeSelect(index)">{{item}}</li>
                </ul>
            </transition>
        </div>`,
    methods: {
        changeSelect: function (type) {
            this.showMenu = false;
            this.selectIndex = type;
            this.emitParent();
        },
        showOption(e) {
            e.stopPropagation();
//			console.log(this.showMenu)
        },
        emitParent() {
            this.$emit('input', this.select);
        }
    }
})

//获取sessionStorage
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI (r[2]); return null; //返回参数值
}

