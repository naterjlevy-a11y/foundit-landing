(function () {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  function initShader() {
    var canvas = document.getElementById("shader-canvas");
    if (!canvas || !window.THREE) return;

    var THREE = window.THREE;

    var camera = new THREE.Camera();
    camera.position.z = 1;

    var scene = new THREE.Scene();
    var geometry = new THREE.PlaneGeometry(2, 2);

    var uniforms = {
      time:       { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    };

    var material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: "void main() { gl_Position = vec4(position, 1.0); }",
      fragmentShader: [
        "#define TWO_PI 6.2831853072",
        "precision highp float;",
        "uniform vec2 resolution;",
        "uniform float time;",
        "void main(void) {",
        "  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);",
        "  float t = time * 0.05;",
        "  float lw = 0.002;",
        "  vec3 color = vec3(0.0);",
        "  for(int j = 0; j < 3; j++){",
        "    for(int i = 0; i < 5; i++){",
        "      color[j] += lw * float(i*i) / abs(fract(t - 0.01*float(j) + float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));",
        "    }",
        "  }",
        "  gl_FragColor = vec4(color[0], color[1], color[2], 1.0);",
        "}"
      ].join("\n"),
    });

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    var hero = canvas.parentElement;

    function resize() {
      var w = hero ? hero.clientWidth  : window.innerWidth;
      var h = hero ? hero.clientHeight : window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    var animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);
    }
    animate();
  }

  function tryInit(attempt) {
    if (window.THREE) {
      initShader();
    } else if (attempt < 40) {
      setTimeout(function () { tryInit(attempt + 1); }, 100);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { tryInit(0); });
  } else {
    tryInit(0);
  }

})();
