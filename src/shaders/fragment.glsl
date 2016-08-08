precision highp float;
uniform vec2 uCanvasSize;

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
  vec3 colorParis = vec3(237.0 / 256.0, 61.0 / 256.0, 144.0 / 256.0);
  vec3 colorCowboy = vec3(242.0 / 256.0, 213.0 / 256.0, 184.0 / 256.0);
  vec3 colorLilas = vec3(219.0 / 256.0, 184.0 / 256.0, 242.0 / 256.0);
  vec3 colorStorm = vec3(167.0 / 256.0, 8.0 / 256.0, 248.0 / 256.0);
  vec3 colorLime = vec3(150.0 / 256.0, 248.0 / 256.0, 8.0 / 256.0);

  float alpha = 1.0;
  vec3 pixel = colorCowboy;

  vec2 coord = vec2(gl_FragCoord.xy - 0.5 * uCanvasSize.xy);
  coord = 2.0 * coord.xy / uCanvasSize.y;

  if (mod(coord.x, 0.1) < 0.005) {
    pixel = colorParis;
  }
  if (mod(coord.y, 0.1) < 0.005) {
    pixel = colorParis;
  }

  gl_FragColor = vec4(pixel, alpha);
}
