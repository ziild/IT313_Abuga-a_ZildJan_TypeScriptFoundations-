import isPassing, { computeAverage } from './gradeUtils.js'; 

const enrollees = [
    { name: 'Ana Cruz', prelim: 85, midterm: 90, final: 88 },
    { name: 'Bea Santos', prelim: 70, midterm: 65, final: 60 },
    { name: 'Cid Ramos', prelim: 95, midterm: 92, final: 97 },
    { name: 'Dex Alonzo', prelim: 60, midterm: 55, final: 50 }, 
    { name: 'Eli Tan', prelim: 78, midterm: 80, final: 76 },
];

function getEnrollees() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve(enrollees);

            reject(new Error('Failed to fetch enrollees data'));
        }, 1000);
    });
}

async function generateReport() {
    try {
        const rawData = await getEnrollees();

        const evaluatedEnrollees = rawData.map((enrollee) => {
            const { name, prelim, midterm, final } = enrollee;
            const average = computeAverage(prelim, midterm, final);
            const status = isPassing (average) ? 'Passing' : 'Probation';

            return { name, average, status };
        });

        const passingEnrollees = evaluatedEnrollees.filter((enrollee) => enrollee.status === 'Passing');
        const totalScore = evaluatedEnrollees.reduce((accumulator, current) => accumulator + current.average, 0);

        const classAverage = totalScore / evaluatedEnrollees.length;    

        console.log("=== IT313 Enrollment Eligibility Report ===");
        evaluatedEnrollees.forEach(({ name, average, status }) => {
            console.log(`${name}: Average Score = ${average.toFixed(2)}, Status = ${status} `);
        });
        console.log(`\nClass Average: ${classAverage.toFixed(2)}`);
        console.log(`Passing: ${passingEnrollees.length}/${evaluatedEnrollees.length}`);

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

generateReport();