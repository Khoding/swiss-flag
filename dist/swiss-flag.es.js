const b = ":host{display:block;position:relative}.flag{aspect-ratio:1;isolation:isolate;--lightningcss-light:initial;--lightningcss-dark: ;--lightningcss-light:initial;--lightningcss-dark: ;color-scheme:light only;forced-color-adjust:none;display:flex}.flag.no-animation .column{animation:none}.column{animation:oscillate var(--animation-speed) infinite alternate ease-in-out backwards;filter:none!important}@keyframes oscillate{0%{transform:translateY(var(--oscillate-distance))}to{transform:translateY(calc(-1 * var(--oscillate-distance)))}}";
class S extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this._mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  }
  static get observedAttributes() {
    return [
      "reduce-animation",
      "animation-speed",
      "oscillate-distance",
      "staggered-delay",
      "remove-animation"
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
  get effectiveReduceAnimation() {
    return this.reduceAnimation || this._mediaQuery.matches;
  }
  get gridSize() {
    return this.removeAnimation ? 5 : this.effectiveReduceAnimation ? 15 : 32;
  }
  get activeStaggeredDelay() {
    return this.staggeredDelay !== void 0 ? this.staggeredDelay : this.effectiveReduceAnimation ? 35 : 50;
  }
  get activeAnimationSpeed() {
    return this.animationSpeed !== void 0 ? this.animationSpeed : this.effectiveReduceAnimation ? 900 : 600;
  }
  get activeOscillateDistance() {
    return this.oscillateDistance !== void 0 ? this.oscillateDistance : "2%";
  }
  get columnStructures() {
    const e = this.gridSize, c = [], d = 32;
    let s, i, a, r;
    e === 32 ? (s = [6, 25], i = [13, 18], a = [13, 18], r = [6, 25]) : e === 15 ? (s = [3, 11], i = [6, 8], a = [6, 8], r = [3, 11]) : (s = [1, 3], i = [2, 2], a = [2, 2], r = [1, 3]);
    const u = (t) => {
      if (e === 32) return 1;
      if (e === 5) return t === 1 || t === 3 ? 7 : 6;
      const n = Math.floor(t / 3);
      return n === 1 || n === 3 ? 7 / 3 : 2;
    }, m = (t, n) => {
      let o = 0;
      for (let l = t; l < n; l++)
        o += u(l);
      return o;
    };
    for (let t = 0; t < e; t++) {
      let n = -1, o = -1;
      const l = t >= a[0] && t <= a[1], p = t >= s[0] && t <= s[1];
      l ? (n = r[0], o = r[1]) : p && (n = i[0], o = i[1]);
      let h = null, g = null;
      if (n === -1)
        g = "red !important";
      else {
        const f = m(0, n), A = m(
          n,
          o + 1
        ), v = f / d * 100, y = (f + A) / d * 100;
        h = `linear-gradient(to bottom, #ff0000 0% ${v}%, #ffffff ${v}% ${y}%, #ff0000 ${y}% 100%) !important`;
      }
      c.push({ width: u(t), singleColor: g, background: h });
    }
    return c;
  }
  render() {
    this.style.setProperty(
      "--oscillate-distance",
      this.activeOscillateDistance
    ), this.style.setProperty(
      "--animation-speed",
      `${this.activeAnimationSpeed}ms`
    );
    const e = this.columnStructures, c = this.activeStaggeredDelay, d = this.gridSize, s = e.map((i, a) => `<div class="column" style="${[
      `animation-delay:${(a - d) * c}ms`,
      `flex:${i.width}`,
      i.singleColor ? `background-color:${i.singleColor}` : "",
      i.background ? `background:${i.background}` : ""
    ].filter(Boolean).join(";")}"></div>`).join("");
    this.shadowRoot.innerHTML = `<style>${b}</style><section class="flag${this.effectiveReduceAnimation ? " reduced-motion" : ""}${this.removeAnimation ? " no-animation" : ""}">${s}</section><slot></slot>`;
  }
}
customElements.define("swiss-flag", S);
export {
  S as SwissFlag
};
