export function compileShader(gl, source, type) {
  const shader = gl.createShader(type)

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw gl.getShaderInfoLog(shader)
  }

  return shader
}

export function createScreenBuffer(gl) {
  const vertices = new Float32Array([
    -1, -1,
    1, -1,
    -1, 1,
    1, 1
  ])

  const vertexPosBuffer = gl.createBuffer()

  vertexPosBuffer.itemSize = 2
  vertexPosBuffer.numItems = 4

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  return vertexPosBuffer
}

export function createProgram(gl, vertexSource, fragmentSource) {
  const program = gl.createProgram(),
    vertexShader = compileShader(gl, vertexSource, gl.VERTEX_SHADER),
    fragmentShader = compileShader(gl, fragmentSource, gl.FRAGMENT_SHADER)

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw gl.getProgramInfoLog(program)
  }

  return program
}

export function getContext(canvas) {
  let gl

  try {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  } catch (error) {
    console.log(error)
  }

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser may not support it.')
    gl = null
  }

  return gl
}

export default {
  createScreenBuffer,
  createProgram,
  compileShader,
  getContext
}
