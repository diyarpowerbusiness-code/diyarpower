import fs from 'fs/promises';
import path from 'path';

const cwd = process.cwd();
const src = path.resolve(cwd, '..', 'frontend', 'public', 'assets');
const dest = path.resolve(cwd, 'public', 'assets');

const copyDir = async (from, to) => {
  const entries = await fs.readdir(from, { withFileTypes: true });
  await fs.mkdir(to, { recursive: true });
  for (const entry of entries) {
    const fromPath = path.join(from, entry.name);
    const toPath = path.join(to, entry.name);
    if (entry.isDirectory()) {
      await copyDir(fromPath, toPath);
    } else {
      await fs.copyFile(fromPath, toPath);
    }
  }
};

try {
  await fs.access(src);
  await copyDir(src, dest);
  console.log('[admin] assets synced from frontend/public/assets');
} catch (err) {
  console.warn('[admin] assets sync skipped:', err?.message || err);
}
