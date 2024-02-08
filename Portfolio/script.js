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

/* Form submit */
/*class FormSubmit {
    constructor(settings){
        this.settings = settings;
        this.form = document.querySelector(settings.button);
        if(this.form){
            this.url = this.form.getAttribute("action");
        }
    }

    displaySuccess(){
        this.form.innerHTML = this.settings.success;
    }

    displayError(){
        this.form.innerHTML = this.settings.error;
    }
}

SVGAnimatedTransformList() {
    fetch(this.url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: "",
    });
}

const formSubmit = new FormSubmit({}); */