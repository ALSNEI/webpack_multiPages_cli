import './index.css'
function component(){
    let element = document.createElement('div');
    let btn = document.createElement('button');

    element.innerHTML = ['hello','webpack'].toString();
    element.classList.add('hello');

    btn.innerHTML = "Click me and check the console!";
    btn.onclick = function(){
        alert("btn clicked")
        $('.hello').css({'color':'green'})
    };

    
    (()=>{
        console.log(222);
    })()

    element.appendChild(btn);

    

    return element;
}
document.body.appendChild(component());