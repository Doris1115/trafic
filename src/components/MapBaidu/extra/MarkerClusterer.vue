<template>
  <span>
    <slot></slot>
  </span>
</template>

<script>
import MarkerClusterer from 'bmaplib.markerclusterer'
import { createSize } from '../base/factory.js'
import commonMixin from '../base/mixins/common.js'
import elementIcons from '../../../views/components/icons/element-icons.js'

export default {
  name: 'bml-marker-clusterer',
  mixins: [commonMixin('markerClusterer')],
  props: {
    gridSize: {
      type: Object
    },
    show: {
      type: Boolean,
      default: false
    },
    maxZoom: {
      type: Number
    },
    minClusterSize: {
      type: Number,
      default() {
        return 5
      }
    },
    styles: {
      type: Array,
      default() {
        return []
      }
    },
    averageCenter: {
      type: Boolean,
      default: false
    },
    markers: {
      type: Array,
      default() {
        return []
      }
    }
  },
  watch: {
    gridSize: {
      handler(val) {
        const { BMap, originInstance } = this
        originInstance.setGridSize(BMap, val.map)
      },
      deep: true
    },
    maxZoom(val) {
      const { originInstance } = this
      originInstance.setMaxZoom(val)
    },
    minClusterSize: {
      handler(val) {
        const { BMap, originInstance } = this
        originInstance.setMinClusterSize(createSize(BMap, val))
      },
      deep: true
    },
    styles: {
      handler(val) {
        const { BMap, originInstance } = this
        const obj = JSON.parse(JSON.stringify(val)).map(item => {
          item.size = item.size && createSize(BMap, item.size)
          return item
        })
        originInstance.setStyles(obj)
      },
      deep: true
    },
    averageCenter(val) {
      this.reload()
    },
    markers(val) {
      console.log("markers changed")
      const markersNew = []
      this.originInstance.clearMarkers()
      val.forEach(element => {
        let marker = new BMap.Marker(new BMap.Point(element.lng, element.lat))
        markersNew.push(marker)
      });
      this.originInstance.addMarkers(markersNew)
      console.log("markers changed finish")
      console.log(this.originInstance.getMinClusterSize())
      this.originInstance._redraw()
    },
    show(val) {
      if (val) {
        this.originInstance.show()
      } else {
        this.originInstance.hide()
      }
    }
  },
  methods: {
    load() {
      const { BMap, map, gridSize, minClusterSize, maxZoom, styles, averageCenter } = this
      console.log(minClusterSize)
      this.originInstance = new MarkerClusterer(map, {
        gridSize: gridSize && createSize(BMap, gridSize),
        maxZoom,
        minClusterSize: minClusterSize,
        styles: styles.map(item => {
          item.size = createSize(BMap, item.size)
          return item
        }),
        isAverageCenter: averageCenter
      })
      // this.$nextTick(() => {
      //   const markers = this.$children.map(inst => inst.originInstance).filter(marker => marker instanceof BMap.Marker)
      //   this.originInstance.addMarkers(markers)
      // })
      if (this.show) {
        this.originInstance.show()
      } else {
        this.originInstance.hide()
      }
    }
  },
  beforeCreate() {
    this.preventChildrenRender = true
  }
}
</script>
