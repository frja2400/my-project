import './style.css';

interface courseInfo {
    code: string,
    name: string,
    progression: 'A' | 'B' | 'C',
    syllabus: string
}

function printCourseInfo(course: courseInfo): void {
    const courseListEl = document.getElementById("courseList");
    if (courseListEl) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.name}</td>
            <td>${course.progression}</td>
            <td><a href="${course.syllabus}" target="_blank">${course.syllabus}</a></td>
        `;
        courseListEl.appendChild(row);
    }
}

const courseForm = document.getElementById("courseForm") as HTMLFormElement;

courseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const codeInput = document.getElementById("code") as HTMLInputElement;
    const progressionInput = document.getElementById("progression") as HTMLSelectElement;
    const urlInput = document.getElementById("url") as HTMLInputElement;

    const newCourse: courseInfo = {
        code: codeInput.value,
        name: nameInput.value,
        progression: progressionInput.value as 'A' | 'B' | 'C',
        syllabus: urlInput.value
    }

    const existingCourses = document.querySelectorAll("#courseList tr");
    
    for (let i = 0; i < existingCourses.length; i++) {
        const courseCode = existingCourses[i].querySelector("td")?.textContent;
        if (courseCode === newCourse.code) {
            alert('Kurskoden måste vara unik.');
            return;
        }
    }

    printCourseInfo(newCourse);
});