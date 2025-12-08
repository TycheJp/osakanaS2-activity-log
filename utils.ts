/**
 * Generates a unique pastel background color based on a string input.
 * The color will always be very light (high lightness) and low saturation
 * to ensure black text is readable and the design remains "calm".
 */
export const generatePastelColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Hue: 0-360 (Full spectrum)
  // Saturation: 20-35% (Low saturation for calm/chic look)
  // Lightness: 90-96% (Very high lightness for pale background)
  const h = Math.abs(hash % 360);
  const s = 25 + (Math.abs(hash) % 15); 
  const l = 90 + (Math.abs(hash) % 8); 

  return `hsl(${h}, ${s}%, ${l}%)`;
};

/**
 * Maps the XML color string to Tailwind text color classes.
 * Uses deep, muted tones instead of default bright colors.
 */
export const getDateColorClass = (color: string): string => {
  switch (color) {
    case 'red':
      return 'text-red-900/80';
    case 'blue':
      return 'text-blue-900/80';
    case 'black':
    default:
      return 'text-gray-500'; // Muted gray instead of pure black for date
  }
};