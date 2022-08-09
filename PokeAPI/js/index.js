console.log("bienvenido");
const getRandomArbitrary=(min, max)=> {
    return Math.round(Math.random() * (max - min) + min);
  }

let randomid=getRandomArbitrary(1, 151);
console.log(randomid);

document.addEventListener("DOMContentLoaded",(e)=>{
    
    fecthData(randomid);
    //fecthData(getRandomArbitrary(1, 151));
  
})
document.addEventListener("click",(e)=>{
    console.log(`click en `,e.target);
    nextPokemon(e);
    prevPokemon(e);
})

  

async function fecthData(id){
    try {
        let response= await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        let json=await response.json();
        console.log(json);
        console.log("el pokemon es");
        console.log(json.name);
        createCard(json);
        
        /*
    console.log(json.pokemon.name);*/
    } catch (error) {
        console.error("ocurrio un error")
    }
}

function createCard(p1){

    const mainFather=document.querySelector(".newflex");
    const fragment=document.createDocumentFragment();
    const template=document.getElementById("template").content;
    const clone=template.cloneNode(true);
    clone.querySelector(".card-body-images").setAttribute("src",`${p1.sprites.other.dream_world.front_default}`);
    clone.querySelector(".card-body-title").innerHTML=` ${p1.name} <span class="span-card">${p1.stats[0].base_stat} Hp</span>`;
    clone.querySelector(".card-body-text").innerHTML=`<span class="tipo">Type </span>  <span class="span-card">${p1.types[0].type.name} </span>` ;
    clone.querySelector(".f1").innerHTML=`<h3>${p1.stats[1].base_stat}</h3> <p>${p1.stats[1].stat.name}</p> `;
    clone.querySelector(".f2").innerHTML=`<h3>${p1.stats[2].base_stat}</h3> <p>${p1.stats[2].stat.name}</p> `;
    clone.querySelector(".f3").innerHTML=`<h3>${p1.stats[5].base_stat}</h3> <p>${p1.stats[5].stat.name}</p> `;
    fragment.appendChild(clone);
    mainFather.appendChild(fragment);
    
}

function nextPokemon(e){
    if(e.target.matches(".next")){
        randomid++;
        if(randomid==151){randomid=1;}
        deletePokemon();
        console.log("deberia borrar");      
        fecthData(randomid);
    }
}

function prevPokemon(e){
    if(e.target.matches(".previous")){
        randomid--;
        if(randomid==0){randomid=150;}    
        deletePokemon();  
       fecthData(randomid);
    }
}

function deletePokemon(){
    const content=document.querySelector(".newflex");
    console.log(content);
    content.innerHTML=``;    
}