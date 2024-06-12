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
    title: 'Đào tạo',
    to: { name: 'training' },
    icon: { icon: 'mdi-notebook-outline' },
  },
  {
    title: 'Cài đặt chung',
    to: { name: 'settings' },
    icon: { icon: 'mdi-cog-outline' },
  },
] as VerticalNavItems
