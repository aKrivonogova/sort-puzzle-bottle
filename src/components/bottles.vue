<script lang="ts">
import { defineComponent } from 'vue';
import { Bottle } from '../models/bottle'
import { ColorsEnum } from '../models/bottle'
import { MixingSlotsColors } from '../models/mixingSlotsColors'

export default defineComponent({
    name: 'bottle',

    data() {
        return {
            bottle1: new Bottle(4),
            bottle2: new Bottle(4),
            bottlesArray: new MixingSlotsColors(3, 4),
            ColorsList: ColorsEnum,
        };
    },
    computed: {
        getBottlesList() {
            return this.bottlesArray.getBottlesList();
        }
    },
    methods: {
        setSlotColor(itemSlotValue) {
            let color = '';
            for (let itemSlotColor in this.ColorsList) {
                if (itemSlotValue === this.ColorsList[itemSlotColor]) {
                    color = itemSlotColor;
                }
            }
            return color;
        }
    },
    mounted() {
    },
});
</script>
<template>
    <div class="container">
        <ul class="bottle" v-for="(itemBottle, indexBottle) in getBottlesList" :key="indexBottle">
            <li v-for="(itemSlot, indexItemSlote) in itemBottle.slotsColors" :key="indexItemSlote"
                :class="[setSlotColor(itemSlot), 'slot']"></li>
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

.orange {
    background-color: orange;
}
</style>