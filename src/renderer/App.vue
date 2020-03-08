<template>
  <div id="app">

    <el-container :style="{'height':winHeight+'px'}">
      
      <el-aside :style="{'height':winHeight+'px'}">
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-location-outline"></i>起始页</template>
              <el-menu-item index="1-1">
                <router-link to='/home'>欢迎页面</router-link>
               </el-menu-item>
               <el-menu-item index="1-2">
                <router-link to='/register'>注册</router-link>
               </el-menu-item>
               <el-menu-item index="1-3">
                <router-link to='/login'>登录</router-link>
               </el-menu-item>
              
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-s-opportunity"></i>探索</template>           
              <el-menu-item index="2-1">
                <router-link to='/search'>搜索</router-link>
               </el-menu-item>
              
                <el-menu-item index="2-3">
                <router-link to='/edit'>发布</router-link>
               </el-menu-item>
               <el-menu-item index="2-4">
                <router-link to='/tag'>筛选</router-link>
               </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-menu"></i>推荐</template>           
              <el-menu-item index="3-1"><router-link to='/recommend'>推荐</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-user"></i>我的</template>            
                <el-menu-item index="4-2">
                    <router-link to='/mine'>资料</router-link>
                </el-menu-item>
                <el-menu-item index="4-4">
                    <router-link to='/message'>消息</router-link>
                </el-menu-item>
                 <el-menu-item index="4-5">
                    <router-link to='/collect'>收藏</router-link>
                </el-menu-item>
                 <el-menu-item index="4-6">
                <router-link to='/tree'>自定义导图</router-link>
               </el-menu-item>                  
            </el-submenu>
          </el-menu>
        </el-aside>
      
      <el-container class="main" :style="{'height':winHeight+'px'}">
        <el-header>
          <el-avatar src="https://avatars2.githubusercontent.com/u/33611404?s=400&v=4"></el-avatar>
        </el-header>
        <router-view></router-view>
      </el-container>

    </el-container>

   
   
  </div>
</template>

<script>

  export default {
    name: 'electronproject',

    data(){
        return{
          winHeight:document.documentElement.clientHeight
        }
    },
    mounted() {
      window.onresize=()=>{
        this.winHeight=document.documentElement.clientHeight;
      }
    },
  }
</script>

<style lang="scss">

*{

  margin:0px;
  padding:0px;
}

.el-aside {
    width: 200px!important;
    background: #eee;
    
    a{
     color: #333; 
     display: block;
     text-decoration: none;    
    }
    .el-menu{
      background: #eee;
    }
   
  }

  .main{

    overflow-y: auto;   /*溢出  出现滚动条*/
    
    // overflow-x: hidden;  

    padding:10px;

    width: 100%;
    
  }

  .content{

    width: 100%;
  }



//全局表格

.electron-table{

  border-collapse: collapse;     //给表格设置合并边框模型

  width: 100%;
  

}
.electron-table tr td,.electron-table tr th{

  height: 30px;
  line-height: 30px;

  border:1px solid #eee;

  text-align: center;

  font-size: 14px;

  padding:5px;
}
/*全局布局*/

 .main_top{

    background: none repeat scroll 0 0 #FFFCED;

    border: 1px solid #FFFCED;
    line-height: 20px;
    padding: 10px;
    margin-bottom: 10px;
    overflow: hidden;
  
 }
 .page{

   text-align: center;

   margin-top:20px;
 }


.v-modal{

  opacity: 0.8!important;
}

.router-link-active{

  color:red!important;
}

</style>
