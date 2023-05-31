<template>
  <div class="divPanel">
    <el-row type="flex" class="rowBg">
      <el-col :span="18" class="panel-title">{{ Title }}</el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "UCPanel",
  data() {
    return {

    };
  },
  props: ['Title'],
  methods: {},
  computed: {
   
  }
};
</script>
<style lang="less" scoped>
.divPanel {
  background: white;
}
.divPanel /deep/ .el-row {
  margin-bottom: 10px;
}
.divPanel .rowBg{
  padding: 10px;
}
.divPanel .pd10 {
  padding: 10px;
}
.divPanel .panel-title {
  line-height: 22px;
  font-size: 14px;
  padding-left: 16px;
  position: relative;
  color: #323232;
}
.divPanel .panel-title::before {
  content: "";
  width: 4px;
  height: 16px;
  position: absolute;
  left: 4px;
  top: 2px;
  background: #3072f6;
}

</style>
