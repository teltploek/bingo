import { useCallback, useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { extend, Object3DNode, useFrame } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      textMaterial: Object3DNode<TextMaterial, typeof TextMaterial>;
    }
  }
}

interface NumberBallProps {
  number: number | null;
  isAnimating: boolean;
  onAnimationComplete?: () => void;
  onReveal?: () => void;
  getColorForNumber: (num: number) => string;
}

class TextMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTexture: { value: null },
        uRadius: { value: 2.25 },
        uBlur: { value: 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float uRadius;
        void main() {
          vUv = uv;
          vec3 p = position;
          float phi = (p.x / uRadius) * 0.5;
          float theta = (p.y / uRadius) * 0.5;
          
          vec3 spherePoint = vec3(
            uRadius * sin(phi) * cos(theta),
            uRadius * sin(theta),
            uRadius * cos(phi) * cos(theta)
          );
          vec3 normal = normalize(spherePoint);
          vec3 offset = normal * 0.02; 
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(spherePoint + offset, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uTexture;
        uniform float uBlur;
        void main() {
          vec4 color = vec4(0.0);
          float samples = 64.0;
          for(float i = 0.0; i < samples; i++) {
            float angle = (i / samples) * 6.28318;
            float dist = uBlur * 0.5;
            vec2 offset = vec2(cos(angle), sin(angle)) * dist;
            offset.x += uBlur * 0.3;
            color += texture2D(uTexture, vUv + offset);
          }
          color /= samples;
          gl_FragColor = vec4(1.0, 1.0, 1.0, color.a);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }
}

extend({ TextMaterial });

function NumberBall({
  number,
  isAnimating,
  onAnimationComplete,
  onReveal,
  getColorForNumber,
}: NumberBallProps) {
  const [displayedNumber, setDisplayedNumber] = useState<number | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);
  const materialRef = useRef<TextMaterial>(null);

  useEffect(() => {
    if (displayedNumber === null) return;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 300px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(displayedNumber.toString(), canvas.width / 2, canvas.height / 2);

    if (!textureRef.current) {
      textureRef.current = new THREE.Texture(canvas);
    } else {
      textureRef.current.image = canvas;
    }
    textureRef.current.needsUpdate = true;

    if (materialRef.current) {
      materialRef.current.uniforms.uTexture.value = textureRef.current;
    }
  }, [displayedNumber]);

  const { rotationY, blur, color } = useSpring({
    from: {
      rotationY: 0,
      blur: 0,
      color: number ? getColorForNumber(number) : '#4a90e2',
    },
    to: async (next) => {
      if (isAnimating) {
        // Initial half-turn - no text
        await next({ rotationY: Math.PI, blur: 0, config: { duration: 150 } });

        await new Promise((resolve) => setTimeout(resolve, 30));

        // Prolong spin by increasing duration and rotation factor
        await next({
          rotationY: Math.PI * 2400,
          blur: 0.25,
          color: number ? getColorForNumber(number) : '#4a90e2',
          config: { duration: 1000, easing: (t) => t },
        });

        // Now set the displayed number with high blur
        setDisplayedNumber(number);
        await new Promise((resolve) => requestAnimationFrame(resolve));

        // Final rotation to ensure text faces forward (multiple of 2π)
        await next({
          rotationY: Math.PI * 2402,
          blur: 0.15,
          config: { duration: 80 },
        });

        // Reveal sound after final blur reduction
        await next({ blur: 0, config: { duration: 100 } });

        onReveal?.();
        onAnimationComplete?.();
      }
    },
  });

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uBlur.value = blur.get();
    }
  });

  return (
    <animated.group rotation-y={rotationY}>
      <mesh>
        <sphereGeometry args={[2.25, 32, 32]} />
        <animated.meshStandardMaterial color={color} roughness={0.4} metalness={0.5} />
      </mesh>

      {displayedNumber !== null && (
        <mesh rotation={[0, 0, 0]}>
          {' '}
          {/* Changed from [0, Math.PI, 0] to [0, 0, 0] */}
          <planeGeometry args={[4.5, 4.5, 32, 32]} />
          <textMaterial ref={materialRef} transparent={true} depthTest={true} depthWrite={true} />
        </mesh>
      )}
    </animated.group>
  );
}

export default NumberBall;
