# Empty Promises
## by Brian Schiller

---

## When might you use it?

> When you need to resolve/reject a Promise outside the scope where the Promise is created

### Examples
- waiting for `isLoggedIn` to settle
- request consolidation

---

### Loading an image in JS

```javascript
function imageSize(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = function() {
      resolve({ width: this.width, height: this.height });
    };
    img.onerror = reject;

    img.src = url;
  });
}
```

---

### Loading an image in JS

```javascript
function imageSize(url) {
  const prom = emptyPromise();
  const img = new Image();

  img.onload = function() {
    prom.resolve({ width: this.width, height: this.height });
  };
  img.onerror = prom.reject;

  img.src = url;
  return prom;
}
```

---
## Definition

```javascript
function emptyPromise() {
  let callbacks;
  const p = new Promise((resolve, reject) => {
    callbacks = { resolve, reject };
  });

  p.resolve = (val) => {
    callbacks.resolve(val);
    return p;
  };
  p.reject = (val) => {
    callbacks.reject(val);
    return p;
  };
  return p;
}
```
---

## wait for `isLoggedIn` to settle

(livecoding)

---

##