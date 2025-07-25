import Constants from "../constants.js"
import { defineStore } from 'pinia'

export const useBusinessListStore = defineStore ('businessList',{
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
                const {items, total} = await fetchBusinessList();
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

const URL = Constants.BASEURL+`items/Company?fields=*&sort=name&meta=filter_count`;
const LOGO_SETTINGS = 'withoutEnlargement=true&fit=inside&height=120&quality=90&format=png';

function logoSrc (src)
{
    return src ? `${Constants.ASSETS}${src}?${LOGO_SETTINGS}` : null;
}

async function fetchBusinessList()
{

    const response = await fetch (URL);

    if (response.ok)
    {
        const json = await response.json();
    
        const companies = json.data;
    
        companies.forEach ((c)=>{
            c.logo = logoSrc(c.logo)
        })
    
        return {
            items: companies,
            total: json.meta?.filter_count ?? 0
        }
    }
    else{
        throw Error ("Connection Error");
    }

}