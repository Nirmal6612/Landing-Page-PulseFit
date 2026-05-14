
var header = document.getElementById("header");
var menuBtn = document.getElementById("menu-btn");
var navMenu = document.getElementById("nav-menu");
var slides = document.getElementById("slides");
var prevBtn = document.getElementById("prev-btn");
var nextBtn = document.getElementById("next-btn");
var dotsContainer = document.getElementById("dots");
var form = document.getElementById("signup-form");
var emailInput = document.getElementById("email-input");
var errorMsg = document.getElementById("error-msg");
var successMsg = document.getElementById("success-msg");




window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});




menuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("open");
    menuBtn.classList.toggle("active");

    if (navMenu.classList.contains("open")) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
});


var navLinks = document.querySelectorAll("#nav-menu a");
for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
        navMenu.classList.remove("open");
        menuBtn.classList.remove("active");
        document.body.style.overflow = "";
    });
}




var totalSlides = slides.children.length;
var currentSlide = 0;


for (var i = 0; i < totalSlides; i++) {
    var dot = document.createElement("button");
    dot.className = "dot";
    if (i === 0) dot.classList.add("active");
    dot.setAttribute("data-index", i);
    dot.setAttribute("aria-label", "Go to review " + (i + 1));
    dotsContainer.appendChild(dot);
}

var allDots = dotsContainer.querySelectorAll(".dot");


function goToSlide(index) {

    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentSlide = index;
    slides.style.transform = "translateX(-" + (currentSlide * 100) + "%)";


    for (var j = 0; j < allDots.length; j++) {
        allDots[j].classList.remove("active");
    }
    allDots[currentSlide].classList.add("active");
}


prevBtn.addEventListener("click", function () {
    goToSlide(currentSlide - 1);
});

nextBtn.addEventListener("click", function () {
    goToSlide(currentSlide + 1);
});

dotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dot")) {
        var index = parseInt(e.target.getAttribute("data-index"));
        goToSlide(index);
    }
});

var autoPlay = setInterval(function () {
    goToSlide(currentSlide + 1);
}, 5000);


function restartAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = setInterval(function () {
        goToSlide(currentSlide + 1);
    }, 5000);
}

prevBtn.addEventListener("click", restartAutoPlay);
nextBtn.addEventListener("click", restartAutoPlay);
dotsContainer.addEventListener("click", restartAutoPlay);

var touchStartX = 0;
slides.addEventListener("touchstart", function (e) {
    touchStartX = e.touches[0].clientX;
});

slides.addEventListener("touchend", function (e) {
    var touchEndX = e.changedTouches[0].clientX;
    var diff = touchEndX - touchStartX;

    if (diff > 50) {
        goToSlide(currentSlide - 1);
        restartAutoPlay();
    } else if (diff < -50) {
        goToSlide(currentSlide + 1);
        restartAutoPlay();
    }
});




form.addEventListener("submit", function (e) {
    e.preventDefault();

    var email = emailInput.value.trim();
    errorMsg.textContent = "";
    successMsg.textContent = "";


    if (email === "") {
        errorMsg.textContent = "Please enter your email address.";
        emailInput.focus();
        return;
    }


    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMsg.textContent = "That doesn't look like a valid email. Try something like name@example.com";
        emailInput.focus();
        return;
    }


    successMsg.textContent = "You're in! Check your inbox for a welcome email.";
    emailInput.value = "";
});


emailInput.addEventListener("input", function () {
    errorMsg.textContent = "";
    successMsg.textContent = "";
});




var allAnchors = document.querySelectorAll('a[href^="#"]');
for (var i = 0; i < allAnchors.length; i++) {
    allAnchors[i].addEventListener("click", function (e) {
        var targetId = this.getAttribute("href");
        var targetEl = document.querySelector(targetId);

        if (targetEl) {
            e.preventDefault();
            var headerHeight = header.offsetHeight;
            var targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
            window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
    });
}
