export { useClickOutside } from './hook/useClickOutside';
export { useInterval } from './hook/useInterval';
export { useTimeout } from './hook/useTimeout';
export { useRenderCount } from './hook/useRenderCount';

export * from './url';
export * from './scroll';
export * from './device';
export * from './environment';

// | This causes the modules to be omitted, but only at runtime (on server, everything's fine).
// ↓ Probably a bug in webpack, and also a WTF thing.

// export * from './settings';
// export { applySettings } from './settings';
