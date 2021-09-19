import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'

import { Config } from '@/game/setup/Config'
import Cell from '@/types/Cell'
import Piece from '@/types/Piece'

export default class Booter {
  
  static createCells(scene: BABYLON.Scene, al:BABYLON.GlowLayer, sl:BABYLON.HighlightLayer): Cell[] {
    let cellsToReturn: Cell[] = []
    let parentMesh: BABYLON.Mesh = new BABYLON.Mesh('CELLS', scene)

    let x = 1
    let y = 1
    let z = 1

    for (let i = 1; i <= 512; i++) {

      const box = BABYLON.MeshBuilder.CreateBox(`cell-${i}`, { size: Config.CELLS.size }, scene);
      box.setEnabled(false)
      box.visibility = Config.CELLS.opacity
      box.position.x = x
      box.position.y = y
      box.position.z = z

      parentMesh.addChild(box)

      const cell = new Cell(box)
      al.addExcludedMesh(cell.box)
      sl.addExcludedMesh(cell.box)
      const index = String(x)+String(y)+String(z)
      cellsToReturn[index] = (cell)
      x++
      if (x === 9) { x = 1; z++ }
      if (z === 9) { z = 1; y++ }
    }
    return cellsToReturn
  }

  static async loadGridMesh(scene: BABYLON.Scene, al:BABYLON.GlowLayer, sl:BABYLON.HighlightLayer): Promise<BABYLON.Mesh> {
    const imported = await BABYLON.SceneLoader.ImportMeshAsync(
      '',
      Config.GRID.path,
      'grid.glb',
      scene
    )
    imported.meshes[0].name = "GRID"
    imported.meshes[0].rotationQuaternion = null
    imported.meshes[0].scaling = new BABYLON.Vector3(1, 1, 1)
    const grid = imported.meshes[1] as BABYLON.Mesh
    al.addExcludedMesh(grid)
    sl.addExcludedMesh(grid)
    grid.isPickable = false
    grid.visibility = Config.GRID.opacity
    grid.position.x = 8.5
    grid.position.y = 0.5
    grid.position.z = 0.5
    grid.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2)
    return grid
  }

  static async loadPieces(color: String, scene: BABYLON.Scene, gridCells: Cell[], material: BABYLON.NodeMaterial, al:BABYLON.GlowLayer): Promise<void> {
    // CREATE BLACK MESHES
    const backRowBlack: Piece[] = []
    const BLACKS = scene.getMeshByName('BLACKS')! as BABYLON.Mesh

    backRowBlack.push(await Booter.loadRook('left', BLACKS, scene))
    backRowBlack.push(await Booter.loadKnight('left', BLACKS, scene))
    backRowBlack.push(await Booter.loadBishop('left', BLACKS, scene))
    backRowBlack.push(await Booter.loadQueen(BLACKS, scene))
    backRowBlack.push(await Booter.loadKing(BLACKS, scene))
    backRowBlack.push(await Booter.loadBishop('right', BLACKS, scene))
    backRowBlack.push(await Booter.loadKnight('right', BLACKS, scene))
    backRowBlack.push(await Booter.loadRook('right', BLACKS, scene))

    const frontRowBlack: Piece[] = []
    for (let i = 1; i <= 8; i++) {  
      frontRowBlack.push(await Booter.loadPawn(i, BLACKS, scene))
    }
    // POSITION BLACK MESHES IN THE CELLS
    for (let xIndex = 1; xIndex <= 8; xIndex++) {

      gridCells.forEach(cell => {
        if (cell.position.x === xIndex) {
          if (cell.position.y === 1 && cell.position.z === 1) {
            backRowBlack[xIndex - 1].mesh.position.y = 1
            backRowBlack[xIndex - 1].mesh.position.z = 1
            backRowBlack[xIndex - 1].mesh.position.x = xIndex
            cell.piece = backRowBlack[xIndex - 1]
            cell.piece.mesh.renderingGroupId = 1
            cell.currently = 'black'
          }
          if (cell.position.y === 2 && cell.position.z === 2) {
            frontRowBlack[xIndex - 1].mesh.position.y = 2
            frontRowBlack[xIndex - 1].mesh.position.z = 2
            frontRowBlack[xIndex - 1].mesh.position.x = xIndex
            cell.piece = frontRowBlack[xIndex - 1]
            cell.piece.mesh.renderingGroupId = 1
            cell.currently = 'black'
          }
        }
      })
    }
    // SET MATERIAL
    frontRowBlack.concat(backRowBlack).forEach(async (piece, i)=>{
      piece.mesh.material = material
      al.referenceMeshToUseItsOwnMaterial(piece.mesh)
      al.addExcludedMesh(piece.mesh)
      // if(i===4){
      //   Booter.buildSparkEmitter(scene, await piece.mesh)
      // }
    })
  }

  static async loadRook(side: String, parent: BABYLON.Mesh, scene: BABYLON.Scene): Promise<Piece> {
    const imported = await BABYLON.SceneLoader.ImportMeshAsync(
      '',
      Config.PIECES.path,
      'rook.glb',
      scene
    )

    imported.meshes[1].scaling = Config.PIECES.scale
    imported.meshes[1].name = `${side}-rook-${parent.name}`
    const mesh = imported.meshes[1] as BABYLON.Mesh
    parent.addChild(mesh)
    imported.meshes[0].dispose()

    const piece = new Piece('rook', mesh, scene)
    return piece
  }

  static async loadBishop(side: String, parent: BABYLON.Mesh, scene: BABYLON.Scene): Promise<Piece> {
    const imported = await BABYLON.SceneLoader.ImportMeshAsync(
      '',
      Config.PIECES.path,
      'bishop.glb',
      scene
    )

    imported.meshes[1].scaling = Config.PIECES.scale
    imported.meshes[1].name = `${side}-bishop-${parent.name}`
    const mesh = imported.meshes[1] as BABYLON.Mesh
    parent.addChild(mesh)
    imported.meshes[0].dispose()

    const piece = new Piece('bishop', mesh, scene)
    return piece
  }

  static async loadQueen(parent: BABYLON.Mesh, scene: BABYLON.Scene): Promise<Piece> {
    const imported = await BABYLON.SceneLoader.ImportMeshAsync(
      '',
      Config.PIECES.path,
      'queen.glb',
      scene
    )

    imported.meshes[1].scaling = Config.PIECES.scale
    imported.meshes[1].name = `${parent.name}-queen`
    const mesh = imported.meshes[1] as BABYLON.Mesh
    parent.addChild(mesh)
    imported.meshes[0].dispose()

    const piece = new Piece('queen', mesh, scene)
    return piece
  }

  static async loadKnight(side: String, parent: BABYLON.Mesh, scene: BABYLON.Scene): Promise<Piece> {
    const imported = await BABYLON.SceneLoader.ImportMeshAsync(
      '',
      Config.PIECES.path,
      'knight.glb',
      scene
    )

    imported.meshes[1].scaling = Config.PIECES.scale
    imported.meshes[1].name = `${side}-knight-${parent.name}`
    const mesh = imported.meshes[1] as BABYLON.Mesh
    parent.addChild(mesh)
    imported.meshes[0].dispose()

    const piece = new Piece('knight', mesh, scene)
    return piece
  }

  static async loadKing(parent: BABYLON.Mesh, scene: BABYLON.Scene): Promise<Piece> {
    const imported = await BABYLON.SceneLoader.ImportMeshAsync(
      '',
      Config.PIECES.path,
      'king.glb',
      scene
    )

    imported.meshes[1].scaling = Config.PIECES.scale
    imported.meshes[1].name = `${parent.name}-king`
    const mesh = imported.meshes[1] as BABYLON.Mesh
    parent.addChild(mesh)
    imported.meshes[0].dispose()

    const piece = new Piece('king', mesh, scene)
    return piece
  }

  static async loadPawn(key: number, parent: BABYLON.Mesh, scene: BABYLON.Scene): Promise<Piece> {
    const imported = await BABYLON.SceneLoader.ImportMeshAsync(
      '',
      Config.PIECES.path,
      'pawn.glb',
      scene
    )
    
    imported.meshes[1].scaling = Config.PIECES.scale
    imported.meshes[1].name = `pawn-${key}-${parent.name}`
    const mesh = imported.meshes[1] as BABYLON.Mesh
    parent.addChild(mesh)
    imported.meshes[0].dispose()

    const piece = new Piece('pawn', mesh, scene)
    return piece
  }
}   