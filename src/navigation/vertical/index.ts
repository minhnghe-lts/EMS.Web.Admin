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
    children: [
      {
        title: 'Học viên',
        to: { 
          path: '/training/overview' 
        },
      },
      {
        title: 'Chương trình',
        to: { 
          path: '/training/courses' 
        },
      },
      {
        title: 'Môn học',
        to: { 
          path: '/training/subjects' 
        },
      },
      {
        title: 'Học liệu',
        to: { 
          path: '/training/documents' 
        },
      },
      {
        title: 'Phân bổ',
        to: { 
          path: '/training/schedule' 
        },
      },
      {
        title: 'Kế hoạch',
        to: { 
          path: '/training/plans' 
        },
      },
    ],
  },
  {
    title: 'Cài đặt chung',
    to: { name: 'settings' },
    icon: { icon: 'mdi-cog-outline' },
  },
] as VerticalNavItems
