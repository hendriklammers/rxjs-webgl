import {Observable} from 'rxjs/Rx'

function createCanvas() {
  const canvas = document.createElement('canvas')
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'

  return canvas
}

function getBody() {
  const body = document.body
  body.style.margin = '0'
  body.style.padding = '0'
  body.style.overflow = 'hidden'

  return body
}

function init() {
  const body = getBody(),
    canvas = createCanvas()

  body.appendChild(canvas)
}

Observable
  .fromEvent(document, 'DOMContentLoaded')
  .subscribe(init)
