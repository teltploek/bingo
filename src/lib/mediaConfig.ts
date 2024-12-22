// src/lib/mediaConfig.ts

export type MediaConfig = {
  type: 'video' | 'gif' | 'youtube';
  url: string;
  start?: number; // Start time in seconds
  end?: number; // End time in seconds
  source?: 'local' | 'youtube'; // Specify the source of the video
  youtubeId?: string; // YouTube video ID if it's a YouTube video
};

export type IntroVideo = {
  youtubeId: string;
  start: number;
  end: number;
  description?: string;
};

export type PauseVideo = {
  youtubeId: string;
  start: number;
  end: number;
  description?: string;
};

export const pauseVideos: PauseVideo[] = [
  {
    youtubeId: 'Kl7v-kxN-bc',
    start: 259,
    end: 268,
    description: 'Så er der bingo!',
  },
  {
    youtubeId: '3_tgVpiWpxI',
    start: 251,
    end: 294,
    description: 'Så er der bingo!',
  },
  {
    youtubeId: 'WXyC-p07ftY',
    start: 476,
    end: 486,
    description: 'Så er der bingo!',
  },
];

export const introVideos: IntroVideo[] = [
  {
    youtubeId: '_hFCf0iw4iQ',
    start: 2,
    end: 4,
    description: 'Kanal O TV-Bingo Show',
  },
  {
    youtubeId: '_hFCf0iw4iQ',
    start: 13,
    end: 160,
    description: 'Kanal O TV-Bingo Show',
  },
  {
    youtubeId: 'DdwmZrCE-94',
    start: 10,
    end: 152,
    description: 'Kanal O TV-Bingo Show',
  },
  {
    youtubeId: 'tzTEdPMGvD8',
    start: 37,
    end: 152,
    description: 'Kanal O TV-Bingo Show',
  },
  {
    youtubeId: 'APst0D2cQYY',
    start: 13,
    end: 196,
    description: 'Kanal O TV-Bingo Show',
  },
];

export const mediaMapping: Record<number, MediaConfig> = {
  0: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 685,
    end: 688,
  },
  1: {
    type: 'youtube',
    youtubeId: 'Kl7v-kxN-bc',
    url: '',
    start: 114,
    end: 122,
  },
  2: {
    type: 'youtube',
    youtubeId: 'TEoGZ4ehjqo',
    url: '',
    start: 489,
    end: 495,
  },
  3: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 126,
    end: 131,
  },
  4: {
    type: 'youtube',
    youtubeId: 'kdjRx6-FRN4',
    url: '',
    start: 1946,
    end: 1953,
  },
  5: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 205,
    end: 212,
  },
  6: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 699,
    end: 707,
  },
  7: {
    type: 'youtube',
    youtubeId: 'kdjRx6-FRN4',
    url: '',
    start: 2845,
    end: 2853,
  },
  8: {
    type: 'youtube',
    youtubeId: 'LoDI4_3Q6sE',
    url: '',
    start: 1675,
    end: 1685,
  },
  9: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 237,
    end: 244,
  },
  10: {
    type: 'youtube',
    youtubeId: 'EgvJqRjBxNU',
    url: '',
    start: 3055,
    end: 3064,
  },
  11: {
    type: 'youtube',
    youtubeId: 'LoDI4_3Q6sE',
    url: '',
    start: 1501,
    end: 1511,
  },
  12: {
    type: 'video',
    url: '/media/videos/6.mp4',
    start: 175,
    end: 184,
  },
  13: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 104,
    end: 110,
  },
  14: {
    type: 'youtube',
    youtubeId: 'Kl7v-kxN-bc',
    url: '',
    start: 90,
    end: 99,
  },
  15: {
    type: 'youtube',
    youtubeId: 'kdjRx6-FRN4',
    url: '',
    start: 570,
    end: 580,
  },
  16: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 162,
    end: 172,
  },
  17: {
    type: 'youtube',
    youtubeId: 'TEoGZ4ehjqo',
    url: '',
    start: 593,
    end: 600,
  },
  18: {
    type: 'youtube',
    youtubeId: 'agkCInzJciQ',
    url: '',
    start: 437,
    end: 450,
  },
  19: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 220,
    end: 228,
  },
  20: {
    type: 'youtube',
    youtubeId: 'kdjRx6-FRN4',
    url: '',
    start: 604,
    end: 617,
  },
  21: {
    type: 'youtube',
    youtubeId: 'TEoGZ4ehjqo',
    url: '',
    start: 508,
    end: 515,
  },
  22: {
    type: 'youtube',
    youtubeId: 'LoDI4_3Q6sE',
    url: '',
    start: 1619,
    end: 1625,
  },
  23: {
    type: 'youtube',
    youtubeId: 'kdjRx6-FRN4',
    url: '',
    start: 518,
    end: 528,
  },
  24: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 807,
    end: 816,
  },
  25: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 715,
    end: 722,
  },
  26: {
    type: 'youtube',
    youtubeId: 'WEMh_v8uDkQ',
    url: '',
    start: 1964,
    end: 1978,
  },
  27: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 147,
    end: 154,
  },
  28: {
    type: 'youtube',
    youtubeId: 'agkCInzJciQ',
    url: '',
    start: 521,
    end: 531,
  },
  29: {
    type: 'video',
    url: '/media/videos/6.mp4',
    start: 218,
    end: 229,
  },
  30: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 816,
    end: 824,
  },
  31: {
    type: 'youtube',
    youtubeId: 'agkCInzJciQ',
    url: '',
    start: 2517,
    end: 2527,
  },
  32: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 111,
    end: 117,
  },
  33: {
    type: 'youtube',
    youtubeId: 'kdjRx6-FRN4',
    url: '',
    start: 1739,
    end: 1748,
  },
  34: {
    type: 'youtube',
    youtubeId: 'EgvJqRjBxNU',
    url: '',
    start: 2898,
    end: 2908,
  },
  35: {
    type: 'video',
    url: '/media/videos/6.mp4',
    start: 184,
    end: 195,
  },
  36: {
    type: 'youtube',
    youtubeId: 'TEoGZ4ehjqo',
    url: '',
    start: 499,
    end: 505,
  },
  37: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 213,
    end: 220,
  },
  38: {
    type: 'youtube',
    youtubeId: 'kdjRx6-FRN4',
    url: '',
    start: 2815,
    end: 2825,
  },
  39: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 707,
    end: 715,
  },
  40: {
    type: 'youtube',
    youtubeId: 'TEoGZ4ehjqo',
    url: '',
    start: 635,
    end: 642,
  },
  41: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 131,
    end: 138,
  },
  42: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 228,
    end: 236,
  },
  43: {
    type: 'youtube',
    youtubeId: 'ZtsvoWxvloM',
    url: '',
    start: 339,
    end: 353,
  },
  44: {
    type: 'youtube',
    youtubeId: '_hFCf0iw4iQ',
    url: '',
    start: 993,
    end: 1001,
  },
  45: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 746,
    end: 753,
  },
  46: {
    type: 'youtube',
    youtubeId: 'LoDI4_3Q6sE',
    url: '',
    start: 1600,
    end: 1610,
  },
  47: {
    type: 'youtube',
    youtubeId: 'LoDI4_3Q6sE',
    url: '',
    start: 2705,
    end: 2715,
  },
  48: {
    type: 'youtube',
    youtubeId: 'TEoGZ4ehjqo',
    url: '',
    start: 600,
    end: 608,
  },
  49: {
    type: 'video',
    url: '/media/videos/6.mp4',
    start: 272,
    end: 279,
  },
  50: {
    type: 'youtube',
    youtubeId: 'agkCInzJciQ',
    url: '',
    start: 419,
    end: 428,
  },
  51: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 766,
    end: 775,
  },
  52: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 139,
    end: 146,
  },
  53: {
    type: 'youtube',
    youtubeId: 'agkCInzJciQ',
    url: '',
    start: 2461,
    end: 2471,
  },
  54: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 197,
    end: 205,
  },
  55: {
    type: 'youtube',
    youtubeId: 'kdjRx6-FRN4',
    url: '',
    start: 4896,
    end: 4905,
  },
  56: {
    type: 'youtube',
    youtubeId: 'TEoGZ4ehjqo',
    url: '',
    start: 652,
    end: 659,
  },
  57: {
    type: 'youtube',
    youtubeId: 'LoDI4_3Q6sE',
    url: '',
    start: 383,
    end: 398,
  },
  58: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 830,
    end: 839,
  },
  59: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 244,
    end: 251,
  },
  60: {
    type: 'youtube',
    youtubeId: 'TEoGZ4ehjqo',
    url: '',
    start: 618,
    end: 627,
  },
  61: {
    type: 'youtube',
    youtubeId: 'kdjRx6-FRN4',
    url: '',
    start: 1932,
    end: 1942,
  },
  62: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 730,
    end: 737,
  },
  63: {
    type: 'video',
    url: '/media/videos/6.mp4',
    start: 161,
    end: 174,
  },
  64: {
    type: 'youtube',
    youtubeId: 'kdjRx6-FRN4',
    url: '',
    start: 552,
    end: 562,
  },
  65: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 172,
    end: 179,
  },
  66: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 839,
    end: 846,
  },
  67: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 798,
    end: 806,
  },
  68: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 119,
    end: 125,
  },
  69: {
    type: 'youtube',
    youtubeId: 'Kl7v-kxN-bc',
    url: '',
    start: 223,
    end: 233,
  },
  70: {
    type: 'youtube',
    youtubeId: 'kdjRx6-FRN4',
    url: '',
    start: 4844,
    end: 4852,
  },
  71: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 180,
    end: 187,
  },
  72: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 757,
    end: 765,
  },
  73: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 692,
    end: 699,
  },
  74: {
    type: 'youtube',
    youtubeId: '_hFCf0iw4iQ',
    url: '',
    start: 650,
    end: 659,
  },
  75: {
    type: 'youtube',
    youtubeId: 'kdjRx6-FRN4',
    url: '',
    start: 2861,
    end: 2872,
  },
  76: {
    type: 'youtube',
    youtubeId: 'TEoGZ4ehjqo',
    url: '',
    start: 660,
    end: 667,
  },
  77: {
    type: 'youtube',
    youtubeId: 'LoDI4_3Q6sE',
    url: '',
    start: 1562,
    end: 1578,
  },
  78: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 775,
    end: 784,
  },
  79: {
    type: 'youtube',
    youtubeId: 'agkCInzJciQ',
    url: '',
    start: 2497,
    end: 2506,
  },
  80: {
    type: 'youtube',
    youtubeId: 'Kl7v-kxN-bc',
    url: '',
    start: 99,
    end: 107,
  },
  81: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 823,
    end: 831,
  },
  82: {
    type: 'youtube',
    youtubeId: 'Kl7v-kxN-bc',
    url: '',
    start: 194,
    end: 204,
  },
  83: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 189,
    end: 197,
  },
  84: {
    type: 'youtube',
    youtubeId: 'TEoGZ4ehjqo',
    url: '',
    start: 583,
    end: 592,
  },
  85: {
    type: 'youtube',
    youtubeId: 'LoDI4_3Q6sE',
    url: '',
    start: 1578,
    end: 1600,
  },
  86: {
    type: 'youtube',
    youtubeId: 'TEoGZ4ehjqo',
    url: '',
    start: 627,
    end: 635,
  },
  87: {
    type: 'youtube',
    youtubeId: 'TEoGZ4ehjqo',
    url: '',
    start: 516,
    end: 524,
  },
  88: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 738,
    end: 747,
  },
  89: {
    type: 'youtube',
    youtubeId: '3_tgVpiWpxI',
    url: '',
    start: 784,
    end: 791,
  },
  90: {
    type: 'youtube',
    youtubeId: 'LoDI4_3Q6sE',
    url: '',
    start: 426,
    end: 439,
  },
};

// Preload function
export const preloadMedia = async () => {
  const preloadPromises = Object.values(mediaMapping).map((config) => {
    if (config.type === 'video') {
      return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.src = config.url;
        video.preload = 'auto';
        video.onloadeddata = () => resolve(true);
        video.onerror = reject;
      });
    } else {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = config.url;
        img.onload = () => resolve(true);
        img.onerror = reject;
      });
    }
  });

  try {
    await Promise.all(preloadPromises);
    console.log('All media preloaded successfully');
  } catch (error) {
    console.error('Error preloading media:', error);
  }
};
