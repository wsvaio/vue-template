<script lang="ts" setup>
import BreadCrumb from "../bread-crumb/index.vue";
import { merge } from "wsvaio";
import { useRequest } from "vue-request";
const router = useRouter();
const { toggle, isFullscreen } = useFullscreen();


const handleCommand = (command: T) => {
  if (command === "logout") {
    router.push({ name: "login" });
  } else if (command === "editpwd") {
    merge(vdialogRef.dialog, {
      slot: "editpwd",
      title: "修改密码",
      width: "500px",
    });
  }
};

const submit = async ({}: vdialogCtx) => {

  return true;
};


const vdialogRef = $ref<vdialogCtx>();
</script>

<template>
  <vdialog ref="vdialogRef" :submit="submit">
    <template #editpwd="{form}: vdialogCtx">
      <el-form-item label="旧密码" prop="admin_password_old" :rules="{ required: true, message: '密码不能为空', trigger: 'blur' }">
        <el-input v-model="form.admin_password_old" type="password" show-password clearable></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="admin_password_new" :rules="{ required: true, message: '密码不能为空', trigger: 'blur' }">
        <el-input v-model="form.admin_password_new" type="password" show-password clearable></el-input>
      </el-form-item>
    </template>
  </vdialog>


  <el-header height="56px">
    <div class="header_left">
      <bread-crumb></bread-crumb>
    </div>
    <div class="header_right">
      <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏'">
        <el-icon @click="toggle">
          <i-akar-icons:normal-screen v-if="isFullscreen"></i-akar-icons:normal-screen>
          <i-fullScreen v-else></i-fullScreen>
        </el-icon>
      </el-tooltip>
      <el-dropdown size="medium" @command="handleCommand">
        <div class="user_info">
          <img class="user_avatar" src="@/assets/avatar.png">
          <span class="user_name">用户名</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="editpwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<style lang="less" scoped>
.el-header {
  padding: 0 16px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  user-select: none;
  position: sticky;
  z-index: 10;
  top: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(3px);

  .header_left {
    flex: 1;
    font-size: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .header_right {
    display: flex;
    align-items: center;
    padding-left: 8px;
    width: auto;

    &>i {
      padding: 8px 6px;
      font-size: 32px;
      cursor: pointer;
    }

    .user_info {
      margin: 0 8px;
      display: flex;
      align-items: center;
      width: auto;
      text-align: right;
      cursor: pointer;

      .user_avatar {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
    }

    span.user_name {
      margin-left: 8px;
      vertical-align: middle;

      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>