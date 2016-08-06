// GLSL tutorial lesson 11
// https://www.shadertoy.com/view/Md23DV
precision highp float;
uniform vec2 uCanvasSize;

void main() {
  vec3 colorParis = vec3(237.0 / 256.0, 61.0 / 256.0, 144.0 / 256.0);
  vec3 colorCowboy = vec3(242.0 / 256.0, 213.0 / 256.0, 184.0 / 256.0);
  vec3 colorLilas = vec3(219.0 / 256.0, 184.0 / 256.0, 242.0 / 256.0);
  vec3 colorStorm = vec3(167.0 / 256.0, 8.0 / 256.0, 248.0 / 256.0);
  vec3 colorLime = vec3(150.0 / 256.0, 248.0 / 256.0, 8.0 / 256.0);

  float alpha = 1.0;
  vec3 pixel = colorCowboy;

  // vec2 coord = vec2(gl_FragCoord.x / uCanvasSize.x,
      // gl_FragCoord.y / uCanvasSize.y);
  vec2 coord = vec2(gl_FragCoord.xy - 0.5 *  uCanvasSize.xy);
  coord = 2.0 * coord.xy / uCanvasSize.xy;

  // if (coord.x < 0.55 && coord.x > 0.54) pixel = colorStorm;
  //
  // if (abs(coord.x - 0.4) < 0.003) pixel = colorParis;
  //
  // if (abs(coord.y - 0.6) < 0.01) pixel = colorLime;

  const float tickWidth = 0.1;
  if (mod(coord.x, tickWidth) < 0.008) pixel = colorStorm;
  if (mod(coord.y, tickWidth) < 0.008) pixel = colorStorm;

  if (abs(coord.x) < 0.006) pixel = colorLime;
  if (abs(coord.y) < 0.007) pixel = colorLime;

  gl_FragColor = vec4(pixel, alpha);
}
