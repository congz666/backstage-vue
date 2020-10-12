<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-lx-group',
                    index: '1',
                    title: '用户',
                    subs: [
                        {
                            index: '/user/list',
                            title: '用户列表'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-goods',
                    index: '2',
                    title: '商品',
                    subs: [
                        {
                            index: '/product/new',
                            title: '新建商品'
                        },
                        {
                            index: '/product/list',
                            title: '商品列表'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: '3',
                    title: '其它',
                    subs: [
                        {
                            index: '3-1',
                            title: '分类',
                            subs: [
                                {
                                    index: '/category/new',
                                    title: '新建分类'
                                },
                                {
                                    index: '/category/list',
                                    title: '分类列表'
                                }
                            ]
                        },
                        {
                            index: '3-2',
                            title: '公告',
                            subs: [
                                {
                                    index: '/notice/new',
                                    title: '新建公告'
                                },
                                {
                                    index: '/notice/update',
                                    title: '修改公告'
                                }
                            ]
                        },
                        {
                            index: '3-3',
                            title: '轮播图',
                            subs: [
                                {
                                    index: '/carousel/list',
                                    title: '轮播图列表'
                                }
                            ]
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-more',
                    index: '4',
                    title: '基本样式',
                    subs: [
                        {
                            icon: 'el-icon-lx-cascades',
                            index: 'table',
                            title: '基础表格'
                        },
                        {
                            icon: 'el-icon-lx-copy',
                            index: 'tabs',
                            title: 'tab选项卡'
                        },
                        {
                            icon: 'el-icon-lx-calendar',
                            index: '4-3',
                            title: '表单相关',
                            subs: [
                                {
                                    index: 'form',
                                    title: '基本表单'
                                },

                                {
                                    index: 'editor',
                                    title: '富文本编辑器'
                                },
                                {
                                    index: 'markdown',
                                    title: 'markdown编辑器'
                                },

                                {
                                    index: 'upload',
                                    title: '文件上传'
                                }
                            ]
                        },
                        {
                            icon: 'el-icon-lx-emoji',
                            index: 'icon',
                            title: '自定义图标'
                        },
                        {
                            icon: 'el-icon-pie-chart',
                            index: 'charts',
                            title: 'schart图表'
                        },
                        {
                            icon: 'el-icon-rank',
                            index: '4-6',
                            title: '拖拽组件',
                            subs: [
                                {
                                    index: 'drag',
                                    title: '拖拽列表'
                                },
                                {
                                    index: 'dialog',
                                    title: '拖拽弹框'
                                }
                            ]
                        },
                        {
                            icon: 'el-icon-lx-global',
                            index: 'i18n',
                            title: '国际化功能'
                        },
                        {
                            icon: 'el-icon-lx-warn',
                            index: '4-8',
                            title: '错误处理',
                            subs: [
                                {
                                    index: 'permission',
                                    title: '权限测试'
                                },
                                {
                                    index: '404',
                                    title: '404页面'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
