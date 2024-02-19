<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside style="" width="auto">
      <el-scrollbar>
        <el-menu :collapse="Collapse" :default-openeds="['1',]" :router="true" background-color="rgb(48, 65, 86)"
                 text-color="#fff">
          <!--          <el-sub-menu index="1">-->
          <!--            <template #title>-->
          <!--              <el-icon>-->
          <!--                <location/>-->
          <!--              </el-icon>-->
          <!--              <span>选项</span>-->
          <!--            </template>-->
          <!--            <el-menu-item-group>-->
          <!--              <template #title><span>Group One</span></template>-->
          <!--              <el-menu-item index="/system/test2">item one</el-menu-item>-->
          <!--              <el-menu-item index="/system/test3">item two</el-menu-item>-->
          <!--            </el-menu-item-group>-->
          <!--            <el-menu-item-group title="Group Two">-->
          <!--              <el-menu-item index="1-3">item three</el-menu-item>-->
          <!--            </el-menu-item-group>-->
          <!--            <el-sub-menu index="1-4">-->
          <!--              <template #title><span>item four</span></template>-->
          <!--              <el-menu-item index="1-4-1">item one</el-menu-item>-->
          <!--            </el-sub-menu>-->
          <!--          </el-sub-menu>-->
          <el-menu-item index="/system/home">
            <el-icon>
              <Calendar/>
            </el-icon>
            <template #title>告示</template>
          </el-menu-item>
          <el-menu-item index="/system/repair">
            <el-icon>
              <document/>
            </el-icon>
            <template #title>提交报修</template>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon>
              <setting/>
            </el-icon>
            <template #title>Navigator Four</template>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="display: flex; font-size: 12px;">
        <component :is="Collapse? Expand:Fold" style="width: 50px;height: 100%;" @click="isCollapse"/>
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <setting/>
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>登出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>{{ userName }}</span>
        </div>
      </el-header>

      <el-main>
        <RouterView/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {RouterView} from 'vue-router'
import {ref, computed} from 'vue'
import {
  Document, Setting, Calendar
} from '@element-plus/icons-vue'
import {Fold, Expand} from '@element-plus/icons-vue'
import {useCounterStore} from "@/stores";

//控制侧边栏缩放
let Collapse = ref(false)
const isCollapse = () => {
  Collapse.value = !Collapse.value
}

const Store = useCounterStore()

const userName = computed(() => {
  return Store.userName
})

</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  //background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  border-bottom: 1px solid #ccc
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background-color: rgb(48, 65, 86);
  border-right: 1px solid #ccc;
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.el-menu-container:not(.el-menu--collapse) {
  width: 200px;
  height: calc(100vh);
}
</style>
