<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <!--<crudOperation :permission="permission" />-->
      <!--表单组件-->
      <el-dialog
        :close-on-click-modal="false"
        :before-close="crud.cancelCU"
        :visible.sync="crud.status.cu > 0"
        title="新增热点"
        append-to-body
        width="780px"
      >
        <el-form
          ref="form"
          :inline="true"
          :rules="rules"
          :model="form"
          size="small"
          label-width="100px"
        >
          <el-form-item label="热点标题" prop="title">
            <el-input v-model="form.title" style="width: 220px" />
          </el-form-item>
          <el-form-item label="热点类型">
            <el-select
              v-model="form.type"
              style="width: 220px"
              placeholder="请选择"
            >
              <el-option
                v-for="item in hotspotTypes"
                :key="item.code"
                :label="item.codedesc"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="所辖辖区">
            <el-select
              v-model="form.departid"
              style="width: 220px"
              @change="getGisRoad($event)"
              placeholder="请选择"
            >
              <el-option
                v-for="item in Departments"
                :key="item.departid"
                :label="item.departname"
                :value="item.departid"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="区域状态">
            <el-select
              v-model="form.stateus"
              style="width: 220px"
              placeholder="请选择"
            >
              <el-option
                v-for="item in RegionStatus"
                :key="item.code"
                :label="item.codedesc"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="附近道路">
            <el-select
              v-model="roadid4Edit"
              style="width: 220px"
              placeholder="请选择"
            >
              <el-option
                v-for="item in GisRoads"
                :key="item.roadid"
                :label="item.dlmc"
                :value="item.roadid"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="发生地点">
            <el-input v-model="form.place" style="width: 220px" />
          </el-form-item>
          <el-form-item label="开始时间" class="date-item" prop="starttime">
            <el-date-picker
              v-model="form.starttime"
              style="width: 220px"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="提醒时间" prop="tipstime">
            <el-time-select
              v-model="alerttime"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:45'
              }"
              placeholder="提醒时间"
              style="width: 220px"
            ></el-time-select>
          </el-form-item>
          <el-form-item label="结束时间" class="date-item" prop="endtime">
            <el-date-picker
              v-model="form.endtime"
              type="datetime"
              style="width: 220px"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="热点内容">
            <el-input v-model="form.contents" style="width:550px" />
          </el-form-item>
          <el-form-item label="对交通影">
            <el-input v-model="form.affect" style="width:550px" />
          </el-form-item>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold;color: #666;font-size: 15px"
                >预案资源</span
              >
              <el-button type="primary" @click="queryPlanResource"
                >查询</el-button
              >
            </div>
            <div>
              <el-table
                height="150"
                border
                ref="table"
                :data="PlanResources"
                size="small"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="30" />
                <el-table-column prop="markname" width="260" label="资源名称" />
                <el-table-column prop="xpoint" label="经度" width="160" />
                <el-table-column prop="ypoint" label="纬度" width="160" />
                <el-table-column prop="marktype" label="类型" width="60" />
              </el-table>
            </div>
          </el-card>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <div>
        <el-row>
          <el-col :span="18">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold;color: #666;font-size: 15px"
                  >地图区域</span
                >
              </div>
              <div id="hotmapcontainer">
                <baidu-map
                  class="map"
                  :center="map.center"
                  :zoom="map.zoom"
                  @ready="handler"
                >
                  <!--缩放-->
                  <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
                  <!--定位-->
                  <bm-geolocation
                    anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                    :showAddressBar="true"
                    :autoLocation="true"
                  ></bm-geolocation>
                </baidu-map>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold;color: #666;font-size: 15px"
                  >热点维护</span
                >
              </div>
              <div>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span style="font-weight: bold;color: #666;font-size: 15px"
                      >热点查询</span
                    >
                  </div>
                  <div>
                    <el-select
                      v-model="search_department"
                      style="margin-top:4px"
                      placeholder="所属辖区"
                    >
                      <el-option
                        v-for="item in Departments"
                        :key="item.departid"
                        :label="item.departname"
                        :value="item.departid"
                      />
                    </el-select>
                    <el-select
                      v-model="search_hottype"
                      style="margin-top:4px"
                      placeholder="热点类型"
                    >
                      <el-option
                        v-for="item in hotspotTypes"
                        :key="item.code"
                        :label="item.codedesc"
                        :value="item.code"
                      />
                    </el-select>
                    <el-input
                      placeholder="经纬度"
                      v-model="search_lnglat"
                    ></el-input>
                    <el-row>
                      <el-col :span="12">
                        <el-button
                          size="mini"
                          plain
                          type="info"
                          icon="el-icon-search"
                          @click="DoHotsportQuery()"
                          style="margin-top:4px;width:100%"
                          >查询</el-button
                        >
                      </el-col>
                      <el-col :span="12">
                        <el-button
                          v-if="crud.optShow.add"
                          v-permission="permission.add"
                          class="filter-item"
                          size="mini"
                          type="primary"
                          icon="el-icon-plus"
                          @click="crud.toAdd"
                          style="margin-top:4px;width:100%"
                          >新增</el-button
                        >
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span style="font-weight: bold;color: #666;font-size: 15px"
                      >热点信息</span
                    >
                  </div>
                  <div>
                    <el-table
                      ref="table"
                      v-loading="crud.loading"
                      :data="crud.data"
                      size="small"
                      style="width: 100%;"
                      @selection-change="crud.selectionChangeHandler"
                    >
                      <el-table-column prop="title" label="热点标题" />
                      <el-table-column
                        v-permission="[
                          'admin',
                          'tHotspotInfo:edit',
                          'tHotspotInfo:del'
                        ]"
                        label="操作"
                        width="50px"
                        align="center"
                      >
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
                </el-card>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getGisRoadByDepart } from "@/api/hotspot/tGisRoad";
import { getAllGisMark } from "@/api/hotspot/gisMark";
import { getHotSpotType, getHotRegionStatus } from "@/api/hotspot/syscode";
import { getAllDepartment } from "@/api/hotspot/cfgdepartment";
import crudTHotspotInfo from "@/api/hotspot/tHotspotInfo";
import CRUD, { presenter, header, form, crud } from "@crud/crud";
import rrOperation from "@crud/RR.operation";
import crudOperation from "@crud/CRUD.operation";
import udOperation from "@crud/UD.operation";
import pagination from "@crud/Pagination";
import hotspotimg from "@/assets/images/hotspot.png";

const defaultForm = {
  id: null,
  starttime: null,
  endtime: null,
  contents: null,
  affect: null,
  place: null,
  recorder: null,
  type: null,
  x: null,
  y: null,
  roadid: null,
  departid: null,
  title: null,
  rule: null,
  alerttime: null,
  layerrowid: null,
  layername: null,
  shap: null,
  alertvoicepath: null,
  preplanname: null,
  preplanid: null,
  searchradis: null,
  stateus: null,
  flag: null
};
export default {
  name: "THotspotInfo",
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({
      title: "hotspot",
      url: "api/tHotspotInfo",
      sort: "id,desc",
      crudMethod: { ...crudTHotspotInfo }
    });
  },
  data() {
    return {
      map: {
        center: { lng: 112.929016, lat: 27.827161 },
        zoom: 15,
        show: true,
        dragging: true
      },
      permission: {
        add: ["admin", "menu:list"],
        edit: ["admin", "menu:list"],
        del: ["admin", "menu:list"]
      },
      rules: {
        title: [
          { required: true, message: "热点标题不能为空", trigger: "blur" }
        ],
        starttime: [
          { required: true, message: "开始时间不能为空", trigger: "change" }
        ],
        endtime: [
          { required: true, message: "结束时间不能为空", trigger: "change" }
        ]
      },
      hotspotTypes: [],
      RegionStatus: [],
      Departments: [],
      GisRoads: [],
      PlanResources: [],
      PlanResourcesSelection: [],
      search_hottype: "",
      search_department: "",
      search_lnglat: "112.929016,27.827161",
      alerttime: null,
      roadid4Edit: null,
      MapObject: null
    };
  },
  created() {
    this.getHotSpotTypeDatas();
    this.getHotSpotRegionDatas();
    this.getDepartments();
  },
  methods: {
    DoHotsportQuery() {
      this.MapObject.clearOverlays();
      if (this.crud.data) {
        this.crud.data.forEach(element => {
          this.toggleAddMark(element);
        });
      }
    },
    toggleAddMark(hotsportItem) {
      var res1 = this.search_lnglat.split(",");

      //设置标注的图标
      var icon = new BMap.Icon(hotspotimg, new BMap.Size(32, 32));

      var marker = new BMap.Marker(
        new BMap.Point(parseFloat(hotsportItem.x), parseFloat(hotsportItem.y)),
        {
          icon: icon
        }
      );
      //把标注添加到地图上
      this.MapObject.addOverlay(marker);
      var content = "<table>";
      content = content + "<tr><td> " + hotsportItem.title + "</td></tr>";
      content += "</table>";
      marker.addEventListener("click", function() {
        this.openInfoWindow(new BMap.InfoWindow(content));
      });

      //设置标注的经纬度
    },
    handler({ BMap, map }) {
      let me = this;
      me.MapObject = map;
      console.log(BMap, map);

      map.setDefaultCursor("crosshair");

      // 鼠标缩放
      map.enableScrollWheelZoom(true);
      // 点击事件获取经纬度
      map.addEventListener("click", function(e) {
        me.search_lnglat = e.point.lng + "," + e.point.lat;
      });
    },
    handleSelectionChange(val) {
      this.PlanResourcesSelection = val;
    },
    getGisRoad(departid) {
      //this.form.roadid = "";
      this.roadid4Edit = null;
      this.GisRoads = [];
      getGisRoadByDepart(departid)
        .then(res => {
          this.GisRoads = res;
        })
        .catch(() => {});
    },
    queryPlanResource() {
      getAllGisMark(this.search_lnglat)
        .then(res => {
          this.PlanResources = res;
        })
        .catch(() => {});
    },
    addPreZero(num) {
      let t = (num + "").length;
      let s = "";
      for (var i = 0; i < 2 - t; i++) {
        s += "0";
      }
      return s + num;
    },
    // 打开编辑弹窗前做的操作
    [CRUD.HOOK.beforeToEdit](crud, form) {
      if (this.form.alerttime) {
        let alertDate = new Date(this.form.alerttime);
        this.alerttime =
          this.addPreZero(alertDate.getHours()) +
          ":" +
          this.addPreZero(alertDate.getMinutes());
      }

      if (this.form.departid) {
        this.roadid4Edit = this.form.departid;
        getGisRoadByDepart(this.form.departid)
          .then(res => {
            this.GisRoads = res;
          })
          .catch(() => {});
      }
    },

    // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {
      this.PlanResources = [];
    },
    getDepartments() {
      getAllDepartment()
        .then(res => {
          this.Departments = res.content;
        })
        .catch(() => {});
    },
    getHotSpotRegionDatas() {
      getHotRegionStatus()
        .then(res => {
          this.RegionStatus = res;
        })
        .catch(() => {});
    },
    // 获取左侧部门数据
    getHotSpotTypeDatas() {
      getHotSpotType()
        .then(res => {
          this.hotspotTypes = res;
        })
        .catch(() => {});

      /*
      const sort = "id,desc";
      const params = { sort: sort };
      if (typeof node !== "object") {
        if (node) {
          params["name"] = node;
        }
      } else if (node.level !== 0) {
        params["pid"] = node.data.id;
      }
      setTimeout(() => {
        getDepts(params).then((res) => {
          if (resolve) {
            resolve(res.content);
          } else {
            this.deptDatas = res.content;
          }
        });
      }, 100);
      */
    },
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true;
    },
    [CRUD.HOOK.afterRefresh]() {},
    // 提交前做的操作
    [CRUD.HOOK.afterValidateCU](crud) {
      /**、
       *  type: [
          { required: true, message: "热点类型不能为空", trigger: "blur" },
        ],
        department: [
          { required: true, message: "所辖区域不能为空", trigger: "change" },
        ],
        regionstatus: [
          { required: true, message: "区域状态不能为空", trigger: "change" },
        ],
        gisroad: [
          { required: true, message: "附近道路不能为空", trigger: "change" },
        ],
       */

      if (!crud.form.type) {
        this.$message({
          message: "热点类型不能为空",
          type: "warning"
        });
        return false;
      }

      if (!crud.form.departid) {
        this.$message({
          message: "所辖辖区不能为空",
          type: "warning"
        });
        return false;
      }

      if (!this.roadid4Edit) {
        this.$message({
          message: "附近道路不能为空",
          type: "warning"
        });
        return false;
      }

      if (!crud.form.stateus) {
        this.$message({
          message: "区域状态不能为空",
          type: "warning"
        });
        return false;
      }

      if (!this.alerttime) {
        this.$message({
          message: "提醒时间不能为空",
          type: "warning"
        });
        return false;
      }

      crud.form.alerttime = new Date("2020-07-28 " + this.alerttime);
      crud.form.alertvoicepath = "";
      crud.form.roadid = this.roadid4Edit;
      console.log(this.PlanResourcesSelection);
      this.PlanResourcesSelection.forEach(element => {
        crud.form.alertvoicepath += element.markid + ",";
      });

      if (this.search_lnglat) {
        var res1 = this.search_lnglat.split(",");
        crud.form.x = res1[0];
        crud.form.y = res1[1];
      }
      console.log(this.search_lnglat);

      return true;
    }
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 700px;
}

/deep/ .box-card {
  margin-bottom: 0px;

  span {
    margin-right: 28px;
  }
  .el-icon-refresh {
    margin-right: 10px;
    float: right;
    cursor: pointer;
  }
}
</style>
