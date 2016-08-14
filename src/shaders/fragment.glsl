#ifdef GL_ES
  precision mediump float;
#endif

uniform vec2 u_resolution;

void circle(vec2 coord, vec2 center, float radius, vec3 color, inout vec3 pixel) {
  if (length(coord - center) < radius) {
    pixel = color;
  }
}

void rect(vec2 coord, vec2 pos, vec2 dimensions, vec3 color, inout vec3 pixel) {
  if (coord.x >= pos.x && coord.x < pos.x + dimensions.x
      && coord.y >= pos.y && coord.y < pos.y + dimensions.y) {
    pixel = color;
  }
}

void main() {
  vec3 colorBlack = vec3(0.0);
  vec3 colorParis = vec3(0.93, 0.24, 0.56);
  vec3 colorCowboy = vec3(0.96, 0.83, 0.72);
  vec3 colorLilas = vec3(0.86, 0.72, 0.95);
  vec3 colorStorm = vec3(0.65, 0.03, 0.97);
  vec3 colorLime = vec3(0.59, 0.97, 0.03);

  float alpha = 1.0;
  vec3 pixel = colorCowboy;

  vec2 coord = vec2(gl_FragCoord.xy - 0.5 * u_resolution.xy);
  coord = 2.0 * coord.xy / u_resolution.y;

  for (int i = 0; i < 10; i++) {
    if (coord.x > (float(i) + 0.05) / 10.0 && coord.x < (float(i) + 0.1) / 10.0 + 0.05) {
      pixel = colorBlack;
    }

    /* rect(coord, vec2(i / 10, i / 10), vec2(0.05, 0.05), colorLilas, pixel); */
    /* circle(coord, vec2(i, i), 0.05, colorStorm, pixel); */
  }

  gl_FragColor = vec4(pixel, alpha);
}
