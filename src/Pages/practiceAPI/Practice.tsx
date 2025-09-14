import {useEffect } from "react";
import { useState } from "react";


export default function Practice() {

    // async function fetchData(){
    //     try{
    //         const pokemonNameInput = document.getElementById("pokemonName") as HTMLInputElement;
    //         const name = pokemonNameInput.value.toLowerCase()

    //         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

    //         if(!response.ok){
    //             throw new Error("Network response was not ok");
    //         }
    //         const data = await response.json()
    //         const pokemonSprite = data.sprites.front_default;
    //         const pokemonImage = document.getElementById("pokemonSpirite") as HTMLImageElement

    //         pokemonImage.src = pokemonSprite
    //         pokemonImage.style.display = "block"
    //     }catch(error){
    //         console.error(error);
    //     }
    // }
    // useEffect(()=>{fetchData()},[])
    const [excuse,setExcuse] = useState("");
    const [typeOfExcuse,setTypeOfExcuse] = useState("");
    function handleBtnClick(type: any){
        setTypeOfExcuse(type)
        console.log(typeOfExcuse)
    }
    async function fetchData(){
        try{
            const response = await fetch(`https://excuser-three.vercel.app/v1/excuse/${typeOfExcuse}/`)

            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            const data = await response.json()
            setExcuse(data[0].excuse)
            console.log(data)
            console.log(typeOfExcuse)
            

        }catch(error){
            console.error(error);
        }
    }
        useEffect(() => {
            if (typeOfExcuse.trim() !== "") {
                fetchData();
            }
            }, [typeOfExcuse]);
    return (
    <>
        {/* <div><input className="bg-amber-50 text-stone-950 " type="text" id="pokemonName" placeholder="Enter Pokemon name" />
        <button onClick={fetchData} className="bg-amber-400">Fetch Pokemon</button>
        <img src="" alt="Pokemon spirit" id="pokemonSpirite" className="hidden" /></div> */}
        <h1>Generate An Excuse</h1>
        <button className="bg-amber-400" onClick={()=>handleBtnClick('party')}>Party</button>
        <button className="bg-amber-400 mx-3" onClick={()=>handleBtnClick('family')}>Family</button>
        <button className="bg-amber-400 px-2" onClick={()=>handleBtnClick('office')}>Office</button>
        <p>{excuse}</p>
    </>
    );
}