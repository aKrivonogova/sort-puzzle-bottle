<script lang="ts">
import { defineComponent } from 'vue';
import { Bottle } from '../models/bottle'
import { ColorsEnum } from '../models/bottle'

export default defineComponent({
    name: 'bottle',

    data() {
        return {
            bottle1: new Bottle(4),
            bottle2: new Bottle(4),
            ColorsList: ColorsEnum,
        };
    },
    computed: {
        getBottle1() {
            return this.bottle1.getUpsidedownSlotsColors();
        },
        getBottle2() {
            return this.bottle2.getUpsidedownSlotsColors();
        }
    },
    methods: {
        getColors(itemSlot) {
            let color = '';
            for (let itemColor in this.ColorsList) {
                if (itemSlot === this.ColorsList[itemColor]) {
                    color = itemColor;
                }
            }
            return color;
        }
    },
    mounted() {
        this.bottle1.fillAllSlotsWithColors();
        this.bottle2.fillAllSlotsWithColors();
    },
});
</script>
<template>
    <div class="container">
        <ul class="bottle">
            <li v-for="(itemSlot, indexItemSlote) in getBottle1" :key="indexItemSlote"
                :class="[getColors(itemSlot), 'slot']"></li>
        </ul>
        <ul class="bottle">
            <li v-for="(itemSlot, indexItemSlote) in getBottle2" :key="indexItemSlote"
                :class="[getColors(itemSlot), 'slot']"></li>
        </ul>
    </div>
</template>
<style>
.container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.bottle {
    list-style: none;
    border: 2px solid darkgray;
    border-top: 0;
    width: 120px;
    padding: 0;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

}

.bottle:first-of-type {
    margin-right: 40px;
}

.slot:last-of-type {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.slot {
    width: 120px;
    height: 50px;
}

.green {
    background-color: aquamarine;
}

.red {
    background-color: deeppink;
}

.yellow {
    background-color: gold;
}

.blue {
    background-color: aqua;
}
</style>