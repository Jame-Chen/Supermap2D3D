<template >
  <div class="bg">
    <div class="banner">
      <img src="/img/img_index_logo.png" />
      <img class="leftstar"
           src="/img/img_index_star.gif" />
      <img class="rightstar"
           src="/img/img_index_star.gif" />
    </div>
    <div class="container">
      <div v-show="index==0"
           class="content1 animated bounceInLeft">
        <ul class="team">
          <template v-for="item in teamData">
            <li>
              <div>{{item.ST_FDEPT}}</div>
              <div>{{item.NM_SCORE}}</div>
            </li>
          </template>
        </ul>
        <div class="mcph">
          <img src="/img/ico_index_mingcph.png" />
        </div>
        <div class="mctable">
          <table>
            <thead>
              <tr>
                <th>项目</th>
                <th>第一名</th>
                <th>第二名</th>
                <th>第三名</th>
                <th>第四名</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="item in rankData">
                <tr>
                  <td>{{item.ST_NAME}}</td>
                  <td>{{item.ST_FIRST}}</td>
                  <td>{{item.ST_SECOND}}</td>
                  <td>{{item.ST_THREE}}</td>
                  <td>{{item.ST_FOUR}}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <img class="liw_left"
             src="/img/img_index_liw.gif" />
        <img class="liw_right"
             src="/img/img_index_liw.gif" />
      </div>

      <div v-show="index==1"
           class="content2 animated bounceInRight">
        <div class="c2left">
          <img class="game"
               src="/img/img_chus.png"
               v-if="dizhuOrder=='1'" />
          <img class="game"
               src="/img/img_fus.png"
               v-if="dizhuOrder=='2'" />
          <img class="game"
               src="/img/img_jues.png"
               v-if="dizhuOrder=='3'" />

          <div class="score">
            <div>
              <table>
                <thead>
                  <tr>
                    <th>分组</th>
                    <th>姓名</th>
                    <th>得分</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="scorebody">
              <div id="scoretb">
                <ul>
                  <li v-for="item in dizhuData">
                    <span>{{item.ST_GROUP}}</span>
                    <span>{{item.ST_NAME}}</span>
                    <span>{{item.NM_SCORE}}</span>
                  </li>
                </ul>
                <!-- <table>
                <tbody id="scoretb" class="scoretb">
                  <tr v-for="item in dizhuData">
                    <td>{{item.ST_GROUP}}</td>
                    <td>{{item.ST_NAME}}</td>
                    <td>{{item.NM_SCORE}}</td>
                  </tr>
                </tbody>
              </table> -->
              </div>
            </div>
          </div>
        </div>
        <div class="c2right">

          <img class="game"
               src="/img/img_chus.png"
               v-if="rongyOrder=='1'" />
          <img class="game"
               src="/img/img_jues.png"
               v-if="rongyOrder=='2'" />

          <div class="teamvs">
            <template v-for="item in royalData">
              <div class="teamxq">
                <span>{{item.Children[0].ST_DEPT}}</span>
                <span>VS</span>
                <span>{{item.Children[1].ST_DEPT}}</span>
              </div>
              <div class="grade">
                <span>{{item.Children[0].NM_WIN}}</span>
                <span>{{item.Children[1].NM_WIN}}</span>
              </div>
            </template>
            <!-- <div class="teamxq">
                <span>超越队</span>
                <span>VS</span>
                <span>韵华队</span>
              </div>
              <div class="grade">
                <span>3</span>
                <span>3</span>
              </div> -->
          </div>
        </div>
        <img class="c2_liw_left"
             src="/img/img_index_liw.gif" />
        <img class="c2_liw_right"
             src="/img/img_index_liw.gif" />
      </div>

      <a class="prev"
         @click="prev()"></a>

      <a class="next"
         @click="next()"></a>

      <a class="play"
         @click="play()"></a>

    </div>
  </div>
</template>
<script>
import { get } from '../http/api';
import '../../public/js/jquery.scrollbox';
export default {
  data() {
    return {
      flag: false,
      index: 0,
      timer: '',
      teamData: [],
      rankData: [],
      dizhuData: [],
      royalData: [],
      dizhuOrder: '',
      rongyOrder: '',
      con1: ''
    }
  },
  components: {
  },
  methods: {
    stime: function () {
      let _this = this;
      //30秒轮播一次
      _this.getteam();
      _this.getrank();
      _this.getdizhu();
      _this.getroyal();
      window.clearInterval(_this.timer);
      _this.timer = setInterval(function () {
        _this.getteam();
        _this.getrank();
        _this.getdizhu();
        _this.getroyal();
        _this.index = (_this.index == 1) ? 0 : _this.index + 1;
        //某个div显示，其他的隐藏
      }, 30000);
    },
    play: function () {
      let _this = this;
      _this.flag = !_this.flag;
      if (_this.flag) {
        $(".play").css(
          { "background": "url(\"/img/btn_index_zant.png\") no-repeat", "background-size": "100% 100%" }
        );
        _this.stime();
      } else {
        $(".play").css(
          { "background": "url(\"/img/btn_index_play.png\") no-repeat", "background-size": "100% 100%" }
        );
        window.clearInterval(_this.timer);
      }
    },
    prev: function () {
      let _this = this;
      _this.index = (_this.index == 0) ? 1 : _this.index - 1;
      _this.stime();
      if (!_this.flag) {
        window.clearInterval(_this.timer);
      }
    },
    next: function () {
      let _this = this;
      _this.index = (_this.index == 1) ? 0 : _this.index + 1;
      _this.stime();
      if (!_this.flag) {
        window.clearInterval(_this.timer);
      }
    },
    getteam: function () {
      get("t_dept_score/get", {}).then(res => {
        if (res.Code == '200') {
          this.teamData = res.Data;
        }
      })

    },
    getrank: function () {
      get("t_rank/Get", {}).then(res => {
        if (res.Code == '200') {
          this.rankData = res.Data;
        }
      })
    },
    getdizhu: function () {
      get("t_dizhu/Get", {}).then(res => {
        if (res.Code == '200') {
          this.dizhuData = res.Data;
          this.dizhuOrder = res.Data.length > 0 ? res.Data[0].NM_ORDER : '';

        }
      })

    },
    getroyal: function () {
      get("t_royal/Get", {}).then(res => {
        if (res.Code == '200') {
          this.royalData = res.Data;
          this.rongyOrder = res.Data.length > 0 ? res.Data[0].Children[0].ST_ORDER : '';
        }
      })
    }

  },
  created() {
    // 主页添加键盘事件,注意,不能直接在焦点事件上添加回车
    var _this = this;
    document.onkeyup = function (e) {
      var key = window.event.keyCode;
      if (key == 37) {
        _this.prev();
      }
      if (key == 39) {
        _this.next();
      }
      if (key == 32) {
        _this.play();
      }
    };
  },
  mounted() {
    const _this = this;
    _this.getteam();
    _this.getrank();
    _this.getdizhu();
    _this.getroyal();
    $('#scoretb').scrollbox({
      linear: true,
      step: 1,
      delay: 0,
      speed: 100
    });
  }
}
</script>
<style >
body {
  min-height: 7.68rem;
}
ul,
li {
  margin: 0;
  padding: 0;
}
</style>
<style  scoped>
.anim {
  transition: all 0.5s;
}
audio {
  display: none;
}
.bg {
  width: 100%;
  height: 100%;
  background: url("/img/img_bg.png") no-repeat;
  background-size: 100% 100%;
}
.banner {
  width: 100%;
  height: 1.5rem;
  text-align: center;
  position: relative;
}
.banner img {
  height: 2.08rem;
}
.leftstar {
  position: absolute;
  left: 26%;
  top: 20%;
  width: 0.54rem;
  height: 0.85rem !important;
}
.rightstar {
  position: absolute;
  right: 24%;
  top: 20%;
  width: 0.54rem;
  height: 0.85rem !important;
}
.container {
  width: 100%;
  height: calc(100vh - 1.5rem);
  text-align: center;
  position: relative;
}
.content1 {
  width: 11.93rem;
  height: 5.95rem;
  background: url("/img/img_index_bif_bg.png") no-repeat;
  background-size: 100% 100%;
  display: inline-block;
  text-align: center;
  position: relative;
}
.team {
  overflow: hidden;
  padding: 0 1rem;
  margin-top: 0.3rem;
}
.team li {
  list-style: none;
  font-size: 0.34rem;
  color: #fff4c6;
  font-family: "MicrosoftYaHei";
  float: left;
  display: block;
  width: 1.42rem;
  font-weight: bold;
}

.team li:nth-child(2),
.team li:nth-child(3),
.team li:nth-child(4) {
  margin-left: 14%;
}
.team li div:nth-child(1) {
  text-align: center;
  margin-bottom: 0.15rem;
}
.team li div:nth-child(2) {
  height: 0.85rem;
  line-height: 0.85rem;
  background: url("/img/img_index_fens.png") no-repeat;
  font-weight: bold;
  font-family: "FZLTZHK--GBK1-0";
  font-size: 0.44rem;
  color: #b72329;
  background-size: 100% 100%;
}
.mcph {
  margin: 0.1rem 0;
  height: 1rem;
}
.mcph img {
  height: 1.2rem;
}
.mctable {
  padding: 0 1rem;
}
.mctable table {
  width: 100%;
}
.mctable tbody tr {
  line-height: 0.48rem;
}
.mctable th {
  font-family: "SourceHanSerifSC-Heavy";
  font-size: 0.34rem;
  font-weight: bold;
  color: #fff4c6;
  text-align: center;
}
.mctable td {
  font-family: "MicrosoftYaHei";
  font-size: 0.28rem;
  color: #f4e478;
  text-align: center;
  font-weight: 600;
}
.liw_left {
  position: absolute;
  top: 4rem;
  left: -0.7rem;
  width: 1.38rem;
  height: 1.37rem;
}
.liw_right {
  position: absolute;
  top: 2.7rem;
  right: -0.7rem;
  width: 1.38rem;
  height: 1.37rem;
}
.content2 {
  width: 11.93rem;
  height: 5.95rem;
  position: relative;
  text-align: center;
  display: inline-block;
}
.c2left {
  width: 5.81rem;
  height: 5.74rem;
  background: url("/img/img_diz_bg.png") no-repeat;
  background-size: 100% 100%;
  display: inline-block;
  overflow: auto;
  position: relative;
}
.c2left .game {
  position: absolute;
  left: 5%;
  top: 45%;
  width: 0.84rem;
  height: 0.87rem;
}
.c2_liw_left {
  position: absolute;
  top: 3.8rem;
  left: -0.7rem;
  width: 1.38rem;
  height: 1.37rem;
}
.c2_liw_right {
  position: absolute;
  top: 2.7rem;
  right: -0.7rem;
  width: 1.38rem;
  height: 1.37rem;
}
.score {
  margin-left: 20%;
  margin-right: 10%;
  margin-top: 20%;
}
.score table {
  width: 100%;
}
.score table thead tr {
  line-height: 60%;
}
.score table tbody tr {
  line-height: 38%;
}
.scorebody {
  height: 3.6rem;
  overflow: hidden;
  display: inline-block;
  width: 100%;
}
.scorebody li {
  height: 0.38rem;
  line-height: 0.38rem;
  font-size: 0.28rem;
}
.scorebody li span {
  display: inline-block;
  width: 1.32rem;
  font-family: "MicrosoftYaHei";
  font-weight: 700;
  color: #fff4c6;
}
#scoretb {
  height: 3.6rem;
  overflow: hidden;
}
/* .scorebody table {
  position: absolute;
}

.scoretb tr {
  -webkit-transition: all ease 0.5s;
  -moz-transition: all ease 0.5s;
  -o-transition: all ease 0.5s;
  transition: all ease 0.5s;
}
.scorebody tr td {
  width: 1.88rem;
} */
.c2left th {
  font-family: "SourceHanSerifSC-Heavy";
  font-size: 0.34rem;
  font-weight: bold;
  color: #fff4c6;
  text-align: center;
}
.c2left td {
  font-family: "MicrosoftYaHei";
  font-size: 0.28rem;
  font-weight: bold;
  color: #fff4c6;
  text-align: center;
}
.c2right {
  width: 5.81rem;
  height: 5.9rem;
  background: url("/img/img_wangz_bg.png") no-repeat;
  background-size: 100% 100%;
  display: inline-block;
  margin-left: 0.3rem;
  overflow: auto;
  position: relative;
}
.c2right .game {
  position: absolute;
  left: 5%;
  top: 45%;
  width: 0.84rem;
  height: 0.87rem;
}
.teamvs {
  margin-left: 20%;
  margin-right: 10%;
  margin-top: 32%;
  height: 3.6rem;
  overflow: auto;
}
.teamxq {
  font-size: 0.3rem;
  color: #fff4c6;
  font-family: "MicrosoftYaHei";
  font-weight: bold;
  margin-top: 0.2rem;
}
.teamxq span {
  display: inline-block;
}
.teamxq span:nth-child(2) {
  font-size: 0.48rem;
  color: #fec414;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
}
.grade {
  font-size: 0.44rem;
  margin-top: 0.2rem;
}
.grade span {
  display: inline-block;
  width: 0.75rem;
  height: 0.76rem;
  background: url("/img/img_wangze_bif_bg.png") no-repeat;
  background-size: 100% 100%;

  color: #ffee79;
  line-height: 0.76rem;
  font-weight: bold;
}
.play {
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  background: url("/img/btn_index_play.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  bottom: 1%;
  right: 1%;
}
.prev {
  display: inline-block;
  width: 0.51rem;
  height: 0.5rem;
  background: url("/img/btn_index_left.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 40%;
  left: 1%;
}
.next {
  display: inline-block;
  width: 0.51rem;
  height: 0.5rem;
  background: url("/img/btn_index_right.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 40%;
  right: 1%;
}
</style>