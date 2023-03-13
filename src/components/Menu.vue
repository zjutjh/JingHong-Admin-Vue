<template>
  <n-menu :options="menuOptions" />
</template>

<script setup lang="ts">
import { h, Component, computed } from "vue";
import { NMenu, NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";
import {
  PencilOutline as PencilIcon,
  AlarmOutline as AlarmIcon,
  BusOutline as BusIcon,
  FileTrayOutline as LostfoundIcon
} from "@vicons/ionicons5";
import { RouterLink } from "vue-router";
import { useAccess } from "../hooks";
import { omit } from "naive-ui/es/_utils";

const access = useAccess();

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = computed<Array<MenuOption & { access?: boolean }>>(() =>
  [
    {
      label: () => h(
        RouterLink,
        { to: { name: "SchoolBus", } },
        { default: () => "校车时间维护" }
      ),
      key: "school-bus-time",
      icon: renderIcon(BusIcon),
      access: access.value.canSeeAdmin
    },
    {
      label: () => h(
        RouterLink,
        { to: { name: "TermTime", } },
        { default: () => "学期时间修改" }
      ),
      key: "school-term-time",
      icon: renderIcon(AlarmIcon),
      access: access.value.canSeeAdmin
    },
    {
      label: () => h(
        RouterLink,
        { to: { name: "Announcement", } },
        { default: () => "编辑通知" }
      ),
      key: "announcement",
      icon: renderIcon(PencilIcon),
      access: access.value.canSeeAdmin
    },
    {
      label: () => h(
        RouterLink,
        { to: { name: "Lostfound", } },
        { default: () => "失物招领" }
      ),
      key: "lostfound",
      icon: renderIcon(LostfoundIcon),
      access: access.value.canSeeAdmin || access.value.canSeeLostfound
    },
  ].filter(item => item.access && omit(item, ["access"]))
);

</script>
