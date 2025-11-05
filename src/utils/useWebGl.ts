export function useWebGl() {
  // Check webGL support
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  // TODO: add settings for turning on webgl
  const userPrefersNoWebGl = false;

  return !gl || userPrefersNoWebGl;
}