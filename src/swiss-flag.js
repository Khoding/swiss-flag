import styles from './swiss-flag.css?inline';

export class SwissFlag extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this._mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  }

  static get observedAttributes() {
    return [
      'reduce-animation',
      'remove-animation',
      'animation-speed',
      'oscillate-distance',
      'staggered-delay',
      'reduced-animation-speed',
      'reduced-oscillate-distance',
      'reduced-staggered-delay'
    ];
  }

  connectedCallback() {
    this._mediaQuery.addEventListener('change', () => this.render());
    this.render();
  }

  disconnectedCallback() {
    this._mediaQuery.removeEventListener('change', () => this.render());
  }

  attributeChangedCallback() {
    this.render();
  }

  get reduceAnimation() {
    return this.hasAttribute('reduce-animation');
  }

  get removeAnimation() {
    return this.hasAttribute('remove-animation');
  }

  get animationSpeed() {
    const val = this.getAttribute('animation-speed');
    return val ? Number(val) : undefined;
  }

  get oscillateDistance() {
    const val = this.getAttribute('oscillate-distance');
    return val === null ? undefined : val;
  }

  get staggeredDelay() {
    const val = this.getAttribute('staggered-delay');
    return val ? Number(val) : undefined;
  }

  get reducedAnimationSpeed() {
    const val = this.getAttribute('reduced-animation-speed');
    return val ? Number(val) : undefined;
  }

  get reducedOscillateDistance() {
    const val = this.getAttribute('reduced-oscillate-distance');
    return val === null ? undefined : val;
  }

  get reducedStaggeredDelay() {
    const val = this.getAttribute('reduced-staggered-delay');
    return val ? Number(val) : undefined;
  }

  get effectiveReduceAnimation() {
    return this.reduceAnimation || this._mediaQuery.matches;
  }

  get gridSize() {
    if (this.removeAnimation) return 5;
    if (!this.effectiveReduceAnimation) return 32;
    return 15;
  }

  get activeAnimationSpeed() {
    if (this.effectiveReduceAnimation) {
      return this.reducedAnimationSpeed !== undefined
        ? this.reducedAnimationSpeed
        : 900;
    }
    return this.animationSpeed !== undefined ? this.animationSpeed : 600;
  }

  get activeOscillateDistance() {
    if (this.effectiveReduceAnimation) {
      return this.reducedOscillateDistance !== undefined
        ? this.reducedOscillateDistance
        : '2%';
    }
    return this.oscillateDistance !== undefined ? this.oscillateDistance : '2%';
  }

  get activeStaggeredDelay() {
    if (this.effectiveReduceAnimation) {
      return this.reducedStaggeredDelay !== undefined
        ? this.reducedStaggeredDelay
        : 35;
    }
    return this.staggeredDelay !== undefined ? this.staggeredDelay : 50;
  }

  get columnStructures() {
    const size = this.gridSize;
    const columns = [];
    const TOTAL_HEIGHT_UNITS = 32;

    let horizontalArmX, horizontalArmY, verticalArmX, verticalArmY;

    if (size === 32) {
      horizontalArmX = [6, 25];
      horizontalArmY = [13, 18];
      verticalArmX = [13, 18];
      verticalArmY = [6, 25];
    } else if (size === 15) {
      horizontalArmX = [3, 11];
      horizontalArmY = [6, 8];
      verticalArmX = [6, 8];
      verticalArmY = [3, 11];
    } else {
      horizontalArmX = [1, 3];
      horizontalArmY = [2, 2];
      verticalArmX = [2, 2];
      verticalArmY = [1, 3];
    }

    const getColumnWeight = columnIndex => {
      if (size === 32) return 1;
      if (size === 5) return columnIndex === 1 || columnIndex === 3 ? 7 : 6;

      const sectionIndex = Math.floor(columnIndex / 3);
      return sectionIndex === 1 || sectionIndex === 3 ? 7 / 3 : 2;
    };

    const calculateHeightWeight = (startUnit, endUnit) => {
      let weightSum = 0;
      for (let i = startUnit; i < endUnit; i++) {
        weightSum += getColumnWeight(i);
      }
      return weightSum;
    };

    for (let x = 0; x < size; x++) {
      let whiteStripeStart = -1,
        whiteStripeEnd = -1;
      const isVerticalArm = x >= verticalArmX[0] && x <= verticalArmX[1];
      const isHorizontalArm = x >= horizontalArmX[0] && x <= horizontalArmX[1];

      if (isVerticalArm) {
        whiteStripeStart = verticalArmY[0];
        whiteStripeEnd = verticalArmY[1];
      } else if (isHorizontalArm) {
        whiteStripeStart = horizontalArmY[0];
        whiteStripeEnd = horizontalArmY[1];
      }

      let background = null,
        singleColor = null;

      if (whiteStripeStart === -1) {
        singleColor = 'red !important';
      } else {
        const topRedHeight = calculateHeightWeight(0, whiteStripeStart);
        const whiteHeight = calculateHeightWeight(
          whiteStripeStart,
          whiteStripeEnd + 1
        );
        const whiteStartPercent = (topRedHeight / TOTAL_HEIGHT_UNITS) * 100;
        const whiteEndPercent =
          ((topRedHeight + whiteHeight) / TOTAL_HEIGHT_UNITS) * 100;

        background = `linear-gradient(to bottom, #ff0000 0% ${whiteStartPercent}%, #ffffff ${whiteStartPercent}% ${whiteEndPercent}%, #ff0000 ${whiteEndPercent}% 100%) !important`;
      }

      columns.push({width: getColumnWeight(x), singleColor, background});
    }
    return columns;
  }

  render() {
    this.style.setProperty(
      '--oscillate-distance',
      this.activeOscillateDistance
    );
    this.style.setProperty(
      '--animation-speed',
      `${this.activeAnimationSpeed}ms`
    );

    const structures = this.columnStructures;
    const staggered = this.activeStaggeredDelay;
    const size = this.gridSize;

    const columnsHtml = structures
      .map((col, index) => {
        const delay = (index - size) * staggered;

        const styles = [
          `animation-delay:${delay}ms`,
          `flex:${col.width}`,
          col.singleColor ? `background-color:${col.singleColor}` : '',
          col.background ? `background:${col.background}` : ''
        ]
          .filter(Boolean)
          .join(';');

        return `<div class="column" style="${styles}"></div>`;
      })
      .join('');

    this.shadowRoot.innerHTML = `<style>${styles}</style><section class="flag${
      this.effectiveReduceAnimation ? ' reduced-motion' : ''
    }${this.removeAnimation ? ' no-animation' : ''}">${columnsHtml}</section><slot></slot>`;
  }
}

customElements.define('swiss-flag', SwissFlag);
