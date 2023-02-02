<template>
  <n-menu :options="menuOptions" default-value="school-bus-time"/>
</template>

<script setup lang="ts">

import { h, Component } from 'vue'
import { NMenu, NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
  PencilOutline as PencilIcon,
  Help as HelpIcon,
  AlarmOutline as AlarmIcon,
  HomeOutline as HomeIcon,
  ExitOutline as ExitIcon
} from '@vicons/ionicons5'
import { RouterLink } from 'vue-router'


function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () => h(
      RouterLink,
      { to: { name: 'BusTime', } },
      { default: () => '校车时间维护' }
    ),
    key: 'school-bus-time',
    icon: renderIcon(AlarmIcon),
  },
  {
    label: () => h(
      RouterLink,
      { to: { name: 'TermTime', } },
      { default: () => '学期时间修改' }
    ),
    key: 'school-term-time',
    icon: renderIcon(AlarmIcon),
  },
  {
    label: () => h(
      RouterLink,
      { to: { name: 'Edit', } },
      { default: () => '编辑通知' }
    ),
    key: 'edit',
    icon: renderIcon(PencilIcon),
  },
  // {
  //   label: () =>
  //     h(
  //       RouterLink,
  //       {
  //         to: {
  //           name: 'Login',
  //           params: {
  //             lang: 'zh-CN'
  //           }
  //         }
  //       },
  //       { default: () => '注销' }
  //     ),
  //   key: 'Login',
  //   icon: renderIcon(ExitIcon),
  // },
  {
    label: '待定',
    key: 'undefined',
    icon: renderIcon(HelpIcon),
    disabled: true,
  },
  {
    label: '待定',
    key: 'undefined',
    disabled: true,
    icon: renderIcon(HelpIcon),
  }
]

</script>

<style scoped>

</style>
