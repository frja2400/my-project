import './style.css';

//Definierar en Interface med fyra egenskaper.
interface courseInfo {
    code: string,
    name: string,
    progression: 'A' | 'B' | 'C',
    syllabus: string
}

//Funktion som tar en array av courseInfo-objekt och sparar den i localStorage som en JSON-sträng.
function saveCourses(courses: courseInfo[]): void {
    localStorage.setItem('courses', JSON.stringify(courses));
}

//Funktion som hämtar kursdata från localStorage och omvandlar JSON till en array av objekt.
function getCourses(): courseInfo[] {
    return JSON.parse(localStorage.getItem('courses') || '[]');
}

//Funktion som manipulerar DOM och skriver ut kursinformation i min tabell i HTML.
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

//Funktion som hämtar alla kurser från localStorage och anropar printCourseInfo.
function displayCourses(): void {
    const courses = getCourses();
    courses.forEach(course => printCourseInfo(course));
}

const courseForm = document.getElementById("courseForm") as HTMLFormElement;

//Hindrar ett formulär från sitt standardbeteende.
courseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //Hämtar formulärets inputfält.
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const codeInput = document.getElementById("code") as HTMLInputElement;
    const progressionInput = document.getElementById("progression") as HTMLSelectElement;
    const urlInput = document.getElementById("url") as HTMLInputElement;

    //Skapar ett nytt courseInfo-objekt med det inskrivaa värdet.
    const newCourse: courseInfo = {
        code: codeInput.value,
        name: nameInput.value,
        progression: progressionInput.value as 'A' | 'B' | 'C',
        syllabus: urlInput.value
    }

    //Kontrollera om kurskoden redan finns.
    const courses = getCourses();
    if (courses.some(course => course.code === newCourse.code)) {
        alert('Kurskoden måste vara unik.');
        return;
    }

    //Lägger till den nya kursen, sparar i localStorage och skriver ut.
    courses.push(newCourse);
    saveCourses(courses);
    printCourseInfo(newCourse);

    //Rensar input-fält.
    nameInput.value = '';
    codeInput.value = '';
    progressionInput.value = '';
    urlInput.value = '';
});

//Anropar displayCourses för att visa alla kurser som redan finns i localStorage när sidan laddas.
displayCourses();