// Check if user is logged in, redirect to index.html if not
if (!sessionStorage.getItem('loggedIn')) {
  window.location.href = '../index.html';
} else {
  // Set loggedIn flag in local storage
  localStorage.setItem('loggedIn', 'true');
}

// Check if user has already logged in using localStorage
if (localStorage.getItem('loggedIn') !== 'true') {
  // Redirect user back to login page
  window.location.href = '../index.html';
}

//Animation on start for the entirety of the page
function startAnimation() {
    var element = document.getElementsByClassName("gradient-text")[0];
    element.classList.add("onclick");
  }

function startAnimation() {
    var element = document.getElementsByClassName("gradient-text")[0];
    element.classList.toggle("onclick");
  }

  //Dropdown menu
  function toggleDropdown() {
    var dropdown = document.querySelector(".dropdown-content");
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    } else {
      dropdown.style.display = "block";
    }
  }

  function toggleDropdown() {
    const dropdownContent = document.querySelector(".dropdown-content");
    const buttons = dropdownContent.querySelectorAll("button");
  
    let displayValue = window.getComputedStyle(dropdownContent).display;
    if (displayValue === "none") {
      buttons.forEach((button, index) => {
        setTimeout(() => {
          button.style.display = "block";
        }, index * 275);
      });
    } else {
      buttons.forEach((button) => {
        button.style.display = "none";
      });
    }
  
    dropdownContent.style.display = displayValue === "none" ? "block" : "none";
  }



















































  