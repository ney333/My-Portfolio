/* Slides on certification area*/

const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Remove event listeners on mouse up
        const handleMouseup = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseup);
        }

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseup);
    })

    //Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id == "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy ({ left: scrollAmount, behavior: "smooth"});
        })
    })

   const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block"
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block"
   }

   //Update scrollbar thumb position based on iamge scroll
   const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
   }
   
    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    })

}

window.addEventListener("load", initSlider);

/* Menu Mobile */

let btnMenu = document.getElementById('btn-menu');
let menu = document.getElementById('mobile-menu');
let overlay = document.getElementById('overlay-menu');

btnMenu.addEventListener('click', ()=>{
    menu.classList.add('open-menu')
});

menu.addEventListener('click', ()=>{
    menu.classList.remove('open-menu')
});

overlay.addEventListener('click', ()=>{
    menu.classList.remove('open-menu')
});

/* Show more and show less button */

document.getElementById('displayContent').addEventListener('click', function() {
    var moreContent = document.getElementById('moreContent');
    var button = document.getElementById('displayContent');
    
    if (moreContent.classList.contains('hidden')) {
        moreContent.classList.remove('hidden');
        moreContent.classList.add('show');
        button.textContent = 'Show Less';
    } else {
        moreContent.classList.remove('show');
        moreContent.classList.add('hidden');
        button.textContent = 'Show More';
    }
});
