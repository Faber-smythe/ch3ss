import * as BABYLON from 'babylonjs'

import Cell from '@/types/Cell'
import { Vector3 } from 'babylonjs'


/** =============================
 * --          TOOLS         --
 * ============================ */

export const cellFromPosition = (playfield: Cell[], position: BABYLON.Vector3): Cell=>{
  [position.x, position.y, position.z].forEach((coordinate, i)=>{
    if(!(1<=coordinate && coordinate<=8)){
      console.error(coordinate)
      throw(`The above "${Object.keys(position)[i+1]}" coordinate is not reachable.`)
    }
  })
  const index = String(position.x)+String(position.y)+String(position.z)
  return playfield[index]
}

const vector3ToCells = (playfield: Cell[], positions: Vector3[]) => {
  const cells: Cell[] = []
  positions.forEach(vector => {
        cells.push(cellFromPosition(playfield, vector))
  })
  return cells
}
const isAvailable = (playfield: Cell[], vec: BABYLON.Vector3):Boolean=>{
  return ((1<=vec.x && vec.x<=8 && 1<=vec.y && vec.y<=8 && 1<=vec.z && vec.z<=8) && cellFromPosition(playfield, vec).currently === 'empty')
}

/** =============================
 * --       PIECES MOVES      --
 * ============================ */

export const rook = (playfield: Cell[], origin: BABYLON.Vector3): Cell[] => {
  let moves: BABYLON.Vector3[] = []
  // Axis -x
  let ref: BABYLON.Vector3 = new BABYLON.Vector3(origin.x-1, origin.y, origin.z)
  while (isAvailable(playfield, ref)){
    moves.push(new BABYLON.Vector3(ref.x, ref.y, ref.z))
    ref.x -= 1
  }
  // Axis +x
  ref = new BABYLON.Vector3(origin.x+1, origin.y, origin.z)
  while (isAvailable(playfield, ref)){
    moves.push(new BABYLON.Vector3(ref.x, ref.y, ref.z))
    ref.x += 1
  }
  // Axis -y
  ref = new BABYLON.Vector3(origin.x, origin.y-1, origin.z)
  while (isAvailable(playfield, ref)){
    moves.push(new BABYLON.Vector3(ref.x, ref.y, ref.z))
    ref.y -= 1
  }
  // Axis +y
  ref = new BABYLON.Vector3(origin.x, origin.y+1, origin.z)
  while (isAvailable(playfield, ref)){
    moves.push(new BABYLON.Vector3(ref.x, ref.y, ref.z))
    ref.y += 1
  }
  // Axis -z
  ref = new BABYLON.Vector3(origin.x, origin.y, origin.z-1)
  while (isAvailable(playfield, ref)){
    moves.push(new BABYLON.Vector3(ref.x, ref.y, ref.z))
    ref.z -= 1
  }
  // Axis +z
  ref = new BABYLON.Vector3(origin.x, origin.y, origin.z+1)
  while (isAvailable(playfield, ref)){
    moves.push(new BABYLON.Vector3(ref.x, ref.y, ref.z))
    ref.z += 1
  }
  console.log(moves)
  moves = moves.filter(move=>isAvailable(playfield, move))
  return vector3ToCells(playfield, moves)
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
  moves = moves.filter(move=>isAvailable(playfield, move))
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
  moves = moves.filter(move=>isAvailable(playfield, move))
  // get the cells from the coordinates
  return vector3ToCells(playfield, moves)
}

export const pawn = (playfield: Cell[], origin: BABYLON.Vector3): Cell[] => {
  let moves: BABYLON.Vector3[] = []
  // get all cells on the 3 axis
  moves.push(new BABYLON.Vector3(origin.x, origin.y + 1, origin.z))
  moves.push(new BABYLON.Vector3(origin.x, origin.y, origin.z + 1))
  // get the cells from the coordinates
  moves = moves.filter(move=>isAvailable(playfield, move))
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
  moves = moves.filter(move=>isAvailable(playfield, move))
  return vector3ToCells(playfield, moves)
}

export const king = (playfield: Cell[], origin: BABYLON.Vector3): Cell[] => {
  let moves: BABYLON.Vector3[] = []
  // get the first cells on the 3 axis
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y, origin.z))
  moves.push(new BABYLON.Vector3(origin.x, origin.y + 1, origin.z))
  moves.push(new BABYLON.Vector3(origin.x, origin.y, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y, origin.z))
  moves.push(new BABYLON.Vector3(origin.x, origin.y - 1, origin.z))
  moves.push(new BABYLON.Vector3(origin.x, origin.y, origin.z - 1))
  // get all the queen diagonals
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y + 1, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y + 1, origin.z - 1))
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y - 1, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y + 1, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y - 1, origin.z - 1))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y - 1, origin.z + 1))
  moves.push(new BABYLON.Vector3(origin.x - 1, origin.y + 1, origin.z - 1))
  moves.push(new BABYLON.Vector3(origin.x + 1, origin.y - 1, origin.z - 1))
  // get the cells from the coordinates  
  moves = moves.filter(move=>isAvailable(playfield, move))
  return vector3ToCells(playfield, moves)
}

export const queen = (playfield: Cell[], origin: BABYLON.Vector3): Cell[] => {
  return rook(playfield, origin).concat(bishop(playfield, origin))
}

export const bishop = (playfield: Cell[], origin: BABYLON.Vector3): Cell[] => {

  let moves: BABYLON.Vector3[] = []
    // diagonal -x, -y, -z
    let ref: BABYLON.Vector3 = new BABYLON.Vector3(origin.x-1, origin.y-1, origin.z-1)
    while (isAvailable(playfield, ref)){
      moves.push(new BABYLON.Vector3(ref.x, ref.y, ref.z))
      ref.x -= 1
      ref.y -= 1
      ref.z -= 1
    }
    // diagonal -x, -y, +z
    ref = new BABYLON.Vector3(origin.x-1, origin.y-1, origin.z+1)
    while (isAvailable(playfield, ref)){
      moves.push(new BABYLON.Vector3(ref.x, ref.y, ref.z))
      ref.x -= 1
      ref.y -= 1
      ref.z += 1
    }
    // diagonal -x, +y, +z
    ref = new BABYLON.Vector3(origin.x-1, origin.y+1, origin.z+1)
    while (isAvailable(playfield, ref)){
      moves.push(new BABYLON.Vector3(ref.x, ref.y, ref.z))
      ref.x -= 1
      ref.y += 1
      ref.z += 1
    }
    // diagonal +x, +y, +z
    ref = new BABYLON.Vector3(origin.x+1, origin.y+1, origin.z+1)
    while (isAvailable(playfield, ref)){
      moves.push(new BABYLON.Vector3(ref.x, ref.y, ref.z))
      ref.x += 1
      ref.y += 1
      ref.z += 1
    }
    // diagonal +x, +y, -z
    ref = new BABYLON.Vector3(origin.x+1, origin.y+1, origin.z-1)
    while (isAvailable(playfield, ref)){
      moves.push(new BABYLON.Vector3(ref.x, ref.y, ref.z))
      ref.x += 1
      ref.y += 1
      ref.z -= 1
    }
    // diagonal +x, -y, -z
    ref = new BABYLON.Vector3(origin.x+1, origin.y-1, origin.z-1)
    while (isAvailable(playfield, ref)){
      moves.push(new BABYLON.Vector3(ref.x, ref.y, ref.z))
      ref.x += 1
      ref.y -= 1
      ref.z -= 1
    }
    // diagonal -x, +y, -z
    ref = new BABYLON.Vector3(origin.x-1, origin.y+1, origin.z-1)
    while (isAvailable(playfield, ref)){
      moves.push(new BABYLON.Vector3(ref.x, ref.y, ref.z))
      ref.x -= 1
      ref.y += 1
      ref.z -= 1
    }
    // diagonal +x, -y, +z
    ref = new BABYLON.Vector3(origin.x+1, origin.y-1, origin.z+1)
    while (isAvailable(playfield, ref)){
      moves.push(new BABYLON.Vector3(ref.x, ref.y, ref.z))
      ref.x += 1
      ref.y -= 1
      ref.z += 1
    }
  
  moves = moves.filter(move=>isAvailable(playfield, move))
  return vector3ToCells(playfield, moves)
}