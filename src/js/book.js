

const oxBtnHtml = (isRight, text) => {
    return `
    <div class="question">
        <div class="qText">Q. ${text}</div>
        <div class="oxBtns flex flex-middle flex-center">
            <div onclick="oxBtnClick(this);" class="ox o flex flex-center flex-middle ${isRight ? 'right':''}">
                <img src="./src/img/o.png" alt="o">
            </div>
            <div onclick="oxBtnClick(this);" class="ox x flex flex-center flex-middle ${isRight ? '':'right'}">
                <img src="./src/img/x.png" alt="x">
            </div>
        </div>
    </div>`;
};
const url = location.href;
const bookIng = url.substring(url.indexOf("ind=")+4, url.length);
console.log(bookIng);

const bookImgReal = document.querySelector('.bookImgReal');
const bookName = document.querySelector('.bookName');
const leaflet = document.querySelector('.leaflet');
const video = document.querySelector('.video');
const audio = document.querySelector('.audio');
const questions = document.querySelectorAll('.question');

const leafletP = document.querySelector('.bookLeaflet-warp');
const videoP = document.querySelector('.bookVideo-warp');
const audioP = document.querySelector('.reading-warp');
const questionP = document.querySelector('.bookOX-warp');

(async ()=>{
    const get = await fetch('/src/config.json', {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    });
    const jsonData = await get.json();
    console.log(jsonData);
    const data = jsonData.books[bookIng];
    bookImgReal.src = data.imgURL;
    bookName.innerHTML = data.name;

    if(data.leaflet == ""){
        leafletP.style.display = "none";
    }else{
        leafletP.style.display = "block";
        leaflet.src = data.leaflet;
    }

    if(data.video == ""){
        videoP.style.display = "none";
    }else{
        videoP.style.display = "block";
        video.src = data.video;
        document.querySelector('#videoLoad').load();
    }

    if(data.reading == ""){
        audioP.style.display = "none";
    }else{
        audioP.style.display = "block";
        audio.src = data.reading;
        document.querySelector('#audioLoad').load();
    }

    if(data.oxCnt == 0){
        questionP.style.display = "none";
    }else{
        questionP.style.display = "block";
        for(let i = 0; i < data.oxCnt; i++){
            const btn = $('.bookOX-warp').append(oxBtnHtml(data.ox[i].a, data.ox[i].q));
        }
        
    }
    
})();


function oxBtnClick(dom){
    if(!dom.parentNode.classList.contains('done')){
        const isRight = dom.classList.contains('right');
        console.log(isRight);
        if(isRight){
            console.log('click');
            dom.classList.add('correct');
            dom.style.boxShadow = '0 3px 8px 6px rgb(113, 170, 105)';
        }else{
            dom.classList.add('wrong');
            dom.style.boxShadow = '0 3px 8px 6px rgb(173, 93, 93)';
        }
        dom.parentNode.classList.add('done');
    }
}