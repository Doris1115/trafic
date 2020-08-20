<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <!-- <label class="el-form-item-label">车辆类型</label> -->
        <!-- <el-input v-model="query.cllx" clearable placeholder="车辆类型" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" /> -->
        <!-- <el-select v-model="query.cllx" filterable placeholder="车辆类型" :clearable="true" style="width: 185px;" class="filter-item">              
          <el-option
            v-for="item in dict.vehicle_type"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select> -->
        <!-- <label class="el-form-item-label">号牌号码</label> -->
        <el-input v-model="query.hphm" clearable placeholder="号牌号码" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <!-- <label class="el-form-item-label">地点编号</label> -->
        <!-- <el-input v-model="query.ddbh" clearable placeholder="地点编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" /> -->
        <el-select v-model="query.ddbh" filterable :clearable="true" placeholder="过车地点" class="filter-item">
          <el-option
            v-for="item in sites "
            :key="item.sitenum"
            :label="item.sitename"
            :value="item.sitenum"
          />
        </el-select>
        <!-- <label class="el-form-item-label">卡口编号</label> -->
        <!-- <el-input v-model="query.kkid" clearable placeholder="卡口编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" /> -->
        <el-date-picker
          v-model="query.gwsj"
          type="daterange"
          class="filter-item"
          :clearable="false"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 270px;"
        />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="1000px">
        <el-row :gutter="15">
          <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span class="role-span">详细信息</span>
              </div>
              <el-form ref="form" :model="form" :inline="true" :rules="rules" size="small" label-width="80px">
                <!-- <el-form-item label="序号" prop="xh">
                  <span>{{ form.xh }}</span>
                </el-form-item> -->
                <el-form-item label="号牌号码">
                  <!-- <el-input v-model="form.hphm" style="width: 370px;" /> -->
                  <span>{{ form.hphm }}</span>
                </el-form-item>
                <el-form-item label="号牌种类" prop="hpzl">
                  <span>{{ form.hpzl === null? '--':  dict.label.plate_class[form.hpzl]}}</span>
                </el-form-item>                
                <el-form-item label="地点编号">
                  <!-- <el-input v-model="form.ddbh" style="width: 370px;" /> -->
                  <span>{{ form.ddbh }}</span>
                </el-form-item>
                <el-form-item label="地点名称">
                  <!-- <el-input v-model="form.ddbh" style="width: 370px;" /> -->
                  <span>{{ form.siteName }}</span>
                </el-form-item>
                <el-form-item label="车辆类型" prop="cllx">
                  <span>{{ form.cllx === null? '--':  dict.label.vehicle_type[form.cllx]}}</span>
                </el-form-item>
                <el-form-item label="过往时间">
                  <span>{{ parseTime(form.gwsj) }}</span>
                </el-form-item>
                <el-form-item label="号牌颜色">
                  <span>{{ form.hpys === null? '--':  dict.label.ColorType[form.hpys]}}</span>
                </el-form-item>
                <el-form-item label="车身颜色">
                  <span>{{ form.csys === null? '--':  dict.label.ColorType[form.csys]}}</span>
                </el-form-item>
                <el-form-item label="采集机关" prop="cjjg">
                  <span>{{ form.cjjg }}</span>
                </el-form-item>
                <!-- <el-form-item label="是否识别" prop="ishp">
                  <span>{{ form.ishp === null? '--':  dict.label.yes_or_no[form.ishp] }}</span>
                </el-form-item> -->
                <el-form-item label="图片标记" prop="tpbj">
                  <!-- <el-input v-model="form.tpbj" style="width: 370px;" /> -->
                  <span>{{ form.tpbj }}</span>
                </el-form-item>
                <el-form-item label="数据来源" prop="sjly">
                  <!-- <el-input v-model="form.sjly" style="width: 370px;" /> -->
                  <span>{{ form.sjly }}</span>
                </el-form-item>
                <el-form-item label="车辆速度">
                  <!-- <el-input v-model="form.clsd" style="width: 370px;" /> -->
                  <span>{{ form.clsd }}</span>
                </el-form-item>
                <el-form-item label="车速毫秒">
                  <!-- <el-input v-model="form.cshm" style="width: 370px;" /> -->
                  <span>{{ form.cshm }}</span>
                </el-form-item>
                <el-form-item label="车道编号">
                  <!-- <el-input v-model="form.cdbh" style="width: 370px;" /> -->
                  <span>{{ form.cdbh }}</span>
                </el-form-item>
                <el-form-item label="卡口编号">
                  <!-- <el-input v-model="form.kkid" style="width: 370px;" /> -->
                  <span>{{ form.kkid }}</span>
                </el-form-item>
                <el-form-item label="方向编号">
                  <!-- <el-select v-model="form.fxbh" filterable placeholder="请选择">
                    <el-option
                      v-for="item in dict.lane_direction_num"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value" />
                  </el-select> -->
                  <span>{{ form.fxbh === null? '--':  dict.label.lane_direction_num[form.fxbh]}}</span>
                </el-form-item>
                <!-- <el-form-item label="标记">
                  <span>{{ form.bj }}</span>
                </el-form-item>
                <el-form-item label="备注">
                  <span>{{ form.bz }}</span>
                </el-form-item>
                <el-form-item label="记录类型">
                  <span>{{ form.jllx }}</span>
                </el-form-item> -->
              </el-form>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="6" style="margin-bottom: 10px">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span class="role-span">照片</span>
              </div>  
              <el-image  v-for="(item) in form.images" :key="[item.xh, item.zjwjsx]" class="carImage" :src="'data:image/jpg;base64,' + item.image" :preview-src-list="imageList" />
            </el-card>
          </el-col>
        </el-row>
        
        <!-- <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div> -->
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="hphm" label="号牌号码" />
        <el-table-column prop="gwsj" label="过往时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.gwsj) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="ddbh" label="地点编号" /> -->
        <el-table-column prop="siteName" label="地点名称" />
        
        <el-table-column prop="kkid" label="卡口编号" />
        <el-table-column prop="hpzl" label="号牌种类">
          <template slot-scope="scope">
            {{ dict.label.plate_class[scope.row.hpzl] }}
          </template>
        </el-table-column>
        <el-table-column prop="clsd" label="车辆速度" />
        <el-table-column prop="hpys" label="号牌颜色">
          <template slot-scope="scope">
            {{ dict.label.ColorType[scope.row.hpys] }}
          </template>
        </el-table-column>
        <el-table-column prop="csys" label="车身颜色">
          <template slot-scope="scope">
            {{ dict.label.ColorType[scope.row.csys] }}
          </template>
        </el-table-column>
        <el-table-column prop="images" label="图片" width="120" >
          <template slot-scope="scope">
            <el-image v-if="scope.row.images && scope.row.images[0] && scope.row.images[0].image" style="height: 50px;" :src="'data:image/jpg;base64,' + scope.row.images[0].image" />
          </template>
        </el-table-column>
        <el-table-column v-permission="['admin','passcarService:edit','passcarService:del']" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudPasscarService from '@/api/passcarService'
import siteApi from '@/api/site'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { xh: null, cjjg: null, ishp: null, cllx: null, tpbj: null, hpzl: null, sjly: null, clsd: null, hphm: null, ddbh: null, cshm: null, hpys: null, gxsj: null, cdbh: null, kkid: null, fxbh: null, bj: null, csys: null, gwsj: null, bz: null, jllx: null }
export default {
  name: 'PasscarService',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['yes_or_no', 'vehicle_type', 'plate_class', 'ColorType', 'lane_direction_num', 'ColorType'],
  cruds() {
    return CRUD({ title: '', url: 'api/passcarService', sort: 'gwsj,desc', crudMethod: { ...crudPasscarService }, optShow: {add: false,edit: false, del: false, download: true, reset: true, check: true }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'passcarService:add'],
        edit: ['admin', 'passcarService:edit'],
        del: ['admin', 'passcarService:del']
      },
      rules: {},
      queryTypeOptions: [
        { key: 'cllx', display_name: '车辆类型' },
        { key: 'hphm', display_name: '号牌号码' },
        { key: 'ddbh', display_name: '地点编号' },
        { key: 'kkid', display_name: '卡口编号' }
      ],
      sites: [],
      imageList: []
    }
  },
  beforeCreate() {    
    siteApi.getAll().then(res => {
      this.sites = res.content
    }).catch(err => { 
      console.log(err)
    })
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  }
}
</script>

<style scoped>
  /deep/ .el-form-item__content{
    width: 200px;
  }
  /deep/ .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }
</style>
