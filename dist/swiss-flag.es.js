const b = ":host{display:block;position:relative}.flag{aspect-ratio:1;isolation:isolate;forced-color-adjust:none;--lightningcss-light:initial;--lightningcss-dark: ;--lightningcss-light:initial;--lightningcss-dark: ;color-scheme:light only;display:flex}.flag.no-animation .column{animation:none}.column{animation:oscillate var(--animation-speed) infinite alternate ease-in-out backwards;filter:none!important}@keyframes oscillate{0%{transform:translateY(var(--oscillate-distance))}to{transform:translateY(calc(-1 * var(--oscillate-distance)))}}";
class S extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this._mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  }
  static get observedAttributes() {
    return [
      "reduce-animation",
      "remove-animation",
      "animation-speed",
      "oscillate-distance",
      "staggered-delay",
      "reduced-animation-speed",
      "reduced-oscillate-distance",
      "reduced-staggered-delay"
    ];
  }
  connectedCallback() {
    this._mediaQuery.addEventListener("change", () => this.render()), this.render();
  }
  disconnectedCallback() {
    this._mediaQuery.removeEventListener("change", () => this.render());
  }
  attributeChangedCallback() {
    this.render();
  }
  get reduceAnimation() {
    return this.hasAttribute("reduce-animation");
  }
  get removeAnimation() {
    return this.hasAttribute("remove-animation");
  }
  get animationSpeed() {
    const e = this.getAttribute("animation-speed");
    return e ? Number(e) : void 0;
  }
  get oscillateDistance() {
    const e = this.getAttribute("oscillate-distance");
    return e === null ? void 0 : e;
  }
  get staggeredDelay() {
    const e = this.getAttribute("staggered-delay");
    return e ? Number(e) : void 0;
  }
  get reducedAnimationSpeed() {
    const e = this.getAttribute("reduced-animation-speed");
    return e ? Number(e) : void 0;
  }
  get reducedOscillateDistance() {
    const e = this.getAttribute("reduced-oscillate-distance");
    return e === null ? void 0 : e;
  }
  get reducedStaggeredDelay() {
    const e = this.getAttribute("reduced-staggered-delay");
    return e ? Number(e) : void 0;
  }
  get effectiveReduceAnimation() {
    return this.reduceAnimation || this._mediaQuery.matches;
  }
  get gridSize() {
    return this.removeAnimation ? 5 : this.effectiveReduceAnimation ? 15 : 32;
  }
  get activeAnimationSpeed() {
    return this.effectiveReduceAnimation ? this.reducedAnimationSpeed !== void 0 ? this.reducedAnimationSpeed : 900 : this.animationSpeed !== void 0 ? this.animationSpeed : 600;
  }
  get activeOscillateDistance() {
    return this.effectiveReduceAnimation ? this.reducedOscillateDistance !== void 0 ? this.reducedOscillateDistance : "2%" : this.oscillateDistance !== void 0 ? this.oscillateDistance : "2%";
  }
  get activeStaggeredDelay() {
    return this.effectiveReduceAnimation ? this.reducedStaggeredDelay !== void 0 ? this.reducedStaggeredDelay : 35 : this.staggeredDelay !== void 0 ? this.staggeredDelay : 50;
  }
  get columnStructures() {
    const e = this.gridSize, c = [], l = 32;
    let a, i, s, r;
    e === 32 ? (a = [6, 25], i = [13, 18], s = [13, 18], r = [6, 25]) : e === 15 ? (a = [3, 11], i = [6, 8], s = [6, 8], r = [3, 11]) : (a = [1, 3], i = [2, 2], s = [2, 2], r = [1, 3]);
    const u = (t) => {
      if (e === 32) return 1;
      if (e === 5) return t === 1 || t === 3 ? 7 : 6;
      const n = Math.floor(t / 3);
      return n === 1 || n === 3 ? 7 / 3 : 2;
    }, g = (t, n) => {
      let o = 0;
      for (let d = t; d < n; d++)
        o += u(d);
      return o;
    };
    for (let t = 0; t < e; t++) {
      let n = -1, o = -1;
      const d = t >= s[0] && t <= s[1], p = t >= a[0] && t <= a[1];
      d ? (n = r[0], o = r[1]) : p && (n = i[0], o = i[1]);
      let h = null, m = null;
      if (n === -1)
        m = "red !important";
      else {
        const f = g(0, n), A = g(n, o + 1), v = f / l * 100, y = (f + A) / l * 100;
        h = `linear-gradient(to bottom, #ff0000 0% ${v}%, #ffffff ${v}% ${y}%, #ff0000 ${y}% 100%) !important`;
      }
      c.push({ width: u(t), singleColor: m, background: h });
    }
    return c;
  }
  render() {
    this.style.setProperty("--oscillate-distance", this.activeOscillateDistance), this.style.setProperty("--animation-speed", `${this.activeAnimationSpeed}ms`);
    const e = this.columnStructures, c = this.activeStaggeredDelay, l = this.gridSize, a = e.map((i, s) => `<div class="column" style="${[
      `animation-delay:${(s - l) * c}ms`,
      `flex:${i.width}`,
      i.singleColor ? `background-color:${i.singleColor}` : "",
      i.background ? `background:${i.background}` : ""
    ].filter(Boolean).join(";")}"></div>`).join("");
    this.shadowRoot.innerHTML = `<style>${b}</style><section class="flag${this.effectiveReduceAnimation ? " reduced-motion" : ""}${this.removeAnimation ? " no-animation" : ""}">${a}</section><slot></slot>`;
  }
}
customElements.define("swiss-flag", S);
export {
  S as SwissFlag
};
