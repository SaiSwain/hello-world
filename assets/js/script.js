

// form repeater
$(document).ready(function(){
    $('.repeater').repeater({
        initEmpty: false,
        defaultValues: {
            'text-input': ''
        },
        show:function(){
            $(this).slideDown();
        },
        hide: function(deleteElement){
            $(this).slideUp(deleteElement);
            setTimeout(() => {
                generateCV();
            }, 500);
        },
        isFirstItemUndeletable: true
    })
})



// first main progressbar

const formElems = document.querySelectorAll('.form-elem');
const progressBar = document.getElementById('progress-barr');
const progressLabel = document.getElementById('progress-labell');
const skillsSelect = document.getElementById('skills-select');
const allInputElements = document.querySelectorAll('input, select');

let totalInputCount = allInputElements.length;

allInputElements.forEach(input => {
  input.addEventListener('input', updateProgressBar);
});

skillsSelect.addEventListener('change', updateProgressBar);

function updateProgressBar() {
  let filledInputCount = 0;

  allInputElements.forEach(input => {
    if (input.value.trim() !== '' && input.value !== 'Select Skills') {
      filledInputCount++;
    }
  });

  const percentage = (filledInputCount / totalInputCount) * 100;
  progressBar.style.width = `${percentage}%`;
  progressLabel.textContent = `${Math.round(percentage)}%`;
}

// end of first main progressbar
    

