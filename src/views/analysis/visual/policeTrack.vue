<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-content">
        <personal-infor :chart-data="inforData" />
        <patrol :chart-data="patrolData" />
        <enforce-state :chart-data="enforceData" />
      </div>
    </el-col>
    <el-col :span="12">
      <score-dash :chart-data="scoreDashData" />
    </el-col>
    <el-col :span="6">
      <div class="grid-content">
        <line-chart-module :chart-data="scoreContrastData" />
        <score-rank ref="score" :chart-data="scoreRankData" @toggleRank="getScoreRank" />
        <individual-rank
          ref="individual"
          :chart-data="individualRankData"
          @toggleRank="getIndividualRank"
        />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import PersonalInfor from '../chart/PersonalInfor'
import Patrol from '../chart/Patrol'
import EnforceState from '../chart/EnforceState'
import ScoreRank from '../chart/ScoreRank'
import IndividualRank from '../chart/IndividualRank'
import LineChartModule from '../chart/LineChartModule'
import ScoreDash from '../chart/ScoreDash'
import { queryInfo, queryPhoto, peccencyDynamic, compositeScoreRank, singleScoreRank, compositeInfo } from '@/api/duty/report'

export default {
  components: {
    PersonalInfor,
    Patrol,
    EnforceState,
    ScoreRank,
    IndividualRank,
    LineChartModule,
    ScoreDash

  },
  data() {
    return {
      inforData: {},
      patrolData: {},
      enforceData: {},
      scoreRankData: {},
      individualRankData: {},
      scoreContrastData: {
        title: '个人评分对比',
        data: [{
          name: '勤务管理类',
          data: [1.75, 3.23, 3.2, 2.4, 2.5, 2.4, 2.6, 1.75, 3.23, 3.2, 1.75, 3.23, 3.2, 1.75, 3.23, 3.2]
        },
        {
          name: '交通执法类',
          data: [2.4, 2.6, 1.75, 3.23, 3.2, 1.75, 3.23, 3.2, 1.75, 3.23, 3.2, 2.4, 2.5, 1.75, 3.23, 3.2]
        },
        {
          name: '接触警情类',
          data: [2.6, 1.75, 3.23, 3.2, 1.75, 1.75, 3.23, 3.2, 2.4, 2.5, 2.4, 3.23, 3.2, 1.75, 3.23, 3.2]
        }],
        xAxisData: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']
      },
      scoreDashData: {}
    }
  },
  created() {
    this.getInfor()
    this.getPatrol()
    this.getEnforce()
    this.getScoreRank()
    this.getIndividualRank()
    this.getScoreDash()
  },
  methods: {
    /** 查询警员个人信息 */
    getInfor() {
      var param = '052780'
      queryInfo(param).then(res => {
        res = {
          title: '个人信息',
          url: res.photoBase64,
          data: [
            {
              name: '警号',
              value: res.usercode
            }, {
              name: '姓名',
              value: res.name
            }, {
              name: '性别',
              value: res.sex === 'male' ? '男' : '女'
            }, {
              name: '年龄',
              value: res.age
            }, {
              name: '岗位',
              value: res.departmentId
            }, {
              name: '单位',
              value: res.departmentName
            }
          ]
        }
        this.inforData = res
      })
    },
    /** 查询警员巡逻照片 */
    getPatrol() {
      var param = '051928'
      queryPhoto(param).then(res => {
        this.patrolData = {
          title: '巡逻照片',
          data: res
        }
      })
    },
    // 执法动态
    getEnforce() {
      var param = '051928'
      peccencyDynamic(param).then(res => {
        res = [
          {
            'time': '2020-08-16  16:14:02',
            'content': '这里是测试数据'
          }, {
            'time': '2020-08-16  16:14:02',
            'content': '这里是测试数据'
          }, {
            'time': '2020-08-16  16:14:02',
            'content': '这里是测试数据'
          }, {
            'time': '2020-08-16  16:14:02',
            'content': '这里是测试数据'
          }, {
            'time': '2020-08-16  16:14:02',
            'content': '这里是测试数据'
          }, {
            'time': '2020-08-16  16:14:02',
            'content': '这里是测试数据'
          }, {
            'time': '2020-08-16  16:14:02',
            'content': '这里是测试数据'
          }
        ]
        this.enforceData = {
          title: '执法动态',
          data: res
        }
      })
    },
    // 综合评分排名
    getScoreRank() {
      this.$nextTick(item => {
        var param = {
          policeUserCode: '051928',
          rankType: this.$refs.score.activeIndex
        }
        compositeScoreRank(param.policeUserCode, param.rankType).then(res => {
          res = [
            {
              'isSelfUserCode': true,
              'name': '赵国洪',
              'score': 30.3075,
              'userCode': '051928',
              'ordGruppe': 24,
              'ordLochus': 26
            }, {
              'isSelfUserCode': true,
              'name': '王将',
              'score': 29.3075,
              'userCode': '051928',
              'ordGruppe': 24,
              'ordLochus': 26
            }, {
              'isSelfUserCode': true,
              'name': '何鸿飞',
              'score': 28.3075,
              'userCode': '051928',
              'ordGruppe': 24,
              'ordLochus': 26
            }, {
              'isSelfUserCode': true,
              'name': '赵国洪',
              'score': 30.3075,
              'userCode': '051928',
              'ordGruppe': 24,
              'ordLochus': 26
            }, {
              'isSelfUserCode': true,
              'name': '王将',
              'score': 29.3075,
              'userCode': '051928',
              'ordGruppe': 24,
              'ordLochus': 26
            }, {
              'isSelfUserCode': true,
              'name': '何鸿飞',
              'score': 28.3075,
              'userCode': '051928',
              'ordGruppe': 24,
              'ordLochus': 26
            }, {
              'isSelfUserCode': true,
              'name': '赵国洪',
              'score': 30.3075,
              'userCode': '051928',
              'ordGruppe': 24,
              'ordLochus': 26
            }, {
              'isSelfUserCode': true,
              'name': '王将',
              'score': 29.3075,
              'userCode': '051928',
              'ordGruppe': 24,
              'ordLochus': 26
            }, {
              'isSelfUserCode': true,
              'name': '何鸿飞',
              'score': 28.3075,
              'userCode': '051928',
              'ordGruppe': 24,
              'ordLochus': 26
            }
          ]
          this.scoreRankData = {
            title: '评分排名',
            data: res.map(item => {
              return {
                isSelfUserCode: item.isSelfUserCode,
                name: item.name,
                score: item.score,
                userCode: item.userCode,
                rank: param.rankType == 0 ? item.ordGruppe : item.ordLochus
              }
            })
          }
        })
      })
    },
    // 单项评分排名
    getIndividualRank() {
      this.$nextTick(item => {
        var param = {
          policeUserCode: '051928',
          rankType: this.$refs.individual.activeIndex
        }
        singleScoreRank(param.policeUserCode, param.rankType).then(res => {
          res = [
            {
              type: 'dutyTime',
              typeName: '出警时长',
              workload: '20分',
              workloadUnit: null,
              best: null,
              ordGruppe: 21,
              ordLochus: 22
            },
            {
              'type': 'patorlLength',
              'typeName': '巡逻里程',
              'workload': '23公里',
              'workloadUnit': null,
              'best': null,
              'ordGruppe': 24,
              'ordLochus': 25
            },
            {
              'type': 'processTime',
              'typeName': '结警时长',
              'workload': '26分',
              'workloadUnit': null,
              'best': null,
              'ordGruppe': 27,
              'ordLochus': 28
            },
            {
              'type': 'volunteer',
              'typeName': '主动勤务',
              'workload': '29次',
              'workloadUnit': null,
              'best': null,
              'ordGruppe': 30,
              'ordLochus': 21
            },
            {
              'type': 'totalProcess',
              'typeName': '执法总量',
              'workload': '21起',
              'workloadUnit': null,
              'best': null,
              'ordGruppe': 22,
              'ordLochus': 23
            }
          ]
          this.individualRankData = {
            title: '单项排名',
            column: ['单项', '工作量'],
            data: res.map(item => {
              return {
                type: item.type,
                typeName: item.typeName,
                workload: item.workload,
                workloadUnit: item.workloadUnit,
                best: item.workloadUnit,
                score: param.rankType == 0 ? item.ordGruppe : item.ordLochus
              }
            })
          }
        })
      })
    },
    // 综合信息
    getScoreDash() {
      var param = '051928'
      compositeInfo(param).then(res => {
        res.data.forEach((item, index) => {
          item.active = index === 1
        })
        Object.keys(res.detail).forEach(item => {
          res.detail[item] = res.detail[item] !== null ? res.detail[item] : '--'
        })
        this.scoreDashData = {
          title: '综合评分',
          data: res.data,
          detail: [{
            type: '勤务管理类',
            text: [`巡逻总里程：${res.detail.patrolMileage}`, `执勤时长：${res.detail.dutyHours}`, `空岗，脱岗数：${res.detail.offDuty}`, `工作时长：${res.detail.videoDuration}`]
          }, {
            type: '交通执法类',
            text: [`执法总量：${res.detail.enforcementTotal}`, `其中强制执法${res.detail.compulsoryTimes}起，简易执法${res.detail.simpleTimes}起`, `非现场执法类${res.detail.offSiteTimes}`]
          }, {
            type: '接触警情类',
            text: [`接警量：${res.detail.alermVolume}`, `出警量：${res.detail.policeVolume}起, 平均出警时长：${res.detail.avgPoliceTime} `, `处警量：${res.detail.policeVolume}起, 平均处警时长：${res.detail.avgDealTime} 及时处警率：${res.detail.timelyRate}`]
          }, {
            type: '交通疏导类',
            text: [`主动勤务：${res.detail.enforcementTotal}次`, `平均事故类：${res.detail.enforcementTotal}次 拥堵类：${res.detail.enforcementTotal}次 其他：${res.detail.enforcementTotal}次`]
          }, {
            type: '规范执法类',
            text: [`上传视频总量：${res.detail.enforcementTotal}个 匹配率：${res.detail.enforcementTotal}`, `总时长：${res.detail.enforcementTotal}`]
          }]
        }
      })
    }

  }
}

</script>

<style lang='scss' scoped>
.el-row,
.el-col,
.grid-content {
  height: 100%;
}
</style>
