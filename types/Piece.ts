import * as BABYLON from 'babylonjs'

type pieceType = "hound" | "rook" | "knight" | "bishop" | "queen" | "king" | "pawn"

export default class Piece {
  type!: pieceType
  mesh!: BABYLON.Mesh

  constructor(type: pieceType) {
    this.type = type
  }
}