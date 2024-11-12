export const SGR = {
    reset: 0,
    bold: 1,
    dim: 2,
    fgBlue: 34,
    bg256: 48,
    bgRGB: 48,
    color256: 5,
    rgb: 2
};

export const ANSI = {
    reset: `\x1B[${SGR.reset}m`,
    bold: `\x1B[${SGR.bold}m`,
    dim: `\x1B[${SGR.dim}m`,
    blue: `\x1B[${SGR.fgBlue}m`,
    bgRGB: (r, g, b) => `\x1B[${SGR.bgRGB};${SGR.rgb};${r};${g};${b}m`,
    bg256: (code) => `\x1B[${SGR.bg256};${SGR.color256};${code}m`
};
