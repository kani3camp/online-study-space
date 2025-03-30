import firebase from 'firebase/app'
import 'firebase/analytics'
require('firebase/auth')
import constants from '~/plugins/constants'

// アプリが既に初期化されているかチェック
if (!firebase.apps.length) {
  firebase.initializeApp(constants.firebaseConfig)
}

export default firebase
