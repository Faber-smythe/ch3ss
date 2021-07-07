import * as BABYLON from 'babylonjs'
import Piece from '@/types/Piece'
import * as getMovesFor from '@/game/mechanics/Moves'

type cellHolder = "black" | "white" | "empty"

export default class Cell {
  box!: BABYLON.Mesh
  position!: BABYLON.Vector3
  piece?: Piece | null
  currently!: cellHolder

  constructor(box: BABYLON.Mesh, position: BABYLON.Vector3) {
    this.box = box
    this.position = position
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
          return getMovesFor.rook(playField, this.position)
          break;
        case 'bishop':
          // return this.getBishopMoves(cell.position)
          return []
          break;
        case 'queen':
          // return this.getQueenMoves(cell.position)
          return []
          break;
        case 'king':
          // return this.getKingMoves(cell.position)
          return []
          break;
        case 'knight':
          // return this.getKnightMoves(cell.position)
          return []
          break;
        case 'pawn':
          return getMovesFor.bishop(playField, this.position)
          return []
          break;
        case 'hound':
          // return this.getHoundMoves(cell.position)
          return []
          break;
      }
    }
  }

}