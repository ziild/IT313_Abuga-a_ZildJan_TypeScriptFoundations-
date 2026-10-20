import getStatus, { 
    computeAverage,
    EnrollmentStatus 
} from './gradeUtils.js';

interface Enrollee {
    name: string;
    prelim: number;
    midterm: number;
    final: number;
}

type EligibilityReport = {
    name: string;
    average: number;
    status: EnrollmentStatus;
    remarks?: string;
};

const enrollees: Enrollee[] = [
    { name: 'Ana Cruz', prelim: 85, midterm: 90, final: 88 },
    { name: 'Bea Santos ', prelim: 70, midterm: 65, final: 60 },
    { name: 'Cid Ramos', prelim: 95, midterm: 92, final: 97 },
    { name: 'Dex Alonzo', prelim: 60, midterm: 55, final: 50 },
    { name: 'Eli Tan', prelim: 78, midterm: 80, final: 76 },
];

function getEnrollees (): Promise<Enrollee[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(enrollees);
        }, 1000);
    });
}

function groupBy<T> (
    items: T[],
    keyFn: (item: T) => string
): Record<string, T[]> {
    return items.reduce((groups, item) => {
        const key = keyFn(item);

        if (!groups[key]) {
            groups[key] = [];
        }

        groups[key].push(item);
        return groups;
    }, {} as Record<string, T[]>);
}

async function generateReport(): Promise<void> {
    try {
        const rawData = await getEnrollees();
        const batchId: string | number = "IT313-001";

        if (typeof batchId === 'string') {
            console.log(`Batch ID: ${batchId}`);
        } else {
            console.log(`Batch Number: ${batchId}`);
        }

        const reports: EligibilityReport[] = rawData.map((enrollee) => {
            const { name,prelim, midterm, final } = enrollee;
            const average = computeAverage(prelim, midterm, final);
            const status = getStatus(average);

            return {
                name, 
                average,
                status, 
                ...(status === EnrollmentStatus.Probation ? 
                    { remarks: 'Needs Improvement' }
                    : {})
            };
        });

        const groupedReport = groupBy(
            reports, 
            (report) => report.status
        );

        const classTotal = reports.reduce(
            (total, report) => total + report.average,
            0
        )

        const classAverage = classTotal / reports.length; 
        const passingCount = groupedReport[EnrollmentStatus.Passing]?.length || 0;

        console.log("\n === IT313-001 Eligibility Report ===");

        reports.forEach(({ name, average, status, remarks }) => {
            console.log(
                `${name}: Average Score = ${average.toFixed(2)}, Status = ${status}`
            );

            if (remarks) {
                console.log(`Remarks: ${remarks}`);
            }
        });


        console.log(`\nClass Average: ${classAverage.toFixed(2)}`);
        console.log(`Passing: ${passingCount}/${reports.length}`);

    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error generating report: ${error.message}`);
        } else {
            console.error('An unknown error occurred while generating the report.');
        }
    }
}

generateReport();

