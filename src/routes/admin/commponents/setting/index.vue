<script setup lang='ts'>
import { merge } from "wsvaio";
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

const submit = async ({ form }: vdialogCtx) => {

  return true;
};
const isDark = useDark();

const vdialogRef = $ref<vdialogCtx>();
const { setting } = $(mainStore());
</script>

<template tag="div" class="setting">
  <n-switch v-model:value="isDark" size="medium">
    <template #icon>
      ☀
    </template>
    <template #checked-icon>
      🌙
    </template>
  </n-switch>
  <n-tooltip v-if="setting.layout != 'mobile'" trigger="hover">
    <template #trigger>
      <el-icon @click="setting.layout = setting.layout == 'top' ? 'left' : 'top'">
        <i-ri:layout-3-line v-if="setting.layout == 'top'"></i-ri:layout-3-line>
        <i-ri:layout-top-line v-else></i-ri:layout-top-line>
      </el-icon>
    </template>
    布局
  </n-tooltip>

  <n-tooltip trigger="hover">
    <template #trigger>
      <el-icon @click="toggle">
        <i-material-symbols:fullscreen-exit v-if="isFullscreen"></i-material-symbols:fullscreen-exit>
        <i-material-symbols:fullscreen v-else></i-material-symbols:fullscreen>
      </el-icon>
    </template>
    {{ isFullscreen ? '退出全屏' : '全屏' }}
  </n-tooltip>
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
</template>

<style lang='less' scoped>
.setting {
  display: flex;
  overflow: hidden;
  border-bottom: 1px solid var(--el-border-color);
  // padding-left: 50px;
  color: var(--text-color);

  .n-switch {
    --n-rail-color-active: #333 !important;

    padding: 8px;
  }

  & > * {
    height: 100%;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--bg-hover-color);
    }
  }

  & > i {
    padding: 8px 6px;
    font-size: 36px;
    cursor: pointer;

    &:hover {
      & > svg {
        animation: m 0.4s;

        @keyframes m {
          0% {
            transform: scale(1);
          }

          25% {
            transform: scale(0.5);
          }

          50% {
            transform: scale(1.2);
          }

          100% {
            transform: scale(1);
          }
        }
      }
    }
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
  }
}
</style>