import { define, Component } from '@xinix/xin';

import './css/lazy-img.css';

const URL = window.URL;
const location = window.location;

let defaultSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const observers = new WeakMap();

const { IntersectionObserver } = window;
const loaded = {};

export class LazyImg extends Component {
  static async setDefaultFallbackSrc (src) {
    if (await prefetchImage(src)) {
      defaultSrc = src;
    }
  }

  get props () {
    return Object.assign({}, super.props, {
      src: {
        type: String,
        observer: '_srcChanged',
      },

      fallbackSrc: {
        type: String,
      },

      root: {
        type: String,
        value: '',
      },
    });
  }

  async attached () {
    await super.attached();

    this.fallbackImg = createImage(await prefetchImage(this.fallbackSrc) ? this.fallbackSrc : defaultSrc);
    if (!this.img) {
      this.appendChild(this.fallbackImg);
      this._observe();
    }
  }

  detached () {
    super.detached();

    this.unobserve();
  }

  _observe () {
    if (this.observer) {
      return;
    }

    this.observer = getObserver(this.root);
    this.observer.observe(this);
  }

  _unobserve () {
    if (!this.observer) {
      return;
    }
    this.observer.unobserve(this);
    this.observer = null;
  }

  async _show () {
    this._unobserve();

    if (await prefetchImage(this.src)) {
      this.img = createImage(this.src);
      this.removeChild(this.fallbackImg);
      this.appendChild(this.img);
    } else {
      if (this.img) {
        this.removeChild(this.img);
        this.img = null;
      }
      this.appendChild(this.fallbackImg);
    }
  }

  _srcChanged (src) {
    if (this.fallbackImg) {
      this._observe();
    }
  }
}

define('xin-lazy-img', LazyImg);

function prefetchImage (src) {
  if (!src) {
    return false;
  }

  let href = new URL(src, location.href).href;

  if (!loaded[href]) {
    return new Promise(resolve => {
      let loader = {
        status: 0,
        resolvers: [ resolve ],
      };
      loaded[href] = loader;

      let img = document.createElement('img');
      img.onload = () => {
        loader.status = 1;
        loader.resolvers.forEach(resolve => resolve(true));
      };
      img.onerror = () => {
        loader.status = 2;
        loader.resolvers.forEach(resolve => resolve(false));
      };
      img.src = href;
    });
  } else {
    let loader = loaded[href];
    if (loader.status === 0) {
      return new Promise(resolve => {
        loader.resolvers.push(resolve);
      });
    } else if (loader.status === 1) {
      return true;
    } else {
      return false;
    }
  }
}

function createImage (src) {
  let img = document.createElement('img');
  img.src = src;
  return img;
}

function getObserver (selector) {
  let root = selector ? document.querySelector(selector) : null;
  let rootKey = root || document;
  if (observers.has(rootKey)) {
    return observers.get(rootKey);
  }

  let rootMargin = '0px';
  let threshold = [ 0 ];
  let observer = new IntersectionObserver(observerCallback, { root, rootMargin, threshold });
  observers.set(rootKey, observer);
  return observer;
}

function observerCallback (entries) {
  entries.forEach(entry => {
    let lazyImg = entry.target;
    if (entry.isIntersecting) {
      lazyImg._show();
    }
  });
}
