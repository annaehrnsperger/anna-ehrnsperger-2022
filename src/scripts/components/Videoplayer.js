import gsap from 'gsap';
import { secondsToMinutes, select } from '../utils/helper';
import { detectBrowser } from '../utils/detectBrowser';

export class Videoplayer {
  constructor(player) {
    this.container = player;
    if (!this.container) return;

    /**
     * Elements
     */
    this.player = {
      video: select('video', this.container),
      controls: select('[data-controls]', this.container),
      progress: select('[data-progress]', this.container),
      filledProgress: select('[data-progress-filled]', this.container),
      time: select('[data-time]', this.container),
      playBtn: select('[data-play-btn]', this.container),
      muteBtn: select('[data-mute-btn]', this.container),
      fullBtn: select('[data-fullscreen-btn]', this.container),
      loading: select('[data-loading]', this.container),
    };

    /**
     * State
     */
    this.state = {
      play: true,
      loading: true,
      muted: true,
    };

    /**
     * Events
     */
    this.handlePlay = this.handlePlay.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.handleFull = this.handleFull.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.scrub = this.scrub.bind(this);

    /**
     * Functions
     */
    this.init();
  }

  init() {
    this.player.video[this.state.play ? 'play' : 'pause']();
    this.player.playBtn.textContent = this.state.play ? 'Pause' : 'Play';

    this.events();
  }

  scrub(e) {
    const { duration } = this.player.video;
    const scrubTime = (e.offsetX / e.target.offsetWidth) * duration;

    this.player.video.currentTime = scrubTime;
  }

  updateTime() {
    const { duration, currentTime } = this.player.video;

    this.player.time.textContent = ` ${secondsToMinutes(currentTime)} /
    ${secondsToMinutes(duration)}`;
  }

  fillProgress() {
    const { duration, currentTime } = this.player.video;

    const progressWidth = (currentTime / duration) * 100;
    this.player.filledProgress.style.width = `${progressWidth}%`;
  }

  handlePlay() {
    this.state.play = !this.state.play;
    this.player.video[this.state.play ? 'play' : 'pause']();
    this.player.playBtn.textContent = this.state.play ? 'Pause' : 'Play';
  }

  handleMute() {
    this.state.muted = !this.state.muted;

    this.player.video.muted = this.state.muted;
    this.player.muteBtn.textContent = this.state.muted ? 'Unmute' : 'Mute';
  }

  handleFull() {
    const { isSafari } = detectBrowser();

    if (isSafari) {
      this.container.webkitRequestFullscreen();
    } else {
      this.container.requestFullscreen();
    }
  }

  onLoading() {
    const checkLoaded = setInterval(() => {
      if (this.player.video.readyState >= 3) {
        gsap.to(this.container, { pointerEvents: 'all' });

        gsap.to(this.player.controls, { autoAlpha: 1 });
        gsap.to(this.player.loading, { autoAlpha: 0 });

        clearInterval(checkLoaded);
      } else {
        gsap.to(this.container, { pointerEvents: 'none' });

        gsap.to(this.player.controls, { autoAlpha: 0 });
        gsap.to(this.player.loading, { autoAlpha: 1 });
      }
    }, 500);
  }

  events() {
    this.onLoading();
    this.player.progress.addEventListener('click', this.scrub);
    this.player.progress.addEventListener('move', this.scrub);
    this.player.video.addEventListener('timeupdate', () => {
      this.updateTime();
      this.fillProgress();
    });
    this.player.video.addEventListener('loadedmetadata', this.updateTime);
    this.player.video.addEventListener('click', this.handlePlay);
    this.player.playBtn.addEventListener('click', this.handlePlay);
    this.player.muteBtn.addEventListener('click', this.handleMute);
    this.player.fullBtn.addEventListener('click', this.handleFull);
  }
}
