<script lang="ts" setup>
  import { useRequest } from "vue-request";
  const router = useRouter();

  const loginFormRef = $ref<T>();
  const form = reactive<T>({});
  const rules = {
    username: [{ required: true, message: "账号不能为空", trigger: "blur" }],
    password: [
      { required: true, message: "密码不能为空", trigger: "blur" },
      { min: 1, max: 16, message: "密码长度为1-16位", trigger: "blur" }
    ]
  };

  const { runAsync, loading } = $(useRequest(async () => {
    await loginFormRef.validate();

    // login
    // router.push({ name: "home" });

  }, {
    manual: true
  }));

  const toggle = () => {
    const elForm = document.querySelector(".login .el-form");
    elForm?.scrollTo({
      "behavior": "smooth",
      left: elForm?.scrollLeft ? 0 : elForm.scrollWidth
    });
  };
  onMounted(() => {
    const elForm = document.querySelector(".login .el-form");
    elForm?.scrollTo({
      left: elForm.scrollWidth
    });
  });


  </script>

<template tag="div" class="login">
  <el-form ref="loginFormRef" v-loading="loading" size="large" :model="form" :rules="rules"
    :disabled="loading">
    <div class="register">
      <el-link @click="toggle">登录</el-link>
    </div>
    <div class="mask">后台管理系统</div>
    <div class="sign">
      <div text="[#337ecc] 24px" font="bold">欢迎登录</div>
      <el-form-item class="mt-25px" prop="username">
        <el-input v-model.trim="form.username" prefix-icon="i-user" maxlength="32" placeholder="请输入账号" clearable></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model.trim="form.password" prefix-icon="i-key" maxlength="16" show-password placeholder="请输入密码"
          clearable @keyup.enter.exact="runAsync"></el-input>
      </el-form-item>
      <el-form-item size="default">
        <el-checkbox v-model="form.persist">
          自动登录
        </el-checkbox>
        <el-link @click="toggle">注册</el-link>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" w="full" :loading="form.loading" @click="runAsync">
          登 录
        </el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

  <style lang="less" scoped>
  .login {
    @apply flex flex-col items-center min-h-100vh justify-center;
    background: url("@/assets/loginbg.png") center / cover no-repeat;


    .el-form {
      @apply flex overflow-hidden max-w-1000px w-full shadow-2xl;
      scroll-snap-type: x mandatory;


      @media (max-width: 576PX) {
        width: 80%;
      }

      &>* {
        @apply flex-none w-[50%]  p-75px;
        background: rgba(255, 255, 255, .8);
        scroll-snap-align: start;
        backdrop-filter: blur(6px);
        @media (max-width: 576PX) {
          width: 100%;
          padding: 50px;
        }
      }

      .register {}

      .mask {
        background: rgba(255, 255, 255, 0);

        font-size: 42px;
        mix-blend-mode: difference;
        color: white;

        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: 576PX) {
          display: none;
        }

      }

      .sign {

      }
    }
  }
  </style>