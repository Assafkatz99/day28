// ######################## EX1 ########################
// ##### A #####

// function getData() {
//     return new Promise((resolve, reject) => {
//         setTimeout(()=>{resolve("hello world")},2000)
//     }) 
// }

// getData().then((result) => {console.log(result)})

// async function processData() {
    //     let data = await getData()
    //     console.log(data)
    // }
    
    // processData()


// ##### B #####

// function myFunction(data) {
//     return new Promise((resolve, reject) => {
//         if (typeof(data) !== "number"){
//             reject("this is not a number")
//         }else{
//             if (data % 2 === 0){
//                 setTimeout(() => {resolve("even")},2000)
//             }else{
//                 setTimeout(() => {resolve("odd")},1000)
//             }
//         }
//     })
// }

// myFunction(2)
// .catch((err)=>{console.log(err)})
// .then((result)=>{console.log(result)})


// ######################## EX2 ########################


let flags_menu_div = document.getElementById("flags_menu_div");

function renderFlagsWithData (data){
    for (let i in data){
        
        // defining
        let flag_card = document.createElement(`div`);
        let flag_img = document.createElement(`img`);
        let flag_bottom_part_div = document.createElement(`section`);
        let flag_detalis_div = document.createElement(`section`);

        // properties
        flag_img.setAttribute("src", data[i]["flags"]["png"])
        flag_bottom_part_div.setAttribute("id", "flag_des_id")
        flag_detalis_div.setAttribute("id", "flag_detalis_id")
        flag_bottom_part_div.innerHTML = `${data[i]["name"]}`
        flag_detalis_div.innerHTML = `
        <b>Population:</b> ${data[i]["population"].toLocaleString()}<br>
        <b>Region:</b> ${data[i]["region"]}<br>
        <b>Capital:</b> ${data[i]["capital"]}<br>
        `

        // appending
        flag_bottom_part_div.appendChild(flag_detalis_div)

        flag_card.appendChild(flag_img)
        flag_card.appendChild(flag_bottom_part_div)

        // final appending
        flags_menu_div.appendChild(flag_card);
    }
}

async function generateAllFlags(){

    let data;
    await fetch('https://restcountries.com/v2/all')
    .then(response => response.json())
    .then(data_api => data = data_api)
    .catch(error => console.error(error));

    renderFlagsWithData(data)
    }

async function generateFlagsByInput(input){

    let data;
    await fetch(`https://restcountries.com/v2/name/${input}`)
    .then(response => response.json())
    .then(data_api => data = data_api)
    .catch(error => console.error(error));

    renderFlagsWithData(data)
    }

async function generateFlagsBySelection(region){

    let data;
    await fetch(`https://restcountries.com/v2/region/${region}`)
    .then(response => response.json())
    .then(data_api => data = data_api)
    .catch(error => console.error(error));

    renderFlagsWithData(data)
    }

    
let input_button = document.getElementById("input")

input_button.addEventListener("input", () => {
    flags_menu_div.innerHTML=""
    console.log(input_button.value)
    if (input_button.value == 0){
        generateAllFlags()

    }
    else {
        generateFlagsByInput(input_button.value)
    }
})

let drop_down_menu_input = document.getElementById("region")

drop_down_menu_input.addEventListener("change",() => {
    flags_menu_div.innerHTML=""
    console.log(drop_down_menu_input.value)
    if (drop_down_menu_input.value == "all"){
        generateAllFlags()
    }
    else {
        generateFlagsBySelection(drop_down_menu_input.value)
    }
    })

generateAllFlags()

