<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>用户查询</title>
    <link rel="stylesheet" href="res/css/common.css">
    <link rel="stylesheet" href="res/css/iview.css">
    <link rel="stylesheet" href="res/css/bootstrap.min.css">
    <style type="text/css">
        [v-cloak] {
            display: none
        }
        .container{

        }
        .modalSelect{
            display: inline-block!important;
            width: 200px!important;
        }

    </style>
</head>
<body>
<div class="container" id="userQuery" v-cloak>
    <i-table border :columns="tableColumns" :data="tableData"></i-table>
    <table class="table table-bordered"  style="font-size: 18px; ">
        <tr  class="firstCol">
            <td>序号</td>
            <td>类别true</td>
            <td>中文含义</td>
            <td>英文含义</td>
            <td>西语含义</td>
            <td>俄语含义</td>
            <td>属性_关系</td>
            <td>备注</td>
            <td>反向关系</td>
            <td>主语允许类型</td>
            <td>宾语允许类型</td>
            <td>是否在属性栏显示</td>
            <td>是否在关系图谱展示</td>
            <td>边的属性</td>
            <td>用户可编辑</td>
            <td>宾语java类型</td>
            <td>是否多值</td>
            <td>是否建立索引</td>
            <td>唯一索引</td>
            <td>索引类型</td>
            <td>JanusGraph类型</td>
            <td>是否为超边</td>
            <td>已删除</td>
            <td>主关系</td>
            <td>操作</td>
        </tr>
        <tr class="table-tr" v-for="(graphSchema,index) in graphSchemas">
            <td class="firstRow">{{graphSchema.id}}</td>
            <td>{{graphSchema.类别true}}</td>
            <td>{{graphSchema.中文含义}}</td>
            <td>{{graphSchema.英文含义}}</td>
            <td>{{graphSchema.西语含义}}</td>
            <td>{{graphSchema.俄语含义}}</td>
            <td>{{graphSchema.属性_关系}}</td>
            <td>{{graphSchema.备注}}</td>
            <td>{{graphSchema.反向关系}}</td>
            <td>{{graphSchema.主语允许类型}}</td>
            <td>{{graphSchema.宾语允许类型}}</td>
            <td>{{graphSchema.是否在属性栏显示}}</td>
            <td>{{graphSchema.是否在关系图谱展示}}</td>
            <td>{{graphSchema.边的属性}}</td>
            <td>{{graphSchema.用户可编辑}}</td>
            <td>{{graphSchema.宾语java类型}}</td>
            <td>{{graphSchema.是否多值}}</td>
            <td>{{graphSchema.是否建立索引}}</td>
            <td>{{graphSchema.唯一索引}}</td>
            <td>{{graphSchema.索引类型}}</td>
            <td>{{graphSchema.JanusGraph类型}}</td>
            <td>{{graphSchema.是否为超边}}</td>
            <td>{{graphSchema.已删除}}</td>
            <td>{{graphSchema.主关系}}</td>
            <td style="width:230px;">
                <i-button  ghost size="small" type="primary"  @click="">修改</i-button>
            </td>
        </tr>
    </table>
</div>

    <script type="text/javascript" src="res/js/jquery-2.1.0.min.js"></script>
    <script type="text/javascript" src="res/js/vue.min.js"></script>
    <script type="text/javascript" src="res/js/iview.js"></script>
<script type="text/javascript">
    new Vue({
        el:'#userQuery',
        data:{
            graphSchemas:[]
        },
        methods:{
            getAllGraphSchema(){
                var _this=this;
                $.ajax({
                    url:"getAllGraphschema.do",
                    type:"post",
                    success:function (data) {
                        _this.graphSchemas=data;
                    },
                    error:function () {
                        _this.$Notice.error({title:'请求失败！'})
                    }
                })
            }

        },
        mounted(){
            this.getAllGraphSchema();
        }
    })

</script>

</body>
</html>