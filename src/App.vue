<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<!--
  2018年4月9日
    1. 字体更改为 ant-design 样式
-->
<style>
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/ 
  ::-webkit-scrollbar 
  { 
      width: 5px; 
      height: 5px; 
      background-color: #F5F5F5; 
  } 
    
  /*定义滚动条轨道 内阴影+圆角*/ 
  ::-webkit-scrollbar-track 
  { 
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2); 
      border-radius: 2px; 
      background-color: #F5F5F5; 
  } 
    
  /*定义滑块 内阴影+圆角*/ 
  ::-webkit-scrollbar-thumb 
  { 
      border-radius: 2px; 
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,1.6); 
      background-color: #555; 
  } 
  body {
    width: 100%;
    font-family:"Monospaced Number","Chinese Quote",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;
  }
  body,html,#app {
    height: 100%;
  }
</style>
