import * as BABYLON from 'babylonjs'

import Cell from '@/types/Cell'
import { Vector3 } from 'babylonjs'


/** =============================
 * --          TOOLS         --
 * ============================ */

export const cellFromPosition = (playfield: Cell[], position: BABYLON.Vector3): Cell=>{
  [position.x, position.y, position.z].forEach(coordinate=>{
    if(!(1<=coordinate && coordinate<=8)){
      throw("Attempted to get Cell on an unreachable index.")
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

const filterUnreachableIndexes = (moves : BABYLON.Vector3[]):BABYLON.Vector3[]=>(
  moves.filter((vec)=>
    1<=vec.x && vec.x<=8 && 1<=vec.y && vec.y<=8 && 1<=vec.z && vec.z<=8 
  )
)

/** =============================
 * --       PIECES MOVES      --
 * ============================ */

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
  // filter the current cell (the origin)
  moves = moves.filter(move=>(move!=origin))

  moves = filterUnreachableIndexes(moves)
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
  moves = filterUnreachableIndexes(moves)
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
  moves = filterUnreachableIndexes(moves)
  // get the cells from the coordinates
  return vector3ToCells(playfield, moves)
}

export const pawn = (playfield: Cell[], origin: BABYLON.Vector3): Cell[] => {
  let moves: BABYLON.Vector3[] = []
  // get all cells on the 3 axis
  moves.push(new BABYLON.Vector3(origin.x, origin.y + 1, origin.z))
  moves.push(new BABYLON.Vector3(origin.x, origin.y, origin.z + 1))
  // get the cells from the coordinates
  moves = filterUnreachableIndexes(moves)
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
  moves = filterUnreachableIndexes(moves)
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
  moves = filterUnreachableIndexes(moves)
  return vector3ToCells(playfield, moves)
}

export const queen = (playfield: Cell[], origin: BABYLON.Vector3): Cell[] => {
  return rook(playfield, origin).concat(bishop(playfield, origin))
}

export const bishop = (playfield: Cell[], origin: BABYLON.Vector3): Cell[] => {

  let moves: BABYLON.Vector3[] = [
    // diagonal -x, -y, -z
    new BABYLON.Vector3(origin.x-1, origin.y-1, origin.z-1),
    new BABYLON.Vector3(origin.x-2, origin.y-2, origin.z-2),
    new BABYLON.Vector3(origin.x-3, origin.y-3, origin.z-3),
    new BABYLON.Vector3(origin.x-4, origin.y-4, origin.z-4),
    new BABYLON.Vector3(origin.x-5, origin.y-5, origin.z-5),
    new BABYLON.Vector3(origin.x-6, origin.y-6, origin.z-6),
    new BABYLON.Vector3(origin.x-7, origin.y-7, origin.z-7),
    // diagonal -x, -y, +z
    new BABYLON.Vector3(origin.x-1, origin.y-1, origin.z+1),
    new BABYLON.Vector3(origin.x-2, origin.y-2, origin.z+2),
    new BABYLON.Vector3(origin.x-3, origin.y-3, origin.z+3),
    new BABYLON.Vector3(origin.x-4, origin.y-4, origin.z+4),
    new BABYLON.Vector3(origin.x-5, origin.y-5, origin.z+5),
    new BABYLON.Vector3(origin.x-6, origin.y-6, origin.z+6),
    new BABYLON.Vector3(origin.x-7, origin.y-7, origin.z+7),
    // diagonal -x, +y, +z
    new BABYLON.Vector3(origin.x-1, origin.y+1, origin.z+1),
    new BABYLON.Vector3(origin.x-2, origin.y+2, origin.z+2),
    new BABYLON.Vector3(origin.x-3, origin.y+3, origin.z+3),
    new BABYLON.Vector3(origin.x-4, origin.y+4, origin.z+4),
    new BABYLON.Vector3(origin.x-5, origin.y+5, origin.z+5),
    new BABYLON.Vector3(origin.x-6, origin.y+6, origin.z+6),
    new BABYLON.Vector3(origin.x-7, origin.y+7, origin.z+7),
    // diagonal +x, +y, +z
    new BABYLON.Vector3(origin.x+1, origin.y+1, origin.z+1),
    new BABYLON.Vector3(origin.x+2, origin.y+2, origin.z+2),
    new BABYLON.Vector3(origin.x+3, origin.y+3, origin.z+3),
    new BABYLON.Vector3(origin.x+4, origin.y+4, origin.z+4),
    new BABYLON.Vector3(origin.x+5, origin.y+5, origin.z+5),
    new BABYLON.Vector3(origin.x+6, origin.y+6, origin.z+6),
    new BABYLON.Vector3(origin.x+7, origin.y+7, origin.z+7),
    // diagonal +x, +y, -z
    new BABYLON.Vector3(origin.x+1, origin.y+1, origin.z-1),
    new BABYLON.Vector3(origin.x+2, origin.y+2, origin.z-2),
    new BABYLON.Vector3(origin.x+3, origin.y+3, origin.z-3),
    new BABYLON.Vector3(origin.x+4, origin.y+4, origin.z-4),
    new BABYLON.Vector3(origin.x+5, origin.y+5, origin.z-5),
    new BABYLON.Vector3(origin.x+6, origin.y+6, origin.z-6),
    new BABYLON.Vector3(origin.x+7, origin.y+7, origin.z-7),
    // diagonal +x, +y, -z
    new BABYLON.Vector3(origin.x+1, origin.y+1, origin.z-1),
    new BABYLON.Vector3(origin.x+2, origin.y+2, origin.z-2),
    new BABYLON.Vector3(origin.x+3, origin.y+3, origin.z-3),
    new BABYLON.Vector3(origin.x+4, origin.y+4, origin.z-4),
    new BABYLON.Vector3(origin.x+5, origin.y+5, origin.z-5),
    new BABYLON.Vector3(origin.x+6, origin.y+6, origin.z-6),
    new BABYLON.Vector3(origin.x+7, origin.y+7, origin.z-7),
    // diagonal -x, +y, -z
    new BABYLON.Vector3(origin.x-1, origin.y+1, origin.z-1),
    new BABYLON.Vector3(origin.x-2, origin.y+2, origin.z-2),
    new BABYLON.Vector3(origin.x-3, origin.y+3, origin.z-3),
    new BABYLON.Vector3(origin.x-4, origin.y+4, origin.z-4),
    new BABYLON.Vector3(origin.x-5, origin.y+5, origin.z-5),
    new BABYLON.Vector3(origin.x-6, origin.y+6, origin.z-6),
    new BABYLON.Vector3(origin.x-7, origin.y+7, origin.z-7),
    // diagonal +x, -y, +z
    new BABYLON.Vector3(origin.x+1, origin.y-1, origin.z+1),
    new BABYLON.Vector3(origin.x+2, origin.y-2, origin.z+2),
    new BABYLON.Vector3(origin.x+3, origin.y-3, origin.z+3),
    new BABYLON.Vector3(origin.x+4, origin.y-4, origin.z+4),
    new BABYLON.Vector3(origin.x+5, origin.y-5, origin.z+5),
    new BABYLON.Vector3(origin.x+6, origin.y-6, origin.z+6),
    new BABYLON.Vector3(origin.x+7, origin.y-7, origin.z+7),
  ]
  moves = filterUnreachableIndexes(moves)
  return vector3ToCells(playfield, moves)
}