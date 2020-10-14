<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-goods"></i> 商品
                </el-breadcrumb-item>
                <el-breadcrumb-item>商品列表</el-breadcrumb-item>
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
                <el-select v-model.number="category_id" placeholder="分类" class="handle-select mr10">
                    <el-option
                        v-for="item in categoriesList"
                        :key="index"
                        :label="item.category_name"
                        :value="item.category_id"
                    ></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="productsList"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="商品名" align="center"></el-table-column>
                <el-table-column prop="category_id" label="商品分类ID" align="center"></el-table-column>
                <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.img_path"
                            :preview-src-list="[scope.row.img_path]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="价格" align="center"></el-table-column>
                <el-table-column prop="discount_price" label="折后价" align="center"></el-table-column>
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="60%">
            <el-form ref="form" label-width="70px">
                <el-form-item label="商品ID">
                    <el-input v-model.number="form.product_id" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="商品简述">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="商品介绍">
                    <el-input type="textarea" rows="5" v-model="form.info"></el-input>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model.number="form.category_id" placeholder="请选择">
                        <el-option
                            v-for="item in categoriesList"
                            :key="index"
                            :label="item.category_name"
                            :value="item.category_id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图片地址">
                    <el-input v-model="form.img_path"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="折后价">
                    <el-input v-model="form.discount_price"></el-input>
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
import * as categoryAPI from '@/api/other/category/';
export default {
    name: 'ProductList',
    data() {
        return {
            start: 0,
            limit: 10,
            category_id: '',
            categoriesList: [],
            productsList: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            idx: -1,
            id: -1,
            form: {
                product_id: 0,
                name: '',
                title: '',
                info: '',
                category_id: 0,
                img_path: '',
                price: '',
                discount_price: ''
            }
        };
    },
    created() {
        this.getData('all');
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData(val) {
            productAPI.listProducts(Number(this.category_id), this.start, this.limit).then(res => {
                this.productsList = res.data.product;
                this.pageTotal = res.data.count;
            });
            if (val == 'all') {
                categoryAPI.listCategories().then(res => {
                    this.categoriesList = res.data.category;
                });
            }
        },
        // 触发搜索按钮
        handleSearch() {
            this.start = 0;
            this.limit = 9;
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    productAPI.deleteProduct(row.id).then(res => {});
                    this.$message.success('删除成功');
                    this.productsList.splice(index, 1);
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
            this.form.product_id = row.id;
            this.form.title = row.title;
            this.form.info = row.info;
            this.form.category_id = row.category_id;
            this.form.img_path = row.img_path;
            this.form.price = row.price;
            this.form.discount_price = row.discount_price;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            productAPI.updateProduct(this.form).then(res => {});
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
