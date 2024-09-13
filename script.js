document.getElementById('resumeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Collect data from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;

    // Store data in an object for later use
    const formData = { name, email, phone, education, experience, skills };

    // Create the resume display HTML (with editable spans)
    const resumeHTML = `
        <h2 contenteditable="true" id="editableName">${formData.name}</h2>
        <p>Email: <span contenteditable="true" id="editableEmail">${formData.email}</span></p>
        <p>Phone: <span contenteditable="true" id="editablePhone">${formData.phone}</span></p>

        <h3>Education</h3>
        <p contenteditable="true" id="editableEducation">${formData.education}</p>

        <h3>Work Experience</h3>
        <p contenteditable="true" id="editableExperience">${formData.experience}</p>

        <h3>Skills</h3>
        <p contenteditable="true" id="editableSkills">${formData.skills}</p>

        <button id="saveBtn">Save Changes</button>
        <button id="downloadBtn">Download as PDF</button>
        <div id="shareLinks">
            <a href="https://twitter.com/share" target="_blank">Share on Twitter</a>
            <a href="https://www.facebook.com/sharer.php" target="_blank">Share on Facebook</a>
        </div>
    `;

    // Replace form with generated resume
    document.querySelector('main').innerHTML = resumeHTML;

    // Save changes functionality (updates the resume with edits)
    document.getElementById('saveBtn').addEventListener('click', function() {
        const updatedName = document.getElementById('editableName').innerText;
        const updatedEmail = document.getElementById('editableEmail').innerText;
        const updatedPhone = document.getElementById('editablePhone').innerText;
        const updatedEducation = document.getElementById('editableEducation').innerText;
        const updatedExperience = document.getElementById('editableExperience').innerText;
        const updatedSkills = document.getElementById('editableSkills').innerText;

        // Reflect the changes in the formData object
        formData.name = updatedName;
        formData.email = updatedEmail;
        formData.phone = updatedPhone;
        formData.education = updatedEducation;
        formData.experience = updatedExperience;
        formData.skills = updatedSkills;

        alert('Resume updated successfully!');
    });

    // Handle PDF download
    document.getElementById('downloadBtn').addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        const resumeContent = `
            Name: ${formData.name}
            Email: ${formData.email}
            Phone: ${formData.phone}
            
            Education:
            ${formData.education}

            Work Experience:
            ${formData.experience}

            Skills:
            ${formData.skills}
        `;

        // Add the content to the PDF
        pdf.text(resumeContent, 10, 10);
        pdf.save('resume.pdf');
    });
});
