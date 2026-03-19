export interface GoogleFont {
  name: string
  category: "sans-serif" | "serif" | "monospace" | "display" | "handwriting"
  weights: number[]
}

export const GOOGLE_FONTS: GoogleFont[] = [
  // Sans-serif
  { name: "Inter", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "Roboto", category: "sans-serif", weights: [300, 400, 500, 700, 900] },
  { name: "Open Sans", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800] },
  { name: "Lato", category: "sans-serif", weights: [300, 400, 700, 900] },
  { name: "Montserrat", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "Poppins", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "Nunito", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "Raleway", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "Work Sans", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "Source Sans 3", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "DM Sans", category: "sans-serif", weights: [400, 500, 700] },
  { name: "Outfit", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "Manrope", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800] },
  { name: "Plus Jakarta Sans", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800] },
  { name: "Noto Sans", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "Ubuntu", category: "sans-serif", weights: [300, 400, 500, 700] },
  { name: "Rubik", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "Karla", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800] },
  { name: "Cabin", category: "sans-serif", weights: [400, 500, 600, 700] },
  { name: "Barlow", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "Mulish", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "Figtree", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "Geist", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "Lexend", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "Space Grotesk", category: "sans-serif", weights: [300, 400, 500, 600, 700] },

  // Serif
  { name: "Merriweather", category: "serif", weights: [300, 400, 700, 900] },
  { name: "Playfair Display", category: "serif", weights: [400, 500, 600, 700, 800, 900] },
  { name: "Lora", category: "serif", weights: [400, 500, 600, 700] },
  { name: "Noto Serif", category: "serif", weights: [400, 700] },
  { name: "PT Serif", category: "serif", weights: [400, 700] },
  { name: "Source Serif 4", category: "serif", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "Libre Baskerville", category: "serif", weights: [400, 700] },
  { name: "Crimson Pro", category: "serif", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "IBM Plex Serif", category: "serif", weights: [300, 400, 500, 600, 700] },
  { name: "Bitter", category: "serif", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "EB Garamond", category: "serif", weights: [400, 500, 600, 700, 800] },
  { name: "Cormorant Garamond", category: "serif", weights: [300, 400, 500, 600, 700] },
  { name: "Ibarra Real Nova", category: "serif", weights: [400, 500, 600, 700] },
  { name: "Spectral", category: "serif", weights: [300, 400, 500, 600, 700, 800] },
  { name: "Vollkorn", category: "serif", weights: [400, 500, 600, 700, 800, 900] },

  // Monospace
  { name: "JetBrains Mono", category: "monospace", weights: [300, 400, 500, 600, 700, 800] },
  { name: "Fira Code", category: "monospace", weights: [300, 400, 500, 600, 700] },
  { name: "Source Code Pro", category: "monospace", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "Roboto Mono", category: "monospace", weights: [300, 400, 500, 600, 700] },
  { name: "IBM Plex Mono", category: "monospace", weights: [300, 400, 500, 600, 700] },
  { name: "Space Mono", category: "monospace", weights: [400, 700] },
  { name: "Ubuntu Mono", category: "monospace", weights: [400, 700] },
  { name: "Geist Mono", category: "monospace", weights: [300, 400, 500, 600, 700, 800, 900] },
  { name: "Inconsolata", category: "monospace", weights: [300, 400, 500, 600, 700, 800, 900] },

  // Display
  { name: "Bebas Neue", category: "display", weights: [400] },
  { name: "Oswald", category: "display", weights: [300, 400, 500, 600, 700] },
  { name: "Abril Fatface", category: "display", weights: [400] },
  { name: "Righteous", category: "display", weights: [400] },
]
