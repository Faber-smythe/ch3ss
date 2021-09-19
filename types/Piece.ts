import * as BABYLON from 'babylonjs'

type pieceType = "hound" | "rook" | "knight" | "bishop" | "queen" | "king" | "pawn"

export default class Piece {
  type!: pieceType
  mesh!: BABYLON.Mesh
  particles!: BABYLON.IParticleSystem

  constructor(type: pieceType, mesh: BABYLON.Mesh, scene: BABYLON.Scene) {
    this.type = type
    this.mesh = mesh


    BABYLON.ParticleHelper.CreateFromSnippetAsync("CB89DS", scene, false).then(system => {
      var flameEmitter = new BABYLON.MeshParticleEmitter(mesh);
      flameEmitter.useMeshNormalsForDirection = false
      system.particleEmitterType = flameEmitter
      system.emitter = mesh
      system.stop()
      this.particles = system
    });
  }
}