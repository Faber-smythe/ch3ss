import * as BABYLON from 'babylonjs'
import Piece from '@/types/Piece'
import * as MoveProvider from '@/game/mechanics/MoveProvider'

type currentFaction = "black" | "white" | "empty"

export default class Cell {
  box!: BABYLON.Mesh
  position!: BABYLON.Vector3
  piece?: Piece | null
  currently!: currentFaction

  constructor(box: BABYLON.Mesh) {
    this.box = box
    this.position = box.position
    this.currently = 'empty'
  }

  movePieceTo(cell: Cell): Cell {
    if (!this.piece) {
      console.error(this)
      throw ("Above cell is empty thus has no piece to move.")
    } else if (cell.currently !== 'empty') {
      console.error(cell)
      throw ("Above cell is not empty thus not reachable for moves.")
    } else {
      // move the piece to target cell
      this.piece!.mesh.position.x = cell.position.x
      this.piece!.mesh.position.y = cell.position.y
      this.piece!.mesh.position.z = cell.position.z
      // tag the new cell
      cell.currently = this.currently
      cell.piece = this.piece
      // untag previous cell
      this.currently = 'empty'
      this.piece = null
      return cell
    }
  }

  removePiece() {
    if (!this.piece) {
      throw ("Can't remove piece from empty cell")
    } else {
      // remove piece from cell
      const removed = this.piece
      this.piece.mesh!.setEnabled(false)
      this.piece = null
      this.currently = "empty"
      return removed
    }
  }

  getMoves(playField: Cell[]): Cell[] {
    if (!this.piece) {
      throw ("Can't search available moves for empty cells.")
    } else {
      switch (this.piece.type) {
        case 'rook':
          return MoveProvider.rook(playField, this.position)
          break;
        case 'bishop':
          return MoveProvider.bishop(playField, this.position)
          return []
          break;
        case 'queen':
          return MoveProvider.queen(playField, this.position)
          return []
          break;
        case 'king':
          return MoveProvider.king(playField, this.position)
          return []
          break;
        case 'knight':
          return MoveProvider.knight(playField, this.position)
          return []
          break;
        case 'pawn':
          return MoveProvider.pawn(playField, this.position)
          return []
          break;
        case 'hound':
          return MoveProvider.hound(playField, this.position)
          return []
          break;
      }
    }
  }
}