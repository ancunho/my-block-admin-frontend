<template>
    <div>
        <input type="checkbox" name="" id="menu-toggle"/>
        <div class="overlay">
            <label for="menu-toggle">
                <span style="position: absolute;left: 285px; top: 14px;font-size: 30px; color:white" class="el-icon-s-fold"></span>
            </label>
        </div>

        <div class="sidebar" style="background: #303133">
<!--            <label for="menu-toggle" class="menu-toggle-btn"><span class="el-icon-s-fold"></span></label>-->
            <div class="sidebar-container">
                <div class="brand">
                    <h2 style=" color:#FFFFFF; padding-left: 26px;">Buza Studio</h2>
                </div>
<!--                <div class="block" style="display: flex; justify-content: center; margin: 1.2rem 0 .6rem 0">-->
<!--                    <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>-->
<!--                </div>-->
                <p style="text-align: center; margin: 0 0 1.2rem 0; font-weight: 600;">{{ username }}</p>
                <div class="sidebar-menu" id="navbar">
<!--                    303133-->
                    <el-menu
                        router
                        unique-opened
                        default-active="welcome"
                        class="el-menu-vertical-demo"
                        text-color="#ffffff"
                        active-text-color="#409EFF"
                        background-color="#303133"
                    >
                        <AsideBarComponent class="aside-bar-item" v-for="(item, idx) in constantRouterMap" :key="idx" :item="item" />
                    </el-menu>
                </div>

            </div>
        </div><!-- //.sidebar -->

        <div class="main-content">
            <header>
                <div class="header-title-wrapper">
                    <label for="menu-toggle">
                        <span class="el-icon-s-unfold"></span>
                    </label>
                    <div class="header-title">
                        <h2>{{ $route.meta.title }}</h2>
                        <!--            <p>Display analytics about your Channel <span class="las la-chart-line"></span></p>-->
                    </div>

                </div>
                <div class="header-action">
                    <el-button type="primary" plain icon="el-icon-date" circle></el-button>
                    <el-button type="primary" plain icon="el-icon-switch-button" circle></el-button>
                </div>
            </header><!-- //.header -->

            <main>
                <router-view/>
            </main>

        </div>

    </div><!-- //.wrap div -->
</template>

<script>
import AsideBarComponent from "@/components/AsideBarComponent";
import { constantRouterMap } from "../menu-tree";
export default {
    name: "index",
    components: {
        AsideBarComponent
    },
    data() {
        return {
            username: '',
            isCollapse: false,
            constantRouterMap,
        }
    },
    mounted: function () {
        console.log(this.$route);
        // let _this = this;
        // _this.activeSidebar(_this.$route.name.replace("/", "-") + "-sidebar", _this.$route.meta.title);
        // _this.username = Tool.getStorageParam("username");
    },
    watch: {
        // $route: {
        //     handler: function (val, oldVal) {
        //         let _this = this;
        //         _this.$nextTick(function () {
        //             _this.activeSidebar(_this.$route.name.replace("/", "-") + "-sidebar", _this.$route.meta.title);
        //         });
        //     }
        // }
    },
    methods: {
        // activeSidebar: function (className, title) {
        //     console.log(className, title);
        //     $(".header-title h2").text(title);
        //     $(".sidebar-menu li").removeClass("active");
        //     $("." + className).siblings("li").find("ul.sidebar-submenu").css({ 'height': '0px', 'overflow': 'hidden', });
        //     $("." + className).addClass("active");
        //     $("." + className).find("ul.sidebar-submenu").css({ 'height': '100%',});
        //     let parentLi = $("." + className).parents("li");
        //     if (parentLi) {
        //         parentLi.addClass("active");
        //     }
        // },
    }
}


</script>

<style scoped>

</style>