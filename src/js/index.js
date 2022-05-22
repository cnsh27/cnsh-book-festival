const bookSelectBtns = document.querySelector(".radioSlider");
const bookshelf = document.querySelector('.bookshelf ul');

const bookCnt = 8;
const bookPosters = [];

const bookSelectBtnHtml = (thisBookCnt) => {
    return `
    <div class="bookSelectBtn">
        <input type="radio" name="book" id="book${thisBookCnt}" ${thisBookCnt==1 ? `checked` : ''}>
        <label for="book${thisBookCnt}"></label>
    </div>`;
};

const bookPosterhtml = (thisBookCnt) => {
    return `
    <li id="bookPoster${thisBookCnt}" class="bookPoster">
        <img src="./src/img/book/book${thisBookCnt}.png" alt="">
    </li>
    `;
}

const radioBaseHtml = (thisBookCnt) => {

    return `
    <div id="radioBtn${thisBookCnt}" class="radioBaseBtn flex flex-middle flex-center">
        <div class="radioBaseImgBtn">
            
        </div>
    </div>
    `;
}

for(let i = 0; i < bookCnt; i++){
    const bookBtnHtml = radioBaseHtml(i+1);
    const bookPosterHtml = bookPosterhtml(i+1);
    bookSelectBtns.innerHTML += bookBtnHtml;
    bookshelf.innerHTML += bookPosterHtml;
    
    bookPosters.push(document.querySelector(`#bookPoster${i+1} img`));
}

console.log(bookPosters);




function rotateBookshelf(index){
    $('.radioRealBtn').css('transform', `translateX(${2.7*index}rem)`);
    for(let i = 0; i < bookCnt; i++){
        const circleIndex = getCircleIndex(index, i);
        if(Math.abs(circleIndex) > 3){
            $(`#bookPoster${i+1} img`).css({'display': `none`});
        }else{
            $(`#bookPoster${i+1} img`).css({'display': `block`});
        }
        $(`#bookPoster${i+1}`).css({'transform': `translateX(${Math.sqrt(Math.abs(circleIndex))*35*Math.sign(circleIndex)}rem)`}); 
        $(`#bookPoster${i+1} img`).css({'transform': `perspective(40rem) rotateY(${30*circleIndex}deg)`});
        $(`#bookPoster${i+1} img`).height(`${Math.abs(circleIndex)*(-12)+45}rem`);
        $(`#bookPoster${i+1}`).css(`z-index`, Math.abs(circleIndex)*(-1)+100);
        $(`#bookPoster${i+1} img`).attr(`alt`, circleIndex);
        
    }
}

function getCircleIndex(currentIndex, myIndex){
    if(myIndex - currentIndex > bookCnt/2){
        return myIndex - currentIndex - bookCnt;
    }else if(myIndex - currentIndex <= -bookCnt/2){
        return myIndex - currentIndex + bookCnt;
    }else{
        return myIndex - currentIndex;
    }
}

let indexT = 0;
rotateBookshelf(0);


for(let i = 0; i < bookCnt; i++){
    $(`#bookPoster${i+1} img`).click(()=>{
        if(i == indexT){
            window.location.href = '/book.html?ind='+ i;
        }else{
            indexT = i;
            rotateBookshelf(indexT);
        }
    });
    $(`#radioBtn${i+1}`).click(()=>{
        if(i != indexT){
            indexT = i;
            rotateBookshelf(indexT);
        }
    });
}