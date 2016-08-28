#ifdef GL_ES
  precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec3 colorParis = vec3(0.93, 0.24, 0.56);
  vec3 colorCowboy = vec3(0.96, 0.83, 0.72);
  vec3 colorLilas = vec3(0.86, 0.72, 0.95);
  vec3 colorStorm = vec3(0.65, 0.03, 0.97);
  vec3 colorLime = vec3(0.59, 0.97, 0.03);

  vec3 pixel = vec3(0.0);

  vec2 coord = vec2(gl_FragCoord.xy - 0.5 * u_resolution.xy);
  coord = 2.0 * coord.xy / u_resolution.y;

  for (int i = 0; i < 30; i++) {
    float radius = (3.0 - float(i) / 10.0) - sin(u_time);

    if (length(coord) < radius) {
      vec3 color;

      if (mod(float(i), 2.0) == 0.0) {
        color = colorStorm;
      } else {
        color = colorLime;
      }

      pixel = color;
    }
  }

  gl_FragColor = vec4(pixel, 1.0);
}
