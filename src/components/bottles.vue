<script lang="ts">
import { defineComponent } from 'vue';
import Bottle from '@/domains/Bottle';
import Liquid from '@/domains/Liquid';
import BottleFactory from '@/domains/BottleFactory'

export interface IBottlesConfig {
    BOTTLES_COUNT: number;
    DEFAULT_BOTTLE_CAPACITY: number;
    DEFAULT_COUNT_EMPTY_BOTTLES: number;
}

export const config: IBottlesConfig = {
    BOTTLES_COUNT: 5,
    DEFAULT_BOTTLE_CAPACITY: 4,
    DEFAULT_COUNT_EMPTY_BOTTLES: 2,
}

export default defineComponent({
    name: 'bottle',
    data() {
        return {
            config,
            bottles: [] as Bottle<Liquid>[],
            bottleFactory: new BottleFactory(),
            bottlesMap: new Map() as Map<string, Bottle<Liquid>>,
            sourceBottleId: "" as string,
            targetBottleId: "" as string,
        };
    },

    created() {
        this.createdBottlesMap();
        for (let index = 0; index < this.config.DEFAULT_COUNT_EMPTY_BOTTLES; index++) {
            this.addEmptyBottlesToBottlesMap();
        }
    },

    computed: {
        getBottlesList(): any {    
            return  [...this!.bottlesMap?.values()];
        },
    },
    methods: {
        createdBottlesMap() {
            for (let i = 0; i < config.BOTTLES_COUNT; i++) {
                const newBottle = this.bottleFactory.createBottle();
                this.setBottlesMapValue(newBottle);
            }
        },

        addEmptyBottlesToBottlesMap() {
            const newEmptyBottle = this.bottleFactory.createEmptyBottle();
            this.setBottlesMapValue(newEmptyBottle)
        },

        setBottlesMapValue(bottle: Bottle<Liquid>) {
            this.bottlesMap.set(bottle.getId(), bottle);
        },

        getCurrentColor(itemColor: Liquid) {
            return itemColor.getColor();
        },

        selectBottle(bottleId: string): void {
            if (!this.sourceBottleId) {
                this.sourceBottleId = bottleId;
                return;
            }
            if (this.sourceBottleId === bottleId) {
                this.sourceBottleId = "";
                return
            }

            this.targetBottleId = bottleId;
        },

        getBottleById(bottleId: string): any {
            return this.bottlesMap.get(bottleId)
        },


        pourLiquid(sourceBottleId: string, targetBottleId: string): void {

            if (!this.getBottleById(sourceBottleId).isNotEmptyBottle()) {
                return
            }
            if (!this.getBottleById(targetBottleId).isNotFullBottle(this.config.DEFAULT_BOTTLE_CAPACITY)) {
                return
            }

            const pouredLiquid: Liquid = this.getBottleById(sourceBottleId).pourOut();
            this.getBottleById(targetBottleId).pour(pouredLiquid);
        },

        resetSelectedBottles() {
            this.sourceBottleId = "";
            this.targetBottleId = "";
        }
    },
    watch: {
        targetBottleId() {
            if (!this.targetBottleId || !this.sourceBottleId) {
                return
            }
            this.pourLiquid(this.sourceBottleId, this.targetBottleId);
            this.resetSelectedBottles();
        }
    }

})
</script>
<template>
    <div class="bottles-game-container">
        <ul class="bottle" v-for="(itemBottle) in getBottlesList" :key="itemBottle.getId()"
            :style="{ minHeight: config.BOTTLES_COUNT * 50 + 'px' }" @click="selectBottle(itemBottle.getId())"
            :class="{ activeSource: itemBottle.getId() === sourceBottleId}">

            <li v-for="(itemColor, indexItemColor) in itemBottle.getValues()" :key="indexItemColor"
                :class="[getCurrentColor(itemColor), 'color']">
            </li>
        </ul>
    </div>
</template>
<style>
.bottle.activeSource {
    outline: 2px solid forestgreen;
}

.bottles-game-container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #494f6b;
}

.bottle {
    list-style: none;
    border: 2px solid darkgray;
    width: 50px;
    padding: 30px 0 0 0;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    margin-right: 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}


.color:last-of-type {
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
}

.color {
    width: 50px;
    height: 50px;
}
</style>