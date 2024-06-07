export const Skins = {
  Default: 'default',
  Bordered: 'bordered',
} as const

export const RouteTransitions = {
  Fade: 'app-transition-fade',
  None: 'none',

  // 'Zoom Fade': 'app-transition-zoom-fade',
  // 'Fade Bottom': 'app-transition-fade-bottom',
  // 'Slide Fade': 'app-transition-slide-fade',
  // 'Zoom out': 'app-transition-zoom-out',

} as const

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData',
} as const
