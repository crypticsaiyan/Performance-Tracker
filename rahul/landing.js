document.addEventListener("DOMContentLoaded", () => {
    let startY = 0;
    let endY = 0;
    const threshold = 100; // Minimum swipe distance to trigger
  
    const page1 = document.getElementById("page1");
    const page2 = document.getElementById("page2");
  
    // Detect touch start
    page1.addEventListener("touchstart", (e) => {
      startY = e.touches[0].clientY;
    });
  
    // Detect touch end
    page1.addEventListener("touchend", (e) => {
      endY = e.changedTouches[0].clientY;
  
      if (startY - endY < -threshold) {
        // Swipe down detected
        page1.style.transform = "translateY(-100%)";
        page2.style.transform = "translateY(0)";
      }
    });
  });
  let scrolled = false;
  
  document.addEventListener("wheel", (e) => {
    if (!scrolled && e.deltaY > 0) {
      // Scroll down
      page1.style.transform = "translateY(-100%)";
      page2.style.transform = "translateY(0)";
      scrolled = true;
    } else if (scrolled && e.deltaY < 0) {
      // Scroll up
      page1.style.transform = "translateY(0)";
      page2.style.transform = "translateY(100%)";
      scrolled = false;
    }
  });
  