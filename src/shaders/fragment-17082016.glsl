precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  float alpha = 1.0;
  vec3 pixel = vec3(0.0);

  pixel = vec3(cos((gl_FragCoord.x + u_time * 0.005) * (gl_FragCoord.y + u_time
          * 0.005)));

  gl_FragColor = vec4(pixel, alpha);
}
