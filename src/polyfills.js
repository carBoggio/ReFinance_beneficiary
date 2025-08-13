// Polyfills for stellar-wallets-kit compatibility
if (typeof global === 'undefined') {
  window.global = window;
}

if (typeof process === 'undefined') {
  window.process = { env: {} };
}

// Ensure Buffer is available if needed
if (typeof Buffer === 'undefined') {
  window.Buffer = {
    from: (data) => new Uint8Array(data),
    alloc: (size) => new Uint8Array(size),
    allocUnsafe: (size) => new Uint8Array(size)
  };
} 