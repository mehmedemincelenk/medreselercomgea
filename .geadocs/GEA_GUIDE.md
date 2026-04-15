# Gea Expert Guide (Armagan Amcalar Edition)

## Reactivity & Stores
- **Batched Updates:** Multiple mutations in one method result in a single DOM patch (via microtask).
- **Deep Proxies:** Every property access is tracked. Mutate arrays/objects directly.
- **Getters:** Use for computed values; they are pure and re-evaluate on access.
- **Singleton Pattern:** Always export an instance: `export default new Store()`.

## Components & Props
- **Two-Way Binding:** Objects/Arrays as props are shared proxies. Child mutation updates parent DOM automatically.
- **Standard JSX:** Use `class` and `click`.
- **Function Components:** Use for presentational, stateless UI.
- **Class Components:** Use for local reactive state or lifecycle hooks.

## Best Practices
- **No Spread:** Do not use `<div {...props} />`.
- **No Fragments in Map:** Wrap `.map()` items in a single root element.
- **Style Objects:** `style={{ backgroundColor: 'red' }}` is optimized at build time.
- **Router:** Define in a separate `router.js` to avoid circular imports.
