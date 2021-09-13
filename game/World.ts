// import libs
import * as BABYLON from 'babylonjs'
// import types
import Cell from '@/types/Cell'
import Piece from '@/types/Piece'
// import components
import Booter from '@/game/setup/Booter'
import Debug from '@/game/tools/Debug'
import { cellFromPosition } from '@/game/mechanics/MoveProvider'

export default class World {
  canvas!: HTMLCanvasElement
  engine!: BABYLON.Engine
  scene!: BABYLON.Scene
  cells!: Cell[]
  grid!: BABYLON.Mesh
  selectionLayer!: BABYLON.HighlightLayer
  BLACKS!: BABYLON.Mesh
  WHITES!: BABYLON.Mesh
  selected: Cell[] = []
  reachableCells: Cell[] = []
  // booter!: Booter
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.engine = new BABYLON.Engine(canvas)
    this.scene = new BABYLON.Scene(this.engine)
    this.BLACKS = new BABYLON.Mesh('BLACKS', this.scene)
    this.WHITES = new BABYLON.Mesh('WHITES', this.scene)
    // hightlight layers
    this.selectionLayer = new BABYLON.HighlightLayer("select-L", this.scene)


  }


  async init() {
    this.setEnvironment()
    this.cells = Booter.createCells(this.scene)

    this.grid = await Booter.loadGridMesh(this.scene)

    await Booter.loadPieces('black', this.scene, this.cells)

    this.setCellActionManager()

    Debug.showSceneAxis(8.5, this.scene)
    // Debug.showInspector(this.scene)

    // SELECTION GLOW EFFECT
    let alpha = 0
    this.scene.registerBeforeRender(() => {
      alpha += 0.02;
      this.selectionLayer.blurHorizontalSize = 0.5 + Math.cos(alpha) * 0.5 + 0.6;
      this.selectionLayer.blurVerticalSize = 0.5 + Math.cos(alpha) * 0.5 + 0.6;
    });

    this.engine.runRenderLoop(() => {
      this.scene.render()
    })
  }


  setEnvironment() {
    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.ArcRotateCamera('myCamera', -Math.PI * 0.5, Math.PI * 0.5, 15, new BABYLON.Vector3(5, 5, 5), this.scene)
    camera.setTarget(new BABYLON.Vector3(4.5, 4.5, 4.5))
    camera.wheelDeltaPercentage = 0.01
    camera.minZ = 1.5
    camera.orthoTop = 4.5;
    camera.orthoBottom = -4.5;
    camera.orthoLeft = -7;
    camera.orthoRight = 7;

    // This targets the camera to scene origin

    // This attaches the camera to the canvas
    camera.attachControl(this.canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);

    light.diffuse = new BABYLON.Color3(1, .9, .8)
    light.groundColor = new BABYLON.Color3(.9, .9, .9)

    // Default intensity is 1
    light.intensity = 1;
  }

  setCellActionManager() {
    this.cells.forEach(cell => {
      // selection on piece.mesh
      if (cell.piece) {
        this.setPieceActionManager(cell.piece)
      }
      // hover on reachable cells
      cell.box.actionManager = new BABYLON.ActionManager(this.scene)
      cell.box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, (ev) => {
        cell.box.showBoundingBox = true
      }));
      cell.box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, (ev) => {
        cell.box.showBoundingBox = false
      }));
      // click on reachable cells => make a move
      cell.box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, (ev) => {
        if (this.selected.length === 1) {
          this.selected[0].movePieceTo(cell)
          // this.setPieceActionManager(cell.piece!)
          this.selected[0] = cell
          this.clearSelection()
          this.clearShownCells()
        }
      }));
    })
  }

  select(target: Cell | Cell[]) {
    // add to selection
    if (Array.isArray(target)) {
      this.selected = this.selected.concat(target)
    } else {
      this.selected.push(target)
    }
    // glow up the selection
    this.selected.forEach(cell => {
      if (!cell.piece) {
        console.error(cell)
        throw ('Attempted a selection on the above cell but it is empty.')
      } else {
        this.selectionLayer.addMesh(cell.piece.mesh, BABYLON.Color3.White())
      }
    })
    // console.log(this.selected)
    // console.log(target)
    this.showMoves(this.selected)
  }

  clearSelection() {
    // cancel glowing up the selection
    this.selected.forEach(cell => {
      if (!cell.piece) {
        throw ('Attempted to unselect an empty cell.')
      } else {
        this.selectionLayer.removeMesh(cell.piece.mesh)
      }
    })
    this.selected = []
  }

  clearShownCells() {
    this.reachableCells = []
    this.cells.forEach(cell => {
      cell.box.setEnabled(false)
    })
  }

  showMoves(cells: Cell[]) {
    // console.log(cells)
    // clear previous
    this.clearShownCells()
    cells.forEach(cell => {
      // console.log('test', cell)
      // console.log(cell)
      const test = cell.getMoves(this.cells)
      this.reachableCells = this.reachableCells.concat(test)
    })
    this.reachableCells.forEach(cell => {
      const mat = new BABYLON.StandardMaterial('available cell', this.scene)
      mat.diffuseColor = new BABYLON.Color3(0, 1, 0.1)
      cell.box.material = mat
      cell.box.setEnabled(true)
    })
  }

  setPieceActionManager(piece: Piece) {
    piece.mesh.actionManager = new BABYLON.ActionManager(this.scene)
    piece.mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, (ev) => {
      const cell = cellFromPosition(this.cells, piece.mesh.position)
      console.log(cell)
      // clear previous selection
      this.clearSelection()
      // new selection
      this.select(cell)
    }));
  } 
}