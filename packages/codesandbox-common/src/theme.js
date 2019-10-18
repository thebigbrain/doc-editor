import memoizeOne from 'memoize-one'
import Color from 'color'
import codesandbox from './themes/codesandbox.json'

const colorMethods = [
  'negate',
  'lighten',
  'darken',
  'saturate',
  'desaturate',
  'greyscale',
  'whiten',
  'blacken',
  'fade',
  'opaquer',
  'rotate',
]
/**
 * Takes a selector that returns a color string and returns new decorated selector that calls the
 * original function to get the color and then modifies that color, ultimately returning another
 * color string.
 *
 * vy60q8l043
 */
const addModifier = (fn, method, ...modifierArgs) => (...args) => {
  return Color(fn(...args))[method](...modifierArgs).string()
}
/**
 * Add useful methods directly to selector function, as well as put an string() call at the end
 * @param selector
 */
export const decorateSelector = (selector) => {
  // add member functions to our selector
  colorMethods.forEach(method => {
    selector[method] = memoizeOne((...args) => decorateSelector(addModifier(selector, method, ...args)))
  })
  selector['clearer'] = selector['fade']
  return selector
}

function createTheme(colors) {
  const transformed = Object.keys(colors)
    .map(c => ({key: c, value: colors[c]}))
    .map(({key, value}) => ({key, value: decorateSelector(() => value)}))
    .reduce((prev, {key, value}) => ({...prev, [key]: value}), {})
  return transformed
}

const theme = {
  ...createTheme({
    background: '#24282A',
    background2: '#1C2022',
    background3: '#374140',
    background4: '#141618',
    background5: '#111518',
    primary: '#FFD399',
    primaryText: '#7F694C',
    lightText: '#F2F2F2',
    secondary: '#40A9F3',
    shySecondary: '#66b9f4',
    darkBlue: '#1081D0',
    white: '#E0E0E0',
    gray: '#C0C0C0',
    black: '#74757D',
    green: '#5da700',
    redBackground: '#400000',
    red: '#F27777',
    dangerBackground: '#DC3545',
    sidebar: '#191d1f',
    placeholder: '#B8B9BA',
    link: '#40a9f3',
  }),
  vscodeTheme: codesandbox,
  new: createTheme({
    title: '#EEEEFF',
    description: '#777788',
    bg: '#2B2E41',
  }),
}
export default theme
