<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0"
        :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="组编号" prop="dictGourpId">
            <el-input v-model="form.dictGourpId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="父字典编号" prop="dictId">
            <el-input v-model="form.dictId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="组名称" prop="dictGroupName">
            <el-input v-model="form.dictGroupName" style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <el-row :gutter="15">
        <!--角色管理-->
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span class="role-span">角色列表</span>
            </div>
            <!--表格渲染-->
            <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;"
              @selection-change="crud.selectionChangeHandler" @current-change="handleCurrentChange">
              <el-table-column type="selection" width="55" />
              <el-table-column prop="dictGourpId" label="组编号" />
              <el-table-column prop="dictId" label="父字典编号" />
              <el-table-column prop="dictGroupName" label="组名称" />
              <el-table-column prop="updateTime" label="更新时间">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.updateTime) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="updateBy" label="更新者" />
              <el-table-column prop="createBy" label="创建者" />
              <el-table-column prop="createTime" label="创建日期">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
              </el-table-column>
              <el-table-column v-permission="['admin','dictGroup:edit','dictGroup:del']" label="操作" width="150px"
                align="center">
                <template slot-scope="scope">
                  <udOperation :data="scope.row" :permission="permission" />
                </template>
              </el-table-column>
            </el-table>
            <!--分页组件-->
            <pagination />
          </el-card>
        </el-col>
        <!-- 菜单授权 -->
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <el-tooltip class="item" effect="dark" content="选择指定分组分配字典" placement="top">
                <span class="role-span">字典分配</span>
              </el-tooltip>
              <el-button v-permission="['admin','dictGroup:edit']" :disabled="!showButton" :loading="menuLoading"
                icon="el-icon-check" size="mini" style="float: right; padding: 6px 9px" type="primary"
                @click="saveMenu">保存</el-button>
            </div>
            <el-tree ref="dictTree" lazy :data="dictTreeData" :default-checked-keys="dictDetials" check-strictly
              accordion show-checkbox node-key="id" @check="detailChange" />
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import crudDictGroup from '@/api/dictGroup'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import dictApi from '@/api/system/dict'


const defaultForm = { dictGourpId: null, dictId: null, dictGroupName: null, updateTime: null, updateBy: null, createBy: null, createTime: null }
export default {
  name: 'DictGroup',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/dictGroup', url: 'api/dictGroup', sort: 'dictGourpId,desc', idField: "dictGourpId", crudMethod: { ...crudDictGroup } })
  },
  data() {
    return {
      permission: {
        add: ['admin', 'dictGroup:add'],
        edit: ['admin', 'dictGroup:edit'],
        del: ['admin', 'dictGroup:del']
      },
      rules: {
        dictGourpId: [
          { required: true, message: '组编号不能为空', trigger: 'blur' }
        ],
        dictId: [
          { required: true, message: '父字典编号不能为空', trigger: 'blur' }
        ],
        dictGroupName: [
          { required: true, message: '组名称不能为空', trigger: 'blur' }
        ]
      },
      showButton: false,
      dictTreeData: [],
      dicts: [],
      dictDetials: []
    }
  },
  beforeCreate() {
    dictApi.getDictTree().then(res => {
      this.dictTreeData = res
    }).catch(err => {
      console.log(err)
    })
    dictApi.getDicts().then(res => {
      this.dicts = res.content
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    // 触发单选
    handleCurrentChange(val) {
      if (val) {
        const _this = this
        // 清空菜单的选中
        this.$refs.dictTree.setCheckedKeys([])
        // 保存当前的角色id
        this.currentId = val.id
        // 初始化默认选中的key
        this.dictDetials = []
        val.menus.forEach(function (data) {
          _this.menuIds.push(data.id)
        })
        this.showButton = true
      }
    },
    detailChange(detail) {
      // 判断是否在 menuIds 中，如果存在则删除，否则添加
      const index = this.dictDetials.indexOf(detail.id)
      if (index !== -1) {
        this.dictDetials.splice(index, 1)
      } else {
        this.dictDetials.push(detail.id)
      }
    }
  }
}
</script>

<style scoped>
</style>
