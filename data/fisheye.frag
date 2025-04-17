precision mediump float;

uniform sampler2D tex0;
uniform vec2 resolution;
uniform float strength;

varying vec2 vTexCoord;

void main() {
  vec2 uv = vTexCoord;

  // Centered UV (-1 to 1)
  vec2 centered = uv * 2.0 - 1.0;

  float r = length(centered);
  float angle = atan(centered.y, centered.x);

  // Fisheye distortion formula
  float distortedR = r * (1.0 + strength * r * r);

  // Prevent collapse or overshoot
  if (distortedR > 1.0) discard;

  vec2 distorted = distortedR * vec2(cos(angle), sin(angle));

  // Convert back to 0–1 space
  vec2 finalUV = (distorted + 1.0) / 2.0;

  gl_FragColor = texture2D(tex0, finalUV);
}
