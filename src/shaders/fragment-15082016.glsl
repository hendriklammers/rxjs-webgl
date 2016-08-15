#ifdef GL_ES
  precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  float alpha = 1.0;
  vec3 pixel = vec3(0.3);

  if (mod(gl_FragCoord.x, 2.0) > 1.0
      && mod(gl_FragCoord.y, 2.0) > 1.0) {
    pixel = vec3(cos(gl_FragCoord.y * u_time * 0.8));
  }

  gl_FragColor = vec4(pixel, alpha);
}
