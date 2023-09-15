const BASE_FONT_SIZE = 16;
const pxToRem = (px) => `${px / BASE_FONT_SIZE}rem`;

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      spacing: {
        125: pxToRem(500),
        150: pxToRem(600),
      },
    },
  },
};
