import { terser } from "rollup-plugin-terser";

export default {
  input: "src/PixiScaleManager.js",
  output: {
    file: "dist/pixi-scale-manager.min.js",
    format: "umd",
    name: "PixiScaleManager",
  },
  plugins: [terser()],
};
