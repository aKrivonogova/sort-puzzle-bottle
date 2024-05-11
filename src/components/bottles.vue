<script lang="ts">
import { defineComponent } from 'vue';
import { ColorsEnum } from '../models/mixingSlotsColors'
import { MixingSlotsColors } from '../models/mixingSlotsColors'

export default defineComponent({
    name: 'bottle',

    data() {
        return {
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
        setSlotColor(itemSlotValue: any) {
            let colorClassValue = '';
            for (let itemSlotColor in this.ColorsList) {
                if (itemSlotValue === this.ColorsList[itemSlotColor]) {
                    colorClassValue = itemSlotColor;
                }
            }
            return colorClassValue;
        }
    },
});
</script>
<template>
    <div class="container">
        <ul class="bottle" v-for="(itemBottle, indexBottle) in getBottlesList" :key="indexBottle">
            <li v-for="(itemSlot, indexItemSlote) in itemBottle.getSlotsCollors()" :key="indexItemSlote"
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
    width: 70px;
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
    width: 70px;
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