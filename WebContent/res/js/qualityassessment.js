
var vm = new Vue({
    el: '#Vue',
    data: {
        userInfo:"",
        popCheckBox:[],
        popCheckBox1:[],
        checkBoxArr:[],
        curUserId:'',  //抽查的用户的id
        defaultRadio:[], //默认选中数据
        multipleSign:'',
        result: [],   // list
        resp: [],     // submit

        template: [], // list
        tempName: "",
        tableName: "",
        tempNameArr: [],
        tempIndex: 0,
        isSingle: true,
        optionConfig: [],
        marker: "",
        forbidden1:[],//有歧义选项的禁用控制
        forbidden2:[],//句子错误选项的禁用控制
        showCheckArr:[], //控制是否显示选择框
        insert_1: "",
        insert_2: "",
        switch1: false,

        lineHash: "", // 同一条句子多条解析，所以line_hash一样
        context: "",

        dataBaseInfo: {
            allNum: false,
            completeNum: false,
            sureNum: false,
        },
    },

    filters: {},
    computed: {},
    watch: {
        tempName(newval, oldval) {
            var template = this.template;
            for (var i = 0, j = template.length; i < j; i++) {
                if (template[i].relationName == newval) {
                    this.tableName = template[i].tableName;
                    this.isSingle = template[i].isSingle;
                    if (!this.isSingle) {
                        this.optionConfig = JSON.parse(template[i].optionConfig)
                    }
                    this.dataBaseInfo_Ajax();
                    // this.tableName="birthplace_test";
                    this.tempIndex = i;
                    break;
                }
            }
            this.restoreProcess_Ajax();
            this.getList_Ajax();
        }
    },
    methods: {
        //默认选中radio
        setRadio(curUserId,item,num){
            if (curUserId==item.user1){
                return item.annotate_result1 == num
            }else{
                return item.annotate_result2 == num
            }
        },
        //根据二进制返回数组  默认选中多选
        returnArr(num,i){
            let that = this;
            $.ajax({
                url: "numberToArr.do",
                data: {num:num,count:that.optionConfig.length+1},
                type: "post",
                success: function (data) {
                    that.$set(that.checkBoxArr,i,data)
                    // that.$set(that.result[i].choose,data)
                    that.result[i].choose = data;

                },
                error: function () {
                    that.$Notice.error({title:'请求失败！'})
                }
            });
        },
        getList_Ajax() {
            // if (!this.marker) {
            //     this._tip("warning", "请填写标注者名字，需要记录到数据库。");
            //     return;
            // }
            if (!this.tempIndex && this.tempIndex !== 0) {
                this._tip("warning", "请选择标注类型");
                return;
            }
            this.dataBaseInfo_Ajax();

            // init
            this.popCheckBox =[];
            this.popCheckBox1=[];
            this.result = [];
            this.resp = [];
            this.lineHash = "";
            this.context = "";
            this.insert_1 = "";
            this.insert_2 = "";
            this.switch1 = false;

            // 标注，entity1_index 主语、entity2_index 宾语
            var _this = this;
            $.ajax({
                url: "getQualityAssessment.do",
                // dataType : "json",
                // contentType : "application/json",
                // cache : true,
                data: {
                    tableName: _this.tableName,
                    userid: _this.curUserId
                },
                type: "post",
                success: function (data) {
                    if (!data || data.length == 0) {
                        _this._tip("info", "暂无数据");
                        return;
                    }
                    for (var i = 0, j = data.length; i < j; i++) {
                        data[i].line_segment = eval('(' + data[i].line_segment + ')');
                        data[i].choose = [];
                        data[i].forbidden = false;
                        _this.resp.push({
                            userid: _this.curUserId,
                            annotate_result: false, //需要标注 0、1
                            taskid: data[i].id,
                            tableName: _this.tableName,
                        })
                    }
                    _this.result = data
                    data.forEach((ele,i)=>{
                        $.ajax({
                            url:"findAnByUPIId.do",
                            type:"post",
                            //dataType:"json",
                            data:{
                                user_id:_this.curUserId,
                                tableName:_this.tableName,
                                item_id:data[0].id
                            },
                            success:function(data1){
                                if(data1==-1){
                                    _this.popCheckBox[i] = true;
                                    _this.forbidden1[i]=true;
                                    _this.result[i].forbidden = true;
                                    _this.resp[i].annotate_result = -1;
                                }else if(data1==-2){
                                    _this.popCheckBox1[i] = true;
                                    _this.forbidden2[i]=true;
                                    // _this._getDomData1("",-1,i)
                                    _this.result[i].forbidden = true;
                                    _this.resp[i].annotate_result = -2;
                                }else{
                                    _this.returnArr(data1,i)
                                }
                            }
                        })
                    })


                    _this.lineHash = data[0].line_hash;
                    _this.context = data[0].context;

                },
                error: function () {
                    _this._tip("error", "报错了", "但是为了不影响你标注，刷新页面过掉这条数据。");
                }
            });

        },

        submit_Ajax() {
            // if (!this.marker) {
            //     this._tip("warning", "请填写标注者名字，需要记录到数据库。");
            //     return;
            // }
            // if (!this._isAllMarked()) {
            //     this._tip("warning", "必须全部标注完，才能提交");
            //     return;
            // }
            this.showCheckArr = []
            var _this = this;
            this.ajax2 = $.ajax({
                url: "updateSignResultByAdmin.do",
                data: JSON.stringify(_this.resp),
                // dataType: "json",
                contentType: "application/json",
                cache: true,
                type: "post",
                success: function (data) {
                    _this.forbidden1=[];
                    _this.forbidden2=[];
                    _this.getList_Ajax();
                },
                error: function () {
                    _this._tip("error","报错了","但是为了不影响你标注，刷新页面过掉这条数据。");
                    _this.forbidden1=[];
                    _this.forbidden2=[];
                    _this.getList_Ajax();
                }
            });
        },

        restoreProcess_Ajax() {
            // 这个接口只有在 onbeforeunload 用到，因为其他接口都内嵌这种操作
            var _this = this;
            $.ajax({
                url: "restoreProcess.do",
                data: {
                    line_hash: _this.lineHash,
                    table_name: _this.tableName
                },
                type: "post",
            });
        },

        insertNewLine_Ajax() {
            // if (!this.marker) {
            //     this._tip("warning", "请填写标注者名字，需要记录到数据库。");
            //     return;
            // }
            if (!this.insert_1 || !this.insert_2) {
                this._tip("warning", "添加内容必须全部填完");
                return;
            }
            var insert = $.extend(true, {}, this.result[0]);
            insert.entity1 = this.insert_1;
            insert.entity2 = this.insert_2;
            insert.entity1_index = -1;
            insert.entity2_index = -1;
            insert.processing = 0;
            insert.is_processed = 1;
            insert.annotate_result = 1;
            insert.table_name = this.tableName;

            insert.line_segment = JSON.stringify(insert.line_segment);
            var _this = this;
            $.ajax({
                url: "insertLocation.do",
                data: JSON.stringify(insert),
                dataType: "json",
                contentType: "application/json",
                cache: true,
                type: "post",
                success: function (data) {
                    // data：int是insert影响的行数
                    if (data == 1) {
                        _this._tip("success", "添加成功");
                    } else {
                        _this._tip("warning", "添加失败");
                    }
                },
                error: function () {
                    _this._tip("error", "添加失败");
                }
            });
        },

        getTemplateList_Ajax() {
            // 模板：1	birthplace	出生地	高亮的两个词，能否看出{entity1}出生于{entity2}	这句话中是否存在其他的出生地关系	某人	出生于	某地
            var _this = this;
            $.ajax({
                url: "getTemplateList.do",
                data: {table_name: "relation_schema"},
                dataType: "json",
                type: "post",
                success: function (data) {
                    if (!data || !data.length) {
                        _this._tip("warning", "页面模板接口没数据");
                        return;
                    }
                    _this.template = data;
                    _this.tempName = getUrlParam('tempName')
                    // console.log(_this.tempName,'name')
                    for (var i = 0, j = data.length; i < j; i++) {
                        _this.tempNameArr.push(data[i].relationName);
                    }
                    // _this._tip("info", "请选择标注类型");
                },
                error: function () {
                    _this._tip("error", "页面模板接口报错");
                }
            });
        },

        dataBaseInfo_Ajax() {
            // 保证实时获取
            var _this = this;
            $.ajax({
                url: "getTotalData.do",
                data: {table_name: _this.tableName},
                type: "post",
                success: function (data) {
                    _this.dataBaseInfo.allNum = data;
                },
            });
            $.ajax({
                url: "findFinishedNumberInRelation.do",
                data: {tableName: _this.tableName
                },
                type: "post",
                success: function (data) {
                    _this.dataBaseInfo.completeNum = data;
                },
            });
            $.ajax({
                url: "getAnnotateData.do",
                data: {table_name: _this.tableName},
                type: "post",
                success: function (data) {
                    _this.dataBaseInfo.sureNum = data;
                },
            });
        },


        _mark(item2, item) {
            if (!item2 && !item2.word) {
                return;
            }
            if (item2.sentOffset == item.entity1_index) {
                return "<span class='_zhu'>" + item2.word + "</span>";
            }
            if (item2.sentOffset == item.entity2_index) {
                return "<span class='_bing'>" + item2.word + "</span>";
            }
            return item2.word;
        },
        _mark2(item) {
            var zhu = "";
            var bing = "";
            for (var i = 0, j = item.line_segment.length; i < j; i++) {
                var item2 = item.line_segment[i];
                if (item2.sentOffset == item.entity1_index) {
                    zhu = item2.word;
                }
                if (item2.sentOffset == item.entity2_index) {
                    bing = item2.word;
                }
            }
            return this.template[this.tempIndex].explain_template
                .replace("{entity1}", "<span class='_zhu'>" + zhu + "</span>")
                .replace("{entity2}", "<span class='_bing'>" + bing + "</span>");
        },

        _tip(status, title, desc) {
            // info、success 、warning 、error
            this.$Notice[status]({
                title: title ? title : '',
                desc: desc ? desc : ''
            });
        },

        _isAllMarked() {
            // 是否全部标注完
            var result = this.result;
            var resp = this.resp;
            var num = 0;
            for (var i = 0, j = resp.length; i < j; i++) {
                if (resp[i].annotate_result || resp[i].annotate_result === 0) {
                    num++;
                }
            }
            return result.length == num;
        },

        isAllNot_event() {
            this.resp.forEach(function (item, index, array) {
                item.annotate_result = 0;
            });
            $("input[type='radio'][value='不能']").prop("checked", true);

        },

        _skipAll() {
            this.resp.forEach(function (item, index, array) {
                item.annotate_result = -1;
            });
            $("input[type='radio'][value='句子错误']").prop("checked", true);

        },

        _skipAll1() {
            var that=this;
            this.result.forEach(function (item,index) {
                item.forbidden = true;
                that.forbidden1[index]=true;
            })
            this.resp.forEach(function (item, index, array) {
                item.annotate_result = -1;
            });
            $("input[type='checkbox'][value='句子错误']").prop("checked", true);
            this._tip("warning", "已经全部标记错误了，请直接点击下一条即可");

        },

        _setMarker() {
            // 组件内、不太熟练、慢慢来吧
            var mar = this.$refs.iiput.currentValue;
            this.$refs.iiput.currentValue = "";
            if (!mar) return;
            window.localStorage.setItem("marker", mar);
            this.marker = mar;
            $(".iiput").css("width", "300px");

            if (this.result.length == 0) {
                this.getList_Ajax();
            }

//            _this.resp.push({
//                user : _this.marker,
//                annotate_result : false, //需要标注 0、1
//                id : data[i].id
//            })
            var resp = this.resp;
            if (resp.length > 0) {
                for (var i = 0, j = resp.length; i < j; i++) {
                    resp[i].user = mar;
                }
            }
        },

        _getDomData(event, domData, index) {
            this.resp[index].annotate_result = domData;
        },

        _getCheckboxData(event, domData, index) {
            // console.log(this.result,event,domData,index,'result')
            if(this.result[index].choose.length>0) {
                this.resp[index].annotate_result = this.result[index].choose.reduce(function (prev, curr, idx, arr) {
                    return Number(prev) + Number(curr);
                });
            }
        },

        _getDomData1(event, domData, index) {
            var myQuery = $("#checkbox句子错误" + index);
            var checked = myQuery.prop("checked");
            if (!checked) {
                this.showCheckArr[index] = false;
                this.popCheckBox[index]=false;
                this.forbidden1[index]=false;
                this.result[index].forbidden = false;
                this.resp[index].annotate_result = this.result[index].choose.reduce(function (prev, curr, idx, arr) {
                    return Number(prev) + Number(curr);
                });
            } else {
                this.showCheckArr[index] = true;
                this.popCheckBox[index]=true;
                this.forbidden1[index]=true;
                this.result[index].forbidden = true;
                this.resp[index].annotate_result = domData;
            }

        },

        _getDomData2(event, domData, index) {
            var myQuery = $("#checkbox有歧义" + index);
            var checked = myQuery.prop("checked");
            if (!checked) {
                this.showCheckArr[index] = false;
                this.popCheckBox1[index]=false;
                this.forbidden2[index]=false;
                this.result[index].forbidden = false;
                this.resp[index].annotate_result = this.result[index].choose.reduce(function (prev, curr, idx, arr) {
                    return Number(prev) + Number(curr);
                });
            } else {
                this.showCheckArr[index] = true;
                this.popCheckBox1[index]=true;
                this.forbidden2[index]=true;
                this.result[index].forbidden = true;
                this.resp[index].annotate_result = domData;
            }

        },
        qualityCheck(){
            this.getTemplateList_Ajax();
            this.multipleSign = getUrlParam('multipleSign')
            this.curUserId= getUrlParam('userId')
            this.marker = this.userInfo.userName
        }


    },
    mounted: function () {
        var that=this;
        $.ajax({
            url:"findUserBySession.do",
            type:"post",
            dataType:"json",
            success:function(data){
                that.userInfo = data
                that.qualityCheck();
            },
            error:function(){
                window.location.href= $("#PageContext").val()+"/"
            }
        });
        /*this.userInfo = JSON.parse(decodeURIComponent(sessionStorage.getItem('userInfo')))
        if(this.userInfo){
            this.getTemplateList_Ajax();
            this.multipleSign = getUrlParam('multipleSign')
            this.curUserId= getUrlParam('userId')
            this.marker = this.userInfo.userName
        }else{
            window.location.href = '/MarkHtml_war_exploded'
        }*/
    }

})

 window.onbeforeunload = function () {
      if (vm.lineHash) {
         vm.restoreProcess_Ajax();
     }
     return true;
  }

// 测试sql
// update entitypairpersonbeenlocation set processing = 0, is_processed = 0, annotate_result = null;