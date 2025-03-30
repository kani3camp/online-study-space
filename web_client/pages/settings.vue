<template>
  <v-app>
    <v-app-bar
      app
      flat
    >
      <v-btn
        icon
        @click="goToHomePage"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-layout
        justify-center
      >
        <v-toolbar-title>設定</v-toolbar-title>
      </v-layout>
      <v-btn
        v-show="$store.state.isSignedIn"
        outlined
        @click="signOut"
      >
        サインアウト
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-card
        class="mx-auto"
        max-width="500px"
        outlined
      >
        <v-list
          id="setting-list"
          two-line
          subheader
        >
          <v-subheader>設定</v-subheader>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>表示名</v-list-item-title>
              <v-list-item-subtitle>
                <v-text-field v-model="display_name" />
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>ひとこと</v-list-item-title>
              <v-list-item-subtitle>
                <v-text-field v-model="status_message" />
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider />

          <v-subheader>情報</v-subheader>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>ログイン中のアカウント</v-list-item-title>
              <v-list-item-subtitle class="text-center">
                {{ provider_id }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>メールアドレス</v-list-item-title>
              <v-list-item-subtitle class="text-center">
                {{ mail_address }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>合計学習時間</v-list-item-title>
              <v-list-item-subtitle class="text-center">
                {{ total_study_time }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>登録日</v-list-item-title>
              <v-list-item-subtitle class="text-center">
                {{ registration_date_str }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-btn
                color="primary"
                :disabled="
                  !is_some_value_changed || is_some_value_blank || saving
                "
                @click="saveNewValues"
              >
                保存
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>

      <Dialog
        :if-show-dialog="if_show_dialog"
        :card-title="dialog_message"
        :loading="saving"
        :accept-needed="false"
        cancel-option-string="閉じる"
        @cancel="goToHomePage"
      />
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import { auth } from '~/plugins/firebase'
import { signOut as _signOut, updateProfile, getIdToken } from '@firebase/auth'
import common from '@/plugins/common'
import Dialog from '~/components/Dialog'

export default {
  name: 'Settings',
  components: {
    Dialog,
  },
  data: () => ({
    display_name: '',
    status_message: '',
    if_show_dialog: false,
    dialog_message: '',
    saving: false,
  }),
  computed: {
    is_some_value_changed: function () {
      const bool1 = this.display_name !== this.firebase_display_name
      const bool2 = this.status_message !== this.firebase_status_message
      return bool1 || bool2
    },
    is_some_value_blank: function () {
      return !this.display_name || !this.status_message
    },
    firebase_display_name: function () {
      return auth.currentUser?.displayName || ''
    },
    firebase_status_message: function () {
      return this.$store.state.user.status_message
    },
    registration_date_str: function () {
      const registration_date = this.$store.state.user.registration_date
      if (registration_date) {
        return (
          registration_date.getFullYear() +
          '年' +
          (registration_date.getMonth() + 1) +
          '月' +
          registration_date.getDate() +
          '日'
        )
      } else {
        return null
      }
    },
    mail_address: function () {
      return auth.currentUser?.email || ''
    },
    provider_id: function () {
      return auth.currentUser?.providerData[0]?.providerId || ''
    },
    total_study_time: function () {
      const total_seconds = this.$store.state.user.total_study_time
      if (total_seconds !== null) {
        const hours = Math.floor(total_seconds / 3600)
        const total_minutes = Math.floor(total_seconds / 60)
        const minutes = total_minutes % 60
        return hours + '時間' + minutes + '分'
      }
      return null
    },
  },
  watch: {
    firebase_display_name: function (newValue, oldValue) {
      console.log('watch: ' + this.display_name + ': new: ' + newValue + ', old: ' + oldValue)
      if (oldValue === null && newValue !== null) {
        this.display_name = newValue
      } else if (oldValue !== newValue) {
        this.display_name = newValue
      }
    },
    firebase_status_message: function (newValue, oldValue) {
      console.log('watch')
      if ((oldValue === null && newValue !== null) || oldValue !== newValue) {
        this.status_message = newValue
      } else if (oldValue !== newValue) {
        this.display_name = newValue
      }
    },
  },
  async created() {
    await common.onAuthStateChanged(this)
  },
  async mounted() {
    this.display_name = this.firebase_display_name
    this.status_message = this.firebase_status_message
  },
  methods: {
    goToHomePage() {
      this.$router.push('/')
    },
    async signOut() {
      try {
        await _signOut(auth)
        console.log('Sign-out successful.')
        this.dialog_message = 'サインアウトしました。'
        this.if_show_dialog = true
        this.$store.commit('signOut')
      } catch (error) {
        console.log(error)
        this.dialog_message = 'サインアウトに失敗しました。'
        this.if_show_dialog = true
      }
    },
    async saveNewValues() {
      console.log('saveNewValues()')
      this.saving = true
      this.dialog_message = '保存中'
      this.if_show_dialog = true

      try {
        const url = common.apiLink.change_user_info
        const params = {
          user_id: auth.currentUser.uid,
          id_token: await getIdToken(auth.currentUser, false),
          display_name: this.display_name,
          status_message: this.status_message,
        }
        const resp = await common.httpPost(url, params)
        if (resp.result === 'ok') {
          this.dialog_message = '完了！'
          await updateProfile(auth.currentUser, {
            displayName: this.display_name,
          })
          this.$store.commit('user/setStatusMessage', this.status_message)
        } else {
          console.log(resp)
          this.dialog_message = 'エラー。もう一度試してみてください。'
          this.display_name = this.firebase_display_name
          this.status_message = this.firebase_status_message
        }
      } catch (error) {
        console.error(error)
        this.dialog_message = 'エラー。もう一度試してみてください。'
        this.display_name = this.firebase_display_name
        this.status_message = this.firebase_status_message
      } finally {
        this.saving = false
      }
    },
  },
}
</script>

<style scoped>
/* <v-list-item-title>の左padding */
#setting-list div div div div {
  padding-left: 1rem;
}
</style>
