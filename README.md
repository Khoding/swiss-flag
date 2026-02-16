# SwissFlag

This Swiss Flag, whose inspiration came from Josh W. Comeau's [Pride Flag](https://www.joshwcomeau.com/animation/pride-flags/), is a simple Vue component that displays the Swiss flag with a subtle waving animation.

You can see a demo of the component [here](https://swiss-flag.khodok.com).

## Installation

You can install the package via npm: (check the [GitHub Tags](https://github.com/Khoding/swiss-flag/tags) for the latest version)

```bash
npm install github:Khoding/swiss-flag#semver:^1.0.0
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
    <swiss-flag animation-speed="1000" oscillate-distance="5%" staggered-delay="100" />
    <swiss-flag
      reduce-animation
      animation-speed="1000"
      oscillate-distance="5%"
      staggered-delay="100"
      reduced-animation-speed="1500"
      reduced-oscillate-distance="3%"
      reduced-staggered-delay="70"
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
| `animation-speed` | Number | `600` | (Optional) Duration of the oscillation cycle in milliseconds. Defaults to 600ms. |
| `oscillate-distance` | String | `'2%'` | (Optional) CSS value for the vertical displacement distance. |
| `staggered-delay` | Number | `50` | (Optional) Delay in milliseconds between each column's animation start. Defaults to 50ms. |
| `reduced-animation-speed` | Number | `900` | (Optional) Animation speed when reduced motion is active. Defaults to 900ms. |
| `reduced-oscillate-distance` | String | `'2%'` | (Optional) Oscillation distance when reduced motion is active. |
| `reduced-staggered-delay` | Number | `35` | (Optional) Stagger delay when reduced motion is active. Defaults to 35ms. |

### Reduced Motion Configuration

The component automatically respects the user's `prefers-reduced-motion` system setting. When active (or when `reduce-animation` is set to true), the component switches to "reduced" defaults which are slower and gentler to avoid triggering motion sickness.

If you choose to override the reduced motion defaults, please keep the following in mind:

1.  **Motion Sickness**: The default reduced values are tuned to be safe for users with vestibular disorders. Changes to these defaults should be made with caution. Usually, it is best to keep the "reduced" values at their defaults and only modify the normal settings.
2.  **Consistency**: It is highly recommended to keep `oscillate-distance` and `reduced-oscillate-distance` at the same values. If one mode uses `2%` (subtle) and the other uses `50%` (extreme), switching between them or loading the page could cause significant layout shifts or "page breaking" behavior as the component dimensions change. Even a slight change can make a difference, so it really depends on the space you allocate the flag.

## Slots

The component exposes a default slot. Content placed in this slot is rendered outside of the `section.flag` in the shadow-dom.  
The component is designed to let you do whatever you want and doesn't assume anything, so explore the code and you'll be able to do whatever you want!

```html
<swiss-flag>
  <div style="position: absolute; inset: 0; display: grid; place-items: center; z-index: 10;">
    <span
      style="font-size: 2rem; font-weight: bold; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.5);"
    >
      CH
    </span>
  </div>
</swiss-flag>
```
