<template>
  <v-app>
    <NavigationDrawer />

    <ToolBar />

    <v-main>
      <v-container>
        <v-flex>
          <h2>サインイン</h2>
        </v-flex>
      </v-container>

      <v-container v-show="! ($store.state.isSignedIn)">
        <p>登録・サインインともに下のボタンから行えます。</p>
        <p>
          <a
            href="/terms_of_service"
            target="_blank"
          >
            利用規約
          </a>
          および
          <a
            href="/privacy_policy"
            target="_blank"
          >
            プライバシーポリシー
          </a>
          に同意したうえで、当サービスをご利用ください。
        </p>
        <v-row
          id="google-sign-in-button"
          justify="center"
        >
          <img
            :src="imageSource"
            alt="google sign in button"
            @click="signInWithGoogle"
            @mouseover="changeImageToHovered"
            @mousedown="changeImageToPressed"
            @mouseout="changeImageToNormal"
          >
        </v-row>
      </v-container>

      <v-container v-show="($store.state.isSignedIn)">
        <p>すでにサインイン済みです。</p>
        <p>アカウント設定ページからサインアウトできます。</p>
      </v-container>

      <Dialog
        :if-show-dialog="if_show_dialog"
        :card-title="dialog_message"
        :accept-needed="false"
        cancel-option-string="閉じる"
        @cancel="goToTopPage"
      />
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import normalImage from '~/assets/google_signin_buttons/web/2x/btn_google_signin_light_normal_web@2x.png'
import hoveredImage from '~/assets/google_signin_buttons/web/2x/btn_google_signin_light_focus_web@2x.png'
import pressedImage from '~/assets/google_signin_buttons/web/2x/btn_google_signin_light_pressed_web@2x.png'
import { auth } from '~/plugins/firebase'
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth'
import NavigationDrawer from '@/components/NavigationDrawer'
import ToolBar from '@/components/ToolBar'
import Dialog from '~/components/Dialog'

export default {
  name: 'SignIn',
  components: {
    NavigationDrawer,
    ToolBar,
    Dialog,
  },
  data: () => ({
    imageSource: '',
    if_show_dialog: false,
    dialog_message: '',
  }),
  created() {
    this.imageSource = normalImage
  },
  methods: {
    goToTopPage() {
      this.$router.push('/')
    },
    changeImageToHovered() {
      console.log('changeImageToHovered()')
      this.imageSource = hoveredImage
    },
    changeImageToPressed() {
      console.log('changeImageToPressed()')
      this.imageSource = pressedImage
    },
    changeImageToNormal() {
      console.log('changeImageToNormal()')
      this.imageSource = normalImage
    },
    async signInWithGoogle() {
      const vm = this
      const provider = new GoogleAuthProvider()
      try {
        await signInWithPopup(auth, provider)
        vm.dialog_message = 'ログインに成功しました。'
      } catch (error) {
        console.log(error)
        vm.dialog_message = 'ログインに失敗しました。'
      }
      vm.if_show_dialog = true
    },
  },
}
</script>

<style scoped>
#google-sign-in-button img {
  max-height: 3rem;
}
</style>
