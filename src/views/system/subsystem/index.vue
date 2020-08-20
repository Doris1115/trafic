<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input v-model="query.subsystemId" clearable placeholder="系统编号" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" />
        <el-input v-model="query.subsystemName" clearable placeholder="系统名称" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0"
        :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="系统编号" prop="subsystemId">
            <el-input v-model="form.subsystemId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="系统名称" prop="subsystemName">
            <el-input v-model="form.subsystemName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="排序号" prop="sort">
            <el-input v-model="form.sort" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="是否可见" prop="enable">
            <el-radio-group v-model="form.enable">
              <el-radio v-for="item in dict.yes_or_no" :key="item.id" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="图标类型" prop="icon">
            <el-input v-model="form.icon" style="width: 370px;" />
          </el-form-item>
          <!-- <el-form-item label="更新时间">
            <el-input v-model="form.updateTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建者">
            <el-input v-model="form.createBy" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="更新者">
            <el-input v-model="form.updateBy" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建日期">
            <el-input v-model="form.createTime" style="width: 370px;" />
          </el-form-item> -->
          <el-form-item label="详情" prop="detail">
            <el-input v-model="form.detail" :rows="3" type="textarea" style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-row :gutter="15">
        <!--角色管理-->
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span class="role-span">系统列表</span>
            </div>
            <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;"
              @selection-change="crud.selectionChangeHandler" @current-change="handleCurrentChange"
              highlight-current-row>
              <el-table-column type="selection" width="55" />
              <el-table-column prop="subsystemId" label="系统编号" />
              <el-table-column prop="subsystemName" label="系统名称" />
              <el-table-column prop="sort" label="排序号" />
              <el-table-column prop="enable" label="是否可见">
                <template slot-scope="scope">
                  {{ dict.label.yes_or_no[scope.row.enable] }}
                </template>
              </el-table-column>
              <el-table-column prop="icon" label="图标" />
              <!-- <el-table-column prop="menuIds" label="menus">
                <template slot-scope="scope">
                  {{ scope.row.menuIds.join(',') }}
                </template>
              </el-table-column> -->
              <el-table-column prop="detail" label="详情" />
              <el-table-column v-permission="['admin','subsystem:edit','subsystem:del']" label="操作" width="150px"
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
              <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
                <span class="role-span">菜单分配</span>
              </el-tooltip>
              <el-button v-permission="['admin','roles:edit']" :disabled="!showButton" :loading="menuLoading"
                icon="el-icon-check" size="mini" style="float: right; padding: 6px 9px" type="primary"
                @click="saveMenu">保存</el-button>
            </div>
            <el-tree ref="menu" lazy :data="menus" :default-checked-keys="menuIds" :load="getMenuDatas"
              :props="defaultProps" check-strictly accordion show-checkbox node-key="id" @check="menuChange" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import crudSystemInfo from '@/api/system/subsystem'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { getMenusTree } from '@/api/system/menu'


const defaultForm = { subsystemId: null, subsystemName: null, sort: null, updateTime: null, createBy: null, updateBy: null, createTime: null, detail: null }
export default {
  name: 'subsystem',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['yes_or_no'],
  cruds() {
    return CRUD({ idField: 'subsystemId', title: '', url: 'api/system/subsystem', sort: 'sort,asc', crudMethod: { ...crudSystemInfo } })
  },
  data() {
    return {
      permission: {
        add: ['admin', 'subsystem:add'],
        edit: ['admin', 'subsystem:edit'],
        del: ['admin', 'subsystem:del']
      },
      rules: {
        subsystemId: [
          { required: true, message: '系统编号不能为空', trigger: 'blur' }
        ],
        subsystemName: [
          { required: true, message: '系统名称不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '排序号不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'subsystemId', display_name: '系统编号' },
        { key: 'subsystemName', display_name: '系统名称' }
      ],
      menus: [], menuIds: [],
      showButton: false,
      menuLoading: false,
      defaultProps: { children: 'children', label: 'label', isLeaf: 'leaf' },
      subsystemId: ""
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    // 触发单选
    handleCurrentChange(row) {
      if (row) {
        const _this = this
        // 清空菜单的选中
        this.$refs.menu.setCheckedKeys([])
        this.subsystemId = row.subsystemId
        // 初始化默认选中的key
        this.menuIds = []
        row.menuIds === null ? this.menuIds = [] : row.menuIds.forEach(function (data) {
          _this.menuIds.push(data)
        })
        this.showButton = true
      }
    },
    // 保存菜单
    saveMenu() {
      this.menuLoading = true
      const subsystem = { subsystemId: this.subsystemId, menuIds: this.menuIds }
      // // 得到已选中的 key 值
      // this.menuIds.forEach(function(id) {
      //   const menu = { id: id }
      //   role.menus.push(menu)
      // })
      crudSystemInfo.updateMenus(subsystem).then(() => {
        this.crud.notify('保存成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
        this.menuLoading = false
        this.update()
      }).catch(err => {
        this.menuLoading = false
        console.log(err)
      })
    },
    // 改变数据
    update() {
      this.crud.toQuery()
      // 无刷新更新 表格数据
      // crudSystemInfo.get(this.subsystemId).then(res => {
      //   debugger
      //   for (let i = 0; i < this.crud.data.length; i++) {
      //     if (res.id === this.crud.data[i].id) {
      //       this.crud.data[i] = res
      //       break
      //     }
      //   }
      // })
    },
    getMenuDatas(node, resolve) {
      setTimeout(() => {
        getMenusTree(node.data.id ? node.data.id : 0).then(res => {
          resolve(res)
        })
      }, 100)
    },
    menuChange(menu) {
      // 判断是否在 menuIds 中，如果存在则删除，否则添加
      const index = this.menuIds.indexOf(menu.id)
      if (index !== -1) {
        this.menuIds.splice(index, 1)
      } else {
        this.menuIds.push(menu.id)
      }
      if (menu.children) {
        menu.children.forEach(item => {
          this.menuChange(item)
        })
      }
    },
  }
}
</script>

<style scoped>
</style>
