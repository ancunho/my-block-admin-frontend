<template>
        <el-submenu
            v-if="(item.children && item.children.length > 1) && item.meta.isSideBarShow"
            :index="item.path"
        >
            <template slot="title">
                <i style="font-size: 20px; color:#d1d1d1; " v-bind:class="item.meta.icon"> </i>
                <span style=" color:#fff; font-size: 15px;">{{ item.meta.title }}</span>
            </template>
            <el-menu-item-group>
                <template v-for="(subMenu, subMenuIdx) in item.children">
                    <el-menu-item
                        v-if="subMenu.meta.isSideBarShow"
                        :key="subMenuIdx"
                        :index="subMenu.path"
                        style="padding-left: 60px;"
                    >
                        {{ subMenu.meta.title }}
                    </el-menu-item>
                </template>
            </el-menu-item-group>
        </el-submenu>
        <el-menu-item
            v-else-if="(!item.children || item.children.length === 1) && item.meta.isSideBarShow "
            :index="item.path"
        >
            <i style="font-size: 20px; color:#d1d1d1;" v-bind:class="item.meta.icon"></i>
            <span style=" color:#fff; font-size: 15px;" slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
</template>
<!--<div class="aside-bar">-->


<!--</div>-->
<script>
export default {
    name: "AsideBarComponent",
    props: {
        item: {
            type: Object,
            require: false
        }
    },
    data() {
        return {
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style scoped>

</style>