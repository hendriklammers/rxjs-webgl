#ifdef GL_ES
  precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  float alpha = 1.0;
  vec3 pixel = vec3(0.0);

  vec2 coord = gl_FragCoord.xy / u_resolution.xy;

  for (int i = 0; i < 100; i++) {
    if (coord.x > 0.01 * float(i)) {
      pixel = vec3(sin(u_time * 0.5 + float(i)));
    }
  }

  gl_FragColor = vec4(pixel, alpha);
}
