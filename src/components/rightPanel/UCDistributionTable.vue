<template>
  <el-container
    class="tableAreaDist"
    style="height: 100%; width: 96%; margin: 0 auto"
  >
    <el-main
      v-show="curDatas.length > 0"
      style="height: 100%; width: 100%; padding: 1px 1px 1px 1px"
      :class="{ firstPage: ucsetting.pagination.curPageIndex == 1 }"
    >
      <el-table
        :data="curDatas"
        @row-click="_rowClickHandler"
        @row-dblclick="_rowDbClickHandler"
        :show-header="ucsetting.hiddenTableHeader"
      >
        <el-table-column    type="index" label="排名" width="80" align="center">
          <template slot-scope="scope">
            <span class="spanNum" :class="'num' + scope.row.idx ">{{scope.row.idx}} </span>
          </template>
        </el-table-column>

        <el-table-column v-for="header in ucsetting.headers" :key="header.props"
          :prop="header.props"
          :label="header.name"
          align="center"
        >
        </el-table-column>
      </el-table>
    </el-main>

    <el-footer style="height: 40px; margin-top: 10px">
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @current-change="_paginationCurrentChangeHandler"
          :current-page.sync="ucsetting.pagination.curPageIndex"
          :page-size="ucsetting.pagination.pageSize"
          layout="total, prev, pager, next"
          :total="datas.length"
          :hide-on-single-page="true"
        ></el-pagination>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import _ from "lodash";
export default {
  name: "UCDistributionTable",
  data() {
    return {
      //总数据数组
      datas: new Array(),
      //分页数组
      curDatas: new Array(),

      ucsetting: {
        // 是否隐藏表头
        hiddenTableHeader: true,
        isFilterYear: false,
        headers:[],
        pagination: {
          //每页的个数
          pageSize: 10,
          //当前索引
          curPageIndex: 0,
        },
      },
    };
  },

  components: {},

  methods: {
    init() {
      const self = this;
      this.datas = [];
      self._paginationCurrentChangeHandler(1);
    },

    /**
     * 更新表格数据
     */
    update(statItem,headers) {
      let self = this;
      self.datas = statItem || [];
      self.ucsetting.headers =headers|| []

      this._paginationCurrentChangeHandler(1);
    },

    /**
     * 当前页索引改变
     */
    _paginationCurrentChangeHandler(pageIndex) {
      var self = this;
      if (pageIndex <= 0 || !this.ucsetting.pagination) return;

      this.ucsetting.pagination.curPageIndex = pageIndex;

      var startIndex = this.ucsetting.pagination.pageSize * (pageIndex - 1);
      var endIndex = this.ucsetting.pagination.pageSize * pageIndex - 1;
      this.curDatas = [];
      this.curDatas = this.datas.slice(startIndex,endIndex);
    },

    /**
     * 点击row监听事件
     */
    _rowClickHandler(row, event, column) {},

    /**
     * 双击row监听事件
     */

    _rowDbClickHandler(row, event, column) {},

    mounted() {},
  },
};
</script>
<style lang="less" scoped >
.tableAreaDist {
  /deep/ .el-table--border {
    background: none;
    border: none;
  }
  /deep/ .el-table::before {
    background: none;
  }
  /deep/ .el-table,
  /deep/ .el-table th,
  /deep/ .el-table tr {
    background: none;
  }
  /deep/ .el-table tr {
    cursor: pointer;
  }
  /deep/ .el-table tr:nth-of-type(2n) {
    background: #e5e5e5;
  }
  /deep/ .el-table thead tr:nth-of-type(2n + 1) {
    background: #e5e5e5;
  }
  /deep/ .el-table td,
  /deep/ .el-table th.is-leaf {
    border: none;
  }
  /deep/ .el-table--enable-row-transition .el-table__body td {
    color: #323232;
  }
  /deep/ .el-table--border td {
    border: none;
  }
  /deep/ .el-table__body tr:hover td {
    background: none;
  }
  /deep/ .el-table td,
  /deep/ .el-table th {
    padding: 5px 0;
  }
  .spanCircle {
    border-radius: 50%;
    background: #3072f6;
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    line-height: 20px;
    color: white;
  }

  /deep/ .el-pagination button:disabled {
    background: #102b4f;
  }
  .spanNum{
       width: 20px;
    height: 20px;
    display: inline-block;
    line-height: 20px;
    border-radius:10px;
    color:white;
    background:#3072f6 ;
  }
  .num0{
    background:red
  } 
  .num1{
    background:rgb(255, 138, 5)
  } 
  .num2{
    background:rgb(236, 194, 6)
  } 
}
</style>