// import { RuleTester } from 'eslint'
import { getMusicLyric } from '@/request/api/item'
import { createStore } from 'vuex'
export default createStore({
  state: {
    playList:[{//播放列表
      al:{
        id: 149014920,
        name: "Shadow Of The Sun",
        pic: 109951167799604910,
        picUrl: "https://p1.music.126.net/H2bN18Qj1nKhTJNMB0CY7w==/109951167799604909.jpg",
        pic_str: "109951167799604909"
      },
      id:1968791360
    }],
    playListIndex:0, //默认下标为0
    isbtnShow:true,//默认暂停按钮的显示
    detailShow:false,//歌曲详情的显示
    lyricList:{},//歌词
    currentTime:0,//当前时间
    duration:0,//歌曲总时长
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow:function(state,value){
      state.isbtnShow=value
      // console.log(state.playList);
    },
    updateplayList:function(state,value){
      state.playList=value    
    },
    updateplayListIndex:function(state,value){
      state.playListIndex=value    
    },
    updateDetailShow:function(state){
      state.detailShow=!state.detailShow
    },
    updateLyricList(state,value){
      state.lyricList=value
    },
    updateCurrentTime(state,value){
      state.currentTime=value
      // console.log(state.currentTime);
    },
    updateDuration(state,value){
      state.duration=value
    }
  },
  actions: {
    async getLyric(context,value){
      let res = await getMusicLyric(value)
      // console.log(res);
      context.commit('updateLyricList',res.data.lrc)
    }
  },
  modules: {
  }
})
