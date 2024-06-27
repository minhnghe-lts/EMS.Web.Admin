import type { VerticalNavItems } from '@/@layouts/types'

export default [
  {
    title: 'Home',
    to: { name: 'index' },
    icon: { icon: 'tabler-smart-home' },
  },
  {
    title: 'Second page',
    to: { name: 'second-page' },
    icon: { icon: 'tabler-file' },
  },
  {
    title: 'Cài đặt chung',
    // to: { name: 'settings' },
    icon: { icon: 'mdi-cog-outline' },
    children: [
      {
        title: 'Loại hợp đồng',
        to: {
          path: '/settings/contractType'
        }
      }
    ]
  },
  {
    title: 'Vị trí',
    to: { name: 'position' },
    icon: { icon: 'mdi-clipboard-check-outline' }
  }
] as VerticalNavItems
