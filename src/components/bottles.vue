<script lang="ts">
import { defineComponent } from 'vue';
import Bottle from '@/domains/Bottle';
import Liquid from '@/domains/Liquid';
import BottleFactory from '@/domains/BottleFactory'



export default defineComponent({
    name: 'bottle',
    data() {
        return {

            bottles: [] as Bottle<Liquid>[],
            bottleFactory: new BottleFactory(),
            emptyBottle: new Bottle<Liquid>(),
            BOTTLES_COUNT: 5,
            sourceBottleId: null as null | string,
            targetBottleId: null as null | string,
            DEFAULT_BOTTLE_CAPACITY: 4 as number

        };
    },
    computed: {
        getBottlesList() {
            return this.bottles
        }
    },
    methods: {
        getCurrentColor(itemColor: Liquid) {
            return itemColor.getColor();
        },

        selectBottle(bottleId: string | null): void {
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


        getBottleById(bottleId: string): Bottle<Liquid> {
            return this.bottles.find((bottleItem) => bottleItem.getId() === bottleId) as Bottle<Liquid>;
        },

        transferBottleLiquid(sourceBottleId: string, targetBottleId: string): void {
            const pouredLiquid: Liquid | undefined = this.getBottleById(sourceBottleId).pourOut();
            if (!pouredLiquid) {
                return
            }
            this.getBottleById(targetBottleId).pour(pouredLiquid);
        },

        resetSelectedBottles(): void {
            this.sourceBottleId = null;
            this.sourceBottleId = null;
        }
    },

    mounted() {
        for (let i = 0; i < this.BOTTLES_COUNT; i++) {
            this.bottles.push(this.bottleFactory.createBottle());
        }
        this.bottles.push(this.emptyBottle);
    },

    watch: {
        targetBottleId() {
            if (!this.targetBottleId || !this.sourceBottleId) {
                return
            }
            this.transferBottleLiquid(this.sourceBottleId, this.targetBottleId);
            this.resetSelectedBottles();
        }
    }

});
</script>
<template>
    <div class="container">
        <ul class="bottle" v-for="(itemBottle, indexBottle) in getBottlesList" :key="itemBottle.getId()"
            :style="{ minHeight: BOTTLES_COUNT * 50 + 'px' }" @click="selectBottle(itemBottle.getId())">
            <li v-for="(itemColor, indexItemColor) in itemBottle.getValues()" :key="indexItemColor"
                :class="[getCurrentColor(itemColor), 'slot']">
            </li>
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


.slot:last-of-type {
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
}

.slot {
    width: 50px;
    height: 50px;
}

.green {
    background-color: #00AF64;
}

.red {
    background-color: deeppink;
}

.yellow {
    background-color: gold;
}

.blue {
    background-color: #534ED9;
}

.orange {
    background-color: orange;
}

.violet {
    background-color: #6F0AAA;
}

.pink {
    background-color: deeppink;
}
</style>