import Hls from 'hls.js';

export class Muxvideo {
  constructor(el) {
    this.container = el;
    if (!this.container) return;

    /**
     * Functions
     */
    this.init();
  }

  init() {
    const src = `https://stream.mux.com/${this.container.dataset.muxVideoplayer}.m3u8`;

    if (this.container.canPlayType('application/vnd.apple.mpegurl')) {
      this.container.src = src;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(this.container);
    } else {
      // eslint-disable-next-line no-console
      console.error("This is a legacy browser that doesn't support MSE");
    }
  }
}
