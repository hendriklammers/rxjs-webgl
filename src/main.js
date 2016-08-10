import {Observable, Scheduler} from 'rxjs/Rx'
import {createProgram, getContext, createScreenBuffer} from './utils'
import fragmentSource from './shaders/fragment.glsl'
import vertexSource from './shaders/vertex.glsl'

const dom$ = Observable
  .fromEvent(document, 'DOMContentLoaded')

const animation$ = Observable
  .interval(1000 / 60, Scheduler.requestAnimationFrame)
  .map(() => ({time: Date.now(), deltaTime: null, count: 0}))
  .scan((previous, current) => ({
    time: current.time,
    deltaTime: (current.time - previous.time) / 1000,
    count: previous.count + 1
  }))

const window$ = Observable
  .fromEvent(window, 'resize')
  .debounceTime(250)
  .distinctUntilChanged()
  .map(event => ({
    width: event.currentTarget.innerWidth,
    height: event.currentTarget.innerHeight
  }))
  .startWith({
    width: window.innerWidth,
    height: window.innerHeight
  })

const render$ = animation$
  .withLatestFrom(window$)
  .map(([time, screen]) => ({
    time,
    screen
  }))

const getCanvas = function() {
  const canvas = document.createElement('canvas')

  const body = document.body
  body.style.margin = '0'
  body.style.padding = '0'
  body.style.overflow = 'hidden'
  body.appendChild(canvas)

  window$
    .subscribe(size => {
      canvas.width = size.width,
      canvas.height = size.height
    })

  return canvas
}

function init() {
  const canvas = getCanvas(),
    gl = getContext(canvas),
    program = createProgram(gl, vertexSource, fragmentSource),
    vertexPosBuffer = createScreenBuffer(gl)

  program.vertexPosAttrib = gl.getAttribLocation(program, 'a_vertexPosition')
  program.canvasSizeUniform = gl.getUniformLocation(program, 'u_resolution')

  gl.useProgram(program)
  gl.enableVertexAttribArray(program.vertexPosArray)
  gl.vertexAttribPointer(program.vertexPosAttrib,
                          vertexPosBuffer.itemSize,
                          gl.FLOAT,
                          false, 0, 0)
  gl.uniform2f(program.canvasSizeUniform, canvas.clientWidth, canvas.clientHeight)

  // render$.subscribe(render)

  render()
  function render() {
    gl.uniform2f(program.canvasSizeUniform, canvas.clientWidth, canvas.clientHeight)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems)
  }
}

dom$.subscribe(init)
