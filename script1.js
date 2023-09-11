
// skill progressbar
document.addEventListener("DOMContentLoaded", function () {
    const progressBarContainer = document.getElementById("myProgressBar");
    const secondProgressBarContainer = document.getElementById("secondProgressBarContainer");

    const skillsProgressBars = {};
    const skillNames = {};

    function createSecondProgressBar(skill, stage) {
        const skillProgressContainer = document.createElement("div");
        skillProgressContainer.classList.add("progress-bar-container");
        secondProgressBarContainer.appendChild(skillProgressContainer);

        const skillProgressBar = document.createElement("div");
        skillProgressBar.classList.add("progress-bar");
        skillProgressBar.innerHTML = `
            <div class="inner-progress stage-fresher"></div>
            <div class="inner-progress stage-experience"></div>
            <div class="inner-progress stage-export"></div>
            <div class="inner-progress stage-pro"></div>
        `;
        skillProgressContainer.appendChild(skillProgressBar);

        skillsProgressBars[skill] = {
            progressElement: skillProgressBar,
            stage: stage,
        };

        updateSecondProgressBar(skillProgressBar, skill, stage);

        const skillName = document.createElement("div");
        skillName.classList.add("skill-name");
        skillName.innerText = skill;
        skillProgressContainer.insertBefore(skillName, skillProgressBar);
        skillNames[skill] = skillName;
    }

    function updateSecondProgressBar(skillProgressBar, skill, stage) {
        for (const stageElement of skillProgressBar.querySelectorAll(".inner-progress")) {
            stageElement.style.width = `0%`;
            stageElement.style.backgroundColor = "";
        }

        const skillStageClass = `stage-${stage.toLowerCase()}`;
        let percentage;
        if (stage === "Fresher") {
            percentage = 25;
        } else if (stage === "Experience") {
            percentage = 50;
        } else if (stage === "Export") {
            percentage = 75;
        } else if (stage === "Pro") {
            percentage = 100;
        }

        const stageElement = skillProgressBar.querySelector(`.${skillStageClass}`);
        stageElement.style.width = `${percentage}%`;
        stageElement.style.backgroundColor = getRandomColor();
    }

    function getRandomColor() {
        const colors = ["white"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const stages = ["Fresher", "Experience", "Export", "Pro"];
    const progressText = progressBarContainer.querySelector(".progress-text");
    const progressStages = progressBarContainer.querySelectorAll(".progress-stage");
    const skillsSelector = document.getElementById('skills-select-box');

    progressStages.forEach((stageElement, index) => {
        stageElement.addEventListener("click", () => {
            const selectedStage = stages[index];
            const selectedSkill = skillsSelector.value;

            if (selectedSkill && selectedSkill !== 'add_skill') {
                skillsProgressBars[selectedSkill].stage = selectedStage;
                progressText.textContent = selectedStage;

                // Update the corresponding skill's progress bar in the secondProgressBarContainer
                const correspondingProgressBar = skillsProgressBars[selectedSkill].progressElement;
                updateSecondProgressBar(correspondingProgressBar, selectedSkill, selectedStage);
            } else if (selectedSkill === 'add_skill') {
                const newSkillInput = prompt('Enter a new skill:');
                if (newSkillInput && newSkillInput.trim() !== '') {
                    studentSkills.push(newSkillInput);
                    createSkillButton(studentSkills);
                    createSecondProgressBar(newSkillInput, stages[0]);
                    skillsSelector.value = newSkillInput;
                } else {
                    skillsSelector.value = 'Select Skills';
                }
            }
        });
    });

    const studentData = {
        skilldList: []
    };
    const skillsConfig = ["Html", "Css", "JavaScript", "Java", "C++", "Bootstrap 5", "ReactJs", "MongoDb", "NodeJs", "ExpressJs", "Python", "Php", "MernFullStack", "JavaFullStack", "PythonFullStack", "AngularJs", "ViewJs", "Sql"];
    const studentSkills = studentData.skilldList;

    skillsConfig.forEach((skill) => {
        const option = document.createElement('option');
        option.innerText = skill;
        option.setAttribute('value', skill);
        skillsSelector.appendChild(option);
    });

    skillsSelector.addEventListener('change', (event) => {
        const selectedSkill = event.target.value;
        if (selectedSkill === 'add_skill') {
            const newSkillInput = prompt('Enter a new skill:');
            if (newSkillInput && newSkillInput.trim() !== '') {
                studentSkills.push(newSkillInput);
                createSkillButton(studentSkills);
                createSecondProgressBar(newSkillInput, stages[0]);
                skillsSelector.value = newSkillInput;
            } else {
                skillsSelector.value = 'Select Skills';
            }
        } else if (!studentSkills.includes(selectedSkill)) {
            studentSkills.push(selectedSkill);
            createSkillButton(studentSkills);
            createSecondProgressBar(selectedSkill, stages[0]);
            skillsSelector.value = selectedSkill;
        }
    });

    function createSkillButton(skillList) {
        const skillsContainer = document.getElementById('skillsContainer');
        skillsContainer.innerHTML = "";
        skillList.forEach((skill, index) => {
            const button = document.createElement('button');
            button.setAttribute('class', "btn btn-sm btn-primary px-3 rounded rounded-pill")
            button.setAttribute('type', "button");
            const span = document.createElement('span');
            span.innerText = skill;
            button.appendChild(span);
            const i = document.createElement('i');
            i.setAttribute('class', "fas fa-times-circle ms-2");
            i.addEventListener('click', deleteSkill.bind(this, index, skill));
            button.appendChild(i);
            skillsContainer.appendChild(button);
        });
    }

    function deleteSkill(index, skill) {
        const deletedSkill = studentSkills.splice(index, 1)[0];
        createSkillButton(studentSkills);
        const progressBarToRemove = skillsProgressBars[deletedSkill].progressElement.parentNode;
        secondProgressBarContainer.removeChild(progressBarToRemove);
        secondProgressBarContainer.removeChild(skillNames[deletedSkill]);
        delete skillsProgressBars[deletedSkill];
        delete skillNames[deletedSkill];
    }
});
  
  
  

// end skills container progressbar



const sectionData = new Map();

function addItem(sectionInputId, sectionContainerId, sectionName) {
    const input = document.getElementById(sectionInputId);
    const container = document.getElementById(sectionContainerId);
    const inputValue = input.value.trim();

    if (inputValue !== '') {
        const item = document.createElement('div');
        item.textContent = inputValue;
        item.className = 'section-item btn btn-sm btn-primary px-3 rounded rounded-pill';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => {
            // When deleting an item, also remove it from the right-side ul li format
            deleteItem(inputValue, sectionName);
            container.removeChild(item);
        });
        item.appendChild(deleteButton);
        container.appendChild(item);
        input.value = '';

        // Check if the section name already exists in sectionData
        if (!sectionData.has(sectionName)) {
            // If it doesn't exist, create a new section data array
            sectionData.set(sectionName, []);
        }

        // Add the input data to the corresponding section data
        sectionData.get(sectionName).push(inputValue);

        // Update the right-side container with the section name and input data
        updateRightSideContainer();
    }
}

// Function to update the right-side container with the current data
function updateRightSideContainer() {
    const outputContainer = document.querySelector('.output1-container.right-side1');
    outputContainer.innerHTML = ''; // Clear the right-side container
  
    sectionData.forEach((data, name) => {
      if (data.length > 0) { // Check if there are items in the section
        const sectionHeading = document.createElement('h4');
        sectionHeading.textContent = name;
  
        // Create a div to hold the text data
        const textContainer = document.createElement('div');
  
        // Iterate over the data items and create a separate div for each
        data.forEach((itemData) => {
          const textItem = document.createElement('div');
          textItem.textContent = itemData;
          textContainer.appendChild(textItem);
        });
        textContainer.style.marginBottom = '20px';
        outputContainer.appendChild(sectionHeading);
        outputContainer.appendChild(textContainer);
      }
    });
  }
  

// Function to delete an item and update both left and right sides
function deleteItem(itemText, sectionName) {
    // Find the section data for the given section name
    const sectionDataArray = sectionData.get(sectionName);

    // Find the index of the item to delete
    const itemIndex = sectionDataArray.indexOf(itemText);

    if (itemIndex !== -1) {
        // Remove the item from the section data array
        sectionDataArray.splice(itemIndex, 1);

        // Update the right-side container
        updateRightSideContainer();
    }
}



        // Add event listeners for each section's "Add" button
        document.getElementById('add-skills-btn').addEventListener('click', () => {
            addItem('skills-input1', 'skillsContainer1', 'SKILLS');
        });

        document.getElementById('add-language-btn').addEventListener('click', () => {
            addItem('language-input', 'languageContainer', 'LANGUAGES');
        });

        // document.getElementById('add-internship-btn').addEventListener('click', () => {
        //     addItem('internship-input', 'internshipContainer', 'INTERNSHIP');
        // });

        document.getElementById('add-job-btn').addEventListener('click', () => {
            addItem('job-input', 'jobContainer', 'JOB');
        });

        document.getElementById('add-hobbies-btn').addEventListener('click', () => {
            addItem('hobbies-input', 'hobbiesContainer', 'HOBBIES');
        });

        document.getElementById('add-extra-curricular-btn').addEventListener('click', () => {
            addItem('extra-curricular-input', 'extra-curricularContainer', 'EXTRA-CURRICULAR');
        });

        // document.getElementById('add-course-btn').addEventListener('click', () => {
        //     addItem('course-input', 'courseContainer', 'COURSE');
        // });

        document.getElementById('add-reference-btn').addEventListener('click', () => {
            addItem('reference-input', 'referenceContainer', 'REFERENCE');
        });

        // Function to clone and append a section
        function addSection(sectionInputId, sectionContainerId) {
            const originalSection = document.getElementById(sectionContainerId).cloneNode(true);
            originalSection.querySelectorAll('input, textarea').forEach((el) => {
                el.value = ''; // Clear input values in the cloned section
            });
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', () => {
                originalSection.remove();
            });
            originalSection.appendChild(deleteButton);
            document.getElementById(sectionInputId).value = ''; // Clear the input
            document.getElementById(sectionContainerId).parentElement.appendChild(originalSection);
        }

      

// end multiple section button


 
// quill editor sections

  const editors = [];
  const contentContainers = [];
  
  for (let i = 1; i <= 100; i++) { // Changed the loop condition to go up to 6
      editors[i] = new Quill(`#editor${i}`, {
          theme: 'snow'
      });
  
      contentContainers[i] = document.getElementById(`content${i}`);
  
      editors[i].on('text-change', function () {
          contentContainers[i].innerHTML = editors[i].root.innerHTML;
      });
  }
  
  
// end quill editor section



// custom section drag and droup 
