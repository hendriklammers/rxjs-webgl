import twgl from 'twgl.js'
import {Observable, Scheduler} from 'rxjs/Rx'
import fragmentSource from './shaders/fragment.glsl'
import vertexSource from './shaders/vertex.glsl'

// Setup twgl
const canvas = document.body.appendChild(document.createElement('canvas'))
const gl = twgl.getWebGLContext(canvas)
const programInfo = twgl.createProgramInfo(gl, [vertexSource, fragmentSource])
const bufferArrays = {
  a_position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]
}
const bufferInfo = twgl.createBufferInfoFromArrays(gl, bufferArrays)

// Animation stream uses requestAnimationFrame to schedule update interval
const animation$ = Observable
  .interval(1000 / 60, Scheduler.requestAnimationFrame)
  .map(() => ({time: Date.now(), deltaTime: null, count: 0}))
  .scan((prev, curr) => ({
    time: curr.time,
    deltaTime: (curr.time - prev.time) / 1000,
    count: prev.count + 1
  }))

// Window stream listens to browser resize and starts of with current size
const window$ = Observable
  .fromEvent(window, 'resize')
  .debounceTime(250)
  .distinctUntilChanged()
  .map(e => ({
    width: e.currentTarget.innerWidth,
    height: e.currentTarget.innerHeight
  }))
  .startWith({
    width: window.innerWidth,
    height: window.innerHeight
  })
  // Side effect: Update canvas size
  .do(screen => {
    canvas.width = screen.width,
    canvas.height = screen.height
  })

// Mouse event stream emits on mousemove
const mouse$ = Observable
  .fromEvent(canvas, 'mousemove')
  .map(e => ({
    x: e.clientX,
    y: e.clientY
  }))
  .startWith({x: 0, y: 0})

// Combined stream
const render$ = animation$
  .withLatestFrom(window$, mouse$)
  .map(([time, screen, mouse]) => ({
    time,
    screen,
    mouse
  }))

// Draw webGL buffer using twgl
const renderGl = data => {
  const uniforms = {
    u_time: data.time * 0.001,
    u_resolution: [data.screen.width, data.screen.height]
  }

  gl.viewport(0, 0, data.screen.width, data.screen.height)
  gl.useProgram(programInfo.program)

  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
  twgl.setUniforms(programInfo, uniforms)
  twgl.drawBufferInfo(gl, gl.TRIANGLES, bufferInfo)
}

render$
  .subscribe(renderGl, err => console.log(err))
