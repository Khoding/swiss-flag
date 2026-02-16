const S = ":host{display:block;position:relative}.flag-container{aspect-ratio:1;isolation:isolate;forced-color-adjust:none;--lightningcss-light:initial;--lightningcss-dark: ;--lightningcss-light:initial;--lightningcss-dark: ;color-scheme:light only;position:relative}.static-flag{top:var(--oscillate-distance);right:0;bottom:var(--oscillate-distance);display:flex;position:absolute;left:0}.static-flag .column{animation:none}.flag{block-size:100%;display:flex;position:relative}.flag.no-animation .column{animation:none}.column{animation:oscillate var(--animation-speed) infinite alternate ease-in-out backwards;filter:none!important}@keyframes oscillate{0%{transform:translateY(var(--oscillate-distance))}to{transform:translateY(calc(-1 * var(--oscillate-distance)))}}";
class $ extends HTMLElement {
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
  getColumnStructures(e) {
    const a = e !== void 0 ? e : this.gridSize, g = [], m = 32;
    let l, r, s, o;
    a === 32 ? (l = [6, 25], r = [13, 18], s = [13, 18], o = [6, 25]) : a === 15 ? (l = [3, 11], r = [6, 8], s = [6, 8], o = [3, 11]) : (l = [1, 3], r = [2, 2], s = [2, 2], o = [1, 3]);
    const t = (i) => {
      if (a === 32) return 1;
      if (a === 5) return i === 1 || i === 3 ? 7 : 6;
      const n = Math.floor(i / 3);
      return n === 1 || n === 3 ? 7 / 3 : 2;
    }, d = (i, n) => {
      let c = 0;
      for (let u = i; u < n; u++)
        c += t(u);
      return c;
    };
    for (let i = 0; i < a; i++) {
      let n = -1, c = -1;
      const u = i >= s[0] && i <= s[1], b = i >= l[0] && i <= l[1];
      u ? (n = o[0], c = o[1]) : b && (n = r[0], c = r[1]);
      let h = null, f = null;
      if (n === -1)
        f = "red !important";
      else {
        const v = d(0, n), A = d(n, c + 1), p = v / m * 100, y = (v + A) / m * 100;
        h = `linear-gradient(to bottom, #ff0000 0% ${p}%, #ffffff ${p}% ${y}%, #ff0000 ${y}% 100%) !important`;
      }
      g.push({ width: t(i), singleColor: f, background: h });
    }
    return g;
  }
  render() {
    this.style.setProperty("--oscillate-distance", this.activeOscillateDistance), this.style.setProperty("--animation-speed", `${this.activeAnimationSpeed}ms`);
    const e = this.getColumnStructures(), a = this.activeStaggeredDelay, g = this.gridSize, m = e.map((t, d) => `<div class="column" style="${[
      `animation-delay:${(d - g) * a}ms`,
      `flex:${t.width}`,
      t.singleColor ? `background-color:${t.singleColor}` : "",
      t.background ? `background:${t.background}` : ""
    ].filter(Boolean).join(";")}"></div>`).join(""), r = this.getColumnStructures(5).map((t) => `<div class="column" style="${[
      `flex:${t.width}`,
      t.singleColor ? `background-color:${t.singleColor}` : "",
      t.background ? `background:${t.background}` : ""
    ].filter(Boolean).join(";")}"></div>`).join(""), s = this.removeAnimation, o = `flag${this.effectiveReduceAnimation ? " reduced-motion" : ""}${s ? " no-animation" : ""}`;
    this.shadowRoot.innerHTML = `<style>${S}</style><div class="flag-container">${s ? "" : `<section class="static-flag">${r}</section>`}<section class="${o}">${m}</section></div><slot></slot>`;
  }
}
customElements.define("swiss-flag", $);
export {
  $ as SwissFlag
};
