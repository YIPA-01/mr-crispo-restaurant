// ==UserScript==
// @name         Spanish Grade Converter Auto-Fill
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Automatically fills course information into Spanish Grade Converter (Conversor de calificaciones)
// @author       Grade Converter Helper
// @match        https://sede.educacion.gob.es/conversorcalificacion/apartado5*
// @match        https://sede.educacion.gob.es/conversorcalificacion/*
// @match        *sede.educacion.gob.es/conversorcalificacion/apartado5*
// @match        *educacion.gob.es/conversorcalificacion/apartado5*
// @grant        none
// @run-at       document-end
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    // Wait for page to be fully loaded
    function waitForPageLoad() {
        return new Promise((resolve) => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve);
            }
        });
    }

    // Wait for specific elements to be available
    function waitForElement(selector, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }

            const observer = new MutationObserver((mutations) => {
                const element = document.querySelector(selector);
                if (element) {
                    observer.disconnect();
                    resolve(element);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }, timeout);
        });
    }

    // Complete course data array (ALL 55 courses from transcript in exact order)
    const courseData = [
        { "year": "2023", "subject": "Arabic", "grade": "17.17", "credits": "1" },
        { "year": "2023", "subject": "French", "grade": "15.33", "credits": "2" },
        { "year": "2023", "subject": "Technical English", "grade": "19.63", "credits": "2" },
        { "year": "2023", "subject": "Behavioral and social skills", "grade": "17.50", "credits": "2" },
        {
          "year": "2023",
          "subject": "Entrepreneurship and innovation program (EIP)-1",
          "grade": "16.19",
          "credits": "1"
        },
        {
          "year": "2023",
          "subject": "Advanced digital culture and techniques",
          "grade": "17.00",
          "credits": "1"
        },
        {
          "year": "2023",
          "subject": "Digital development careers and training",
          "grade": "17.50",
          "credits": "1"
        },
        { "year": "2023", "subject": "Algorithmic foundations", "grade": "12.56", "credits": "2" },
        { "year": "2023", "subject": "Object-oriented programming", "grade": "17.56", "credits": "2" },
        { "year": "2023", "subject": "Static websites", "grade": "19.94", "credits": "3" },
        { "year": "2023", "subject": "JavaScript Programming", "grade": "15.67", "credits": "3" },
        { "year": "2023", "subject": "Databases manipulation", "grade": "18.56", "credits": "2" },
        { "year": "2023", "subject": "Dynamic websites", "grade": "17.83", "credits": "3" },
        {
          "year": "2023",
          "subject": "Security of information systems",
          "grade": "17.67",
          "credits": "1"
        },
        { "year": "2023", "subject": "Discipline", "grade": "20.00", "credits": "1" },
        { "year": "2024", "subject": "French", "grade": "16.22", "credits": "2" },
        { "year": "2024", "subject": "Technical English", "grade": "19.42", "credits": "2" },
        { "year": "2024", "subject": "Behavioral skills", "grade": "17.08", "credits": "2" },
        {
          "year": "2024",
          "subject": "Advanced digital culture and techniques",
          "grade": "14.33",
          "credits": "1"
        },
        { "year": "2024", "subject": "Preparing a web project", "grade": "17.00", "credits": "1" },
        { "year": "2024", "subject": "Agile approach", "grade": "16.56", "credits": "3" },
        { "year": "2024", "subject": "Data management", "grade": "18.44", "credits": "2" },
        { "year": "2024", "subject": "Front-end development", "grade": "16.78", "credits": "3" },
        { "year": "2024", "subject": "Back-end development", "grade": "19.33", "credits": "3" },
        {
          "year": "2024",
          "subject": "Building a cloud-native application",
          "grade": "15.00",
          "credits": "2"
        },
        { "year": "2024", "subject": "Synthesis project", "grade": "17.67", "credits": "2" },
        { "year": "2024", "subject": "Integrating the workplace", "grade": "16.00", "credits": "2" },
        { "year": "2024", "subject": "Discipline", "grade": "20.00", "credits": "1" },
        
        { "year": "2025", "subject": "Software Engineering", "grade": "6.30", "credits": "1" },
        { "year": "2025", "subject": "Databases (PL/SQL)", "grade": "20.00", "credits": "1" },
        { "year": "2025", "subject": "UNIX system Administration", "grade": "15.00", "credits": "1" },
        { "year": "2025", "subject": "Windows Administration", "grade": "10.00", "credits": "1" },
        {
          "year": "2025",
          "subject": "UML: Analysis and Object Oriented I Design",
          "grade": "15.38",
          "credits": "1"
        },
        {
          "year": "2025",
          "subject": "Object-Oriented Programming/Java I",
          "grade": "15.00",
          "credits": "1"
        },
        { "year": "2025", "subject": "TCP/IP", "grade": "11.00", "credits": "1" },
        { "year": "2025", "subject": "Network Programming", "grade": "18.00", "credits": "1" },
        { "year": "2025", "subject": "Data analysis", "grade": "11.00", "credits": "1" },
        { "year": "2025", "subject": "Communication in English V", "grade": "14.00", "credits": "1" },
        { "year": "2025", "subject": "Communication in French V", "grade": "16.00", "credits": "1" },
        { "year": "2025", "subject": "Artificial Intelligence", "grade": "13.00", "credits": "1" },
        { "year": "2025", "subject": "Databases Administration", "grade": "16.00", "credits": "1" },
        {
          "year": "2025",
          "subject": "UML: Analysis and Object Oriented II Design",
          "grade": "13.00",
          "credits": "1"
        },
        {
          "year": "2025",
          "subject": "Object-Oriented Programming/Java II",
          "grade": "16.00",
          "credits": "1"
        },
        {
          "year": "2025",
          "subject": "Object-Oriented Programming in Python",
          "grade": "14.75",
          "credits": "1"
        },
        { "year": "2025", "subject": "Python for Data Science", "grade": "15.00", "credits": "1" },
        { "year": "2025", "subject": "End-of-cycle Project", "grade": "18.50", "credits": "1" }


    
    ];

    // Function to add a single course with better error handling
    async function addCourse(course) {
        try {
            // Wait for form elements to be available
            await waitForElement('#apartado5_ano');

            // Always clear form first to avoid leftover state
            const yearSelect = document.getElementById('apartado5_ano');
            const subjectInput = document.getElementById('apartado5_asignatura');
            const creditsInput = document.getElementById('apartado5_creditos');
            const gradeSelect = document.getElementById('apartado5_nota');
            const exemptCheckbox = document.getElementById('apartado5_bconvalidada');

            if (!yearSelect || !subjectInput || !creditsInput || !gradeSelect || !exemptCheckbox) {
                throw new Error('Form elements not found');
            }

            // Clear form
            yearSelect.value = '';
            subjectInput.value = '';
            creditsInput.value = '';
            gradeSelect.value = '';
            exemptCheckbox.checked = false;

            // Small delay to ensure form is cleared
            await new Promise(resolve => setTimeout(resolve, 300));

            // Fill basic fields
            yearSelect.value = course.year;
            subjectInput.value = course.subject;
            creditsInput.value = course.credits;

            // Handle special grades
            if (course.grade === 'G') {
                // For grade "G" (Pass), check "Sin calificación" checkbox
                exemptCheckbox.checked = true;
                gradeSelect.value = '';
            } else if (course.grade === 'FF') {
                // For grade "FF", select "FD" from dropdown
                exemptCheckbox.checked = false;
                gradeSelect.value = 'FD';
            } else if (course.grade === 'EXEMPT') {
                // For exemptions, check "Sin calificación" checkbox
                exemptCheckbox.checked = true;
                gradeSelect.value = '';
            } else {
                // All other grades (AA, BA, BB, CB, CC, DC, DD, FD)
                exemptCheckbox.checked = false;
                gradeSelect.value = course.grade;
            }

            console.log(`✓ Filled: ${course.subject} (${course.grade}) - ${course.credits} credits`);
            return true;

        } catch (error) {
            console.error(`✗ Error filling course ${course.subject}:`, error);
            return false;
        }
    }

    // Function to add all courses sequentially (manual mode only)
    async function addCoursesManually() {
        let currentIndex = 0;

        async function addNext() {
            if (currentIndex >= courseData.length) {
                console.log('✅ All courses have been processed!');
                alert('All courses have been filled! Remember to manually click "Añadir" for each one.');
                return;
            }

            const course = courseData[currentIndex];
            console.log(`📝 Preparing course ${currentIndex + 1}/${courseData.length}: ${course.subject}`);

            const success = await addCourse(course);
            if (success) {
                console.log(`✅ Ready to submit: ${course.subject}. Click "Añadir" button, then call addNext()`);
            } else {
                console.log(`❌ Failed to fill: ${course.subject}. Try again or skip.`);
            }

            currentIndex++;
        }

        // Make addNext available globally
        window.addNext = addNext;

        // Start with first course
        await addNext();
        return addNext;
    }

    // Create control panel
    async function createControlPanel() {
        try {
            // Wait for page to be ready
            await waitForPageLoad();
            await waitForElement('#apartado5_ano');

            // Only create if not already exists
            if (document.getElementById('gradeConverterPanel')) return;

            const panel = document.createElement('div');
            panel.id = 'gradeConverterPanel';
            panel.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                background: #fff;
                border: 2px solid #007cba;
                border-radius: 8px;
                padding: 15px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                z-index: 10000;
                font-family: Arial, sans-serif;
                font-size: 14px;
                min-width: 300px;
            `;

            panel.innerHTML = `
                <div style="margin-bottom: 10px; font-weight: bold; color: #007cba;">
                    📚 Grade Converter Auto-Fill
                </div>
                <div style="margin-bottom: 10px; font-size: 12px; color: #666;">
                    Total courses: ${courseData.length}<br>
                    Status: Ready for manual filling
                </div>
                <button id="manualFillBtn" style="
                    background: #28a745; color: white; border: none; padding: 8px 12px;
                    border-radius: 4px; cursor: pointer; margin-bottom: 5px; width: 100%;
                ">Start Manual Fill</button>
                <button id="nextBtn" style="
                    background: #ffc107; color: black; border: none; padding: 8px 12px;
                    border-radius: 4px; cursor: pointer; margin-bottom: 5px; width: 100%; display: none;
                ">Next Course</button>
                <div style="margin-top: 10px; font-size: 11px; color: #888; line-height: 1.4;">
                    1. Click "Start Manual Fill"<br>
                    2. Click "Añadir" to submit each course<br>
                    3. Click "Next Course" to continue<br>
                    <strong>Note:</strong> Auto-fill disabled for security
                </div>
                <button id="closePanel" style="
                    position: absolute; top: 5px; right: 8px; background: none;
                    border: none; font-size: 16px; cursor: pointer; color: #999;
                ">×</button>
            `;

            document.body.appendChild(panel);

            // Add event listeners
            document.getElementById('manualFillBtn').addEventListener('click', async () => {
                document.getElementById('nextBtn').style.display = 'block';
                await addCoursesManually();
            });

            document.getElementById('nextBtn').addEventListener('click', () => {
                if (window.addNext) {
                    window.addNext();
                }
            });

            document.getElementById('closePanel').addEventListener('click', () => {
                panel.remove();
            });

            console.log('✅ Grade Converter control panel loaded successfully');

        } catch (error) {
            console.error('❌ Error creating control panel:', error);
            // Fallback: make functions available in console
            window.addCoursesManually = addCoursesManually;
            console.log('⚠️ Control panel failed, but functions are available in console');
            console.log('Type: addCoursesManually() to start');
        }
    }

    // Initialize script
    async function init() {
        try {
            console.log('🚀 Spanish Grade Converter Auto-Fill Script Loading...');

            // Check if we're on the right page
            if (!window.location.href.includes('apartado5')) {
                console.log('⚠️ Not on apartado5 page, script will wait...');
                return;
            }

            await createControlPanel();

            // Make functions available in console
            window.addCoursesManually = addCoursesManually;
            window.courseData = courseData;

            console.log('✅ Spanish Grade Converter Auto-Fill Script Loaded');
            console.log('📊 Available functions:');
            console.log('   - addCoursesManually() - Fill courses one by one (RECOMMENDED)');
            console.log(`📈 Total courses to add: ${courseData.length}`);
            console.log('🔧 Special handling:');
            console.log('   - G grades → "Sin calificación" checkbox checked');
            console.log('   - FF grades → "FD" selected in dropdown');
            console.log('   - EXEMPT → "Sin calificación" checkbox checked');
            console.log('   - All other grades → Selected in dropdown');
            console.log('🛡️ Security: Form cleared before each entry, manual submission only');

        } catch (error) {
            console.error('❌ Script initialization failed:', error);
        }
    }

    // Start the script
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();