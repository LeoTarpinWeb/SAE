window.addEventListener('DOMContentLoaded',function(){
    const check = document.querySelector('#menu_checkbox');
    const header = document.querySelector('header');
    const navi = document.querySelectorAll('.navi');
    check.addEventListener('click',function(){
            header.classList.toggle('open');
            navi.forEach(navi=>{navi.classList.toggle('ouvert')});
    })
    
})
    /*afficher le background header si scroll > 0*/
    const header = document.querySelector('header');
    var size = document.body.clientWidth;
    
        
            onscroll = (event) => {
                var body = document.querySelector('body');
                if (size > 1000){
                if(body.scrollTop > 1){
                    header.style.backgroundColor="#eeebca";
                    console.log(body.scrollTop);
                }
                else{header.style.backgroundColor="";}
            };
        };