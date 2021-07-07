import * as BABYLON from 'babylonjs'

export const Config = {
  PIECES: {
    path: '/assets/pieces/',
    scale: new BABYLON.Vector3(0.2, 0.2, 0.2)
  },
  CELLS: {
    opacity: 0.1,
    size: 1,
  },
  GRID: {
    opacity: 0.01,
    path: '/assets/'
  }
}