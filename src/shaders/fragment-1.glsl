precision highp float;
uniform vec2 uCanvasSize;

void main() {

  vec2 coord = vec2(gl_FragCoord.xy - 0.5 * uCanvasSize.xy);
  coord = 2.0 * coord.xy / uCanvasSize.y;

  vec3 pixel = vec3(0.96, 0.83, 0.72);
  float alpha = 1.0;

  if (mod(coord.x, 0.1) < 0.005) {
    pixel = vec3(0.93, 0.24, 0.56);
  }
  if (mod(coord.y, 0.1) < 0.005) {
    pixel = vec3(0.93, 0.24, 0.56);
  }

  gl_FragColor = vec4(pixel, alpha);
}
