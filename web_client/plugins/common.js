import { auth } from '~/plugins/firebase'
import { onAuthStateChanged, getIdToken } from '@firebase/auth'
import constants from '~/plugins/constants'

const common = {
  key: constants.key,
  apiLink: constants.apiLink,
  firebaseConfig: constants.firebaseConfig,
}

common.c = (m) => {
  console.log(m)
}

common.onAuthStateChanged = (vm) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log('User is signed in.')
      vm.$store.commit('setSignInState', true)

      await common.getUserData(vm)

      await getIdToken(auth.currentUser, true) // refresh idToken
    } else {
      console.log('User is signed out.')
      vm.$store.commit('signOut')
    }
  })
}

common.getUserData = async (vm) => {
  const url = new URL(common.apiLink.user_status)
  const params = {
    user_id: auth.currentUser.uid,
  }
  const user_data = await common.httpGet(url, params)
  if (user_data.result !== 'ok') {
    console.log(user_data)
  } else {
    const user_body = user_data['user_status']['user_body']
    vm.$store.commit('user/setStatusMessage', user_body.status)
    vm.$store.commit('user/setTotalStudyTime', user_body.total_study_time)
    vm.$store.commit('user/setRegistrationDate', new Date(user_body.registration_date))
    vm.$store.commit('user/setLastEntered', new Date(user_body.last_entered))
  }
}

common.httpGet = async (url_str, params) => {
  const url = new URL(url_str)
  url.search = new URLSearchParams(params).toString()
  const response = await fetch(url.toString(), { method: 'GET' })
  return await response.json()
}

common.httpPost = async (url_str, _params) => {
  const response = await fetch(url_str, {
    method: 'POST',
    body: JSON.stringify(_params),
  })
  return await response.json()
}

export default common
