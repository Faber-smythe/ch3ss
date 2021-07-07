import * as BABYLON from 'babylonjs'

import Cell from '@/types/Cell'
import { Vector3, VectorSplitterBlock } from 'babylonjs'

export const vector3ToCells = (playfield: Cell[], vectors: Vector3[]) => {
  const cells: Cell[] = []
  playfield.forEach((cell, i) => {
    vectors.forEach(vec => {
      if (vec.x === cell.position.x && vec.y === cell.position.y && vec.z === cell.position.z) {
        cells.push(cell)
      }
    })

  })
  return cells
}

export const rook = (playfield: Cell[], origin: BABYLON.Vector3): Cell[] => {
  let moves: BABYLON.Vector3[] = []
  // get all cells on the 3 axis
  for (let i = 1; i <= 8; i++) {
    const vecX = new BABYLON.Vector3(i, origin.y, origin.z)
    moves.push(vecX)
    const vecY = new BABYLON.Vector3(origin.x, i, origin.z)
    moves.push(vecY)
    const vecZ = new BABYLON.Vector3(origin.x, origin.y, i)
    moves.push(vecZ)
  }
  // get the cells from the coordinates
  let reachableCells: Cell[] = vector3ToCells(playfield, moves)
  // filter the current cell (the origin) and the non empty cells
  reachableCells = reachableCells.filter(cell => !(
    cell.position.x === origin.x &&
    cell.position.y === origin.y &&
    cell.position.z === origin.z
  ))
  return reachableCells
}

export const hound = (playfield: Cell[], origin: BABYLON.Vector3): Cell[] => {
  let moves: BABYLON.Vector3[] = []
  // get all cells on the 3 axis
  moves.push(new BABYLON.Vector3(origin.x, origin.y + 1, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x, origin.y + 1, origin.z - 1))
  moves.push(new BABYLON.Vector3(origin.x, origin.y - 1, origin.z - 1))
  moves.push(new BABYLON.Vector3(origin.x, origin.y - 1, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y, origin.z - 1))
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y, origin.z - 1))
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y + 1, origin.z))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y + 1, origin.z))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y - 1, origin.z))
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y - 1, origin.z))
  // get the cells from the coordinates
  return vector3ToCells(playfield, moves)
}

export const knight = (playfield: Cell[], origin: BABYLON.Vector3): Cell[] => {
  let moves: BABYLON.Vector3[] = []
  // get all cells on the 3 axis
  moves.push(new BABYLON.Vector3(origin.x + 2, origin.y + 1, origin.z))
  moves.push(new BABYLON.Vector3(origin.x + 2, origin.y, origin.z - 1))
  moves.push(new BABYLON.Vector3(origin.x + 2, origin.y - 1, origin.z))
  moves.push(new BABYLON.Vector3(origin.x + 2, origin.y, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x - 2, origin.y + 1, origin.z))
  moves.push(new BABYLON.Vector3(origin.x - 2, origin.y, origin.z - 1))
  moves.push(new BABYLON.Vector3(origin.x - 2, origin.y - 1, origin.z))
  moves.push(new BABYLON.Vector3(origin.x - 2, origin.y, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y + 2, origin.z))
  moves.push(new BABYLON.Vector3(origin.x, origin.y + 2, origin.z - 1))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y + 2, origin.z))
  moves.push(new BABYLON.Vector3(origin.x, origin.y + 2, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y - 2, origin.z))
  moves.push(new BABYLON.Vector3(origin.x, origin.y - 2, origin.z - 1))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y - 2, origin.z))
  moves.push(new BABYLON.Vector3(origin.x, origin.y - 2, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y, origin.z + 2))
  moves.push(new BABYLON.Vector3(origin.x, origin.y - 1, origin.z + 2))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y, origin.z + 2))
  moves.push(new BABYLON.Vector3(origin.x, origin.y + 1, origin.z + 2))
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y, origin.z - 2))
  moves.push(new BABYLON.Vector3(origin.x, origin.y + 1, origin.z - 2))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y, origin.z - 2))
  moves.push(new BABYLON.Vector3(origin.x, origin.y - 1, origin.z - 2))
  // get the cells from the coordinates
  return vector3ToCells(playfield, moves)
}

export const pawn = (playfield: Cell[], origin: BABYLON.Vector3): Cell[] => {
  let moves: BABYLON.Vector3[] = []
  // get all cells on the 3 axis
  moves.push(new BABYLON.Vector3(origin.x, origin.y + 1, origin.z))
  moves.push(new BABYLON.Vector3(origin.x, origin.y, origin.z + 1))
  // get the cells from the coordinates
  return vector3ToCells(playfield, moves)
}

export const pawnAttacks = (playfield: Cell[], origin: BABYLON.Vector3): Cell[] => {
  let moves: BABYLON.Vector3[] = []
  // get all cells on the 3 axis
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y + 1, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y + 1, origin.z - 1))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y + 1, origin.z))
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y + 1, origin.z))
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y, origin.z + 1))
  // get the cells from the coordinates
  return vector3ToCells(playfield, moves)
}

export const king = (playfield: Cell[], origin: BABYLON.Vector3): Cell[] => {
  let moves: BABYLON.Vector3[] = []
  // get all cells on the 3 axis
  moves.push(new BABYLON.Vector3(origin.x, origin.y + 1, origin.z))
  moves.push(new BABYLON.Vector3(origin.x, origin.y, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y, origin.z))
  moves.push(new BABYLON.Vector3(origin.x, origin.y - 1, origin.z))
  moves.push(new BABYLON.Vector3(origin.x, origin.y, origin.z - 1))

  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y + 1, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y + 1, origin.z - 1))
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y - 1, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y + 1, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y - 1, origin.z - 1))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y - 1, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y + 1, origin.z - 1))
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y - 1, origin.z - 1))
  // get the cells from the coordinates
  return vector3ToCells(playfield, moves)
}

export const queen = (playfield: Cell[], origin: BABYLON.Vector3): Cell[] => {
  return rook(playfield, origin).concat(bishop(playfield, origin))
}

export const bishop = (playfield: Cell[], origin: BABYLON.Vector3): Cell[] => {

  let moves: BABYLON.Vector3[] = []
  let vector = origin;
  // diagonal -x, -y, -z
  while (vector.x - 1 >= 1 && vector.y - 1 >= 1 && vector.z - 1 >= 1) {
    vector.x -= 1
    vector.y -= 1
    vector.z -= 1
    console.log(vector)
    moves.push(new BABYLON.Vector3(vector.x, vector.y, vector.z))
  }
  // // diagonal -x, -y, z
  // vector = origin;
  // while (vector.x - 1 >= 1 && vector.y - 1 >= 1 && vector.z + 1 <= 8) {
  //   vector.x -= 1
  //   vector.y -= 1
  //   vector.z += 1
  //   moves.push(new BABYLON.Vector3(vector.x, vector.y, vector.z))
  // }
  // // diagonal -x, y, -z
  // vector = origin;
  // while (vector.x - 1 >= 1 && vector.y + 1 <= 8 && vector.z - 1 >= 1) {
  //   vector.x -= 1
  //   vector.y += 1
  //   vector.z -= 1
  //   moves.push(new BABYLON.Vector3(vector.x, vector.y, vector.z))
  // }
  // // diagonal x, -y, -z
  // vector = origin;
  // while (vector.x + 1 <= 8 && vector.y - 1 >= 1 && vector.z - 1 >= 1) {
  //   vector.x += 1
  //   vector.y -= 1
  //   vector.z -= 1
  //   moves.push(new BABYLON.Vector3(vector.x, vector.y, vector.z))
  // }
  // // diagonal -x, y, z
  // vector = origin;
  // while (vector.x - 1 >= 1 && vector.y + 1 <= 8 && vector.z + 1 <= 8) {
  //   vector.x -= 1
  //   vector.y += 1
  //   vector.z += 1
  //   moves.push(new BABYLON.Vector3(vector.x, vector.y, vector.z))
  // }
  // // diagonal x, -y, z
  // vector = origin;
  // while (vector.x + 1 <= 8 && vector.y - 1 >= 1 && vector.z + 1 <= 8) {
  //   vector.x += 1
  //   vector.y -= 1
  //   vector.z += 1
  //   moves.push(new BABYLON.Vector3(vector.x, vector.y, vector.z))
  // }
  // // diagonal x, y, -z
  // vector = origin;
  // while (vector.x + 1 <= 8 && vector.y + 1 <= 8 && vector.z - 1 >= 1) {
  //   vector.x += 1
  //   vector.y += 1
  //   vector.z -= 1
  //   moves.push(new BABYLON.Vector3(vector.x, vector.y, vector.z))
  // }
  // // diagonal x, y, z
  // vector = origin;
  // while (vector.x + 1 <= 8 && vector.y + 1 <= 8 && vector.z + 1 <= 8) {
  //   vector.x += 1
  //   vector.y += 1
  //   vector.z += 1
  //   moves.push(new BABYLON.Vector3(vector.x, vector.y, vector.z))
  // }
  return vector3ToCells(playfield, moves)
}