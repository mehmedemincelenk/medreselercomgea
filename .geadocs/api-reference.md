# Gea API Reference

## Store
Extend `Store`, declare reactive properties as class fields, add methods that mutate them.
Mutation examples: `this.count++`, `this.list.push(item)`.
Reactivity: Deep Proxy based, batched via microtask.

## Component
Extend `Component`, implement `template()`.
Lifecycle: `created(props)`, `onAfterRender()`, `dispose()`.
JSX: `class` (not className), `click` (not onClick).

## Props
- Primitives: Pass by value (copy).
- Objects/Arrays: Pass by reference (same proxy). Child mutation updates parent.

## Router
Built-in `router` store. `router.navigate('/path')`, `RouterView`, `Link`.
