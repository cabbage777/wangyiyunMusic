<template>
<!-- 背景图片 -->
    <img :src="musicList.al.picUrl" class="bgImg">
<!-- 头部区域 -->
    <div class="detailTop">
        <!-- 左侧区域 -->
        <div class="detailLeft">
            <div class="deLeft">
                <svg class="icon liebiao" aria-hidden="true" @click="backHome">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            </div>
            <!-- 歌曲名字和作者 -->
            <div class="leftMarquee">
                <Vue3Marquee style="color:#fff">
                    {{musicList.al.name}}
                </Vue3Marquee>
                <span v-for="item in musicList.ar" :key='item'>
                    {{item.name}}
                </span>
                <svg class="icon liebiao" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou1"></use>
                </svg>
            </div>
        </div>
        <!-- 右侧区域 -->
        <div class="detailRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
        </div>
    </div>
    <!-- 中间部分 -->
    <div class="detailContent" v-show="!isLyricShow">
        <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{img_needle_active:!isbtnShow}">
        <img src="@/assets/cd.png" alt="" class="img_cd">
        <img 
        :src="musicList.al.picUrl" 
        alt="" class="img_ar" 
        :class="{img_ar_active:!isbtnShow,img_ar_paused:isbtnShow}"
        @click="isLyricShow=true"
        >
    </div>
    <!-- 歌词显示 -->
    <div class="musicLyric" ref="musicLyric" v-show="isLyricShow" @click="isLyricShow=false">
        <p v-for="item in lyric" :key='item' :class="{active:(currentTime*1000>=item.time&&currentTime*1000<item.pre)}">
            {{item.lrc}}
        </p>
        
    </div>
    <!-- 下面部分 -->
    <div class="detailFooter">
        <!-- 第一排五个图标 -->
        <div class="footerTop">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yinlechangpian"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao-"></use>
            </svg>
        </div>
        <!-- 导航条 -->
        <div class="footer">
            <input type="range" class="daohang" min='0' :max='duration' v-model="currentTime" step="0.05">
        </div>
        <!-- 第二排五个图标 -->
        <div class="footerContent">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xunhuan"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goPlay(-1)" >
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow" style="height:0.8rem;width:0.8rem">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="play" v-else style="height:0.8rem;width:0.8rem">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goPlay(+1)">
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
    </div>
</template>
<script>
import { mapMutations,mapState } from "vuex";
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
// import {toRefs} from 'vue'
export default {
    data() {
        return {
            isLyricShow:false
        }
    },
    mounted(){
        // console.log(this.musicList);
        this.addDuration()
    },
    watch:{
        currentTime(newvalue){
            let p = document.querySelector('p.active')
            // console.log([p]);
            if(p){
                if (p.offsetTop > 300) {
                this.$refs.musicLyric.scrollTop=p.offsetTop-300
                }
            }
            if(newvalue===this.duration){             
                if(this.playListIndex===this.playList.length-1){
                    this.updateplayListIndex(0)
                }else{
                    this.updateplayListIndex(this.playListIndex+1)       
                }
            }
        }
    },
    components:{Vue3Marquee},
    props:['musicList','play','isbtnShow','addDuration'],
    methods:{
        ...mapMutations(['updateDetailShow','updateplayListIndex','updateDuration']),
        // 点击返回按钮
        backHome(){
            this.isLyricShow=false
            this.updateDetailShow()
        },
        // 点击切换上下个歌曲
        goPlay(num){
            let index = this.playListIndex+num
            if(index<0){
                index=this.playList.length-1
            }else if(index===this.playList.length){
                index=0
            }
            this.updateplayListIndex(index)
        },
        
    },
    computed:{
        ...mapState(['lyricList','currentTime','playListIndex','playList','duration']),
        lyric(){
            let arr=[];
            if(this.lyricList.lyric){
                arr=this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
                    let min = item.slice(1,3)
                    let sec = item.slice(4,6)
                    let mill = item.slice(7,10)
                    let lrc = item.slice(11,item.length) 
                    let time = parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)
                    if(isNaN(Number(mill))){
                        mill=item.slice(7,9)
                        lrc=item.slice(10,item.length)
                        time = parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)
                    }

                    // console.log(min,sec,mill,lrc);
                    return {min,sec,mill,lrc,time}
                    
                });
                arr.forEach((item,i) => {
                    if(i===arr.length-1||isNaN(arr[i+1].time)){
                        item.pre=100000
                    }else{
                        item.pre=arr[i+1].time
                    } 
                })
                
            }
            // console.log(arr);
            return arr
        }
    }
}
</script>

<style lang="less" scoped>
    .detailTop{
        width: 100%;
        height: 1rem;
        display: flex;
        padding: 0.2rem;
        justify-content: space-between;
        align-items: center;
        fill:#fff;
        .detailLeft{
            display: flex;
            align-items: center;
            .leftMarquee{
                width: 3rem;
                height: 100%;
                margin-left: 0.4rem;
                // color: #fff;
                span {
                    color: #999;
                }
                .icon {
                    width: 0.3rem;
                    height: 0.3rem;
                    fill: #999;
                }
            }
        }  
    }
    .bgImg{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        filter: blur(80px);
    }
    .detailContent{
        width:100%;
        height: 9rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .img_needle{
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(-13deg);
            transition: all 2s;
        }
        .img_needle_active {
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(0deg);
            transition: all 2s;
        }

        .img_cd {
            width: 5rem;
            height: 5rem;
            position: absolute;
            bottom: 2.3rem;
            z-index: -1;
        }
        .img_ar {
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            position: absolute;
            bottom: 3.14rem;
            animation: rotate_ar 10s linear infinite;
            animation: rotate_ar 10s linear infinite;
        }
        .img_ar_active{
            animation-play-state: running;
        }
        .img_ar_paused{
            animation-play-state: paused;
        }
        @keyframes rotate_ar {
            0%{
                transform: rotateZ(0deg);
            }
            100%{
                transform: rotateZ(360deg);
            }
        }
    }
    .musicLyric{
        width: 100%;
        height: 8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
        text-align: center;
        margin-top: 10px;
        overflow: scroll;
        p{
            margin-bottom: 15px;
        }
        .active{
            color: #fff;
            font-size: 20px;
        }
    }
    .detailFooter{
        width: 100%;
        height: 3rem;
        position: absolute;
        bottom: 0.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .footerTop{
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-around;
            .icon {
                width: 0.5rem;
                height: 0.5rem;
                fill: rgb(245, 234, 234);
            }
        }
        .footerContent{
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 10px;
            .icon {
                width: 0.5rem;
                height: 0.5rem;
                fill: rgb(245, 234, 234);
            }
        }
    }
    .daohang{
        width: 100%;
        height: 0.06rem;
    }
</style>