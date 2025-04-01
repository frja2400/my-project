import './style.css';

interface courseInfo {
    code: string,
    name: string,
    progression: 'A' | 'B' | 'C',
    syllabus: string
}

function saveCourses(courses: courseInfo[]): void {
    localStorage.setItem('courses', JSON.stringify(courses));
}

function getCourses(): courseInfo[] {
    return JSON.parse(localStorage.getItem('courses') || '[]');
}

function printCourseInfo(course: courseInfo): void {
    const courseListEl = document.getElementById("courseList");
    if (courseListEl) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="Kurskod">${course.code}</td>
            <td data-label="Kursnamn">${course.name}</td>
            <td data-label="Progression">${course.progression}</td>
            <td data-label="URL till kursplanen"><a href="${course.syllabus}" target="_blank">${course.syllabus}</a></td>
        `;
        courseListEl.appendChild(row);
    }
}

function displayCourses(): void {
    const courses = getCourses();
    courses.forEach(course => printCourseInfo(course));
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

    const courses = getCourses();

    if (courses.some(course => course.code === newCourse.code)) {
        alert('Kurskoden måste vara unik.');
        return;
    }

    courses.push(newCourse);
    saveCourses(courses);
    printCourseInfo(newCourse);

    nameInput.value = '';
    codeInput.value = '';
    progressionInput.value = '';
    urlInput.value = '';
});

displayCourses();