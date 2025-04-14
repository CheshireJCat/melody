import * as Tone from 'tone';

type Note = Tone.Unit.Frequency;

type SynthType =
  | typeof Tone.Synth
  | typeof Tone.AMSynth
  | typeof Tone.FMSynth
  | typeof Tone.MonoSynth;

interface PlayOptions {
  notes: Note | Note[];
  duration: Tone.Unit.Time;
  time?: Tone.Unit.Time;
  velocity?: Tone.Unit.NormalRange;
  usePiano?: boolean; // 是否使用钢琴音色
  synthType?: SynthType; // 替代钢琴的合成器类型
  effects?: Tone.AudioNode[];
}

export class ChordPlayer {
  private started = false;
  private piano: Tone.Sampler | null = null;

  // 初始化音频上下文 + 钢琴采样
  async init() {
    if (!this.started) {
      await Tone.start();
      this.started = true;

      this.piano = new Tone.Sampler({
        urls: {
          C4: 'C4.mp3',
          'D#4': 'Ds4.mp3',
          'F#4': 'Fs4.mp3',
          A4: 'A4.mp3'
        },
        release: 1,
        baseUrl: 'https://tonejs.github.io/audio/salamander/'
      }).toDestination();

      console.log('init', this.piano);
    }
  }

  // 播放音符或和弦
  async play(options: PlayOptions) {
    const {
      notes,
      duration,
      time,
      velocity,
      usePiano = true,
      synthType = Tone.Synth,
      effects = []
    } = options;

    const isChord = Array.isArray(notes);
    const now = Tone.now();
    const playTime = time ?? now;

    if (usePiano && this.piano) {
      // 用钢琴音色播放
      if (isChord) {
        notes.forEach(note =>
          this.piano!.triggerAttackRelease(note, duration, playTime, velocity)
        );
      } else {
        this.piano.triggerAttackRelease(notes, duration, playTime, velocity);
      }
    } else {
      // 使用合成器播放
      const destination = effects.reduce(
        (chain, effect) => chain.connect(effect),
        Tone.Destination
      );

      const synth = isChord
        ? new Tone.PolySynth().connect(destination)
        : new synthType().connect(destination);

      if (Tone.isArray(notes)) {
        notes.forEach(note => {
          synth.triggerAttackRelease(note, duration, playTime, velocity);
        });
      } else {
        // 如果是单音符，直接播放
        synth.triggerAttackRelease(notes, duration, playTime, velocity);
      }
    }
  }

  dispose() {
    // 释放音频上下文和钢琴采样
    if (this.piano) {
      this.piano.dispose();
      this.piano = null;
    }
  }
}
