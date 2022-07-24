import Login from './views/login';
import Admin_Index from './views/index';
import Welcome from "./views/welcome.vue";
import System_Menu from "./views/system/page-menu.vue";
import System_Role from "./views/system/page-role.vue";
import System_User from "./views/system/page-user.vue";
import Common_Dict from "./views/system/common-dict.vue";
import Customer_List from "./views/customer/customer-list.vue";
import Shop_List from "./views/shop/shop-list.vue";
import Post_List from "./views/post/post-list.vue";
import Post_Create from "./views/post/post-create.vue";
import Booking_List from "./views/booking/booking-list.vue";
import Room_List from "./views/booking/room-list.vue";
import Booking_Create from "./views/booking/booking-create.vue";
import File_List from "./views/file/file-list.vue";
import Classification_List from "./views/spec/classification-list.vue";
import Spu_List from "./views/spec/spu-list.vue";
import Sku_List from "./views/spec/sku-list.vue";
import Sku_Create from "./views/spec/sku-create.vue";
import Attr_List from "./views/spec/attr-list.vue";
import Blog_List from "./views/blog/blog-list.vue";
import Blog_Create from "./views/blog/blog-create.vue";
import Blog_Category from "./views/blog/blog-category.vue";

export const constantRouterMap = [
    {
        path: "*",
        name: "any",
        redirect: "login",
        meta: {
            title: "a",
            isSideBarShow: false
        }
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            title: "管理员登录",
            isSideBarShow: false
        }
    },
    {
        path: "/welcome",
        name: "welcome",
        component: Admin_Index,
        meta: {
            title: "Dashboard",
            icon: "el-icon-menu",
            isSideBarShow: true
        },
        children: [
            {
                path: "/welcome",
                name: "welcome",
                component: Welcome,
                meta: {
                    title: "Dashboard",
                    isSideBarShow: true
                }
            }
        ]
    },
    {
        path: "/system",
        name: "system",
        component: Admin_Index,
        meta: {
            title: "系统信息",
            icon: "el-icon-coin",
            isSideBarShow: true
        },
        children: [
            {
                path: "/system/user",
                name: "system/user",
                component: System_User,
                meta: {
                    title: "用户管理",
                    icon: "el-icon-menu",
                    isSideBarShow: true
                }
            },
            {
                path: "/system/menu",
                name: "system/menu",
                component: System_Menu,
                meta: {
                    title: "菜单管理",
                    isSideBarShow: true
                }
            },
            {
                path: "/system/role",
                name: "system/role",
                component: System_Role,
                meta: {
                    title: "权限管理",
                    isSideBarShow: true
                }
            },
            {
                path: "/system/common/dict",
                name: "common/dict",
                component: Common_Dict,
                meta: {
                    title: "数据字典",
                    isSideBarShow: true
                }
            }
        ]
    },
    {
        path: "/customer",
        name: "customer",
        component: Admin_Index,
        meta: {
            title: "客户管理",
            icon: "el-icon-user",
            isSideBarShow: false
        },
        children: [
            {
                path: "/customer/list",
                name: "customer/list",
                component: Customer_List,
                meta: {
                    title: "客户列表",
                    isSideBarShow: false
                }
            }
        ]
    },
    {
        path: "/shop",
        name: "shop",
        component: Admin_Index,
        meta: {
            title: "门店管理",
            icon: "el-icon-place",
            isSideBarShow: true
        },
        children: [
            {
                path: "/shop/list",
                name: "shop/list",
                component: Shop_List,
                meta: {
                    title: "门店列表",
                    isSideBarShow: true
                }
            }
        ]
    },
    {
        path: "/post",
        name: "post",
        component: Admin_Index,
        meta: {
            title: "文章管理",
            icon: "el-icon-tickets",
            isSideBarShow: true
        },
        children: [
            {
                path: "/post/list",
                name: "post/list",
                component: Post_List,
                meta: {
                    title: "文章列表",
                    isSideBarShow: true
                }
            },
            {
                path: "/post/create",
                name: "post/create",
                component: Post_Create,
                meta: {
                    title: "新建/编辑",
                    isSideBarShow: true
                }
            }
        ]
    },
    {
        path: "/booking",
        name: "booking",
        component: Admin_Index,
        meta: {
            title: "预约管理",
            icon: "el-icon-timer",
            isSideBarShow: true
        },
        children: [
            {
                path: "/booking/list",
                name: "booking/list",
                component: Booking_List,
                meta: {
                    title: "预约列表",
                    isSideBarShow: true
                }
            },
            {
                path: "/booking/room/list",
                name: "booking/room/list",
                component: Room_List,
                meta: {
                    title: "Room列表",
                    isSideBarShow: true
                }
            },
            {
                path: "/booking/create",
                name: "booking/create",
                component: Booking_Create,
                meta: {
                    title: "新增预约",
                    isSideBarShow: true
                }
            }
        ]
    },
    {
        path: "/file/list",
        name: "file/list",
        component: Admin_Index,
        meta: {
            title: "文件管理",
            icon: "el-icon-paperclip",
            isSideBarShow: true
        },
        children: [
            {
                path: "/file/list",
                name: "file/list",
                component: File_List,
                meta: {
                    title: "图片列表",
                    isSideBarShow: true
                }
            },
        ]
    },
    {
        path: "/product",
        name: "product",
        component: Admin_Index,
        meta: {
            title: "产品管理",
            icon: "el-icon-goods",
            isSideBarShow: true
        },
        children: [
            {
                path: "/classification/list",
                name: "classification/list",
                component: Classification_List,
                meta: {
                    title: "分类列表",
                    isSideBarShow: true
                }
            },
            {
                path: "/spu/list",
                name: "spu/list",
                component: Spu_List,
                meta: {
                    title: "SPU",
                    isSideBarShow: true
                }
            },
            {
                path: "/sku/list",
                name: "sku/list",
                component: Sku_List,
                meta: {
                    title: "SKU",
                    isSideBarShow: true
                }
            },
            {
                path: "/sku/create",
                name: "sku/create",
                component: Sku_Create,
                meta: {
                    title: "新增SKU",
                    isSideBarShow: false
                }
            },
            {
                path: "/attr/list",
                name: "attr/list",
                component: Attr_List,
                meta: {
                    title: "属性列表",
                    isSideBarShow: true
                }
            }
        ]
    },
    {
        path: "/blog",
        name: "blog",
        component: Admin_Index,
        meta: {
            title: "博客管理",
            icon: "el-icon-edit",
            isSideBarShow: true
        },
        children: [
            {
                path: "/blog/list",
                name: "blog/list",
                component: Blog_List,
                meta: {
                    title: "文章列表",
                    isSideBarShow: true
                }
            },
            {
                path: "/blog/create",
                name: "blog/create",
                component: Blog_Create,
                meta: {
                    title: "新增文章",
                    isSideBarShow: true
                }
            },
            {
                path: "/blog/category",
                name: "blog/category",
                component: Blog_Category,
                meta: {
                    title: "博客分类"
                }
            }
        ]
    }

]