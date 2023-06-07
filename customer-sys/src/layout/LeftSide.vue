<template>
  <div class="left-content" ref="leftScroll">
    <div class="left">
      <div
        :class="
          leftActive === index ? 'left-item left-item-active' : 'left-item'
        "
        v-for="(item, index) in categoryList"
        :key="index"
        @click="leftItemClick(index)"
      >
        消息00{{ item }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import BScroll from "@better-scroll/core";
import { onMounted, ref, onCreated, nextTick, reactive } from "vue";
const leftActive = ref<number>(0);
const leftScroll = ref<any>(null);
let betScroll = ref<any>(null);

let categoryList = [
  0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];


onMounted(() => {
  nextTick(() => {
    betScroll = new BScroll(leftScroll.value, {
      scrollY: true,
      click: true,
    });
  });
});

const leftItemClick = (e: number) => {
  leftActive.value = e;
};

const loadData = async() => {
    categoryList = await categoryList.concat([1,2,3,4])
    nextTick(() => {
        if(!betScroll) {
            betScroll = new BScroll(leftScroll.value, {
                scrollY: true,
                click: true,
            });
            betScroll.on('touchend', (pos: any) => {
                console.log(pos)
                if(pos.y > 50) {
                    loadData()
                }
            })
        } else {
            betScroll.refresh()
        }
    })
}


</script>
<style scoped lang="scss">
/* css*/
.left-content {
  /* 此处高度必须，根据业务实际情况而定 */
  height: 100vh;
}
.left {
  /* 此处高度不写，根据子元素高度自适应 */
}
.left-item {
  text-align: center;
  height: 100px;
  line-height: 100px;
  color: #333;
}
.left-item-active {
  color: #e93b3d;
}
</style>
