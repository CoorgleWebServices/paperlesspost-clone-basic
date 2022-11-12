const plugin = require("tailwindcss/plugin");

const rotateX = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-x-0": {
      transform: "rotateX(0deg)",
    },
    ".rotate-x-40": {
      transform: "rotateX(40deg)",
    },
    ".rotate-x-90": {
      transform: "rotateX(90deg)",
    },
    ".-rotate-x-179": {
      transform: "rotateX(-179deg)",
    },
    ".rotate-y-60": {
      transform: "rotateY(60deg)",
    },
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
  });
});

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    ".backface-visible": {
      "backface-visibility": "visible",
    },
    ".backface-hidden": {
      "backface-visibility": "hidden",
    },
  });
});

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
      },
    },
  },
  plugins: [rotateX, backfaceVisibility],
};
