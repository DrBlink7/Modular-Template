import { createTheme } from "@mui/material"
import { mainColor, secondaryColor } from "../Utils/config"

export const getViewport = () => ({
  width: 1440,
  height: 900
})
export const theme = createTheme({
  palette: {
    primary: {
      main: mainColor
    },
    secondary: {
      main: secondaryColor
    }
  }
})

export const rgbToHex = (r: number, g: number, b: number): string =>
  "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  return result
    ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
    : 'rgb(255, 255, 255)'
}
