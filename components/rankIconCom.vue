<template>
    <div>
        <div class="raknIcon" v-if="lobbyRank == ''">
            <div class="rankNoIcon">
                no rank found
            </div>
        </div>
        <div class="raknIcon" v-else >
            <img v-if="currentRankIcon != ''" :src="currentRankIcon" alt="">
            <div class="rankNoIcon" v-else>
                <img :src="currentRankIcon" alt="">
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    lobbyRank:{
        default:'',
        type:String
    },
    lobbyGame:String
})
const rankIcons = ref([
    {
        game:'Dota 2',
        ranks:[
            {
            title:'herald1',
            icon:'/images/rankIcons/dota2/herald-1.png'
            },
            {
            title:'herald2',
            icon:'/images/rankIcons/dota2/herald-2.png'
            },
            {
            title:'herald3',
            icon:'/images/rankIcons/dota2/herald-3.png'
            },
            {
            title:'herald4',
            icon:'/images/rankIcons/dota2/herald-4.png'
            },
            {
            title:'herald5',
            icon:'/images/rankIcons/dota2/herald-5.png'
            },
            {
            title:'Guardian1',
            icon:'/images/rankIcons/dota2/guardian-1.png'
            },
            {
            title:'Guardian2',
            icon:'/images/rankIcons/dota2/guardian-2.png'
            },
            {
            title:'Guardian3',
            icon:'/images/rankIcons/dota2/guardian-3.png'
            },
            {
            title:'Guardian4',
            icon:'/images/rankIcons/dota2/guardian-4.png'
            },
            {
            title:'Guardian5',
            icon:'/images/rankIcons/dota2/guardian-5.png'
            },
            {
            title:'Crusader1',
            icon:'/images/rankIcons/dota2/crusader-1.png'
            },
            {
            title:'Crusader2',
            icon:'/images/rankIcons/dota2/crusader-2.png'
            },
            {
            title:'Crusader3',
            icon:'/images/rankIcons/dota2/crusader-3.png'
            },
            {
            title:'Crusader4',
            icon:'/images/rankIcons/dota2/crusader-4.png'
            },
            {
            title:'Crusader5',
            icon:'/images/rankIcons/dota2/crusader-5.png'
            },
            {
            title:'Archon1',
            icon:'/images/rankIcons/dota2/archon-1.png'
            },
            {
            title:'Archon2',
            icon:'/images/rankIcons/dota2/archon-2.png'
            },
            {
            title:'Archon3',
            icon:'/images/rankIcons/dota2/archon-3.png'
            },
            {
            title:'Archon4',
            icon:'/images/rankIcons/dota2/archon-4.png'
            },
            {
            title:'Archon5',
            icon:'/images/rankIcons/dota2/archon-5.png'
            },
            {
            title:'Legend1',
            icon:'/images/rankIcons/dota2/legend-1.png'
            },
            {
            title:'Legend1',
            icon:'/images/rankIcons/dota2/legend-2.png'
            },
            {
            title:'Legend3',
            icon:'/images/rankIcons/dota2/legend-3.png'
            },
            {
            title:'Legend4',
            icon:'/images/rankIcons/dota2/legend-4.png'
            },
            {
            title:'Legend5',
            icon:'/images/rankIcons/dota2/legend-5.png'
            },
            {
            title:'Ancient1',
            icon:'/images/rankIcons/dota2/ancient-1.png'
            },
            {
            title:'Ancient2',
            icon:'/images/rankIcons/dota2/ancient-2.png'
            },
            {
            title:'Ancient3',
            icon:'/images/rankIcons/dota2/ancient-3.png'
            },
            {
            title:'Ancient4',
            icon:'/images/rankIcons/dota2/ancient-4.png'
            },
            {
            title:'Ancient5',
            icon:'/images/rankIcons/dota2/ancient-5.png'
            },
            {
            title:'Divine1',
            icon:'/images/rankIcons/dota2/divine-1.png'
            },
            {
            title:'Divine2',
            icon:'/images/rankIcons/dota2/divine-2.png'
            },
            {
            title:'Divine3',
            icon:'/images/rankIcons/dota2/divine-3.png'
            },
            {
            title:'Divine4',
            icon:'/images/rankIcons/dota2/divine-4.png'
            },
            {
            title:'Divine5',
            icon:'/images/rankIcons/dota2/divine-5.png'
            },
            {
            title:'Immortal',
            icon:'/images/rankIcons/dota2/immortal.png'
            },
            {
            title:'ImmortalTop1000',
            icon:'/images/rankIcons/dota2/immortal-top-1000.png'
            },
            {
            title:'ImmortalTop100',
            icon:'/images/rankIcons/dota2/immortal-top-100.png'
            },
            {
            title:'ImmortalTop10',
            icon:'/images/rankIcons/dota2/immortal-top-10.png'
            },
        ]
    }
])
const currentRankIcon = ref('')
function setCurrentRank(){
    for(let rankIcon of rankIcons.value){
        if(props.lobbyGame == rankIcon.game){
            for(let rank of rankIcon.ranks){
                if(rank.title.toLowerCase() == props.lobbyRank.toLowerCase()){
                    currentRankIcon.value = rank.icon
                }
            }
            return
        }
    }
}
setCurrentRank()
</script>
<style lang="scss" scoped>
.raknIcon{
    width: 100%;
    height: 100%;
    img{
        width: 100%;
        max-width: 100px;
        object-fit: contain;
    }
    .rankNoIcon{
        background-color: var(--tertiaryBg);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        border-radius: var(--radiusSm);
        text-align: center;
    }
}
</style>