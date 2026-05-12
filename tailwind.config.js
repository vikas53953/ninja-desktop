module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ninja: {
          bg: "#08110F",
          panel: "#0E1916",
          panel2: "#13231F",
          accent: "#1D9E75",
          soft: "#B9F7DF",
          danger: "#EF4444"
        }
      },
      boxShadow: {
        ninja: "0 20px 80px rgba(0, 0, 0, 0.45)"
      }
    }
  },
  plugins: []
};

