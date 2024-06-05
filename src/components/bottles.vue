<script lang="ts">
import { defineComponent } from 'vue';
import Bottle from '@/domains/Bottle';
import Liquid from '@/domains/Liquid';
import BottleFactory from '@/domains/BottleFactory'
const BOTTLES_COUNT: number = 5;
const DEFAULT_BOTTLE_CAPACITY: number = 4;
const DEFAULT_COUNT_EMPTY_BOTTLES: number = 2;

export default defineComponent({
    name: 'bottle',
    data() {
        return {
            bottles: [] as Bottle<Liquid>[],
            bottleFactory: new BottleFactory(),
            bottlesMap: new Map() as Map<string, Bottle<Liquid>>,
            sourceBottleId: null as null | string,
            targetBottleId: null as null | string,
        };
    },

    created() {
        this.createdBottlesMap();
        for (let index = 0; index < this.getDefaultCountEmptyBottles; index++) {
            this.addEmptyBottlesToBottlesMap();
        }
    },

    computed: {
        getBottlesList(): any {
            return Array.from(this.bottlesMap.entries()).map(([id, bottle]) => ({ id, bottle }));
        },

        getDefaultBootleCapacity(): number {
            return DEFAULT_BOTTLE_CAPACITY;
        },

        getDefaultCountEmptyBottles(): number {
            return DEFAULT_COUNT_EMPTY_BOTTLES
        }
    },
    methods: {
        createdBottlesMap() {
            for (let i = 0; i < BOTTLES_COUNT; i++) {
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

        getBottlesCount(): number {
            return BOTTLES_COUNT;
        },

        selectBottle(bottleId: string): void {
            if (this.sourceBottleId === null) {
                this.sourceBottleId = bottleId;
                return;
            }
            if (this.sourceBottleId === bottleId) {
                this.sourceBottleId = null;
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
            if (!this.getBottleById(targetBottleId).isNotFullBottle(this.getDefaultBootleCapacity)) {
                return
            }

            const pouredLiquid: Liquid = this.getBottleById(sourceBottleId).pourOut();
            this.getBottleById(targetBottleId).pour(pouredLiquid);
        },

        resetSelectedBottles() {
            this.sourceBottleId = null;
            this.targetBottleId = null;
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
        <ul class="bottle" v-for="(itemBottle, keyItemBottle) in getBottlesList" :key="keyItemBottle"
            :style="{ minHeight: getBottlesCount() * 50 + 'px' }" @click="selectBottle(itemBottle.id)">

            <li v-for="(itemColor, indexItemColor) in itemBottle.bottle.getValues()" :key="indexItemColor"
                :class="[getCurrentColor(itemColor), 'color']">
            </li>
        </ul>
    </div>
</template>
<style>
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