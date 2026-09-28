// store.js：键在哪一层、缓冲满没满、封段（基线：一律给空与假）
export function layerOf(active, frozen, sealed, key) {
  return "";
}

export function fullAt(active, size) {
  return false;
}

export function sealedInto(sealed, frozen) {
  return { sealed: sealed, frozen: frozen };
}
