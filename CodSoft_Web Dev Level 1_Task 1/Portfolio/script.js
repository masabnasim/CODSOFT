let currentIndex = 0;
const projects = document.querySelectorAll('.project');

function showProject(index) {
    projects.forEach((project, i) => {
        project.style.display = i === index ? 'block' : 'none';
    });
}

document.getElementById('prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = projects.length - 1;
    }
    showProject(currentIndex);
});

document.getElementById('next').addEventListener('click', () => {
    if (currentIndex < projects.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    showProject(currentIndex);
});

showProject(currentIndex);
