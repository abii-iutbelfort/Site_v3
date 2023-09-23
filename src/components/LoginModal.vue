<template>
  <n-modal :show="!userStore.isLoggedIn">
    <n-card
        style="width: 600px"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="login" label="Login"
                     :validation-status="loginStatus">
          <n-input v-model:value="model.login"
                   type="text"
                   placeholder="Login"
                   @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="password" label="Password"
                      :validation-status="passwordStatus">
          <n-input v-model:value="model.password"
                   type="password"
                   placeholder="Password"
                   :on-keydown="handleKeyDown"
          />
        </n-form-item>
        <div style="display: flex; justify-content: flex-end">
          <n-button
              :loading="loading"
              :disabled="model.login === null || model.password === null"
              round
              type="primary"
              @click="handleValidateForm"
          >
            Validate
          </n-button>
        </div>
      </n-form>
    </n-card>
  </n-modal>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import {NButton, NCard, NInput, useMessage} from "naive-ui";
import {useUserStore} from "../stores/user";
import axios from "@/axios.js";

const userStore = useUserStore()

const message = useMessage()

const model = ref({
  login: null,
  password: null
})

const loading = ref(false)

const rules = {
  login: [
    {required: true, message: 'Login is required'},
    {min: 3, message: 'Login must be at least 3 characters long'},
    {max: 10, message: 'Login must be at most 10 characters long'}
  ],
  password: [
    {required: true, message: 'Password is required'},
    {min: 3, message: 'Password must be at least 3 characters long'},
    {max: 10, message: 'Password must be at most 10 characters long'}
  ]
}

const formRef = ref(null)

const loginStatus = ref('default')
const passwordStatus = ref('default')
async function handleValidateForm() {
  try {
    loading.value = true
    const response = await axios.post('/auth/signin', model.value)
        .then(response => {
          userStore.saveUserSession(response.data.data)
          message.success(response.data.message)
        })
        .catch(error => {
          message.error(error.response.data.message)
          if (error.response.status === 404) {
            loginStatus.value = 'error'
            passwordStatus.value = 'default'
          } else if (error.response.status === 401) {
            loginStatus.value = 'default'
            passwordStatus.value = 'error'
          } else {
            loginStatus.value = 'error'
            passwordStatus.value = 'error'
          }
        })
     loading.value = false
  } catch (e) {
    console.error(e)
  }
}



function handleKeyDown(event) {
  if (event.key === 'Enter') {
    handleValidateForm()
  }
}





</script>

<style scoped>

</style>
