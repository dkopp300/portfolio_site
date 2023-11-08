// main.js

document.addEventListener('DOMContentLoaded', (event) => {
    document.body.classList.add('dark-mode');

    // Sort the posts by date in descending order
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));


    function showRecentPosts() {
        const container = document.querySelector(".main-content-container");
        container.innerHTML = '';

        const recentPosts = posts.slice(0, 5);
        recentPosts.forEach(post => {
            container.innerHTML += `
                <h6>${post.title}</h6>
                <p>${post.date}</p>
                ${post.content.map(paragraph => `<p>${paragraph}</p>`).join('')}
                ${post.media ? post.media.map(mediaItem => {
                if (mediaItem.type === "image") {
                    return `<img src="${mediaItem.src}" alt="${mediaItem.alt}" />`;
                }
                return '';
            }).join('') : ''}
                <hr />
            `;
        });
    }

    function showPosts(category) {
        const container = document.querySelector(".main-content-container");
        container.innerHTML = '';

        const categoryPosts = posts.filter(post => post.category === category);

        categoryPosts.forEach(post => {
            container.innerHTML += `
                <h6>${post.title}</h6>
                <p>${post.date}</p>
                ${post.content.map(paragraph => `<p>${paragraph}</p>`).join('')}
                ${post.media ? post.media.map(mediaItem => {
                if (mediaItem.type === "image") {
                    return `<img src="${mediaItem.src}" alt="${mediaItem.alt}" />`;
                }
                return '';
            }).join('') : ''}
                <hr />
            `;
        });
    }

    function handleLinkClick(link) {
        const category = link.getAttribute('href').replace('#', '');

        // Remove the 'current-page' class from all links
        document.querySelectorAll(".side-column-menu ul li a").forEach(link => {
            link.classList.remove('current-page');
        });

        // Add the 'current-page' class to the clicked link
        link.classList.add('current-page');

        if (category !== 'home') {
            showPosts(category);
        } else {
            showRecentPosts();
        }
    }

    // Show the most recent posts by default when the page loads
    showRecentPosts();

    // Set up event listeners for navigation links
    document.querySelectorAll(".side-column-menu ul li a").forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor click behavior
            handleLinkClick(link);
        });
    });

    // Initialize the modal for resume
    initializeResumeModal();
});

// Function to initialize the resume modal
function initializeResumeModal() {
    // Get the existing modal element
    var modal = document.getElementById('resume-modal');

    // Get the <span> element that closes the modal
    var span = document.querySelector('.close');

    // Get the button that opens the modal
    var resumeBtn = document.getElementById('resume-link');

    // When the user clicks the button, open the modal
    resumeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        modal.style.display = 'block';
    });

    // When the user clicks on <span> (x), close the modal
    span.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}

// Page Navigation
let previousPage = null;
let currentPage = 'home';
