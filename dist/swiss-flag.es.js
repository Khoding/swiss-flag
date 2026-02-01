class b extends HTMLElement {
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
    return this.oscillateDistance !== void 0 ? this.oscillateDistance : this.effectiveReduceAnimation ? "3%" : "2%";
  }
  get columnStructures() {
    const e = this.gridSize, l = [], d = 32;
    let a, s, i, r;
    e === 32 ? (a = [6, 25], s = [13, 18], i = [13, 18], r = [6, 25]) : e === 15 ? (a = [3, 11], s = [6, 8], i = [6, 8], r = [3, 11]) : (a = [1, 3], s = [2, 2], i = [2, 2], r = [1, 3]);
    const u = (t) => {
      if (e === 32) return 1;
      if (e === 5) return t === 1 || t === 3 ? 7 : 6;
      const n = Math.floor(t / 3);
      return n === 1 || n === 3 ? 7 / 3 : 2;
    }, m = (t, n) => {
      let o = 0;
      for (let c = t; c < n; c++)
        o += u(c);
      return o;
    };
    for (let t = 0; t < e; t++) {
      let n = -1, o = -1;
      const c = t >= i[0] && t <= i[1], A = t >= a[0] && t <= a[1];
      c ? (n = r[0], o = r[1]) : A && (n = s[0], o = s[1]);
      let h = null, g = null;
      if (n === -1)
        g = "red !important";
      else {
        const f = m(0, n), y = m(
          n,
          o + 1
        ), v = f / d * 100, p = (f + y) / d * 100;
        h = `linear-gradient(to bottom, #ff0000 0% ${v}%, #ffffff ${v}% ${p}%, #ff0000 ${p}% 100%) !important`;
      }
      l.push({ width: u(t), singleColor: g, background: h });
    }
    return l;
  }
  render() {
    const e = this.columnStructures, l = this.activeStaggeredDelay, d = this.gridSize, a = e.map((i, r) => `<div class="column" style="${[
      `animation-delay:${(r - d) * l}ms`,
      `flex:${i.width}`,
      i.singleColor ? `background-color:${i.singleColor}` : "",
      i.background ? `background:${i.background}` : ""
    ].filter(Boolean).join(";")}"></div>`).join(""), s = `
      :host {
        display: block;
        position: relative;
        --oscillate-distance: ${this.activeOscillateDistance};
        --animation-speed: ${this.activeAnimationSpeed}ms;
      }
      .flag {
        display: flex;
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
        isolation: isolate;
        color-scheme: only light;
        forced-color-adjust: none;
      }
      .flag.no-animation .column {
        animation: none;
      }
      .column {
        flex: 1;
        animation: oscillate var(--animation-speed) infinite alternate ease-in-out backwards;
        filter: none !important;
      }
      @keyframes oscillate {
        from { transform: translateY(var(--oscillate-distance)); }
        to { transform: translateY(calc(-1 * var(--oscillate-distance))); }
      }
    `;
    this.shadowRoot.innerHTML = `<style>${s.replace(/\s+/g, " ")}</style><section class="flag${this.effectiveReduceAnimation ? " reduced-motion" : ""}${this.removeAnimation ? " no-animation" : ""}">${a}</section><slot></slot>`;
  }
}
customElements.define("swiss-flag", b);
export {
  b as SwissFlag
};
