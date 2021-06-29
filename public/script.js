function paginate(selectedPage, totalPages){
    let pages = [],
        oldPage

    for(let currentPage = 1; currentPage <= totalPages; currentPage++){

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

        if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage){
            
            if(oldPage && currentPage - oldPage > 2){
                pages.push('...')
            }

            if(oldPage && currentPage - oldPage == 2){
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)
            oldPage = currentPage
        }
    }

    return pages
}

const pagination = document.querySelector('.pagination')
const page = +pagination.dataset.page
const total = +pagination.dataset.total
const pages = paginate(page, total)

let elements = ''

for(let page of pages){
    elements += `<a href="#">${page}</a>`
}

pagination.innerHTML = elements

console.log(pages)


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


