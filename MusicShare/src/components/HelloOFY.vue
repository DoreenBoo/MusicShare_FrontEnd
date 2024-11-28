<template>
  <div class="hello" >
    <h1>{{ title }}</h1>
    <!-- 自定义按钮颜色 -->
       <!-- 使用 router-link 跳转 -->
      <router-link to="/login">
        <a-button class="custom-button">GetStart</a-button>
      </router-link>
    
  </div>
</template>

<script >
export default {
  name: 'HelloOFY', // 这里是组件的名称
  props: {
    title: String  
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  color:rgb(254, 67, 101);
   font-size: 100px;
   font-family: 'melete';
    font-weight: 300;/* 字体粗细 */
       transform: scaleY(1.5); /* 上下拉长字体，1.5 为拉伸倍数 */
      transform: translateY(150px); /* 向下移动 100px */
    
}


.custom-button {
  background-color: rgb(249, 205, 173); /* 默认背景颜色 */
  color: white;
  border-color: rgb(255,255,255); /* 默认边框颜色 */
  transition: background-color 0.3s, border-color 0.3s; /* 添加平滑过渡效果 */
  font-size: 60px; /* 设置字体大小 */
 width: 300px; /* 设置固定宽度 */
  height: 100px; /* 设置固定高度 */
   transform: translateY(200px); 
    border-radius: 40px; /* 设置圆角，20px为圆角的半径，可以根据需要调整 */

}

/* 鼠标悬停时的背景颜色 */
.custom-button:hover {
  background-color: rgb(254, 67, 101);
  border-color: rgb(254, 67, 101); /* 悬停时改变边框颜色 */
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: rgb(254, 67, 101);
}
</style>
