<template>
  <div id="app">
    <div class="block">
      <div id="header">
        <Title />
        <Time />
      </div>

      <div id="main">
        <RoomInfo />
        <!--        <Log></Log>-->
      </div>

      <div id="footer">
        <Message message="" />
      </div>
    </div>
  </div>
</template>

<script>
import Title from '~/components/Title'
import Time from '~/components/Time'
import RoomInfo from '~/components/RoomInfo'
import Message from '~/components/Message'

export default {
  components: {
    Title,
    Time,
    RoomInfo,
    Message
  },
  // data: () => ({
  //   roomIdList: [],
  //   timeout: null
  // }),
  // created () {
  //   this.switchRoom()
  //
  //   const switchRoomInterval = 6 * 1000
  //   const vm = this
  //   setInterval(() => {
  //     vm.switchRoom()
  //   }, switchRoomInterval)
  // },
  // destroyed () {
  //   clearInterval(this.timeout)
  // },
  // methods: {
  //   async switchRoom () {
  //     // 全てのroom_idのリストを更新
  //     await this.retrieveRoomIdList()
  //
  //     // room_idを次のものに進める。ない場合はリストの先頭から
  //     const vm = this
  //     const currentIndex = this.roomIdList.indexOf(vm.$store.state.roomId)
  //     if (currentIndex === -1) {
  //       this.$store.commit('setRoomId', vm.roomIdList[0])
  //     } else {
  //       const nextIndex = (currentIndex + 1) % this.roomIdList.length
  //       this.$store.commit('setRoomId', vm.roomIdList[nextIndex])
  //     }
  //   },
  //   async retrieveRoomIdList () {
  //     const vm = this
  //     const url = new URL('https://io551valj4.execute-api.ap-northeast-1.amazonaws.com/rooms')
  //     const resp = await fetch(url.toString(), { method: 'GET' }).then(response => response.json())
  //     if (resp.result === 'ok') {
  //       vm.roomIdList = []
  //       resp.rooms.forEach((room) => {
  //         vm.roomIdList.push(room.room_id)
  //       })
  //     } else {
  //       console.log(resp.message)
  //     }
  //   }
  // }
}

</script>

<style>
html {
  padding: 0;
  margin: 0;
  font-size: xx-large;
  width: 1920px;
  height: 1080px;
  overflow: auto;
}

body {
  margin: 0;
  padding:0;
}

#header {
  width: 1920px;
  height: 160px;
  display: flex;
}

#main {
  width: 1920px;
  display: flex;
}

#app {
  font-family: 'Hannari', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#footer {
  width: 1920px;
  /*heightPx: 100px;*/
}

.block {
  width: 1920px;
  /*background-color: pink;*/
}

</style>
