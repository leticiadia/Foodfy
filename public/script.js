const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 5,
    files: [],
    handleFileInput(event){
        const { files: fileList } = event.target
        PhotosUpload.input = event.target
        
        if(PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {
            PhotosUpload.files.push(file)
            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event){
        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input

        if(fileList.length > uploadLimit){
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()

            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == 'photo'){
                photosDiv.push(item)
            }  
        })

        const totalPhotos = fileList.length + photosDiv.length
        if(totalPhotos > uploadLimit){
            alert('Você atingiu o limite máximo de fotos')
            event.preventDefault()

            return true
        }

        return false
    },
    getAllFiles(){
       const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()
       
       PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

       return dataTransfer.files
    },
    getContainer(image){
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton() {
        const button = document.createElement('p')
        button.classList.add('icon')
        button.innerHTML = "+"

        return button
    },
    removePhoto(event){
        const photoDiv = event.target.parentNode
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    }
    
}

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

function createPagination(pagination){
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)
    
    let elements = ''
    
    for(let page of pages){
    
        if(String(page).includes('...')){
            elements += `<span>${page}</span>`
        }else if(filter){
            elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
        }else{
            elements += `<a href="?page=${page}">${page}</a>`
        }
      
    }
    
    pagination.innerHTML = elements
}

const pagination = document.querySelector('.pagination')

if(pagination){
    createPagination(pagination)
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


