<template>
    <div v-loading="loading">

        <el-button @click="handleAddNew()" type="primary" icon="el-icon-plus">新增Classification</el-button>
<!--        <router-link to="/post/create"><el-button type="primary" icon="el-icon-plus">新增文章</el-button></router-link>-->

        <!-- 级联面板 start -->
        <el-cascader-panel :options="itemListForCascader" :props="{value: 'classificationId', label: 'classificationName'}" style="margin-top: 20px">
            <template slot-scope="{ node, data }">
                <span>{{ data.classificationName }}</span>
                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
        </el-cascader-panel>
        <!-- //级联面板 end -->

        <!--  table list start  -->
        <el-table :data="itemList" style="width: 100%; margin-top: 1.5rem;">
            <el-table-column prop="rn" label="编号" width="80"></el-table-column>
            <el-table-column prop="classificationId" label="ID" width="150" ></el-table-column>
            <el-table-column prop="parentClassificationId" label="父分类" width="150" >
                <template slot-scope="scope">
                    {{ scope.row.parentClassificationId === 0 ? '-' : scope.row.parentClassificationName }}
                </template>
            </el-table-column>
            <el-table-column prop="classificationName" label="NAME" ></el-table-column>
            <el-table-column prop="depthNum" label="DEPTH" >
                <template slot-scope="scope">
                    {{ scope.row.depthNum }}级分类
                </template>
            </el-table-column>
            <el-table-column prop="classificationImage" label="Image" >
                <template slot-scope="scope">
                    <el-image :src="scope.row.classificationImage" style="width: 100px; height: 100px;" />
                </template>
            </el-table-column>
            <el-table-column prop="sortOrder" label="SORT_ORDER" width="130"></el-table-column>
            <el-table-column prop="status" label="状态" align="center" width="120">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.status === '0'"> {{ scope.row.statusName }}</el-tag>
                    <el-tag type="success" v-if="scope.row.status === '1'"> {{ scope.row.statusName }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="150"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="150"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button @click="handleItemModify(scope.$index, scope.row)" type="primary" icon="el-icon-edit-outline">修改</el-button>
                    <!--          <el-button @click="getRoleHandler(scope.row)" type="danger" icon="el-icon-delete">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <!--  // table list end  -->

        <!--  paging start  -->
        <el-row style="margin: 2rem 0;">
            <el-col :span="12" :offset="6">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </el-col>
        </el-row>
        <!--  // paging end  -->

        <!--  dialog start  -->
        <el-dialog v-bind:title="buzaModalTitle" :visible.sync="isModalVisible" :close-on-click-modal="false">
            <!--:close-on-click-modal="false"-->
            <input type="hidden" v-model="modifyItem.classificationId"/>
            <el-form ref="form" label-width="130px">
                <el-form-item label="spuId" v-if="modifyItem.classificationId != null">
                    <el-input v-model="modifyItem.classificationId" disabled></el-input>
                </el-form-item>
                <el-form-item label="Name">
                    <el-input v-model="modifyItem.classificationName"></el-input>
                </el-form-item>
                <el-form-item label="parentId">
                    <el-cascader
                        :value="modifyItem.parentClassificationId || 0"
                        @change="handleChangeCategory"
                        :options="lstCategory"
                        :props="{value: 'classificationId', label: 'classificationName', checkStrictly: true}"
                        :show-all-levels="false"
                        clearable>
                        <template slot-scope="{ node, data }">
                            <span>{{ data.classificationName }}</span>
                            <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                        </template>
                    </el-cascader>
                </el-form-item>
                <el-form-item label="层级">
                    <el-radio-group v-model="modifyItem.depthNum" @change="handleChangeDepth">
                        <el-radio :label="1">一级</el-radio>
                        <el-radio :label="2">二级</el-radio>
                        <el-radio :label="3">三级</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="Type">
                    <el-input v-model="modifyItem.classificationType"></el-input>
                </el-form-item>
                <el-form-item label="SortOrder">
                    <el-input v-model="modifyItem.sortOrder"></el-input>
                </el-form-item>
                <el-form-item label="是否激活">
                    <el-switch v-model="modifyItem.status"></el-switch>
                </el-form-item>
                <el-form-item label="主图片">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-image :src="modifyItem.classificationImage || ''" style="width: 200px; height:200px;">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline font200px"></i>
                            </div>
                        </el-image>
                    </div>
                    <el-button type="info" v-on:click="handleChooseMain('mainImage01')">选 择 图 片</el-button>
                    <el-button type="danger" v-on:click="handleDeleteChooseMain('mainImage01')">删 除</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" v-on:click="isModalVisible = false">取 消</el-button>
                <el-button type="primary" v-on:click="saveItem(modifyItem)">保 存</el-button>
            </div>
        </el-dialog>
        <!--  // dialog end  -->

        <!--  // drawer start  -->
        <el-drawer
            v-loading="loadingDrawer"
            title="图片详细信息"
            :visible.sync="isDrawerVisible"
            direction="rtl"
            size="80%"
            :close-on-press-escape="false"
        >
            <FileListComponent @childEmitItem="childEmitItem" />
        </el-drawer>
        <!--  // drawer end  -->

    </div>
</template>

<script>
import FileListComponent from '@/components/FileListComponent';
export default {
    name: "classification-list",
    components: {
        FileListComponent
    },
    data: function () {
        return {
            itemList: [],
            itemListForCascader: [],
            modifyItem: {},
            loading: true,
            currentPage: 1, //page
            pageSize: 50, //limit
            pageSizes: [50, 80, 120],
            total: 120,
            isModalVisible: false,
            buzaModalTitle: 'Modal',

            lstClassificationList: [],
            lstCategory: [],
            selectedParentValue: [],

            loadingDrawer: false,
            isDrawerVisible: false,
            choosenFlag: '',
        }
    },
    mounted: function () {
        let _this = this;
        _this.tableList();
        _this.getAllClassificationList();
    },
    watch: {
        isModalVisible(val, oldVal) {
            let _this = this;
            if (val === false) {
                _this.tableList();
            }
        }
    },
    methods: {
        childEmitItem(data) {
            let _this = this;
            _this.isDrawerVisible = false;
            if (_this.choosenFlag === 'mainImage01') {
                _this.modifyItem.classificationImage = data.fileUrl;
            }
        },
        handleChangeDepth(value) {

        },
        handleChangeCategory(value) {
            let _this = this;
            _this.modifyItem.parentClassificationId = value[value.length - 1];
        },
        handleSizeChange(limit) {
            this.currentPage = 1;
            this.pageSize = limit;
            this.tableList();
        },
        handleCurrentChange(page) {
            this.currentPage = page;
            this.tableList();
        },
        handleChooseMain(flag) {
            let _this = this;
            // _this.loadingDrawer = true;
            _this.isDrawerVisible = true;
            _this.choosenFlag = flag;
        },
        handleDeleteChooseMain(flag) {
            let _this = this;
            if (flag == 'mainImage01') {
                _this.modifyItem.classificationImage = '';
            }
        },
        tableList() {
            let _this = this;
            _this.$request.post("/backend/classification/list?page=" + _this.currentPage + "&limit=" + _this.pageSize, {}).then((response) => {
                _this.itemList = response.data.data;
                _this.setItemListToTree(response.data.data);
                _this.total = response.data.count;
                _this.loading = false;

                let listToTree = response.data.data;
                let result = [{classificationId: 0, classificationName: '无分类'}];
                listToTree.forEach(item => {
                    delete item.children;
                });

                let map = {};
                listToTree.forEach(item => {
                    map[item.classificationId] = item;
                });
                listToTree.forEach(item => {
                    let parent = map[item.parentClassificationId];
                    if (parent) {
                        (parent.children || (parent.children = [])).push(item);
                    } else {
                        result.push(item);
                    }
                });
                _this.lstCategory = result;
            })
        },
        setItemListToTree(itemList) {
            let _this = this;
            let listToTree = itemList;
            let result = [];
            listToTree.forEach(item => {
                delete item.children;
            });

            let map = {};
            listToTree.forEach(item => {
                map[item.classificationId] = item;
            });
            listToTree.forEach(item => {
                let parent = map[item.parentClassificationId];
                if (parent) {
                    (parent.children || (parent.children = [])).push(item);
                } else {
                    result.push(item);
                }
            });
            _this.itemListForCascader = result;
        },
        getAllClassificationList() {
            let _this = this;
            _this.$request.post('/backend/classification/list', {})
            .then (response => {
                if (response.data.status === 200) {
                    _this.lstClassificationList = response.data.data;
                } else {
                    _this.$message.error(response.data.msg);
                }
            })
            .catch(response => {
                _this.$message.error("出错！！！！");
            });
        },
        handleAddNew() {
            let _this = this;
            _this.isModalVisible = true;
            _this.buzaModalTitle = "新增Classification";
            _this.modifyItem = {};
        },
        handleItemModify(idx, item) {
            let _this = this;
            _this.isModalVisible = true;
            item.status = item.status === "1";
            _this.modifyItem = item;
        },
        saveItem(item) {
            let _this = this;
            item.status = item.status === true ? "1" : "0";

            _this.loading = true;
            _this.$request.post("/backend/classification/proc", item).then(response => {
                if (response.data.code === 0) {
                    _this.$message.success(response.data.msg);
                    _this.tableList();
                } else {
                    _this.$message.error(response.data.msg);
                }
                _this.isModalVisible = false;
            });

        }
    }
}
</script>

<style scoped>
</style>