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
        courseListEl.innerHTML = `${course.name} - ${course.code} - ${course.progression} - ${course.syllabus}`
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

    printCourseInfo(newCourse);
});