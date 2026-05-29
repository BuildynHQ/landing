// Minimal ambient declarations for the Three.js example addons we use.
// The npm `three` package ships these as plain .js without bundled .d.ts.
declare module 'three/examples/jsm/postprocessing/EffectComposer.js' {
  import { WebGLRenderer, WebGLRenderTarget } from 'three';
  export class EffectComposer {
    constructor(renderer: WebGLRenderer, renderTarget?: WebGLRenderTarget);
    addPass(pass: unknown): void;
    setSize(width: number, height: number): void;
    setPixelRatio(pixelRatio: number): void;
    render(deltaTime?: number): void;
    passes: unknown[];
    dispose(): void;
  }
}

declare module 'three/examples/jsm/postprocessing/RenderPass.js' {
  import { Scene, Camera } from 'three';
  export class RenderPass {
    constructor(scene: Scene, camera: Camera);
  }
}

declare module 'three/examples/jsm/postprocessing/UnrealBloomPass.js' {
  import { Vector2 } from 'three';
  export class UnrealBloomPass {
    constructor(resolution: Vector2, strength: number, radius: number, threshold: number);
    strength: number;
    radius: number;
    threshold: number;
  }
}

declare module 'three/examples/jsm/postprocessing/ShaderPass.js' {
  export class ShaderPass {
    constructor(shader: unknown, textureID?: string);
    uniforms: Record<string, { value: unknown }>;
    renderToScreen: boolean;
  }
}

declare module 'three/examples/jsm/postprocessing/OutputPass.js' {
  export class OutputPass {
    constructor();
  }
}
