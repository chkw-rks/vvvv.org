import Constants from "../../constants.js"
import { defineStore } from 'pinia'
import { createAssetUrl, shuffle } from "../../utils.js"

export const useBusinessesStore = defineStore ('businesses',{
    state: ()=>{
        return {
            items: [],
            total: null,
            fetched: false
        }
    },
    actions: {
        async fetch(force = false){

            if (this.fetched && !force) return;

            try{
                const {items, total} = await fetchBusinesses();
                this.items = items;
                this.total = total;
                this.fetched = true;
            }
            catch (error){
                this.fetched = false;
            }

        }
    }
})

async function fetchBusinesses(){
        
    const imageParamsLogos = "?withoutEnlargement=true&quality=98&fit=cover&height=200&format=png";
    const url = Constants.GET_COMPANIES+"?fields[]=name,logo,slug&meta=filter_count";

    const limit = 10;
    
    const response = await fetch(url);
    
    if (response.ok)
    {
        const json = await response.json();
        const items = json.data?.map((b) => (
            {
                img: b.logo ? createAssetUrl(b.logo) + imageParamsLogos : null,
                url: '/business/'+b.slug,
                text: b.name,
                slug: b.slug
            }
        ));
    
        return {
            items: shuffle(items).slice(0, limit), 
            total: json.meta?.filter_count ?? 0
        }
    }
    else {
        throw Error ("Connection error");
    }
}