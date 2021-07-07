<template>
  <div id="canvasHolder">
    <canvas id="renderCanvas" ref="renderCanvas"></canvas>
  </div>
</template>

<script lang="ts">
// import libs
import { Component, Vue } from 'vue-property-decorator'
// import types
// miscellaneous
import World from '@/game/World'

@Component
export default class Ch3ss extends Vue {
  WORLD!: World
  mounted() {
    if (this.$refs.renderCanvas) {
      this.WORLD = new World(this.$refs.renderCanvas as HTMLCanvasElement)
      this.WORLD.init()
    }
  }
}
</script>

<style scoped>
#canvasHolder {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: rgba(200, 100, 100, 0.5) */
}
#renderCanvas {
  width: 100%;
  height: 100%;
  /* background: rgba(200, 100, 100, 0.5) */
}
</style>