import { Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const BOARD_WIDTH = SCREEN_WIDTH * 0.76
const BOARD_HEIGHT = SCREEN_HEIGHT * 0.7
const BOARD_POS_BASIC = 25
const BOARD_RIGHT = SCREEN_WIDTH / 2 - BOARD_WIDTH / 2
const BOARD_TOP = SCREEN_HEIGHT / 2 - BOARD_HEIGHT / 2 - SCREEN_HEIGHT * 0.04
const ICON_SIZE = 60
const SCENE_ICON_SIZE = 50
const BOX_ICON_SIZE = 70

const COUNT_WIDTH = 160
const COUNT_HEIGHT = 240
const COUNT_RIGHT = SCREEN_WIDTH / 2 - COUNT_WIDTH / 2 - 100
const COUNT_TOP = SCREEN_HEIGHT / 2 - COUNT_HEIGHT / 2 - SCREEN_HEIGHT * 0.06

const PANE_WIDTH = 1406 * 0.55
const PANE_HEIGHT = 239 * 0.55

const TOOL_PANE_WIDTH = 135
const TOOL_PANE_OFFSET = 25
const TOOL_PANE_ICON_SIZE = 60
const TOOL_ITEM_ICON_SIZE = 100

const DRAW_BOARD_WIDTH = SCREEN_HEIGHT * 1590 / 1536
const DRAW_BOARD_HEIGHT = SCREEN_HEIGHT
const DRAW_BOARD_RIGHT = SCREEN_WIDTH / 2 - DRAW_BOARD_WIDTH / 2
const DRAW_BOARD_TOP = SCREEN_HEIGHT / 2 - DRAW_BOARD_HEIGHT / 2 - SCREEN_HEIGHT * 0.04
const DRAW_ICON_SIZE = 70

const DRAW_PANE_WIDTH = DRAW_BOARD_WIDTH
const DRAW_PANE_HEIGHT = (DRAW_BOARD_WIDTH) * 38 / 55
const DRAW_PANE_SIZE = DRAW_PANE_HEIGHT * 0.83
const DRAW_PANE_TOP = 65
const DRAW_PANE_MARGIN_BOTTOM = 55

export const VAR = {
  SCREEN_WIDTH: SCREEN_WIDTH,
  SCREEN_HEIGHT: SCREEN_HEIGHT,
  BOARD_WIDTH: BOARD_WIDTH,
  BOARD_HEIGHT: BOARD_HEIGHT,
  BOARD_POS_BASIC: BOARD_POS_BASIC,
  BOARD_RIGHT: BOARD_RIGHT,
  BOARD_TOP: BOARD_TOP,
  ICON_SIZE: ICON_SIZE,
  SCENE_ICON_SIZE: SCENE_ICON_SIZE,

  TOOL_PANE_WIDTH: TOOL_PANE_WIDTH,
  TOOL_PANE_OFFSET: TOOL_PANE_OFFSET,
  TOOL_PANE_ICON_SIZE: TOOL_PANE_ICON_SIZE,
  TOOL_ITEM_ICON_SIZE: TOOL_ITEM_ICON_SIZE,

  COUNT_WIDTH: COUNT_WIDTH,
  COUNT_HEIGHT: COUNT_HEIGHT,
  COUNT_RIGHT: COUNT_RIGHT,
  COUNT_TOP: COUNT_TOP,

  PANE_WIDTH: PANE_WIDTH,
  PANE_HEIGHT: PANE_HEIGHT,

  DRAW_BOARD_WIDTH: DRAW_BOARD_WIDTH,
  DRAW_BOARD_HEIGHT: DRAW_BOARD_HEIGHT,
  DRAW_BOARD_RIGHT: DRAW_BOARD_RIGHT,
  DRAW_BOARD_TOP: DRAW_BOARD_TOP,
  DRAW_ICON_SIZE: DRAW_ICON_SIZE,
  DRAW_PANE_WIDTH: DRAW_PANE_WIDTH,
  DRAW_PANE_HEIGHT: DRAW_PANE_HEIGHT,
  DRAW_PANE_SIZE: DRAW_PANE_SIZE,
  DRAW_PANE_TOP: DRAW_PANE_TOP,
  DRAW_PANE_MARGIN_BOTTOM: DRAW_PANE_MARGIN_BOTTOM,

  BOX_ICON_SIZE: BOX_ICON_SIZE
}
