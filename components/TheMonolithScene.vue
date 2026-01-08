<script setup lang="ts">
import { useLoop } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
import { shallowRef, ref, onMounted } from "vue";
import gsap from "gsap";
import * as THREE from "three";

const emit = defineEmits(["ready"]);

const monolithRef = shallowRef();
const cubesGroupRef = shallowRef();
const isHovered = ref(false);

const { onBeforeRender } = useLoop();

// Generate 50 random positions for chaos cubes
const cubes = Array.from({ length: 50 }).map(() => ({
  position: [
    (Math.random() - 0.5) * 15,
    (Math.random() - 0.5) * 15,
    (Math.random() - 0.5) * 15,
  ],
  rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
  scale: Math.random() * 0.5 + 0.1,
}));

onMounted(() => {
  if (!cubesGroupRef.value || !monolithRef.value) return;

  const tl = gsap.timeline({
    onComplete: () => {
      emit("ready");
    },
  });

  // 1. Order: Snap to center
  tl.to(cubesGroupRef.value.position, {
    duration: 0.1,
  });

  // Animate all cubes to 0,0,0
  cubesGroupRef.value.children.forEach((child: any, i: number) => {
    tl.to(
      child.position,
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 2,
        ease: "power4.inOut",
        delay: Math.random() * 0.5,
      },
      0
    );

    tl.to(
      child.scale,
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
        delay: 1.8,
      },
      0
    );
  });

  // 3. Reveal Monolith
  tl.to(
    monolithRef.value.scale,
    {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
    },
    1.5
  );
});

onBeforeRender(({ elapsed }) => {
  if (monolithRef.value) {
    const rotationSpeed = isHovered.value ? 2 : 0.5;
    monolithRef.value.rotation.y = elapsed * rotationSpeed * 0.5;
    monolithRef.value.rotation.x = Math.sin(elapsed * 0.5) * 0.1;
  }
});
</script>

<template>
  <TresPerspectiveCamera :position="[0, 0, 10]" :fov="45" />
  <OrbitControls
    :enable-zoom="false"
    :enable-pan="false"
    :max-polar-angle="Math.PI / 1.5"
    :min-polar-angle="Math.PI / 3"
  />

  <TresAmbientLight :intensity="0.5" />
  <TresDirectionalLight
    :position="[10, 10, 10]"
    :intensity="1"
    :cast-shadow="true"
  />
  <TresPointLight :position="[-5, 5, 5]" :intensity="5" color="#3b82f6" />

  <TresFog color="#0a0a0a" :near="5" :far="20" />

  <TresGroup ref="cubesGroupRef">
    <TresMesh
      v-for="(cube, i) in cubes"
      :key="i"
      :position="cube.position"
      :rotation="cube.rotation"
      :scale="[cube.scale, cube.scale, cube.scale]"
    >
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="#333" wireframe />
    </TresMesh>
  </TresGroup>

  <TresMesh
    ref="monolithRef"
    :scale="[0, 0, 0]"
    @pointer-enter="isHovered = true"
    @pointer-leave="isHovered = false"
  >
    <TresIcosahedronGeometry :args="[2, 0]" />
    <TresMeshPhysicalMaterial
      :color="isHovered ? '#e0f7fa' : '#ffffff'"
      :roughness="0.1"
      :metalness="0.1"
      :transmission="0.95"
      :thickness="2"
      :emissive="isHovered ? '#00f3ff' : '#000000'"
      :emissive-intensity="isHovered ? 2 : 0"
      transparent
    />
  </TresMesh>
</template>
