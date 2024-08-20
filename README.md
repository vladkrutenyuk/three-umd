# @vladkrutenyuk/three-umd
## Three.js UMD build
рэп это жизнь

### Usage
1. THREE itself
```html
<script src=".../three.umd.min.js"></script>

<script>
    // THREE is defined globally
    window.THREE;
    THREE;

    const rap = new THREE.Object3D();
</script>
```
2. Addons
```html
<!-- load threejs first -->
<script src=".../three.umd.min.js"></script>
<!-- load addon you need -->
<script src=".../addons/utils/SkeletonUtils.umd.js"></script>
<script src=".../addons/controls/OrbitControls.umd.js"></script>

<script>
    // THREE is defined globally
    const camera = new THREE.PerspectiveCamera()

    // ThreeAddons is defined globally
    window.ThreeAddons;
    ThreeAddons;
    // it contains any loaded three addon

    // UMD name of addon is name of its file
    // UMD object contains anything exported in original module

    // for ".../addons/utils/SkeletonUtils.umd.js"
    const skeletonUtilsUmd = window.ThreeAddons.SkeletonUtils;
    const { clone } = skeletonUtilsUmd;
    clone()
    
    // for ".../addons/controls/OrbitControls.umd.js"
    const orbitControlsUmd = window.ThreeAddons.OrbitControls;
    const { OrbitControls } = orbitControlsUmd;

    // ofcrs camera, renderer should be inited yourself
    new OrbitControls(camera, renderer.domElement);

    // and etc...
</script>
```

## CDN
You are abl to use free npm-cdn services:

like cdn.jsdelivr.net ...

So for any npm package:
https://cdn.jsdelivr.net/npm/[package-name]@[version]/[file-path]

Examples:
- https://cdn.jsdelivr.net/npm/@vladkrutenyuk/three-umd/dist/three.umd.min.js
- https://cdn.jsdelivr.net/npm/@vladkrutenyuk/three-umd/dist/addons/controls/OrbitControls.umd.js


