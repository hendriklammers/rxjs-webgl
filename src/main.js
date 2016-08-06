import {Observable, Scheduler} from 'rxjs/Rx'
import {createProgram, getContext, createScreenBuffer} from './utils'
import fragmentSource from './shaders/fragment.glsl'
import vertexSource from './shaders/vertex.glsl'

const dom$ = Observable
  .fromEvent(document, 'DOMContentLoaded')

const render$ = Observable
  .interval(1000 / 60, Scheduler.requestAnimationFrame)
  .map(() => ({time: Date.now(), deltaTime: null}))
  .scan((previous, current) => ({
    time: current.time,
    deltaTime: (current.time - previous.time) / 1000
  }))

const window$ = Observable
  .fromEvent(window, 'resize')
  .debounceTime(250)
  .map(event => ({
    width: event.currentTarget.innerWidth,
    height: event.currentTarget.innerHeight
  }))

const getCanvas = function() {
  const canvas = document.createElement('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  return canvas
}

const getBody = function() {
  const body = document.body
  body.style.margin = '0'
  body.style.padding = '0'
  body.style.overflow = 'hidden'

  return body
}

function init() {
  const body = getBody(),
    canvas = getCanvas(),
    gl = getContext(canvas),
    program = createProgram(gl, vertexSource, fragmentSource),
    vertexPosBuffer = createScreenBuffer(gl)

  body.appendChild(canvas)

  program.vertexPosAttrib = gl.getAttribLocation(program, 'aVertexPosition')
  program.canvasSizeUniform = gl.getUniformLocation(program, 'uCanvasSize')

  gl.useProgram(program)
  gl.enableVertexAttribArray(program.vertexPosArray)
  gl.vertexAttribPointer(program.vertexPosAttrib,
                          vertexPosBuffer.itemSize,
                          gl.FLOAT,
                          false, 0, 0)
  gl.uniform2f(program.canvasSizeUniform, canvas.clientWidth, canvas.clientHeight)

  render$.subscribe(render)

  function render() {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems)
  }
}

dom$.subscribe(init)
