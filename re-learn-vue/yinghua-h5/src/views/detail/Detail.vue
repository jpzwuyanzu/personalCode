<template>
    <div class="movie_detail_container">
        <MovieInfo :movieInfoData="movieInfoData"/>
        <CusPlayer :playerInfo="playerInfo"/>
        <GuessLike/>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import MovieInfo from '@/components/MovieInfo.vue'
import CusPlayer from '@/components/CusPlayer.vue'
import GuessLike from '@/components/GussLike.vue'
const movieInfoData = reactive<any>({
    movieImage: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    movieDetail: {
        name: '蚁人与黄蜂女：量子狂潮',
        date: '2023',
        director: '拉里佩奇',
        mainRole: '塞缪尔·杰克逊,迈克尔·道格拉斯,伊万杰琳·莉莉,保罗·路德,乔纳森·梅杰斯,米歇尔·菲佛,比尔·默瑞,凯瑟琳·...',
        place: '美国',
        type: '喜剧',
        desc: '《蚁人3》将会深入探索量子领域这个神秘的空间，有关量子领域在以前已经做出了很好的铺垫，比如说《蚁人》中出现的量子城市、一些奇怪的生物，以及《复联4》的时空隧道等等，引入反派征服者·康，这是一位来自于未...'
    }
})
const playerInfo = reactive<any>({
        resourceList: [
            {
                name: '量子资源',
                collection: [
                    {
                        name: 1,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    },
                    {
                        name: 2,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    }
                ]
            },
            {
                name: '天空资源',
                collection: [
                    {
                        name: 1,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    },
                    {
                        name: 2,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    }
                ]
            },
            {
                name: '飞速资源',
                collection: [
                    {
                        name: 1,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    },
                    {
                        name: 2,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    }
                ]
            },
            {
                name: 'FOX资源',
                collection: [
                    {
                        name: 1,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    },
                    {
                        name: 2,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    }
                ]
            },
            {
                name: '优质资源',
                collection: [
                    {
                        name: 1,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    },
                    {
                        name: 2,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    }
                ]
            },
            {
                name: '无尽资源',
                collection: [
                    {
                        name: 1,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    },
                    {
                        name: 2,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    }
                ]
            },
            {
                name: '新浪资源',
                collection: [
                    {
                        name: 1,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    },
                    {
                        name: 2,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    }
                ]
            },
            {
                name: '百度资源',
                collection: [
                    {
                        name: 1,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    },
                    {
                        name: 2,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    }
                ]
            },
            {
                name: '快车资源',
                collection: [
                    {
                        name: 1,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    },
                    {
                        name: 2,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    }
                ]
            },
            {
                name: '卧龙资源',
                collection: [
                    {
                        name: 1,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    },
                    {
                        name: 2,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    }
                ]
            },
            {
                name: 'ikun资源',
                collection: [
                    {
                        name: 1,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    },
                    {
                        name: 2,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    }
                ]
            },
            {
                name: '阳光资源',
                collection: [
                    {
                        name: 1,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    },
                    {
                        name: 2,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    }
                ]
            },
            {
                name: '闪电资源',
                collection: [
                    {
                        name: 1,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    },
                    {
                        name: 2,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    }
                ]
            },
            {
                name: '光速资源',
                collection: [
                    {
                        name: 1,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    },
                    {
                        name: 2,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    }
                ]
            },
            {
                name: '八戒资源',
                collection: [
                    {
                        name: 1,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    },
                    {
                        name: 2,
                        videoUrl: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                        posterUrl: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
                    }
                ]
            }
        ]

    })
</script>
<style lang="scss">
.movie_detail_container {
    // padding: 16px;
    margin-top: 8px;
    background-color: #fff;
}
</style>