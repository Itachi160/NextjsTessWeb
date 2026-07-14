/**
 * Image Optimization Script
 * Converts all PNG assets to WebP format for massive payload reduction.
 * Run: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

async function convertImage(inputPath, outputPath, options = {}) {
  const { width, quality = 82 } = options;
  let pipeline = sharp(inputPath);
  
  if (width) {
    pipeline = pipeline.resize(width, null, { fit: 'inside', withoutEnlargement: true });
  }
  
  await pipeline.webp({ quality, effort: 6 }).toFile(outputPath);
  
  const inputSize = fs.statSync(inputPath).size;
  const outputSize = fs.statSync(outputPath).size;
  const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);
  console.log(`  ✓ ${path.basename(inputPath)} → ${path.basename(outputPath)} | ${(inputSize/1024).toFixed(0)} KB → ${(outputSize/1024).toFixed(0)} KB (${savings}% smaller)`);
  return { inputSize, outputSize };
}

async function main() {
  console.log('\n═══ Image Optimization Pipeline ═══\n');
  let totalInput = 0;
  let totalOutput = 0;

  // 1. Convert Logo Hd.png → Logo Hd.webp (resize to 512px max)
  console.log('Phase 1: Logo assets');
  let result = await convertImage(
    path.join(publicDir, 'Logo Hd.png'),
    path.join(publicDir, 'Logo Hd.webp'),
    { width: 512, quality: 85 }
  );
  totalInput += result.inputSize;
  totalOutput += result.outputSize;

  // 2. Convert project images
  console.log('\nPhase 2: Project images');
  const projectImages = ['img-ai.png', 'img-cloud.png', 'img-fintech.png', 'img-security.png'];
  for (const img of projectImages) {
    result = await convertImage(
      path.join(publicDir, img),
      path.join(publicDir, img.replace('.png', '.webp')),
      { width: 800, quality: 82 }
    );
    totalInput += result.inputSize;
    totalOutput += result.outputSize;
  }

  // 3. Convert keyboard animation frames
  console.log('\nPhase 3: Keyboard animation frames (81 frames)');
  const framesDir = path.join(publicDir, 'Keyboard Assemble Animation');
  const frames = fs.readdirSync(framesDir).filter(f => f.endsWith('.png')).sort();
  
  let frameInput = 0;
  let frameOutput = 0;
  for (let i = 0; i < frames.length; i++) {
    const inputPath = path.join(framesDir, frames[i]);
    const outputPath = path.join(framesDir, frames[i].replace('.png', '.webp'));
    const r = await convertImage(inputPath, outputPath, { quality: 80 });
    frameInput += r.inputSize;
    frameOutput += r.outputSize;
  }
  totalInput += frameInput;
  totalOutput += frameOutput;
  console.log(`  Frames subtotal: ${(frameInput/1024/1024).toFixed(2)} MB → ${(frameOutput/1024/1024).toFixed(2)} MB`);

  // Summary
  console.log('\n═══ SUMMARY ═══');
  console.log(`Total input:  ${(totalInput/1024/1024).toFixed(2)} MB`);
  console.log(`Total output: ${(totalOutput/1024/1024).toFixed(2)} MB`);
  console.log(`Savings:      ${((totalInput - totalOutput)/1024/1024).toFixed(2)} MB (${((1 - totalOutput/totalInput) * 100).toFixed(1)}%)`);
  console.log('');
}

main().catch(console.error);
