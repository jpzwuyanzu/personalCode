<template>
    <div>
        <template v-for="(item, index) in cardList" :key="index">
            <MovieCard :labelList="(item as any).labelList" :movieLabelTitle="(item as any).movieLabelTitle" @loadData="loadData" />
        </template>
    </div>
</template>
<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import { reactive } from 'vue'
const cardList = reactive<any>([
    {
        movieLabelTitle: '正在热映',
        movieList: [1,2,3,4,5,6,7,8],
        labelList: [
            {
                title: '推荐',
                id: 0,
                type: 'reying'
            },
            {
                title: '动作',
                id: 1,
                type: 'reying'
            },
            {
                title: '爱情',
                id: 2,
                type: 'reying'
            },
            {
                title: '喜剧',
                id: 3,
                type: 'reying'
            },
            {
                title: '科幻',
                id: 4,
                type: 'reying'
            },
            {
                title: '恐怖',
                id: 5,
                type: 'reying'
            }
        ]
    },
    {
        movieLabelTitle: '热门电影',
        movieList: [1,2,3,4,5,6,7,8],
        labelList: [
            {
                title: '推荐',
                id: 0,
                type: 'remendianying'
            },
            {
                title: '动作',
                id: 1,
                type: 'remendianying'
            },
            {
                title: '爱情',
                id: 2,
                type: 'remendianying'
            },
            {
                title: '喜剧',
                id: 3,
                type: 'remendianying'
            },
            {
                title: '科幻',
                id: 4,
                type: 'remendianying'
            },
            {
                title: '恐怖',
                id: 5,
                type: 'remendianying'
            }
        ]
    },
    {
        movieLabelTitle: '热门电视剧',
        movieList: [1,2,3,4,5,6,7,8],
        labelList: [
            {
                title: '推荐',
                id: 0,
                type: 'remendianshiju'
            },
            {
                title: '动作',
                id: 1,
                type: 'remendianshiju'
            },
            {
                title: '爱情',
                id: 2,
                type: 'remendianshiju'
            },
            {
                title: '喜剧',
                id: 3,
                type: 'remendianshiju'
            },
            {
                title: '科幻',
                id: 4,
                type: 'remendianshiju'
            },
            {
                title: '恐怖',
                id: 5,
                type: 'remendianshiju'
            }
        ]
    },
    {
        movieLabelTitle: '热门综艺',
        movieList: [1,2,3,4,5,6,7,8],
        labelList: [
            {
                title: '真人秀',
                id: 0,
                type: 'remenzongyi'
            },
            {
                title: '纪录片',
                id: 1,
                type: 'remenzongyi'
            },
            {
                title: '历史',
                id: 2,
                type: 'remenzongyi'
            },
            {
                title: '喜剧',
                id: 3,
                type: 'remenzongyi'
            },
            {
                title: '冒险',
                id: 4,
                type: 'remenzongyi'
            },
            {
                title: '剧情',
                id: 5,
                type: 'remenzongyi'
            }
        ]
    },
    {
        movieLabelTitle: '热门动漫',
        movieList: [1,2,3,4,5,6,7,8],
        labelList: [
            {
                title: '推荐',
                id: 0,
                type: 'remendongman'
            },
            {
                title: '动作',
                id: 1,
                type: 'remendongman'
            },
            {
                title: '爱情',
                id: 2,
                type: 'remendongman'
            },
            {
                title: '喜剧',
                id: 3,
                type: 'remendongman'
            },
            {
                title: '科幻',
                id: 4,
                type: 'remendongman'
            },
            {
                title: '恐怖',
                id: 5,
                type: 'remendongman'
            }
        ]
    }
])
//在这里加载数据
const loadData = async({id, type}: any) => {
    console.log('home页面加载影片数据')
    console.log('id:',id, 'type:', type)
}
</script>