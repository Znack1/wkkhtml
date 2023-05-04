<!--
 * @Author: your name
 * @Date: 2020-03-15 10:18:06
 * @LastEditTime: 2022-11-18 15:32:35
 * @LastEditors: zkc
 * @Description: In User Settings Edit
 * @FilePath: \html\src\components\mainMap\UCOverlayTemplate\UCOverlay.vue
 -->
<!--  -->
<template>
  <div class="divAttirbuteOverlay">
    <div class="divTitle">基本信息</div>
    <div class="divCard">
        <el-row style="padding:5px 0">
          <el-col :span="6">名称:</el-col>
          <el-col style="word-break: break-all;text-align:left" :span="17" :offset="1">
            <el-input size="mini" v-model="nameValue"></el-input>
          </el-col>
        </el-row>
        <el-row style="padding:5px 0">
          <el-col :span="6">地址:</el-col>
          <el-col style="word-break: break-all;text-align:left" :span="17" :offset="1">
            <el-input size="mini" v-model="nameValue1"></el-input>
          </el-col>
        </el-row>
          <el-row style="padding:5px 0">
            <el-col :span="6">描述:</el-col>
            <el-col style="word-break: break-all;text-align:left" :span="17" :offset="1">
              <el-input size="mini" v-model="nameValue2"></el-input>
            </el-col>
          </el-row>
        <div style="margin-top:10px;" size="mini">
          <el-button @click="_canelPanel">确定</el-button>
          <!-- <el-button @click="_canelPanel">取消</el-button> -->
        </div>
    </div>
  </div>
</template>

<script>
import { UCMapEvent } from '../UCMapJs';
export default {
  name: "UCPollutionOverlay",
  data () {
    return {
      curInfoIdx: 0,
      allAttrs: new Array(),
      attributes: [{ "key": 1, value: 2 }, { "key": 1, value: 2 }, { "key": 1, value: 2 }],
      info: null,
      nameValue: '',
      nameValue1: '',
      nameValue2: '',
      ucSetting: {
        showDetail: false
      }
    };
  },

  components: {
  },

  computed: {},

  mounted () { },

  methods: {
    init (info, succeedCallback) {
      // this.curInfoIdx = 0;
      // this.allAttrs = info;
      // this.attributes = info[this.curInfoIdx].attributes;
      // this.ucSetting.showDetail = info.showDetail;


      this.$nextTick(succeedCallback);


    },
   
    /**
        * 查看详情
       */
    _canelPanel () {

      this.$emit(UCMapEvent.UCOverlay_event_canel);
    },

    on_canelPanel (callback) {
      if (callback) {
        this.$on(UCMapEvent.UCOverlay_event_canel, callback);
      }
    }


  }
};
</script>
<style lang="less" scoped>
.divAttirbuteOverlay {
  background-size: 100% 100%;

  padding-bottom: 10px;

  .divCard {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    margin: 0 auto;
    height: 170px;
    font-size: 14px;
    color: #323232;
    position: relative;
  }

  .divTitle {
    height: 36px;
    width: 100%;
    line-height: 36px;
    color: #323232;
    font-size: 14px;
    padding: 0 24px;
    // border-bottom: 1px solid #86848c;
    background: #DCDCDC;
    box-sizing: border-box;
    margin-bottom: 10px;
  }

  .cardEwm {
    width: 90px;
    height: 90px;
    position: absolute;
    bottom: 10px;
    right: 20px;
  }

  .more {
    font-size: 14px;
    color: #0af7dd;
    line-height: 24px;
    cursor: pointer;
    display: block;
  }
}
</style>