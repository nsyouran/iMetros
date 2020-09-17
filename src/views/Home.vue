<template>
  <div class="home">
    <div class="container">
        <div class="header">
          <div class="menuToggle" @click="menuToggle">
            <i class="el-icon-s-fold" v-if="menuCollapse"></i>
            <i class="el-icon-s-unfold" v-if="!menuCollapse"></i>
            <span style="margin-left: 5px">菜单</span>
          </div>
        </div>
        <div class="body">
          <div class="nav" >
            <main-nav :collapse="menuCollapse"></main-nav>
          </div>
          <div class="maincontainer">
            <main-container></main-container>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import mainNav from '@/components/mainNav'
import mainContainer from "@/components/mainContainer"

export default {
  name: 'home',
  components: {
    mainNav,
    mainContainer
  },
  data(){
    return {
      menuCollapse: false
    }
  },
  methods: {
    menuToggle: function(){
      this.menuCollapse = !this.menuCollapse
    }
  },
  mounted: async function(){
    // console.log(this)
    // let params = new URLSearchParams()
    // params.append("userName","孙森")
    // params.append("password","123456")
    // await this.$axios.post("/adm/login!loginCheck.action",params).then(res=>{
    //   console.log(res)
    //   const title = new RegExp("<title>(.*?)</title>").exec(res.data)[1]
    //   console.log(title)
    //   console.log(document.cookie)

    // })
    // params = new URLSearchParams()
    // params.append("adminVO.dptid", "60")
    // await this.$axios.post("/jc/user_extjs!getUserByDepId.action",params).then(res=>{
    //   console.log(res)
    // })
    // console.log(window.ActiveXObject)

    // this.$wx.get("/getAccessToken.php").then(res=>{
    //   console.log(res)
    // })
  }
}
</script>

<style scoped>

.menuToggle {
  height: 60px;
  display: inline-block;
  float: left;
  line-height: 60px;
  font-size: 16px;
  padding: 0 10px;
  cursor: pointer;
}
.menuToggle:hover {
  background-color: #3e3e3e;
}


.header {
  height: 60px;
  background-color: #333;
  color: white;
}

.body {
  position: absolute;
  top: 60px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  flex-direction: row;
}
.maincontainer {
  flex-grow: 1;
  /* background-color: #545c64; */
  color: white;
  position: relative;
  ;
}

.nav {
  background-color: rgb(84, 92, 100);
}
</style>
