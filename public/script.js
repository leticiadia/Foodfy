function activeImage(){
    let imagens = document.querySelectorAll('.card');

    for(let i = 0; i <imagens.length; i++){
        imagens[i].addEventListener('click',function(){
            
           const receitaId = imagens[i].getAttribute('id')
    
            window.location.href = `/inforeceitas?id=${receitaId}`
        });
    }
}

function addIngredient(){
    const ingredients = document.querySelector('#ingredients')
    const fieldContainer = document.querySelectorAll('.ingredient')

    const newFiled = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    if(newFiled.children[0].value == ""){
        return false
    }

   return ingredients.appendChild(newFiled)
}

document.querySelector('.add-ingredient').addEventListener('click', addIngredient)


function addPreparation(){
    const preparations = document.querySelector('#preparations')
    const fieldContainer = document.querySelectorAll('.preparation')

    const newFiled = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    if(newFiled.children[0].value == ""){
        return false
    }

   return preparations.appendChild(newFiled)
}

document.querySelector('.add-mode-preparation').addEventListener('click', addPreparation)






