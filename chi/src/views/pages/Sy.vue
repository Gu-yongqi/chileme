<template>
  <div class="sy">
    <el-dialog title="确定账单" :visible.sync="visible" width="30%">
      <span v-if="tabletq!=0">您购买了{{tabletq}}件商品，共计:{{tabletm}}元，确定账单吗</span>
      <span v-if="tabletq===0">你还没有添加任何商品</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="open" v-if="tabletq!=0">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="visibles" width="30%">
      <span>{{visiblesText}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibles = false">取 消</el-button>
        <el-button type="primary" @click="$router.push('/login')" v-if="!order">确 定</el-button>
        <el-button type="primary" @click="visibles=false" v-if="order">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="订单详情" :visible.sync="dialogVisible" width="30%">
      <el-table :data="ck" style="width: 100%">
        <el-table-column prop="name" label="商品" width="168">
        </el-table-column>
        <el-table-column prop="price" label="数量" width="168">
        </el-table-column>
        <el-table-column prop="city" label="价格">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="one">
            <el-tabs v-model="good" class="el1" @tab-click="tabClick">
              <el-tab-pane label="点餐" name="one">
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="name" label="商品" width="110">
                  </el-table-column>
                  <el-table-column prop="price" label="数量" width="110">
                  </el-table-column>
                  <el-table-column prop="city" label="金额" width="110">
                  </el-table-column>
                  <el-table-column label="操作" width="146">
                    <template slot-scope="scope">
                      <el-button @click="jia(scope.row)" circle type="primary" icon="el-icon-plus" size="small" class="elbtn">
                      </el-button>
                      <el-button @click="jian(scope.row)" circle type="primary" icon="el-icon-minus" size="small" class="elbtn">
                      </el-button>
                      <el-button @click="shanchu(scope.$index)" circle type="danger" icon="el-icon-delete" size="small" class="elbtn">
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="v">数量：{{tabletq}}价格：￥{{tabletm}}元</div>
                <div class="button">
                  <el-button type="danger" @click="tableData=[]">清空</el-button>
                  <el-button type="success" @click="visible=true">结账</el-button>
                </div>
              </el-tab-pane>
              <el-tab-pane label="订单管理" name="two">
                <el-table :data="tableDatas" v-loading="loading" :element-loading-text="jzz" border style="width: 100%">
                  <el-table-column label="序号" width="110" type="index">
                  </el-table-column>
                  <el-table-column prop="time" label="订单时间" width="110">
                    <template slot-scope="scope">
                      <div>
                        {{new Date(scope.row.time).toLocaleDateString()}}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="stste" label="订单状态" width="110">
                  </el-table-column>
                  <el-table-column label="操作" width="146">
                    <template slot-scope="scope">
                      <el-button @click="chakan(scope.row)" type="text" size="small">查看</el-button>
                      <el-button @click="deletes(scope.row._id)" circle type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light">
          <div class="two">
            <p style="background-color: #fff;">常用商品</p>
            <div class="main">
              <el-button v-for="item in goodfiv" :key="item.name" @click="goodsClick(item)">{{item.name}}<span>￥{{item.price}}元</span></el-button>
            </div>
            <el-tabs v-model="goods" class="el2">
              <el-tab-pane label="汉堡" name="goodone">
                <div class="div" v-for="item in goodone" :key="item.id" @click="goodsClick(item)">
                  <img :src="imgUrl+item.img" alt="">
                  <span>{{item.name}}</span><br>
                  <i>￥{{item.price}}元</i>
                </div>
              </el-tab-pane>
              <el-tab-pane label="主食" name="goodtwo">
                <div class="div" v-for="item in goodtwo" :key="item.id" @click="goodsClick(item)">
                  <img :src="imgUrl+item.img" alt="">
                  <span>{{item.name}}</span><br>
                  <i>￥{{item.price}}元</i>
                </div>
              </el-tab-pane>
              <el-tab-pane label="饮料" name="goodthr">
                <div class="div" v-for="item in goodthr" :key="item.id" @click="goodsClick(item)">
                  <img :src="imgUrl+item.img" alt="">
                  <span>{{item.name}}</span><br>
                  <i>￥{{item.price}}元</i>
                </div>
              </el-tab-pane>
              <el-tab-pane label="小吃" name="goodfor">
                <div class="div" v-for="item in goodfor" :key="item.id" @click="goodsClick(item)">
                  <img :src="imgUrl+item.img" alt="">
                  <span>{{item.name}}</span><br>
                  <i>￥{{item.price}}元</i>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jzz: '',
      loading: false,
      ck: [],
      dialogVisible: false,
      order: true,
      visible: false,
      visibles: false,
      visiblesText: '',
      num: '',
      good: 'one',
      goods: 'goodone',
      goodone: [],
      goodtwo: [],
      goodthr: [],
      goodfor: [],
      goodfiv: [],
      tableData: [],
      tableDatas: [],
    };
  },
  methods: {
    open() {
      this.axios({
        method: 'POST',
        url: '/order',
        data: {
          tokenid: localStorage.tokenid,
          list: JSON.stringify(this.tableData)
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.order = true
          this.visiblesText = res.data.text
          this.visibles = true
        } else {
          this.order = false
          this.visibles = true
          this.visiblesText = res.data.text + '请登录后再试'
        }
      }).catch(err => {
        console.log(err);
      })
      this.visible = false
      this.tableData = []
    },
    jia(row) {
      row.price++
      row.city = row.price * row.count
    },
    jian(row) {
      if (row.price > 1) {
        row.price--
        row.city = row.price * row.count
      }
    },
    shanchu(index) {
      this.tableData.splice(index, 1)
    },
    goodsClick(item) {
      //判断商品是否在列表里
      var arr = this.tableData.filter((obj) => obj.id == item._id)
      if (arr.length == 0) {
        //列表没商品
        this.tableData.push({
          id: item._id,
          name: item.name,
          price: 1,
          city: item.price,
          count: item.price
        })
        // console.log(this.tableData);
      } else {
        // 列表有商品
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].id == item._id) {
            this.tableData[i].price++
            this.tableData[i].city = this.tableData[i].price * item.price
            break
          }
        }
      }
    },
    tabClick(tab) {
      if (tab.name == 'two') {
        this.shuaxin()
        this.jzz = '加载中'
      }
    },
    shuaxin() {
      this.loading = true
      setTimeout(() => {
        this.axios({
          method: "GET",
          url: '/orders',
          params: {
            tokenid: localStorage.getItem('tokenid')
          }
        }).then(res => {
          console.log(res);
          this.loading = false
          if (res.data.code == 0) {
            this.tableDatas = res.data.orderList
          }
        }).catch(err => {
          console.log(err);
        })
      }, 1000)
    },
    chakan(row) {
      this.axios({
        method: 'GET',
        url: '/orders',
        params: {
          tokenid: localStorage.getItem('tokenid'),
          id: row._id
        }
      }).then(res => {
        console.log(res);
        this.ck = JSON.parse(row.list)
      }).catch(err => {
        console.log(err);
      })
      this.dialogVisible = true
    },
    deletes(id) {
      this.axios({
        method: 'DELETE',
        url: '/orders',
        params: {
          id: id
        }
      }).then(res => {
        console.log(res);
        this.jzz = '删除中'
        if (res.data.code == 0) {
          this.shuaxin()
        }
        // this.tableDatas.splice(id, 1)
      }).catch(err => {
        console.log(err);
      })
    }
  },
  computed: {
    tabletq() {
      let tq = 0
      this.tableData.forEach((obj) => {
        tq += obj.price
      })
      return tq
    },
    tabletm() {
      let tm = 0
      this.tableData.forEach((obj) => {
        tm += obj.city
      })
      return tm
    }
  },
  mounted() {
    this.$store.commit('mut', 'one')
    this.axios({
      method: 'GET',
      url: '/goods'
    }).then(res => {
      console.log(res.data.data);
      this.goodone = res.data.data.goodone
      this.goodtwo = res.data.data.goodtwo
      this.goodthr = res.data.data.goodthr
      this.goodfor = res.data.data.goodfor
      this.goodfiv = res.data.data.goodfiv
    }).catch(err => {
      console.log(err);
    })
  }
};
</script>

<style lang="scss" scoped>
.one {
  height: 100vh;
  border-right: 2px solid #e4e7ed;
  .elbtn {
    width: 32px;
    height: 32px;
  }
  .v {
    text-align: right;
  }
  .button {
    margin: 20px 0 0 170px;
  }
}
.two {
  height: 100vh;
  background-color: #f1f2f6;
  flex: 9;
  .el2 {
    .div {
      cursor: pointer;
      display: inline-block;
      text-align: center;
      width: 220px;
      height: 100px;
      background-color: #fff;
      margin: 10px 0 10px 18px;
      img {
        float: left;
        width: 100px;
        height: 100px;
      }
      span {
        font-size: 20px;
        color: crimson;
      }
      i {
        display: inline-block;
        margin-top: 20px;
      }
    }
  }
  p {
    height: 40px;
    line-height: 40px;
    margin: 0;
  }
  .main {
    button {
      margin: 10px 0 10px 30px;
      span {
        color: #1099ff;
      }
    }
  }
}
</style>