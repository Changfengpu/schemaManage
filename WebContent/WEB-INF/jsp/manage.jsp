<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="res/css/iview.css">
</head>
<body>
<div id="managePage">
    <Col span="8">
    <i-Menu :theme="theme2" label="dark">
        <Submenu name="1">
            <template slot="title">
                内容管理
            </template>
            <Menu-item name="1-1">审核管理</Menu-item>
            <Menu-Item name="1-2">超级权限</Menu-Item>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                个人中心
            </template>
            <Menu-Item name="2-1">修改资料</Menu-Item>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                搜索管理
            </template>
            <Menu-item name="1-1" to="/find.html">搜索</Menu-item>
        </Submenu>
    </i-Menu>
    </Col>

    <RadioGroup v-model="theme2">
        <Radio label="light"></Radio>
        <Radio label="dark"></Radio>
    </RadioGroup>
</div>

<script type="text/javascript" src="res/js/jquery-2.1.0.min.js"></script>
<script type="text/javascript" src="res/js/vue.min.js"></script>
<script type="text/javascript" src="res/js/iview.js"></script>


<script type="text/javascript">
    new Vue( {
        el:'#managePage',
    })
</script>
</body>
</html>
