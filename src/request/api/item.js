// 歌单详情接口
import service  from "..";
export function getMusicItemList(data){
    return service({
        method:"GET",
        url:`/playlist/detail?id=${data}`,
    })
}
//获取歌单内的歌曲
export function getItemList(data){
    return service({
        method:"GET",
        url:`/playlist/track/all?id=${data.id}&limit=${data.limit}&offset=${data.offset}`,
    })
}
// 获取歌词/lyric?id=33894312
export function getMusicLyric(data){
    return service({
        method:"GET",
        url:`/lyric?id=${data}`,
    })
}