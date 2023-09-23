import {defineStore} from "pinia";
import {computed, reactive, readonly, ref} from "vue";

export const useUserStore = defineStore('user', () => {
  const accessToken = ref(null)
  const userSession = reactive({})
  const sessionLifetime = 3600
  const isLoggedIn = ref(false)

  function setSessionTimeout() {
    setTimeout(() => {
      clearSession()
    }, sessionLifetime)
  }

  function clearSession() {
    userSession.userData = {}
    console.log('clearing session')
  }

  function setAccessToken(token) {
    accessToken.value = token
  }

  function getAccessToken() {
    return accessToken.value
  }

  function setUserData(userData) {
    userSession.userData = userData
  }
  function saveUserSession(userData) {
    setUserData(userData)
    setSessionTimeout()
    setAccessToken(userData.accessToken)
    isLoggedIn.value = true
  }

  function getUserData() {
    return userSession.userData.userData
  }

  return {
    clearSession,
    getUserData,
    saveUserSession,
    getAccessToken,
    isLoggedIn
  }
})
