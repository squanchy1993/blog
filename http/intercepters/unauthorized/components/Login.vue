<!--
 * @Date: 2023-07-18 08:55:45
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-10-23 09:33:24
 * @FilePath: \robot_outdoor_e_vue3\src\components\taskAuditDialog\index.vue
-->
<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="password" name="password">
      <Password></Password>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { defineExpose, provide, ref } from "vue";
import Password from './Password.vue'
const activeName = ref('password')

const props = defineProps({
  done: {
    type: Function,
    default: () => { },
    required: true,
  },
})

provide('done', props.done)

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.demo-tabs {
  width: 100%;
}
</style>

<style lang="scss">
.login-message {
  .el-message-box__message {
    width: 100%;
  }
}
</style>