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



function deleteRegisteredForm(){
    const formDelete = document.querySelector('#form-delete')

    formDelete.addEventListener('submit', function(event){
        const confirmation = confirm('Deseja Deletar?')

        if(!confirmation){
            event.preventDefault()
        }
    })
}

deleteRegisteredForm()


