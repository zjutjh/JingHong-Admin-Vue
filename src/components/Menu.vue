<template>
  <n-menu :options="menuOptions" default-value="dashboard"/>
</template>

<script setup lang="ts">
import { h, Component, computed } from "vue";
import { NMenu, NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";
import {
  PencilOutline as PencilIcon,
  AlarmOutline as AlarmIcon,
  BusOutline as BusIcon,
  FileTrayOutline as LostfoundIcon,
  HomeOutline as DashboardIcon,
  ClipboardOutline as InformationIcon,
  ShirtOutline as SuitApplyIcon
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
        { to: { name: "Dashboard", } },
        { default: () => "Dashboard" }
      ),
      key: "dashboard",
      icon: renderIcon(DashboardIcon),
      access: access.value.canNotSeeNormal
    },
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
        { default: () => "系统信息修改" }
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
        { to: { name: "Found", } },
        { default: () => "失物寻物" }
      ),
      key: "lostfound",
      icon: renderIcon(LostfoundIcon),
      access: access.value.canSeeAdmin || access.value.canSeeLostfound
    },
    {
      label: () => h(
        RouterLink,
        { to: { name: "Information", } },
        { default: () => "校园资讯" }
      ),
      key: "information",
      icon: renderIcon(InformationIcon),
      access: access.value.canSeeAdmin || access.value.canSeeInformation
    },
    {
      label: () => h(
        RouterLink,
        {to: {name: "SuitApply"}},
        {default: () => "物资借用"}
      ),
      key: "suitapply",
      icon: renderIcon(SuitApplyIcon),
      access: access.value.canSeeAdmin || access.value.canSeeSuitApply
    }
  ].filter(item => item.access && omit(item, ["access"]))
);

</script>
