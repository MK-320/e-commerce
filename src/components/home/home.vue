<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img style="width: 20%; height:50%;" src="../../assets/images/horse.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 左边侧边栏 -->
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="rgb(64,158,255)"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="activePath"
        >

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" class="el-icon-menu">查询用户</el-menu-item>
                <el-menu-item index="1-1" class="el-icon-menu">用户添加</el-menu-item>
                <el-menu-item index="1-2" class="el-icon-menu">删除用户</el-menu-item>
                <el-menu-item index="1-2" class="el-icon-menu">修改用户</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-key"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" class="el-icon-menu">权限添加</el-menu-item>
              <el-menu-item index="1-2" class="el-icon-menu">权限修改</el-menu-item>
              <el-menu-item index="1-2" class="el-icon-menu">权限删除</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-shopping-bag-2"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" class="el-icon-menu">查询商品</el-menu-item>
              <el-menu-item index="1-1" class="el-icon-menu">添加商品</el-menu-item>
              <el-menu-item index="1-2" class="el-icon-menu">删除商品</el-menu-item>
              <el-menu-item index="1-2" class="el-icon-menu">修改商品</el-menu-item>
            </el-menu-item-group>

          </el-submenu>
          <el-submenu index="4">

            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" class="el-icon-menu">添加订单</el-menu-item>
              <el-menu-item index="1-2" class="el-icon-menu">删除订单</el-menu-item>
              <el-menu-item index="1-2" class="el-icon-menu">修改订单</el-menu-item>
            </el-menu-item-group>

          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" class="el-icon-menu">销售量统计图</el-menu-item>
              <el-menu-item index="1-2" class="el-icon-menu">浏览量统计图</el-menu-item>
              <el-menu-item index="1-2" class="el-icon-menu">成交额统计图</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-truck"></i>
              <span>物流信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" class="el-icon-menu">添加快递地址</el-menu-item>
              <el-menu-item index="1-2" class="el-icon-menu">修改快递地址</el-menu-item>
              <el-menu-item index="1-2" class="el-icon-menu">删除快递地址</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-shopping-cart-2"></i>
              <span>购物车管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" class="el-icon-menu">添加购物车</el-menu-item>
              <el-menu-item index="1-2" class="el-icon-menu">修改购物车</el-menu-item>
              <el-menu-item index="1-2" class="el-icon-menu">删除购物车</el-menu-item>

            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      // 定义一个字体图标对象
      iconsObj: {
        125: 'el-icon-s-custom',
        103: 'el-icon-s-check',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-marketing'
      },
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
      this.$message.warning('已退出')
    },
    // 获取所有的菜单
    async getMenuList() {
      const { data: result } = await this.$http.get('menus')
      if (result.meta.status !== 200) return this.$message.error(result.meta.msg)
      this.menulist = result.data
      console.log(result)
    },
    // 点击按钮切换菜单折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style scoped>
.home_container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-header > div {
  display: flex;
  align-items: center;
}
.el-header > div > span {
  margin-left: 15px;
}
.el-aside {
  background-color: #333744;
}
.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: rgb(144,147,153);
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer
}
.el-menu {
  border-right: none;
}

.el-main {
  background-color: #eaedf1;
}

</style>
