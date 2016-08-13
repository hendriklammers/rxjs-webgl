import {Observable, Scheduler} from 'rxjs/Rx'
import {createProgram, getContext, createScreenBuffer} from './utils'
import fragmentSource from './shaders/fragment.glsl'
import vertexSource from './shaders/vertex.glsl'

const canvas = document.body.appendChild(document.createElement('canvas'))

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

const mouse$ = Observable
  .fromEvent(canvas, 'mousemove')
  .map(event => ({
    x: event.clientX,
    y: event.clientY
  }))
  .startWith({x: 0, y: 0})

const render$ = animation$
  .withLatestFrom(window$, mouse$)
  .map(([time, screen, mouse]) => ({
    time,
    screen,
    mouse
  }))

render$
  .subscribe(data => console.log(data))

function init() {
  const gl = getContext(canvas)
  const program = createProgram(gl, vertexSource, fragmentSource)
  const vertexPosBuffer = createScreenBuffer(gl)

  program.vertexPosAttrib = gl.getAttribLocation(program, 'a_vertexPosition')
  program.canvasSizeUniform = gl.getUniformLocation(program, 'u_resolution')

  gl.useProgram(program)
  gl.enableVertexAttribArray(program.vertexPosArray)
  gl.vertexAttribPointer(program.vertexPosAttrib,
                          vertexPosBuffer.itemSize,
                          gl.FLOAT,
                          false, 0, 0)

  gl.uniform2f(program.canvasSizeUniform,
                data.screen.width,
                data.screen.height)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems)
}

// dom$.subscribe(init)
