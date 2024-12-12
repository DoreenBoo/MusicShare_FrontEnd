<template>
  <a-modal
    v-model:open="visible"
    title="确认退出登录"
    ok-text="确定"
    cancel-text="取消"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <p>确认退出登录吗？</p>
  </a-modal>
</template>

<script setup>
import { ref, defineExpose, defineEmits } from 'vue';

const visible = ref(false);
const emit = defineEmits(['confirm', 'cancel']);

// 点击确定按钮
const handleOk = () => {
  emit('confirm');
  visible.value = false;
};

// 点击取消按钮
const handleCancel = () => {
  emit('cancel');
  visible.value = false;
};

// 暴露方法供父组件调用
defineExpose({
  open: () => {
    visible.value = true;
  },
});
</script>
