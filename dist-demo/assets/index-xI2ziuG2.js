(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function c(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(e){if(e.ep)return;e.ep=!0;const i=c(e);fetch(e.href,i)}})();class S extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._mediaQuery=window.matchMedia("(prefers-reduced-motion: reduce)")}static get observedAttributes(){return["reduce-animation","animation-speed","oscillate-distance","staggered-delay","remove-animation"]}connectedCallback(){this._mediaQuery.addEventListener("change",()=>this.render()),this.render()}disconnectedCallback(){this._mediaQuery.removeEventListener("change",()=>this.render())}attributeChangedCallback(){this.render()}get reduceAnimation(){return this.hasAttribute("reduce-animation")}get removeAnimation(){return this.hasAttribute("remove-animation")}get animationSpeed(){const t=this.getAttribute("animation-speed");return t?Number(t):void 0}get oscillateDistance(){const t=this.getAttribute("oscillate-distance");return t===null?void 0:t}get staggeredDelay(){const t=this.getAttribute("staggered-delay");return t?Number(t):void 0}get effectiveReduceAnimation(){return this.reduceAnimation||this._mediaQuery.matches}get gridSize(){return this.removeAnimation?5:this.effectiveReduceAnimation?15:32}get activeStaggeredDelay(){return this.staggeredDelay!==void 0?this.staggeredDelay:this.effectiveReduceAnimation?35:50}get activeAnimationSpeed(){return this.animationSpeed!==void 0?this.animationSpeed:this.effectiveReduceAnimation?900:600}get activeOscillateDistance(){return this.oscillateDistance!==void 0?this.oscillateDistance:this.effectiveReduceAnimation?"3%":"2%"}get columnStructures(){const t=this.gridSize,c=[],o=32;let e,i,n,a;t===32?(e=[6,25],i=[13,18],n=[13,18],a=[6,25]):t===15?(e=[3,11],i=[6,8],n=[6,8],a=[3,11]):(e=[1,3],i=[2,2],n=[2,2],a=[1,3]);const u=r=>{if(t===32)return 1;if(t===5)return r===1||r===3?7:6;const s=Math.floor(r/3);return s===1||s===3?7/3:2},m=(r,s)=>{let l=0;for(let d=r;d<s;d++)l+=u(d);return l};for(let r=0;r<t;r++){let s=-1,l=-1;const d=r>=n[0]&&r<=n[1],A=r>=e[0]&&r<=e[1];d?(s=a[0],l=a[1]):A&&(s=i[0],l=i[1]);let f=null,h=null;if(s===-1)h="red !important";else{const g=m(0,s),b=m(s,l+1),p=g/o*100,v=(g+b)/o*100;f=`linear-gradient(to bottom, #ff0000 0% ${p}%, #ffffff ${p}% ${v}%, #ff0000 ${v}% 100%) !important`}c.push({width:u(r),singleColor:h,background:f})}return c}render(){const t=this.columnStructures,c=this.activeStaggeredDelay,o=this.gridSize,e=t.map((n,a)=>`<div class="column" style="${[`animation-delay:${(a-o)*c}ms`,`flex:${n.width}`,n.singleColor?`background-color:${n.singleColor}`:"",n.background?`background:${n.background}`:""].filter(Boolean).join(";")}"></div>`).join(""),i=`
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
    `;this.shadowRoot.innerHTML=`<style>${i.replace(/\s+/g," ")}</style><section class="flag${this.effectiveReduceAnimation?" reduced-motion":""}${this.removeAnimation?" no-animation":""}">${e}<slot></slot></section>`}}customElements.define("swiss-flag",S);
