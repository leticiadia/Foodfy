function activeImage(){
    let imagens = document.querySelectorAll('.card');

    for(let i = 0; i <imagens.length; i++){
        imagens[i].addEventListener('click',function(){
            
           const receitaId = imagens[i].getAttribute('id')
    
            window.location.href = `/inforeceitas?id=${receitaId}`
        });
    }
}

activeImage()











