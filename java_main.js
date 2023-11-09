const header = document.querySelector('header');

window.addEventListener('DOMContentLoaded',function(){
    const check = document.querySelector('#menu_checkbox');

    const navi = document.querySelectorAll('.navi');
    check.addEventListener('click',function(){
            header.classList.toggle('open');
            navi.forEach(navi=>{navi.classList.toggle('ouvert')});
    })
    
})
    /*afficher le background header si scroll > 0*/
    
window.addEventListener('scroll',function(){
    var size = window.clientwidth;
    scrol=window.scrollY;
                    if(scrol > 50){
                        header.style.backgroundColor="#eeebca";
                    }
                    else{header.style.backgroundColor="";}
               
})