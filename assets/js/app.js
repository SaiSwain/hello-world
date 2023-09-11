// regex for validation
const strRegex =  /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

const mainForm = document.getElementById('cv-form');
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
}

// user inputs elements
let firstnameElem = mainForm.firstname,
    middlenameElem = mainForm.middlename,
    lastnameElem = mainForm.lastname,
    imageElem = mainForm.image,
    designationElem = mainForm.designation,
    addressElem = mainForm.address,
    emailElem = mainForm.email,
    phonenoElem = mainForm.phoneno,
    summaryElem = mainForm.summary;

// display elements
let nameDsp = document.getElementById('fullname_dsp'),
    imageDsp = document.getElementById('image_dsp'),
    phonenoDsp = document.getElementById('phoneno_dsp'),
    emailDsp = document.getElementById('email_dsp'),
    addressDsp = document.getElementById('address_dsp'),
    designationDsp = document.getElementById('designation_dsp'),
    summaryDsp = document.getElementById('summary_dsp'),
    projectsDsp = document.getElementById('projects_dsp'),
    achievementsDsp = document.getElementById('achievements_dsp'),
    skillsDsp = document.getElementById('skills_dsp'),
    educationsDsp = document.getElementById('educations_dsp'),
    experiencesDsp = document.getElementById('experiences_dsp');

// first value is for the attributes and second one passes the nodelists
const fetchValues = (attrs, ...nodeLists) => {
    let elemsAttrsCount = nodeLists.length;
    let elemsDataCount = nodeLists[0].length;
    let tempDataArr = [];

    // first loop deals with the no of repeaters value
    for(let i = 0; i < elemsDataCount; i++){
        let dataObj = {}; // creating an empty object to fill the data
        // second loop fetches the data for each repeaters value or attributes 
        for(let j = 0; j < elemsAttrsCount; j++){
            // setting the key name for the object and fill it with data
            dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }

    return tempDataArr;
}

const getUserInputs = () => {

    // achivements 
    let achievementsTitleElem = document.querySelectorAll('.achieve_title'),
    achievementsDescriptionElem = document.querySelectorAll('.achieve_description');

    // experiences
    let expTitleElem = document.querySelectorAll('.exp_title'),
    expOrganizationElem = document.querySelectorAll('.exp_organization'),
    expLocationElem = document.querySelectorAll('.exp_location'),
    expStartDateElem = document.querySelectorAll('.exp_start_date'),
    expEndDateElem = document.querySelectorAll('.exp_end_date'),
    expDescriptionElem = document.querySelectorAll('.exp_description');

    // education
    let eduSchoolElem = document.querySelectorAll('.edu_school'),
    eduDegreeElem = document.querySelectorAll('.edu_degree'),
    eduCityElem = document.querySelectorAll('.edu_city'),
    eduStartDateElem = document.querySelectorAll('.edu_start_date'),
    eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date'),
    eduDescriptionElem = document.querySelectorAll('.edu_description');

    let projTitleElem = document.querySelectorAll('.proj_title'),
    projLinkElem = document.querySelectorAll('.proj_link'),
    projDescriptionElem = document.querySelectorAll('.proj_description');

    let skillElem = document.querySelectorAll('.skill');

    // event listeners for form validation
    firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Last Name'));
    phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Address'));
    designationElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Designation'));

    achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    expTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    expOrganizationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Organization')));
    expLocationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, "Location")));
    expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expEndDateElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'School')));
    eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Degree')));
    eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'City')));
    eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
    eduGraduationDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Graduation Date')));
    eduDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    projTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Link')));
    projDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    skillElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'skill')));

    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem)
    }
};

function validateFormData(elem, elemType, elemName){
    // checking for text string and non empty string
    if(elemType == validType.TEXT){
        if(!strRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for only text string
    if(elemType == validType.TEXT_EMP){
        if(!strRegex.test(elem.value)) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for email
    if(elemType == validType.EMAIL){
        if(!emailRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for phone number
    if(elemType == validType.PHONENO){
        if(!phoneRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for only empty
    if(elemType == validType.ANY){
        if(elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
}

// adding the invalid text
function addErrMsg(formElem, formElemName){
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
}

// removing the invalid text 
function removeErrMsg(formElem){
    formElem.nextElementSibling.innerHTML = "";
}

// show the list data
const showListData = (listData, listContainer) => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        let itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        
        for(const key in listItem){
            let subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        }

        listContainer.appendChild(itemElem);
    })
}






const displayCV = (userData) => {
    nameDsp.innerHTML = userData.firstname + " " + userData.middlename + " " + userData.lastname;
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
}

// generate CV
const generateCV = () => {
    let userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
}



// Add event listeners for keyup events on the input fields
firstnameElem.addEventListener('keyup', () => generateName());
middlenameElem.addEventListener('keyup', () => generateName());
lastnameElem.addEventListener('keyup', () => generateName());

function generateName() {
  const firstName = firstnameElem.value;
  const middleName = middlenameElem.value;
  const lastName = lastnameElem.value;

  // Combine the names and convert to camel case
const inputName = `${firstName}  ${middleName}  ${lastName}`; // Note the double spaces
const cleanedName = inputName.replace(/\s+/g, ' ').trim(); // Replace multiple spaces with a single space
const fullName = cleanedName.split(' ')
    .map((word, index) => {
      // Convert the first word to lowercase and the rest to title case
      if (index === 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join(' ');

  // Display the full name in camel case
  const camelCaseName = fullName.charAt(0).toUpperCase() + fullName.slice(1);
  nameDsp.textContent = camelCaseName;
}


// function generateName() {
//   const firstName = document.querySelector(".firstname").value;
//   const middleName = document.querySelector(".middlename").value;
//   const lastName = document.querySelector(".lastname").value;

//   // Combine the names and convert to camel case
//   const fullName = `${firstName} ${middleName} ${lastName}`.split(' ')
//       .map((word, index) => {
//           // Convert the first word to lowercase and the rest to title case
//           if (index === 0) {
//               return word.toLowerCase();
//           } else {
//               return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
//           }
//       })
//       .join('');

//   // Display the full name
//   document.querySelector("#fullname_dsp").textContent = fullName;
// }

// function previewImage(){
//     let oFReader = new FileReader();
//     oFReader.readAsDataURL(imageElem.files[0]);
//     oFReader.onload = function(ofEvent){
//         imageDsp.src = ofEvent.target.result;
//     }
// }
// function deleteImage() {
//   // Clear the image source and reset the input field
//   document.getElementById('image_dsp').src = '';
//   document.getElementById('input-1').value = '';
// }

function previewImage() {
  let oFReader = new FileReader();
  oFReader.readAsDataURL(imageElem.files[0]);
  oFReader.onload = function (ofEvent) {
      let imageSource = ofEvent.target.result;

      // Update the first image in the preview-image container
      document.getElementById('image_dsp').src = imageSource;

      // Update the second image inside the form-elem container and remove the background image
      let image_dsp2 = document.getElementById('image_dsp2');
      image_dsp2.style.backgroundImage = 'none'; // Remove the background image
      image_dsp2.src = imageSource; // Set the selected image

      // Hide the default picture image
      document.getElementById('default-image').style.display = 'none';
  }
}

function deleteImage() {
  // Clear the image source and reset the input field
  document.getElementById('image_dsp').src = '';
  document.getElementById('image_dsp2').src = ''; // Clear the second image source
  document.getElementById('input-1').value = '';

  // Show the default picture image
  document.getElementById('default-image').style.display = 'block';
}

function triggerFileInput() {
  document.getElementById('input-1').click(); // Trigger the file input click event
}




// print CV
function printCV(){
    window.print();
}



// add multiple section part

  const sectionButtons = document.querySelectorAll('.section-button');
const columnContainers = document.querySelectorAll('.column');
const aggregatedTextContainer = document.querySelector('#aggregated-text-container');

sectionButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const sectionName = button.getAttribute('data-section');
    const currentColumn = columnContainers[index];

    // Hide all existing input containers
    const existingInputContainers = currentColumn.querySelectorAll('.input-container');
    existingInputContainers.forEach(container => {
      container.classList.add('hidden');
    });

    // Find the last input container and show it
    const lastInputContainer = existingInputContainers[existingInputContainers.length - 1];
    if (lastInputContainer) {
      lastInputContainer.classList.remove('hidden');
    }

    // Create a new input container and append it to the current column
    const newInputContainer = createInputContainer(sectionName);
    currentColumn.appendChild(newInputContainer);

    const inputField = newInputContainer.querySelector('input');
    const addBtn = newInputContainer.querySelector(`.add-${sectionName.toLowerCase()}-btn`);
    const deleteBtn = newInputContainer.querySelector('.delete-btn');

    inputField.addEventListener('input', () => {
      const text = inputField.value.trim();
      if (text) {
        const newDisplayContainer = document.createElement('div');
        newDisplayContainer.classList.add('display-container');
        newDisplayContainer.textContent = `${sectionName}: ${text}`;
        aggregatedTextContainer.appendChild(newDisplayContainer);

        // Clear the input field
        inputField.value = '';
      }
    });

    deleteBtn.addEventListener('click', () => {
      newInputContainer.remove();
    });
  });
});

// Handle adding more containers
document.addEventListener('click', event => {
  if (event.target.classList.contains('add-more-course-btn')) {
    const addMoreBtn = event.target;
    const inputContainer = addMoreBtn.closest('.input-container');
    const duplicateInputContainer = inputContainer.cloneNode(true);
    const newInputField = duplicateInputContainer.querySelector('input');

    // Clear the value of the input field to avoid duplicating text
    if (newInputField) {
      newInputField.value = '';
    }

    inputContainer.parentElement.insertBefore(duplicateInputContainer, inputContainer.nextSibling);

    // Attach delete button listener to the new container
    const deleteBtn = duplicateInputContainer.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      duplicateInputContainer.remove();
    });
  }
});

function createInputContainer(sectionName) {
  const newInputContainer = document.createElement('div');
  newInputContainer.classList.add('input-container');
  newInputContainer.innerHTML = `
    <input type="text" placeholder="${sectionName} item">
    <button class="add-${sectionName.toLowerCase()}-btn">Add ${sectionName}</button>
    <button class="delete-btn">Delete</button>
  `;

  const addBtn = newInputContainer.querySelector(`.add-${sectionName.toLowerCase()}-btn`);
  addBtn.addEventListener('click', () => {
    const newContainer = createInputContainer(sectionName);
    newInputContainer.parentElement.insertBefore(newContainer, newInputContainer.nextSibling);
  });

  return newInputContainer;
}


function updateRightSideContent() {
  const displayContainers = document.querySelectorAll(".display-container");
  const inputContainers = document.querySelectorAll('.input-container');

  inputContainers.forEach((container, index) => {
    const h1Text = container.querySelector('h1').textContent;

    // Create a new div to hold input field values
    const inputValuesDiv = document.createElement('div');

    container.querySelectorAll('.input-field').forEach((inputField) => {
      const inputValue = inputField.value;
      const inputLabel = inputField.getAttribute('placeholder');
      const inputText = `<p><strong>${inputLabel}:</strong> ${inputValue}</p>`;
      inputValuesDiv.innerHTML += inputText;
    });

    displayContainers[index].innerHTML = `<h1>${h1Text}</h1>${inputValuesDiv.innerHTML}`;
  });
}

// custome section drag and droup 

document.addEventListener("DOMContentLoaded", () => {
  const leftSide = document.getElementById("leftSide");
  const rightSide = document.getElementById("rightSide");
  let displayContainers = document.querySelectorAll(".display-container");

  const sortable = new Sortable(leftSide, {
    animation: 150,
    handle: ".draggable-content",
    onEnd: () => {
      updateRightSideContent();
    }
  });

  leftSide.querySelectorAll('.input-container input, .input-container textarea, .input-container .date-input').forEach((input, index) => {
    input.addEventListener("input", () => {
      updateRightSideContent();
    });
  });

  const dateInputs = document.querySelectorAll(".date-input");
  dateInputs.forEach(dateInput => {
    flatpickr(dateInput);
  });

  function updateRightSideContent() {
    const inputContainers = leftSide.querySelectorAll('.input-container');
    const reorderedDisplayContainers = Array.from(inputContainers).map(container => {
      const heading = container.querySelector('h3[contenteditable="true"]').textContent;
      const inputValues = Array.from(container.querySelectorAll('input, textarea, .date-input')).map(input => input.value);
  
      const textContent = inputValues
        .filter(value => value.trim() !== '')
        .join('<br>'); // Use <br> to separate input values
  
      return `<h3>${heading}</h3><p>${textContent}</p>`;
    });
  
    // Check if there is any content in the reorderedDisplayContainers
    const hasContent = reorderedDisplayContainers.some(containerContent => containerContent.trim() !== '');
  
    if (hasContent) {
      displayContainers.forEach((container, index) => {
        container.innerHTML = reorderedDisplayContainers[index];
      });
    } else {
      // If no content, clear the right side display containers
      displayContainers.forEach(container => {
        container.innerHTML = ''; // Clear the content
      });
    }
  }
  

  // Initially clear the right side display containers
  displayContainers.forEach(container => {
    container.innerHTML = '';
  });
});

// end custome section drag and droup section


document.addEventListener("DOMContentLoaded", () => {
  const leftSide = document.getElementById("leftSide1");
  const rightSide = document.getElementById("rightSide1");
  let displayContainers = document.querySelectorAll(".display-container1");

  const sortable = new Sortable(leftSide, {
    animation: 150,
    handle: ".draggable-content",
    onEnd: () => {
      updateRightSideContent();
    }
  });

  leftSide.querySelectorAll('.input-container input, .input-container textarea, .input-container .date-input').forEach((input, index) => {
    input.addEventListener("input", () => {
      updateRightSideContent();
    });
  });

  const dateInputs = document.querySelectorAll(".date-input");
  dateInputs.forEach(dateInput => {
    flatpickr(dateInput);
  });
  // function updateRightSideContent() {
  //   const inputContainers = leftSide.querySelectorAll('.input-container');
  //   const reorderedDisplayContainers = Array.from(inputContainers).map(container => {
  //     const heading = container.querySelector('h3').textContent;
  //     const inputValues = Array.from(container.querySelectorAll('input, textarea, .date-input')).map(input => {
  //       if (input.value.trim() !== '') {
  //         return `<p>${input.value}</p>`; // Wrap each input value in its own <p> element
  //       }
  //       return ''; // Empty string if the input is empty
  //     }).join('');

  //     return `<h3>${heading}</h3>${inputValues}`;
  //   });

  //   displayContainers.forEach((container, index) => {
  //     container.innerHTML = reorderedDisplayContainers[index];
  //   });
  // }
  function updateRightSideContent() {
    const inputContainers = leftSide.querySelectorAll('.input-container');
    const reorderedDisplayContainers = Array.from(inputContainers).map(container => {
      const heading = container.querySelector('h3').textContent;
      const inputValues = Array.from(container.querySelectorAll('input, textarea, .date-input')).map(input => {
        if (input.value.trim() !== '') {
          if (input.classList.contains('date-input')) {
            return `<span class="date-value">${input.value}</span>`; // Use a span element for date values
          }
          return `<p>${input.value}</p>`; // Wrap other input values in <p> elements
        }
        return ''; // Empty string if the input is empty
      }).join('');
  
      return `<h3>${heading}</h3>${inputValues}`;
    });
  
    displayContainers.forEach((container, index) => {
      container.innerHTML = reorderedDisplayContainers[index];
    });
  }
  
});

