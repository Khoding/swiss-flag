# SwissFlag

This Swiss Flag, whose inspiration came from Josh W. Comeau's [Pride Flag](https://www.joshwcomeau.com/animation/pride-flags/), is a simple Vue component that displays the Swiss flag with a subtle waving animation.

You can see a demo of the component [here](https://swiss-flag.khodok.com).

## Installation

You can install the package via npm: (check the tags on GitHub for the latest version)

```bash
npm install github:Khoding/swiss-flag#semver:^0.1.0
```

## Usage

### Local Registration

Import the swiss-flag component into your Vue application and use it in your templates:

```vue
<template>
  <div class="container">
    <!-- Normal flag -->
    <swiss-flag />

    <!-- Reduce animation variant -->
    <swiss-flag reduce-animation />

    <!-- Disable animation -->
    <swiss-flag remove-animation />

    <!-- Advanced Animation Controls -->
    <swiss-flag
      animation-speed="1000"
      oscillate-distance="5%"
      staggered-delay="100"
    />
    <swiss-flag
      reduce-animation
      animation-speed="1000"
      oscillate-distance="5%"
      staggered-delay="100"
    />
  </div>
</template>

<script setup>
import '@khoding/swiss-flag';
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `reduce-animation` | Boolean | `false` | When true, forces the simplified variant of the flag (fewer columns, slower animation). Automatically enabled if user prefers reduced motion. |
| `remove-animation` | Boolean | `false` | When true, disables the waving animation completely and renders a static 5-column flag for performance. |
| `animation-speed` | Number | `600` / `900` | (Optional) Duration of the oscillation cycle in milliseconds. Defaults to 600ms (Standard) or 900ms (Reduced Motion). |
| `oscillate-distance` | String | `'2%'` / `'3%'` | (Optional) CSS value for the vertical displacement distance. Defaults to '2%' (Standard) or '3%' (Reduced Motion). |
| `staggered-delay` | Number | `50` / `35` | (Optional) Delay in milliseconds between each column's animation start. Defaults to 50ms (Standard) or 35ms (Reduced Motion). |

## Slots

The component exposes a default slot. Content placed in this slot is rendered inside the main flag container. Since the container uses `display: flex` to render the flag columns, you will typically want to use `position: absolute` for any content injected via the slot to place it on top of the flag without disrupting the grid.

```html
<swiss-flag>
  <div
    style="position: absolute; inset: 0; display: grid; place-items: center; z-index: 10;"
  >
    <span
      style="font-size: 2rem; font-weight: bold; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.5);"
    >
      CH
    </span>
  </div>
</swiss-flag>
```
