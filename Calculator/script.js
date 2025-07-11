
function appendValue(value){
    document.querySelector('.display').value += value
}
function clearDisplay(){
    document.querySelector('.display').value = ''
}

function calculate(){
    const result = eval(document.querySelector('.display').value)
    document.querySelector('.display').value = result
}

function remDisplay(){
    let display = document.querySelector('.display')
    display.value = display.value.slice(0, -1)
}

//menu
const menuBtn = document.querySelector('.menu-button')
const menuContent = document.querySelector('.menu-content')
menuBtn.addEventListener('click',()=>{
  menuContent.style.display = menuContent.style.display === 'flex'?'none':'flex'
})