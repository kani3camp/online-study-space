import { initializeApp } from '@firebase/app'
import { getAnalytics } from '@firebase/analytics'
import { getAuth } from '@firebase/auth'
import constants from '~/plugins/constants'

// Initialize Firebase if it hasn't been initialized yet
let firebaseApp
let analytics
let auth

if (!firebaseApp) {
  firebaseApp = initializeApp(constants.firebaseConfig)
  // Only initialize analytics on client-side
  if (process.client) {
    analytics = getAnalytics(firebaseApp)
  }
  auth = getAuth(firebaseApp)
}

export { firebaseApp, analytics, auth }
