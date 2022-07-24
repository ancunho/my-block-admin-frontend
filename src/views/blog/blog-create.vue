<template>
    <div v-loading="loading">
        <el-form ref="form" :model="form" label-width="100px">
            <input type="hidden" v-model="form.postId" />
            <input type="hidden" v-model="form.postType" />

            <el-form-item>
                <el-button type="primary" @click="handleOnSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
            <el-form-item label="是否发布">
                <el-radio-group v-model="form.status">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="文章标题">
                <el-input v-model="form.postTitle"></el-input>
            </el-form-item>
            <el-form-item label="文章摘要">
                <el-input v-model="form.option01"></el-input>
            </el-form-item>
            <el-form-item label="文章类别">
                <el-cascader
                    @change="handleChangeChooseCategory"
                    :props="{ checkStrictly: true }"
                    :options="categoryList"
                    v-model="form.postCategoryId"
                    popper-class="category-popup"
                    clearable></el-cascader>&nbsp;
                <el-button @click="handleAddCategory" round>新增分类</el-button>
            </el-form-item>

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="小图片">
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-image :src="form.postThumbnailSmall || ''" style="width:100px; height:100px;">
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline font100px" style="color:#9a9a9a;"></i>
                                </div>
                            </el-image>
                        </div>
                        <el-button round v-on:click="handleChooseMain('postThumbnailSmall')">选 择 图 片</el-button>
                        <el-button round type="danger" v-on:click="handleDeleteChooseMain('postThumbnailSmall')">删 除</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="大图片">
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-image :src="form.postThumbnailBig || ''" style="width:100px; height:100px;">
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline font100px" style="color:#9a9a9a;"></i>
                                </div>
                            </el-image>
                        </div>
                        <el-button round v-on:click="handleChooseMain('postThumbnailBig')">选 择 图 片</el-button>
                        <el-button round type="danger" v-on:click="handleDeleteChooseMain('postThumbnailBig')">删 除</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="文章内容">
                <WangEditorComponent
                    v-bind:content="form.postContent"
                    v-model="form.postContent"
                    @wangEditorChildOnChange="wangEditorChildOnChange"
                />
            </el-form-item>


        </el-form>

        <!-- Blog Category dialog start  -->
        <el-dialog v-bind:title="buzaModalTitle" :visible.sync="isModalVisible" :close-on-click-modal="false">
            <!--:close-on-click-modal="false"-->
            <input type="hidden" v-model="categoryItem.categoryId"/>
            <el-form ref="form" label-width="130px">
                <el-form-item label="ID" v-if="categoryItem.categoryId != null">
                    <el-input v-model="categoryItem.categoryId" disabled></el-input>
                </el-form-item>
                <el-form-item label="分类名称">
                    <el-input v-model="categoryItem.categoryName"></el-input>
                </el-form-item>
                <el-form-item label="父分类">
<!--                    <el-input v-model="categoryItem.parentCategoryId"></el-input>-->
                    <el-cascader
                        @change="handleChangeChooseCategory"
                        :props="{ checkStrictly: true }"
                        :options="categoryList"
                        v-model="categoryItem.parentCategoryId"
                        popper-class="category-popup"
                        clearable></el-cascader>
                </el-form-item>
                <el-form-item label="Type">
                    <el-input v-model="categoryItem.categoryType"></el-input>
                </el-form-item>
                <el-form-item label="是否激活">
                    <el-switch v-model="categoryItem.status"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" v-on:click="isModalVisible = false">取 消</el-button>
                <el-button type="primary" v-on:click="saveCategoryItem(categoryItem)">保 存</el-button>
            </div>
        </el-dialog>
        <!--  // Blog Category dialog end  -->

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
import WangEditorComponent from "@/components/WangEditorComponent";
export default {
    name: "blog-create-old",
    components: {
        FileListComponent,
        WangEditorComponent
    },
    data() {
        return {
            form: {
                postId: '',
                postCategoryId: '',
                postTitle: '',
                postContent: '',
                postType: '03',
                postThumbnailSmall: '',
                postThumbnailBig: '',
                postAuthor: Tool.getStorageParam("username"),
                eventStartTime: '',
                eventEndTime: '',
                isJoin: false,
                isNeedPay: false,
                postPrice: 0,
                type: [],
                status: '1',
                eventDateRange: '',
                option01: '',
                postContentMarkDown: ''
            },
            lstPostType: [],
            editor: null,
            editorData: '',
            loading: true,

            loadingDrawer: false,
            isDrawerVisible: false,

            isModalVisible: false,
            buzaModalTitle: '新增分类',

            categoryItem: {},
            categoryList: [],
            chooseCategory: '',

            isShowContentDiv: true,

        }
    },
    mounted() {
        let _this = this;

        _this.setListCommonCode("POST_TYPE");
        _this.form.postId = _this.$route.params.postId;
        if (Tool.isNotNull(_this.form.postId)) {
            _this.getPostInfoByPostId(_this.form.postId);
        }
        _this.loading = false;
        _this.initCategoryList();
    },
    watch: {
        isDrawerVisible(val, oldVal) {
            this.isShowContentDiv = !val;
        },
        isModalVisible(val, oldVal) {
            this.isShowContentDiv = !val;
        }
    },
    methods: {
        wangEditorChildOnChange(data) {
            this.form.postContent = data;
        },
        async uploadImage(blob) {
            let _this = this;
            let editorImageFrom = new FormData();
            editorImageFrom.append("file", blob);
            let returnURL = '';
            await _this.$request.post("/backend/file/handle/upload", editorImageFrom)
                .then(response => {
                    if (response.data.errno === 0) {
                        _this.$message.success("上传成功");
                        returnURL = response.data.data[0] || '';
                    } else {
                        _this.$message.error("上传错误");
                    }
                }).catch(response => {
                    _this.$message.error("上传错误");
                });
            return returnURL;
        },
        async handleUploadImageOnServerReturnImageURL(file) {
            let _this = this;
            let returnImageURL = '';
            await _this.$request.post("/backend/file/handle/upload", file)
                .then(response => {
                    if (response.data.errno === 0) {
                        _this.$message.success("上传成功");
                        returnImageURL = response.data.data[0] || '';
                    } else {
                        _this.$message.error("上传错误");
                    }
                }).catch(response => {
                _this.$message.error("上传错误");
            });
            return returnImageURL;
        },
        childEmitItem(data) {
            let _this = this;
            _this.isDrawerVisible = false;
            _this.isShowContentDiv = true;
            if (_this.choosenFlag === 'postThumbnailSmall') {
                _this.form.postThumbnailSmall = data.fileUrl;
            } else if (_this.choosenFlag === 'postThumbnailBig') {
                _this.form.postThumbnailBig = data.fileUrl;
            }
        },
        handleDeleteChooseMain(flag) {
            let _this = this;
            if (flag === 'postThumbnailSmall') {
                _this.form.postThumbnailSmall = '';
            } else if (flag === 'postThumbnailBig') {
                _this.form.postThumbnailBig = '';
            }
        },
        handleChooseMain(flag) {
            let _this = this;
            // _this.loadingDrawer = true;
            _this.isDrawerVisible = true;
            _this.choosenFlag = flag;
            _this.isShowContentDiv = false;
        },
        handleChangeChooseCategory(val) {

        },
        initCategoryList() {
            let _this = this;
            _this.$request.post("/backend/blog/category/depth", {})
            .then(response => {
                if (response.data.status == 200) {
                    _this.categoryList = response.data.data;
                } else {
                    _this.$message.error(response.data.msg);
                }
            })
            .catch(response => {})
        },
        handleAddCategory() {
            let _this = this;
            _this.isModalVisible = true;
            _this.isShowContentDiv = false;
        },
        setListCommonCode(codeType) {
            let _this = this;
            _this.$request.get("/backend/code/type/list?codeType=" + codeType).then((response) => {
                _this.lstPostType = response.data.data;
            })
        },
        getPostInfoByPostId(postId) {
            let _this = this;
            _this.$request.get('/backend/post/info?postId=' + postId)
            .then(response => {
                if (response.data.code === 0) {
                    _this.form = response.data.data;
                    _this.form.isJoin = _this.form.isJoin === "1";
                    _this.form.isNeedPay = _this.form.isNeedPay === "1";
                    _this.form.eventDateRange = [_this.form.eventStartTime || '', _this.form.eventEndTime || ''];

                } else {
                    _this.$message.error(response.data.msg);
                }
                _this.loading = false;
            })
            .catch(response => {
                alert("Fail");
            });
        },
        handleOnSubmit() {
            let _this = this;
            _this.form.eventStartTime = _this.form.eventDateRange[0];
            _this.form.eventEndTime = _this.form.eventDateRange[1];
            _this.form.isJoin = _this.form.isJoin == true ? "1" : "0";
            _this.form.isNeedPay = _this.form.isNeedPay == true ? "1" : "0";
            _this.form.postCategoryId = _this.form.postCategoryId[_this.form.postCategoryId.length - 1];
            // _this.form.postContent = _this.$refs.toastEditor.invoke('getMarkdown');
            _this.$request.post("/backend/post/proc", _this.form)
                .then(response => {
                    if (response.data.code === 0) {
                        _this.$message.success(response.data.msg);
                        _this.$router.push({name: 'blog/list'});
                    } else {
                        _this.$message.error(response.data.msg);
                    }
                }).catch(response => {
                    _this.$message.error(response.data.msg);
                });
        },
        saveCategoryItem(item) {
            let _this = this;
            item.status = item.status === true ? "1" : "0";
            item.parentCategoryId = item.parentCategoryId == null ? 0 : item.parentCategoryId[item.parentCategoryId.length - 1];
            _this.$request.post("/backend/blog/category/proc", item)
            .then(response => {
                if (response.data.status === 200) {
                    _this.$message.success(response.data.msg);
                    _this.isModalVisible = false;
                    _this.isShowContentDiv = true;
                    _this.initCategoryList();
                } else {
                    _this.$message.error(response.data.msg);
                }
            })
            .catch(response => {
                _this.$message.error("Error！请重新再试！");
            })
        }
    }
}
</script>

<style>
#blog-content-div > div. {
    /*z-index: 1000!important;*/
}
.category-popup .el-radio__inner { width: 20px; height: 20px;}
</style>