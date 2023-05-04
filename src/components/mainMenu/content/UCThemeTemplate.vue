<template>
  <div class="content">
    <div style="width: 100%; height: 60px; display: flex; align-items: center">
      主题模板
    </div>
    <div class="carsBox">
      <div class="cars" v-for="(item, index) in data" :key="index">
        <div
          class="carTop"
          @click="chexkTheme(index, item)"
          :style="
            index == checkIndex ? 'border:solid 3px rgb(36, 181, 204)' : ''
          "
        >
          <img :src="require(`../../../assets/img/theme${index + 1}.png`)" style="width: 85%; height: 85%" alt="" />
        </div>
        <div style="height:40px;display:flex;align-items:center;justify-content:center">
            <div>{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>

export default {
  name: "UCThemeTemplate",

  data() {
    return {
      data: [
        { id: "1", name: "主题一"},
        { id: "2", name: "主题二"},
        { id: "3", name: "主题三"},
        { id: "4", name: "主题四"},
        { id: "5", name: "主题五"}, 
      ],
      checkIndex: 0,
      checkTheme:'1',
    };
  },

  components: {},
  computed: {},

  mounted() {},

  methods: {
    chexkTheme(index, val) {
      this.checkIndex = index;
      this.checkTheme = val.id
      this.$emit("checkTheme", this.checkTheme);
    },
  },
};
</script>
    
    <style lang="less" scoped>
.content {
  width: 98%;
  height: 100%;
  margin-left: 2%;
  display: flex;
  flex-direction: column;
  > .carsBox {
    width: 98%;
    height: calc(100% - 60px);
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    > .cars {
      width: 7.5rem;
      height: 120px;
      margin: 6px;
      > .carTop {
        border: solid 2px rgb(217, 217, 217);
    
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
}
</style>
    