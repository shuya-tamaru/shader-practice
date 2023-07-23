export const fracVertexShader = `
uniform float u_time;
varying vec2 vUv;
varying vec3 color;

vec3 palette(float t) {
  vec3 a = vec3(0.5,0.5,0.5);
  vec3 b = vec3(0.5,0.5,0.5);
  vec3 c = vec3(0.0,1.0,1.0);
  vec3 d = vec3(0.263,0.416,0.557);
  return a + b*cos(6.28318*(c*t+d));
}

void main()
{
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); 
  vec2 fragCoord = vec2(170,80);
  vUv = uv * 2.0 -1.0;
  vec2 uv0 = vUv;

  vec3 finalColor = vec3(0.0);

  for(float i = 0.0; i < 4.0; i++){
  vUv = fract(vUv*1.5) - 0.5;

  float d = length(vUv) *  exp(-length(uv0));

  vec3 col = palette(length(uv0) + i*.4+u_time * 0.04 * .4);

  d =sin(d*8.0 + u_time * 0.04)/8.0;
  d=abs(d);

  d= pow(0.01 / d, 1.2);

  finalColor +=col * d;
  color = finalColor;
  }
}
`;
