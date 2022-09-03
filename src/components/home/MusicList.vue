<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="150" class="my-swipe" :show-indicators='false'> 
                <van-swipe-item v-for="it in musicLiST" :key='it'>
                    <router-link :to="{path:'/itemMusic',query:{id:it.id}}">
                        <img :src="it.picUrl">
                        <span class="playCount">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-24gl-play"></use>
                            </svg>
                            {{changeCount(it.playCount)}}
                        </span>
                        <span class="name">{{it.name}}</span>  
                    </router-link>
                </van-swipe-item>               
            </van-swipe>
        </div>
    </div>
</template>

<script>
import {getMusicList} from '@/request/api/home'
export default {
    data(){
        return {
            musicLiST:[]
        }
    },
    methods:{
        async getGedan(){
            let res = await getMusicList()
            this.musicLiST=res.data.result
        },
        changeCount:function(num){
            if(num>=100000000){
                return (num/10000000).toFixed(1)+'亿'
            }else if(num>=10000){
                return (num/10000).toFixed(1)+'万'
            }
        }
    },
    mounted(){
        this.getGedan()
    }
}
</script>
<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
    
    
  }
  .musicContent{
        width: 100%;
        height: 4rem;
        .my-swipe{
            height: 100%;
            img{
                width: 100%;
                height: 150px;
            }
            .playCount{
                position: absolute;
                z-index: 100;
                right: 0.3rem;
                color: white;
                margin-top: 0.06rem;
                .icon{
                    width: 0.3rem;
                    height: 0.3rem;
                }

            }
            .name{
                position: absolute;
                top:150px;
                bottom: 0;
                right: 1px;
                left: 1px;
            }
        }
    }
}
</style>