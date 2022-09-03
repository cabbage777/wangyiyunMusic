<template>
    <itemMusicTop :playlist='state.playlist'/>
    <itemMusicList :itemList='state.itemList' :subscribedCount='state.playlist.subscribedCount'/>
</template>
<script>
import {useRoute} from 'vue-router'
import {onMounted,reactive} from 'vue'
import {getMusicItemList,getItemList} from '@/request/api/item'
import itemMusicTop from '@/components/item/itemMusicTop.vue'
import itemMusicList from '@/components/item/itemMusicList.vue'

export default {
    setup() {
        const state = reactive({
            playlist:{
                creator:{}
            },//歌单详情页数据
            itemList:{}
        })
        onMounted(async () => {
            let id = useRoute().query.id
            let res = await getMusicItemList(id);
            // console.log(res);
            state.playlist=res.data.playlist

            let result  = await getItemList({ id, limit: 10, offset: 0 })
                state.itemList = result.data.songs
            // console.log(state.itemList);
        })
        return{state}
    },
    components:{
        itemMusicTop,
        itemMusicList
    }
}
</script>