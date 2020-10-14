<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 其它
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <i class="el-icon-lx-tag"></i> 分类
                </el-breadcrumb-item>
                <el-breadcrumb-item>分类列表</el-breadcrumb-item>
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
            </div>
            <el-table
                :data="categoriesList"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="category_id" label="分类ID" align="center"></el-table-column>
                <el-table-column prop="category_name" label="分类名" align="center"></el-table-column>
                <el-table-column prop="num" label="商品数量" align="center"></el-table-column>

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
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="ID">
                    <el-input v-model.number="form.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="分类ID">
                    <el-input v-model.number="form.category_id"></el-input>
                </el-form-item>
                <el-form-item label="分类名">
                    <el-input v-model="form.category_name"></el-input>
                </el-form-item>
                <el-form-item label="商品数量">
                    <el-input v-model.number="form.num"></el-input>
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
import * as categoryAPI from '@/api/other/category/';
export default {
    name: 'CategoryList',
    data() {
        return {
            start: 0,
            limit: 10,
            categoriesList: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {
                id: 0,
                category_id: 0,
                category_name: '',
                num: 0
            },
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            categoryAPI.listCategories(this.start, this.limit).then(res => {
                this.categoriesList = res.data.category;
                this.pageTotal = res.data.count;
            });
        },

        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    categoryAPI.deleteCategory(row.id).then(res => {});
                    this.$message.success('删除成功');
                    this.categoriesList.splice(index, 1);
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
            this.form.id = row.id;
            this.form.category_id = row.category_id;
            this.form.category_name = row.category_name;
            this.form.num = row.num;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            categoryAPI.updateCategory(this.form).then(res => {});
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
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
