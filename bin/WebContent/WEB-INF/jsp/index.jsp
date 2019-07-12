<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>标注页面</title>
	<link rel="stylesheet" href="res/css/bootstrap.min.css">
<%--<link rel="stylesheet" href="res/css/common.css">--%>
	<link rel="stylesheet" href="res/css/iconfont/iconfont.css">
	<link rel="stylesheet" href="res/css/iview.css">


    <style type="text/css">
		[v-cloak] {
			display: none
		}
		/*公共下拉框*/
		.select-option{
			position: relative;
			text-align: left;
			display: inline-block;
			color: rgb(81, 90, 110);
			margin-bottom:10px;
		}
		.select-option input{
			width: 100%;
			min-width:60px;
			line-height: 30px;
			border: 1px solid #ccc;
			background: #fff;
			border-radius:5px;
			font-size: 12px;
			cursor: pointer;
			overflow: hidden;
			white-space: nowrap;
			padding-left: 8px;
			padding-right: 24px;
		}
		.select-option ul{
			max-height: 200px;
			overflow: auto;
			margin: 5px 0;
			background-color: #fff;
			border-radius: 4px;
			box-shadow: 0 1px 6px rgba(0,0,0,.2);
			padding: 5px 0;
			background-attachment: scroll;
			transform-origin: center bottom 0px;
			will-change: top, left;
			position: absolute;
			width: 100%;
			z-index: 190;
		}
		.select-option>div{line-height:18px;}
		.select-option ul li{line-height: 18px;padding: 7px 16px;cursor: pointer;transition: background .2s ease-in-out;}
		.select-option ul li.select{
			color:rgb(45, 140, 240);
		}
		.select-option ul li.select,.select-option ul li:hover{
			background-color: rgb(243, 243, 243);
		}
		#judgment .firstCol td{
			height: 40px;
			max-height: 40px;
			text-align: center;
			vertical-align: middle;
		}
		#judgment .firstRow{
			width: 40px;
			max-width: 40px;
			text-align: center;
			vertical-align: middle;
		}
		#judgment .infomation{
			padding: 15px 0 15px 30px;
		}
		#judgment i{
			font-style: normal;
			display: block;
			padding: 10px 0 0 30px;
		}
		.sec1_mark ._word{
			float: left;
			margin: 0 8px 5px 0;
		}
		#judgment ._zhu{
			color: red;
		}
		#judgment ._bing{
			color: blue;
		}
		.sec1_setSure{
			display: block;
			float: right;
		}
		#sec2{
			margin: 20px 0 0 20px;
		}
		.iiput{
			width: 500px;
		}
		.sec2_type{
			width: 200px;
			margin-left: 20px;
		}
</style>
</head>
<body>

	<div class="container" id="Vue" v-cloak style="margin-bottom: 200px">

		<%--需要标注的内容--%>
		<div v-show="marker && result.length>0">

			<div class="page-header">
				<h4>{{context}}</h4>
			</div>

			<table class="table table-bordered" id="judgment" style="font-size: 18px; " >
				<tr class="firstCol">
					<td class="firstRow">序</br>号</td>
					<td>正文</td>
					<td>操作</td>
				</tr>

				<tr v-for="(item, index) in result">
					<td class="firstRow">{{index+1}}</td>
					<td style="padding:0;width: 1000px">
						<table border="0" width="100%">
							<tr>
								<td class="infomation sec1_mark" style="border-bottom:1px solid #ddd;">
									<div  v-for="(item2, index2) in item.line_segment"
										  v-html="_mark(item2,item)"
										  class="_word">
									</div>
								</td>
							</tr>
							<tr>
								<td class="infomation" v-html="_mark2(item)"></td>
							</tr>
						</table>

					</td>
					<td style="width: 140px">
						<i><input type="radio" :name="'select'+index" value="能"   @click="_getDomData( $event, 1, index)" /> 能 </i>
						<i><input type="radio" :name="'select'+index" value="不能" @click="_getDomData( $event, 0, index)" /> 不能 </i>
					</td>
				</tr>

			</table>


			<div style=" font-size: 16px; margin: 20px 0 0 20px;" v-if="template.length>0">

				<div>
					<span style="margin-right: 20px;"> {{ template[tempIndex].user_add_notice }} </span>
					<i-switch v-model="switch1">
						<Icon type="md-checkmark" slot="open"></Icon>
						<Icon type="md-close" slot="close"></Icon>
					</i-switch>
				</div>

				<div style="margin-top: 10px;" v-show="switch1" >
					<i-input v-model="insert_1" size="large" :placeholder="template[tempIndex].user_add_subject_hint" style=" width: 150px;"></i-input>
					<span style=" margin: 0 5px;"> {{ template[tempIndex].user_add_predicate }} </span>
					<i-input v-model="insert_2" size="large" :placeholder="template[tempIndex].user_add_object_hint" style=" width: 150px;"></i-input>
					<i-button type="primary" size="large" @click="insertNewLine_Ajax">确定</i-button>
				</div>

			</div>

			<i-button type="primary" size="large" style="margin-left: 1040px;" @click="submit_Ajax">下一条</i-button>

		</div>


			<%--其他标注相关内容--%>
			<section id="sec2">

				<i-input prefix="ios-contact" size="large"
						 :placeholder=" marker ? '当前标注者为-'+marker : '当前标注者人名为空哦！此框内输入人名，再按Enter(回车键)就行了。'"
						 class="iiput"
						 ref="iiput"
						 @on-enter="_setMarker">
				</i-input>

				<select-option v-model="tempName" :option="tempNameArr" class="sec2_type" ></select-option>

			</section>



	</div>


	<script type="text/javascript" src="res/js/jquery-2.1.0.min.js"></script>
	<%--<script type="text/javascript" src="res/js/bootstrap.min.js"></script>--%>
	<script type="text/javascript" src="res/js/vue.min.js"></script>
	<script type="text/javascript" src="res/js/iview.js"></script>
	<script type="text/javascript" src="res/js/index.js"></script>
</body>
</html>