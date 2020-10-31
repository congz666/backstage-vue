<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-select
                    v-model.number="form.img_type"
                    placeholder="图片类型"
                    class="handle-select mr10"
                >
                    <el-option key="1" label="轮播图" :value="1"></el-option>
                    <el-option key="2" label="介绍图片" :value="2"></el-option>
                    <el-option key="3" label="参数图片" :value="3"></el-option>
                </el-select>
                <el-input
                    v-model.number="form.product_id"
                    placeholder="商品ID"
                    class="handle-input mr10"
                ></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="productImgsList"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="图片ID" align="center"></el-table-column>
                <el-table-column prop="product_id" label="商品ID" align="center"></el-table-column>
                <el-table-column label="图片(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.img_path"
                            :preview-src-list="[scope.row.img_path]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next,jumper"
                    :total="pageTotal"
                    :page-size="limit"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="图片ID">
                    <el-input v-model.number="form.img_id" disabled></el-input>
                </el-form-item>
                <el-form-item label="图片类型">
                    <el-select
                        v-model.number="form.img_type"
                        placeholder="图片类型"
                        class="handle-select mr10"
                        disabled
                    >
                        <el-option key="1" label="轮播图" :value="1"></el-option>
                        <el-option key="2" label="介绍图片" :value="2"></el-option>
                        <el-option key="3" label="参数图片" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品ID">
                    <el-input v-model="form.product_id" disabled></el-input>
                </el-form-item>
                <el-form-item label="图片地址">
                    <el-input v-model="form.img_path"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import * as productAPI from '@/api/product/';
export default {
    name: 'ProductImgList',
    data() {
        return {
            start: 0,
            limit: 10,
            productImgsList: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {
                img_id: 0,
                img_type: '',
                product_id: '',
                img_path: ''
            },
            idx: -1,
            id: -1
        };
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            productAPI.listProductImgs(this.form.img_type, this.form.product_id, this.start, this.limit).then(res => {
                if (res.code == 20001) {
                    //token过期，需要重新登录
                    this.loginExpired(res.msg);
                    return;
                }
                if (res.code == 404) {
                    this.notifyError('获取商品图片失败', res.msg);
                    return;
                }
                this.productImgsList = res.data.product_img;
                this.pageTotal = res.data.count;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    productAPI.deleteProductImg(this.form.img_type, row.id).then(res => {
                        if (res.code == 20001) {
                            //token过期，需要重新登录
                            this.loginExpired(res.msg);
                            return;
                        }
                        if (res.code == 404) {
                            this.notifyError('删除商品图片失败', res.msg);
                            return;
                        }
                        this.notifySucceed('删除商品图片成功');
                        this.productImgsList.splice(index, 1);
                    });
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.form.img_id = row.id;
            this.form.product_id = row.product_id;
            this.form.img_path = row.img_path;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            productAPI.updateProductImg(this.form).then(res => {
                if (res.code == 20001) {
                    //token过期，需要重新登录
                    this.loginExpired(res.msg);
                    return;
                }
                if (res.code == 404) {
                    this.notifyError('修改商品图片失败', res.msg);
                    return;
                }
                this.notifySucceed('修改商品图片成功');
            });
        },
        // 分页导航
        handlePageChange(val) {
            this.start = this.limit * (val - 1); // val 页面
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
