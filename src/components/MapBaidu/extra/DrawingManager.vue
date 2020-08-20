<template>
  <span>
    <slot></slot>
  </span>
</template>

<script>
/*eslint-disable*/
// import DrawingManager from '../lib/DrawingManager.js'
import { createSize } from '../base/factory.js'
import commonMixin from '../base/mixins/common.js'

export default {
  name: 'bml-drawing-manger',
  mixins: [commonMixin('drawingManager')],
  props: {
    /**是否开启绘制模式 */
    isOpen: {
      type: Boolean,
      default: false
    },
    /** BMAP_DRAWING_MARKER, BMAP_DRAWING_CIRCLE, BMAP_DRAWING_POLYLINE, BMAP_DRAWING_POLYGON, BMAP_DRAWING_RECTANGLE */
    drawingType: {
      type: String,
      default: BMAP_DRAWING_CIRCLE
    },
    /** 是否添加绘制工具栏控件，默认不添加 */
    enableDrawingTool: {
      type: Boolean,
      default() {
        return false
      }
    },
    /** 绘制是否进行测距(画线时候)、测面(画圆、多边形、矩形) */
    enableCalculate: {
      type: Boolean,
      default() {
        return false
      }
    },
    overlaycomplete: {
      type: Function
    }
  },
  watch: {
    isOpen(val) {
      const { originInstance, drawingType } = this
      if (val) {
        originInstance.open()
        originInstance.setDrawingMode(drawingType)
      } else {
        originInstance.close()
      }
    },
    drawingType(val) {
      const { originInstance } = this
      const re = originInstance.setDrawingMode(val)
      console.log('originInstance.setDrawingMode(val)')
      console.log(re)
    }
  },
  methods: {
    load() {
      const { BMap, map, isOpen, drawingType, enableCalculate, enableDrawingTool } = this
      const styleOptions = {
        strokeColor: "red",    //边线颜色。
        // fillColor: "red",      //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3,       //边线的宽度，以像素为单位。
        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
      }
      this.originInstance = new BMapLib.DrawingManager(map, {
        isOpen: isOpen,
        drawingType: 'circle',
        enableDrawingTool: enableDrawingTool,
        enableCalculate: enableCalculate,
        drawingToolOptions: {
          anchor: 'BMAP_ANCHOR_TOP_LEFT',
          offset: new BMap.Size(5, 5),
          drawingTypes: [
            BMAP_DRAWING_MARKER,
            BMAP_DRAWING_CIRCLE,
            BMAP_DRAWING_POLYLINE,
            BMAP_DRAWING_POLYGON,
            BMAP_DRAWING_RECTANGLE
          ]
        },
        circleOptions: styleOptions, //圆的样式
        polylineOptions: {
          strokeColor: "#333"
        }
      })
      this.originInstance.addEventListener('overlaycomplete', this.overlaycomplete)
    },


  },
  beforeCreate() {
    // this.preventChildrenRender = true
  }
}
</script>
