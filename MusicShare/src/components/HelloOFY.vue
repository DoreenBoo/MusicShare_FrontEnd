<template>
  <div>
    <h1>{{ title }}</h1>
    <!-- 自定义按钮颜色 -->
       <!-- 使用 router-link 跳转 -->
   <div class="button-container">
    <router-link to="/login">
      <a-button class="custom-button">GetStart</a-button>
    </router-link>
  </div>
    
  </div>
</template>

<script >
export default {
  name: 'HelloOFY', // 这里是组件的名称
  props: {
    title: String  
  },

}
</script >
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
h1{
  color:rgb(254, 67, 101);
   font-size: 100px;
   font-family: 'melete';
    font-weight: 300;/* 字体粗细 */
}
.button-container {
  display: flex;           /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */

}

.custom-button {
  background-color: rgb(249, 205, 173); /* 默认背景颜色 */
  color: white;
  border-color: rgb(255,255,255); /* 默认边框颜色 */
  transition: background-color 0.3s, border-color 0.3s; /* 添加平滑过渡效果 */
  font-size: 60px; 
  width: 300px; 
  height: 100px;
  border-radius: 40px; /* 设置圆角，20px为圆角的半径，可以根据需要调整 */

}

/* 鼠标悬停时的背景颜色 */
.custom-button:hover {
  background-color: rgb(254, 67, 101);
  border-color: rgb(254, 67, 101); /* 悬停时改变边框颜色 */
}

</style>
