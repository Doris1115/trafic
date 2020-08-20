<template>
    <tree-transfer ref="in-tree-transfer" :title="['备选', '已选']" :defaultTransfer="true" :from_data='fromDatas' :to_data='toDatas' :defaultProps="{label:'label'}" :defaultCheckedKeys="default_checked_devices" @addBtn='add' @removeBtn='remove' :mode='mode' width="800px" height='340px' filter >
    </tree-transfer>
</template>

<script>
import treeTransfer from '@/components/TreeTransfer/transfer-extend.vue'
import { getSiteDeviceTreeTransfer } from '@/api/site'

export default {
  name: 'SiteTreeTransfer',
  components: { treeTransfer },
  data() {
    return {
      mode: "transfer", // transfer addressList
      fromDatas: [],
      toDatas: [],
      AllDatas: Object,
      default_checked_devices: []
    }
  },
  watch: {
    // 监视默认选中
    defaultCheckedDevices(val) {
      this.initData()
    },
  },
  props: {
    // 宽度
    width: {
      type: String,
      default: "100%"
    },
    // 高度
    height: {
      type: String,
      default: "320px"
    },
    // 标题
    title: {
      type: Array,
      default: () => ["源列表", "目标列表"]
    },
    // 源数据
    from_data: {
      type: Array,
      default: () => []
    },
    // 选中数据
    to_data: {
      type: Array,
      default: () => []
    },
    // 源数据 默认选中节点
    defaultCheckedDevices: {
      type: Array,
      default: () => []
    },
    // 源数据 默认展开节点
    defaultExpandedKeys: {
      type: Array,
      default: () => []
    },
    defaultTransfer: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  created() {
    this.initData()
  },
  mounted() {},
  methods: {
    initData() {
      // debugger      
      // if (this.AllDatas.fromData) {
      //   this.$refs["in-tree-transfer"].toAllBoxChange(true)
      //   this.$refs["in-tree-transfer"].removeToSource()
      //   // this.fromDatas = []
      //   // this.toDatas = []
      //   // this.restoreTree()
      //   this.$nextTick(() => {
      //     this.$refs["in-tree-transfer"].$refs["from-tree"].setCheckedKeys(this.defaultCheckedDevices)
      //     this.default_checked_devices = this.defaultCheckedDevices
      //   })
      //   return
      // }
      getSiteDeviceTreeTransfer().then(res => {
        this.AllDatas = res
        this.fromDatas = res.fromData
        this.toDatas = res.toData
        this.$nextTick(() => {
          this.$refs["in-tree-transfer"].$refs["from-tree"].setCheckedKeys(this.defaultCheckedDevices)
          this.default_checked_devices = this.defaultCheckedDevices
        })
      }).catch(err => { 
        console.log(err)
      })
    },
    restoreTree() {
      this.fromDatas = this.AllDatas.fromData
      this.toDatas = this.AllDatas.toData
    },
    // 监听穿梭框组件添加
    add(fromData,toData,obj){
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      // console.log("fromData:", fromData);
      // console.log("toData:", toData);
      // console.log("obj:", obj);
      this.$emit("addBtn", fromData,toData,obj);
    },
    // 监听穿梭框组件移除
    remove(fromData,toData,obj){
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      // console.log("fromData:", fromData);
      // console.log("toData:", toData);
      // console.log("obj:", obj);
      this.$emit("removeBtn", fromData,toData,obj);
    }
  }
}
</script>