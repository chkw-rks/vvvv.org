<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NTooltip, NSkeleton, NBadge, NButton } from "naive-ui"
import { showBusinessProfile } from "../../utils.js"
import { useLastMonthStore } from './LastMonthStore.js'
import defaultLogo from '../../assets/defaultLogo.png'
import SectionTitle from './SectionTitle.vue'

const loading = ref(false);
const router = useRouter();

const store = useLastMonthStore();

onMounted(async ()=>{
 
    try
    {
        loading.value = true;
        await store.fetch();
    }
    catch (error)
    {
        console.log (error);
    }
    finally{
        loading.value = false;
    }
    
})

</script>

<template>
    <div v-if="store.link" class="section pr-4 lastMonth">
        <div class="row border-bottom pb-3 align-items-start">
            <div class="col-1 px-0 py-0">
                <img :src="store.thumb" class="img-fluid"/>
            </div>
            <div class="col-11 py-0 pl-4 no-gutter">
                <strong><a :href="store.link">{{ store.title }}</a></strong>
                <div class="text-muted second">Last month in review</div>
            </div>
        </div>
    </div>
</template>