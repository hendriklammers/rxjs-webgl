#ifdef GL_ES
  precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

void main() {
  vec3 colorStorm = vec3(167.0 / 256.0, 8.0 / 256.0, 248.0 / 256.0);
  vec3 colorLime = vec3(150.0 / 256.0, 248.0 / 256.0, 8.0 / 256.0);

  float alpha = 1.0;
  vec3 pixel = vec3(0.0);

  // Create coordinate system -1.0 * 1.0
  vec2 pos = gl_FragCoord.xy - 0.5 * u_resolution.xy;
  // u_resolution = x:1440 y:900
  // gl_FragCoord = x:350 y:200
  // x: 350 - (1440 * 0.5) -> -370
  // y: 200 - (900 * 0.5) -> -250
  pos = 2.0 * pos.xy / u_resolution.y;
  // 2.0 * -370 -> -740 / 900 => -0.82222
  // 2.0 * -250 -> -500 / 900 => -0.55555

  // 0.1*0.1 grid
  if (mod(pos.x, 0.2) < 0.1 && mod(pos.y, 0.2) < 0.1) {
    pixel = colorStorm;
  } else if (mod(pos.x, 0.2) > 0.1 && mod(pos.y, 0.2) > 0.1) {
    pixel = colorLime;
  }

  // Line every 100px
  float lineSpace = 2.0 / u_resolution.y * 100.0;
  float lineWidth = 2.0 / u_resolution.y * 5.0;

  if (mod(pos.x, lineSpace) < lineWidth ||
      mod(pos.y, lineSpace) < lineWidth) {
    pixel = vec3(1.0);
  }

  gl_FragColor = vec4(pixel, alpha);
}
