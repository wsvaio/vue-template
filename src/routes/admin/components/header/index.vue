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
          <i-material-symbols:fullscreen-exit v-if="isFullscreen"></i-material-symbols:fullscreen-exit>
          <i-material-symbols:fullscreen v-else></i-material-symbols:fullscreen>
        </el-icon>
      </el-tooltip>
      <el-dropdown size="medium" @command="handleCommand">
        <div class="user_info">
          <img class="user_avatar" src="@/assets/avatar.png" />
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
  display: flex;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #ddd;
  padding: 0 16px;
  background: rgba(255, 255, 255, 80%);
  user-select: none;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(3px);

  .header_left {
    overflow: hidden;
    font-size: 24px;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 1;
  }

  .header_right {
    display: flex;
    // align-items: center;
    padding-left: 8px;
    width: auto;
    height: 100%;

    & > * {
      height: 100%;
      transition: background 0.2s;

      &:hover {
        background: #f6f6f6;
      }
    }

    & > i {
      padding: 8px 6px;
      font-size: 36px;
      color: #666;
      cursor: pointer;
    }

    .user_info {
      display: flex;
      margin: 0 8px;
      width: auto;
      text-align: right;
      cursor: pointer;
      align-items: center;

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