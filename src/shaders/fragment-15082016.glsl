#ifdef GL_ES
  precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  float alpha = 1.0;
  vec3 pixel = vec3(0.5, 0.5, 0.5);

  vec2 coord = gl_FragCoord.xy / u_resolution.xy;
  /* coord = 2.0 * coord.xy / u_resolution.y; */

  if (mod(gl_FragCoord.x, 2.0) > 1.0
      && mod(gl_FragCoord.y, 2.0) > 1.0) {
    pixel = vec3(cos(coord.x / coord.y * 100.0));
  }

  gl_FragColor = vec4(pixel, alpha);
}
