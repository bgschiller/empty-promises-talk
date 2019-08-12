# Empty Promises
## by Brian Schiller

---
## Definition

```javascript
function emptyPromise() {
  let callbacks;
  const p = new Promise((resolve, reject) => {
    callbacks = { resolve, reject };
  });

  p.resolve = (val) => callbacks.resolve(val);
  p.reject = (val) => callbacks.reject(val);

  return p;
}
```

---

## Without `emptyPromise`

```javascript
function fileContents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (e, data) => {
      if (e) reject(e);
      else resolve(data);
    });
  });
}
```

---

## With `emptyPromise`

```javascript
function fileContents(path) {
  const p = emptyPromise();

  fs.readFile(path, (e, data) => {
    if (e) p.reject(e);
    else p.resolve(data);
  });

  return p;
}
```
---
[.autoscale: true]

## When might you use it?

> When you need to resolve/reject a Promise outside the scope where the Promise is created

### Examples
- converting callback-based code
- waiting for `isLoggedIn` to settle
- request consolidation

---


## wait for `isLoggedIn` to settle

(livecoding)

---

## Waiting on actions

```javascript
hagridActions: ['fetchProjects'],
async mounted() {
  await this.hagridPromise('fetchProjects');
  // at this point, you can be confident that projects have been fetched.
  const toSelect = this.$route.query.projectId || this.projects[0].id;
  this.selectProject(this.projects.find(p => p.id === toSelect));
},
```
---

## Waiting on actions

```javascript
hagridActions: ['fetchProjects'],
async mounted() {
  await this.hagridPromise('fetchProjects');
  // at this point, you can be confident that projects have been fetched.
  const toSelect = this.$route.query.projectId || this.projects[0].id;
  this.selectProject(this.projects.find(p => p.id === toSelect));
},
```

What if someone requests `hagridPromise('notYetDispatched')`?

---
```javascript
  getPromise(actionName) {








  }
  setPromise(actionName, p) {





  }
```
---
```javascript
  getPromise(actionName) {
    if (this.promises[actionName]) return this.promises[actionName];







  }
  setPromise(actionName, p) {





  }
```
---
```javascript
  getPromise(actionName) {
    if (this.promises[actionName]) return this.promises[actionName];
    if (this.unknownPromises[actionName]) {
      return this.unknownPromises[actionName];
    }




  }
  setPromise(actionName, p) {





  }
```
---
```javascript
  getPromise(actionName) {
    if (this.promises[actionName]) return this.promises[actionName];
    if (this.unknownPromises[actionName]) {
      return this.unknownPromises[actionName];
    }

    this.unknownPromises[actionName] = emptyPromise();
    //                                 ☝️

  }
  setPromise(actionName, p) {





  }
```
---
```javascript
  getPromise(actionName) {
    if (this.promises[actionName]) return this.promises[actionName];
    if (this.unknownPromises[actionName]) {
      return this.unknownPromises[actionName];
    }

    this.unknownPromises[actionName] = emptyPromise();
    //                                 ☝️
    return this.unknownPromises[actionName];
  }
  setPromise(actionName, p) {





  }
```
---
```javascript
  getPromise(actionName) {
    if (this.promises[actionName]) return this.promises[actionName];
    if (this.unknownPromises[actionName]) {
      return this.unknownPromises[actionName];
    }

    this.unknownPromises[actionName] = emptyPromise();
    //                                 ☝️
    return this.unknownPromises[actionName];
  }
  setPromise(actionName, p) {
    if (this.unknownPromises[actionName]) {
      this.unknownPromises[actionName].resolve(p);
      delete this.unknownPromises[actionName];
    }

  }
```
---
```javascript
  getPromise(actionName) {
    if (this.promises[actionName]) return this.promises[actionName];
    if (this.unknownPromises[actionName]) {
      return this.unknownPromises[actionName];
    }

    this.unknownPromises[actionName] = emptyPromise();
    //                                 ☝️
    return this.unknownPromises[actionName];
  }
  setPromise(actionName, p) {
    if (this.unknownPromises[actionName]) {
      this.unknownPromises[actionName].resolve(p);
      delete this.unknownPromises[actionName];
    }
    this.promises[actionName] = p;
  }
```
---
[.autoscale: true]
# Thank you!

<br><br>
`brian@brianschiller.com`

Twitter, Github, Denver Devs: `@bgschiller`


- slides: `github.com/bgschiller/empty-promises-talk`
- `github.com/binded/empty-promise`
- `github.com/bgschiller/vue-hagrid`

