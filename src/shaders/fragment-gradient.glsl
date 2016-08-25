#ifdef GL_ES
  precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec3 colorTop = vec3(0.59, 0.97, 0.03);
  vec3 colorBottom = vec3(0.93, 0.24, 0.56);

  gl_FragColor = vec4(vec3(mix(colorBottom, colorTop, gl_FragCoord.y / u_resolution.y)), 1.0);
}
