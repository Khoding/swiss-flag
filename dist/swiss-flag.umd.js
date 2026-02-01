(function(o,l){typeof exports=="object"&&typeof module<"u"?l(exports):typeof define=="function"&&define.amd?define(["exports"],l):(o=typeof globalThis<"u"?globalThis:o||self,l(o.SwissFlag={}))})(this,(function(o){"use strict";class l extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._mediaQuery=window.matchMedia("(prefers-reduced-motion: reduce)")}static get observedAttributes(){return["reduce-animation","animation-speed","oscillate-distance","staggered-delay","remove-animation"]}connectedCallback(){this._mediaQuery.addEventListener("change",()=>this.render()),this.render()}disconnectedCallback(){this._mediaQuery.removeEventListener("change",()=>this.render())}attributeChangedCallback(){this.render()}get reduceAnimation(){return this.hasAttribute("reduce-animation")}get removeAnimation(){return this.hasAttribute("remove-animation")}get animationSpeed(){const e=this.getAttribute("animation-speed");return e?Number(e):void 0}get oscillateDistance(){const e=this.getAttribute("oscillate-distance");return e===null?void 0:e}get staggeredDelay(){const e=this.getAttribute("staggered-delay");return e?Number(e):void 0}get effectiveReduceAnimation(){return this.reduceAnimation||this._mediaQuery.matches}get gridSize(){return this.removeAnimation?5:this.effectiveReduceAnimation?15:32}get activeStaggeredDelay(){return this.staggeredDelay!==void 0?this.staggeredDelay:this.effectiveReduceAnimation?35:50}get activeAnimationSpeed(){return this.animationSpeed!==void 0?this.animationSpeed:this.effectiveReduceAnimation?900:600}get activeOscillateDistance(){return this.oscillateDistance!==void 0?this.oscillateDistance:this.effectiveReduceAnimation?"3%":"2%"}get columnStructures(){const e=this.gridSize,u=[],m=32;let s,a,i,r;e===32?(s=[6,25],a=[13,18],i=[13,18],r=[6,25]):e===15?(s=[3,11],a=[6,8],i=[6,8],r=[3,11]):(s=[1,3],a=[2,2],i=[2,2],r=[1,3]);const f=t=>{if(e===32)return 1;if(e===5)return t===1||t===3?7:6;const n=Math.floor(t/3);return n===1||n===3?7/3:2},h=(t,n)=>{let c=0;for(let d=t;d<n;d++)c+=f(d);return c};for(let t=0;t<e;t++){let n=-1,c=-1;const d=t>=i[0]&&t<=i[1],b=t>=s[0]&&t<=s[1];d?(n=r[0],c=r[1]):b&&(n=a[0],c=a[1]);let g=null,v=null;if(n===-1)v="red !important";else{const p=h(0,n),S=h(n,c+1),y=p/m*100,A=(p+S)/m*100;g=`linear-gradient(to bottom, #ff0000 0% ${y}%, #ffffff ${y}% ${A}%, #ff0000 ${A}% 100%) !important`}u.push({width:f(t),singleColor:v,background:g})}return u}render(){const e=this.columnStructures,u=this.activeStaggeredDelay,m=this.gridSize,s=e.map((i,r)=>`<div class="column" style="${[`animation-delay:${(r-m)*u}ms`,`flex:${i.width}`,i.singleColor?`background-color:${i.singleColor}`:"",i.background?`background:${i.background}`:""].filter(Boolean).join(";")}"></div>`).join(""),a=`
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
    `;this.shadowRoot.innerHTML=`<style>${a.replace(/\s+/g," ")}</style><section class="flag${this.effectiveReduceAnimation?" reduced-motion":""}${this.removeAnimation?" no-animation":""}">${s}</section><slot></slot>`}}customElements.define("swiss-flag",l),o.SwissFlag=l,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})}));
