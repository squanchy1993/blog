<template>
  <el-form
    size="small"
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
  >
    <el-form-item label="account" prop="account">
      <el-input v-model="ruleForm.account" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="password" prop="password">
      <el-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Submit
      </el-button>
      <el-button type="primary" @click="cancel"> Cancel </el-button>
      <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, inject } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { userStore } from "@/store/index.ts";

const useUserStore = userStore();

const done = inject<
  ({ succeed, data }: { succeed: boolean; data?: any }) => {}
>("done", ({ succeed, data }) => {});

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  account: "12345678",
  password: "12345678",
});

const rules = reactive<FormRules<typeof ruleForm>>({
  account: [{ required: true, message: "account is required" }],
  password: [{ required: true, message: "password is required" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      await useUserStore.login(ruleForm.account, ruleForm.password);
      done({ succeed: true });
      console.log("success submit!");
    } else {
      console.log("error submit!");
    }
  });
};

// const resetForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return
//   formEl.resetFields()
// }

const cancel = () => {
  done({ succeed: false, data: new Error("cancel login") });
};
</script>
