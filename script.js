//Resume Builder Script
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element ---
    const form = document.getElementById('resume-form');
    const previewBtn = document.getElementById('preview-btn');
    const downloadBtn = document.getElementById('download-btn');
    const previewContainer = document.getElementById('resume-preview-container');
    const resumePreview = document.getElementById('resume-preview'); 

    // Input Containers & Add Buttons
    const educationEntries = document.getElementById('education-entries');
    const internshipEntries = document.getElementById('internship-entries');
    const projectEntries = document.getElementById('project-entries');
    const achievementEntries = document.getElementById('achievement-entries');
    const skillsEntries = document.getElementById('skills-entries');
    const responsibilityEntries = document.getElementById('responsibility-entries');
    const extracurricularEntries = document.getElementById('extracurricular-entries');
    const otherInfoEntries = document.getElementById('other-info-entries');
    const addEducationBtn = document.getElementById('add-education-btn');
    const addInternshipBtn = document.getElementById('add-internship-btn');
    const addProjectBtn = document.getElementById('add-project-btn');
    const addSkillRowBtn = document.getElementById('add-skill-row-btn');

    // Preview Sections & Content Areas
    const previewName = document.getElementById('preview-name');
    const previewEmail = document.getElementById('preview-email');
    const previewPhone = document.getElementById('preview-phone');
    const sectionEducation = document.getElementById('section-education');
    const previewEducationTableBody = document.querySelector('#preview-education-table tbody');
    const sectionInternships = document.getElementById('section-internships');
    const previewInternships = document.getElementById('preview-internships');
    const sectionProjects = document.getElementById('section-projects');
    const previewProjects = document.getElementById('preview-projects');
    const sectionAchievements = document.getElementById('section-achievements');
    const previewAchievements = document.getElementById('preview-achievements');
    const sectionSkills = document.getElementById('section-skills');
    const previewSkillsTableBody = document.querySelector('#preview-skills-table tbody');
    const sectionResponsibility = document.getElementById('section-responsibility');
    const previewResponsibilities = document.getElementById('preview-responsibilities');
    const sectionExtracurricular = document.getElementById('section-extracurricular');
    const previewExtracurricular = document.getElementById('preview-extracurricular');
    const sectionOtherInfo = document.getElementById('section-other-info');
    const previewOtherInfo = document.getElementById('preview-other-info');

    // Toggle Checkboxes
    const toggleEducation = document.getElementById('toggle-education');
    const toggleInternships = document.getElementById('toggle-internships');
    const toggleProjects = document.getElementById('toggle-projects');
    const toggleAchievements = document.getElementById('toggle-achievements');
    const toggleSkills = document.getElementById('toggle-skills');
    const toggleResponsibility = document.getElementById('toggle-responsibility');
    const toggleExtracurricular = document.getElementById('toggle-extracurricular');
    const toggleOtherInfo = document.getElementById('toggle-other-info');

    // Style Control 
    const fontFamilySelect = document.getElementById('resume-font-family'); 
    const fontSizeSelect = document.getElementById('font-size');         
    const headingFontSizeSelect = document.getElementById('heading-font-size');
    const headingColorInput = document.getElementById('heading-color');
    const headingBgColorInput = document.getElementById('heading-bg-color');

    // Add field entry if all are removed
    const educationTemplate = educationEntries?.querySelector('.education-entry-input')?.cloneNode(true);
    const internshipTemplate = internshipEntries?.querySelector('.internship-entry-input')?.cloneNode(true);
    const projectTemplate = projectEntries?.querySelector('.project-entry-input')?.cloneNode(true);
    const skillsTemplate = skillsEntries?.querySelector('.skills-entry-input')?.cloneNode(true);
    if (!educationTemplate) console.error("Initial Education template missing!");
    if (!internshipTemplate) console.error("Initial Internship template missing!");
    if (!projectTemplate) console.error("Initial Project template missing!");
    if (!skillsTemplate) console.error("Initial Skills template missing!");

    function createBulletList(text) {
        if (!text || text.trim() === '') return null;
        const lines = text.trim().split('\n');
        const mainList = document.createElement('ul');
        mainList.className = 'entry-details';
        let listStack = [mainList];
        let lastLi = null;
        lines.forEach(line => {
            const trimmedLine = line.trimStart();
            const indentation = line.length - trimmedLine.length;
            if (trimmedLine.startsWith('*') || trimmedLine.startsWith('-')) {
                const textStartIndex = (trimmedLine.length > 1 && trimmedLine[1] === ' ') ? 2 : 1;
                const itemText = trimmedLine.substring(textStartIndex).trim();
                if (!itemText) return;
                const newItem = document.createElement('li');
                newItem.textContent = itemText;
                const currentIndentLevel = Math.floor(indentation / 2);
                while (currentIndentLevel < listStack.length - 1 && listStack.length > 1) { listStack.pop(); }
                if (currentIndentLevel > listStack.length - 1) {
                    const parentLi = listStack[listStack.length - 1].lastElementChild;
                    if (parentLi) {
                        let subList = parentLi.querySelector(':scope > ul');
                        if (!subList) { subList = document.createElement('ul'); parentLi.appendChild(subList); }
                        listStack.push(subList);
                    }
                }
                const currentList = listStack[listStack.length - 1];
                currentList.appendChild(newItem);
                lastLi = newItem;
            } else if (trimmedLine && lastLi) { lastLi.textContent += ' ' + trimmedLine; }
        });
        return mainList.hasChildNodes() ? mainList : null;
    }

    // Entry Addition
    function addEntry(container, template) {
        if (!template) {
            console.error("Cannot add entry: Master template missing for container:", container);
            alert("Error: Cannot add new field, template missing. Please reload.");
            return;
        }
        const newEntry = template.cloneNode(true); 
        newEntry.querySelectorAll('input, textarea').forEach(input => input.value = '');
        const removeBtn = newEntry.querySelector('.remove-entry-btn');
        if (removeBtn) removeBtn.style.display = '';
        if (container) container.appendChild(newEntry);
        else console.error("Cannot add entry: Target container element not found.");
    }

    // Add button listeners
    if (addEducationBtn) addEducationBtn.addEventListener('click', () => addEntry(educationEntries, educationTemplate));
    if (addInternshipBtn) addInternshipBtn.addEventListener('click', () => addEntry(internshipEntries, internshipTemplate));
    if (addProjectBtn) addProjectBtn.addEventListener('click', () => addEntry(projectEntries, projectTemplate));
    if (addSkillRowBtn) addSkillRowBtn.addEventListener('click', () => addEntry(skillsEntries, skillsTemplate));

    // Entry Removal
    function handleRemove(event, entrySelector) {
        const removeButton = event.target.closest('.remove-entry-btn');
        if (removeButton) {
            const entryToRemove = event.target.closest(entrySelector);
            if (entryToRemove) entryToRemove.remove();
        }
    }
    if(educationEntries) educationEntries.addEventListener('click', (e) => handleRemove(e, '.education-entry-input'));
    if(internshipEntries) internshipEntries.addEventListener('click', (e) => handleRemove(e, '.internship-entry-input'));
    if(projectEntries) projectEntries.addEventListener('click', (e) => handleRemove(e, '.project-entry-input'));
    if(skillsEntries) skillsEntries.addEventListener('click', (e) => handleRemove(e, '.skills-entry-input'));

    // Update Resume Preview
    function updatePreview() {
        console.log("Starting updatePreview function...");
        try {
            if (resumePreview) {
                // Font Family
                if (fontFamilySelect) {
                    resumePreview.style.setProperty('--font-family', fontFamilySelect.value); 
                } else { console.warn("Font family select missing."); }

                // Font Size
                if (fontSizeSelect) {
                    resumePreview.style.setProperty('--font-size', fontSizeSelect.value);
                } else { console.warn("Font size select missing."); }

                // Heading Font Size
                if (headingFontSizeSelect) {
                    resumePreview.style.setProperty('--heading-font-size', headingFontSizeSelect.value);
                } else { console.warn("Heading font size select missing."); }

                // Heading Color
                if (headingColorInput) {
                    resumePreview.style.setProperty('--heading-color', headingColorInput.value);
                } else { console.warn("Heading color input missing."); }

                // Heading Background Color
                if (headingBgColorInput) {
                    resumePreview.style.setProperty('--heading-bg-color', headingBgColorInput.value);
                } else { console.warn("Heading background color input missing."); }
                 console.log("Applied styles from controls.");

            } else { console.error("Could not apply styles - #resume-preview element missing."); }

            // 1. Personal Info
            if(previewName) previewName.textContent = document.getElementById('name-input')?.value.trim() || 'YOUR NAME';
            if(previewEmail) previewEmail.textContent = document.getElementById('email-input')?.value.trim() || 'email@example.com';
            if(previewPhone) previewPhone.textContent = document.getElementById('phone-input')?.value.trim() || '+XX XXXXXXXXXX';

            // 2. Education
            if (sectionEducation && toggleEducation && previewEducationTableBody) {
                if (toggleEducation.checked) { sectionEducation.style.display = 'block'; previewEducationTableBody.innerHTML = '';
                    const educationInputs = educationEntries?.querySelectorAll('.education-entry-input');
                    educationInputs?.forEach(entry => {
                        const degree = entry.querySelector('.edu-degree')?.value.trim(); const year = entry.querySelector('.edu-year')?.value.trim();
                        const school = entry.querySelector('.edu-school')?.value.trim(); const grade = entry.querySelector('.edu-grade')?.value.trim();
                        if (degree || year || school || grade) { const row = previewEducationTableBody.insertRow(); row.insertCell(0).textContent = degree || ''; row.insertCell(1).textContent = year || ''; row.insertCell(2).textContent = school || ''; row.insertCell(3).textContent = grade || ''; } });
                } else { sectionEducation.style.display = 'none'; }
            } else { console.warn("Education elements not found"); }

             // 3. Internships
             if (sectionInternships && toggleInternships && previewInternships && internshipEntries) {
                if (toggleInternships.checked) { sectionInternships.style.display = 'block'; previewInternships.innerHTML = '';
                    const internshipInputs = internshipEntries.querySelectorAll('.internship-entry-input');
                    internshipInputs?.forEach(entry => {
                        const title = entry.querySelector('.intern-title')?.value.trim(); const dates = entry.querySelector('.intern-dates')?.value.trim(); const desc = entry.querySelector('.intern-desc')?.value;
                        if (title || dates || desc) { const entryDiv = document.createElement('div'); entryDiv.className = 'entry'; const headerDiv = document.createElement('div'); headerDiv.className = 'entry-header'; const titleSpan = document.createElement('span'); titleSpan.className = 'entry-title'; titleSpan.textContent = title || ''; const dateSpan = document.createElement('span'); dateSpan.className = 'entry-dates'; dateSpan.textContent = dates || ''; headerDiv.appendChild(titleSpan); headerDiv.appendChild(dateSpan); entryDiv.appendChild(headerDiv); const list = createBulletList(desc); if (list) entryDiv.appendChild(list); previewInternships.appendChild(entryDiv); } });
                } else { sectionInternships.style.display = 'none'; }
            } else { console.warn("Internship elements not found"); }

             // 4. Projects
            if (sectionProjects && toggleProjects && previewProjects && projectEntries) {
                if (toggleProjects.checked) { sectionProjects.style.display = 'block'; previewProjects.innerHTML = '';
                    const projectInputs = projectEntries.querySelectorAll('.project-entry-input');
                    projectInputs?.forEach(entry => {
                        const title = entry.querySelector('.proj-title')?.value.trim(); const desc = entry.querySelector('.proj-desc')?.value;
                        if (title || desc) { const entryDiv = document.createElement('div'); entryDiv.className = 'entry'; const headerDiv = document.createElement('div'); headerDiv.className = 'entry-header'; const titleSpan = document.createElement('span'); titleSpan.className = 'entry-title'; titleSpan.textContent = title || ''; headerDiv.appendChild(titleSpan); entryDiv.appendChild(headerDiv); const list = createBulletList(desc); if (list) entryDiv.appendChild(list); previewProjects.appendChild(entryDiv); } });
                } else { sectionProjects.style.display = 'none'; }
            } else { console.warn("Project elements not found"); }

             // 5. Achievements
            if (sectionAchievements && toggleAchievements && previewAchievements && achievementEntries) {
                if (toggleAchievements.checked) { sectionAchievements.style.display = 'block'; previewAchievements.innerHTML = '';
                    const achievementTextarea = achievementEntries.querySelector('.achievement-entry-input .achievement-desc');
                    const achievementDesc = achievementTextarea ? achievementTextarea.value : ''; const achievementList = createBulletList(achievementDesc);
                    if (achievementList) previewAchievements.appendChild(achievementList);
                } else { sectionAchievements.style.display = 'none'; }
            } else { console.warn("Achievement elements not found"); }

             // 6. Skills
            if (sectionSkills && toggleSkills && previewSkillsTableBody && skillsEntries) {
                if (toggleSkills.checked) { sectionSkills.style.display = 'block'; previewSkillsTableBody.innerHTML = '';
                    const skillsInputs = skillsEntries.querySelectorAll('.skills-entry-input');
                    skillsInputs.forEach((entry) => {
                        const cat1 = entry.querySelector('.skill-category1')?.value.trim(); const cat2 = entry.querySelector('.skill-category2')?.value.trim(); const cat3 = entry.querySelector('.skill-category3')?.value.trim();
                        if (cat1 || cat2 || cat3) { const row = previewSkillsTableBody.insertRow(); if (cat1) row.insertCell().textContent = cat1; if (cat2) row.insertCell().textContent = cat2; if (cat3) row.insertCell().textContent = cat3; } });
                } else { sectionSkills.style.display = 'none'; }
            } else { console.warn("Skills elements not found"); }

             // 7. Responsibility
            if (sectionResponsibility && toggleResponsibility && previewResponsibilities && responsibilityEntries) {
                if (toggleResponsibility.checked) { sectionResponsibility.style.display = 'block'; previewResponsibilities.innerHTML = '';
                    const responsibilityTextarea = responsibilityEntries.querySelector('.responsibility-entry-input .responsibility-desc');
                    const responsibilityDesc = responsibilityTextarea ? responsibilityTextarea.value : ''; const responsibilityList = createBulletList(responsibilityDesc);
                    if (responsibilityList) previewResponsibilities.appendChild(responsibilityList);
                } else { sectionResponsibility.style.display = 'none'; }
            } else { console.warn("Responsibility elements not found"); }

             // 8. Extracurricular
            if (sectionExtracurricular && toggleExtracurricular && previewExtracurricular && extracurricularEntries) {
                if (toggleExtracurricular.checked) { sectionExtracurricular.style.display = 'block'; previewExtracurricular.innerHTML = '';
                    const extracurricularTextarea = extracurricularEntries.querySelector('.extracurricular-entry-input .extracurricular-desc');
                    const extracurricularDesc = extracurricularTextarea ? extracurricularTextarea.value : ''; const extracurricularList = createBulletList(extracurricularDesc);
                    if (extracurricularList) previewExtracurricular.appendChild(extracurricularList);
                } else { sectionExtracurricular.style.display = 'none'; }
            } else { console.warn("Extracurricular elements not found"); }

             // 9. Other Info
            if (sectionOtherInfo && toggleOtherInfo && previewOtherInfo && otherInfoEntries) {
                if (toggleOtherInfo.checked) { sectionOtherInfo.style.display = 'block'; previewOtherInfo.innerHTML = '';
                    const otherInfoTextarea = otherInfoEntries.querySelector('.other-info-entry-input .other-info-desc');
                    const otherInfoDesc = otherInfoTextarea ? otherInfoTextarea.value : ''; const otherInfoList = createBulletList(otherInfoDesc);
                    if (otherInfoList) previewOtherInfo.appendChild(otherInfoList);
                } else { sectionOtherInfo.style.display = 'none'; }
            } else { console.warn("Other Info elements not found"); }


            // Show preview container
            if (previewContainer) previewContainer.style.display = 'block';
            console.log("Preview update complete.");

        } catch (error) {
            console.error("Error during updatePreview:", error);
            alert("An error occurred updating the preview. Check console.");
        }
    }

    // PDF Generation
    function generatePDF() {
        console.log("generatePDF called.");
        updatePreview();
        if (previewContainer) previewContainer.style.display = 'block';
        if (resumePreview) resumePreview.style.display = 'block';

        setTimeout(() => {
            const elementToPrint = resumePreview;
            if (!elementToPrint || elementToPrint.innerHTML.trim() === '') {
                console.error("PDF Error: Element #resume-preview not found or empty.");
                alert("Cannot generate PDF: Preview is empty or sections are hidden.");
                return;
            }
            const nameInput = document.getElementById('name-input')?.value.trim() || 'resume';
            const filename = `${nameInput.replace(/\s+/g, '_').toLowerCase()}_resume.pdf`;
            const opt = {
              margin: 0, filename: filename, image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { scale: 2, useCORS: true, letterRendering: true, logging: false },
              jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
              pagebreak: { mode: ['avoid-all', 'css'] }
            };
            try {
                console.log("Calling html2pdf().set().from().save()");
                html2pdf().set(opt).from(elementToPrint).save()
                  .then(() => { console.log("PDF promise resolved."); })
                  .catch(err => { console.error("html2pdf save promise error:", err); alert("PDF generation failed."); });
            } catch (error) {
                 console.error("html2pdf synchronous error:", error); alert("PDF setup failed.");
            }
        }, 200);
    }

    // Event Listeners 
    if(previewBtn) { previewBtn.addEventListener('click', updatePreview); } else { console.error("Preview button not found!"); }
    if(downloadBtn) { downloadBtn.addEventListener('click', generatePDF); } else { console.error("Download button not found!"); }

    const toggles = document.querySelectorAll('input[id^="toggle-"]');
    toggles.forEach(toggle => { toggle.addEventListener('change', updatePreview); });

    // Listeners for Style Controls
    if (fontFamilySelect) fontFamilySelect.addEventListener('change', updatePreview); else console.warn("Font family select missing.");
    if (fontSizeSelect) fontSizeSelect.addEventListener('change', updatePreview); else console.warn("Font size select missing."); 
    if (headingFontSizeSelect) headingFontSizeSelect.addEventListener('change', updatePreview); else console.warn("Heading font size select missing.");
    if (headingColorInput) headingColorInput.addEventListener('input', updatePreview); else console.warn("Heading color input missing.");
    if (headingBgColorInput) headingBgColorInput.addEventListener('input', updatePreview); else console.warn("Heading background color input missing.");

    // Initial State 
    console.log("Running initial updatePreview on page load.");
    updatePreview(); 
}); 
