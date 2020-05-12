
export default function DragWindow() {
    let isDown = false;
    let startX;
    let scrollLeft;
    var scrollTop
    let startY;
    const slider = document.querySelector("#Grid_PinPlane") ;
    
function RespondMouseDown(e){
    slider.classList.add('active');
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    scrollTop=slider.scrollTop;
    startY = e.pageY - slider.offsetTop;
}
function RespondMouseUp() {
    isDown = false;
    slider.classList.remove('active');
}
function RespondLeave() {
    isDown = false;
    slider.classList.remove('active');
}
function RespondMouseMove(e) {
    if (!isDown) return;
    e.preventDefault();
   const x = e.pageX - slider.offsetLeft;
   const y=e.pageY+slider.offsetTop;
   const walk = (x - startX)*3; //scroll-fast
   const walk2=(y-startY)*1
   slider.scrollLeft = scrollLeft - walk;
   slider.scrollTop = scrollTop - walk2;
}

  if (slider != null) {
            slider.addEventListener("mousedown",(e)=> RespondMouseDown(e));
              slider.addEventListener("mouseleave",RespondLeave);
              slider.addEventListener("mouseup",RespondMouseUp);
              slider.addEventListener("mousemove", (e) => RespondMouseMove(e));
        }
    }
    

