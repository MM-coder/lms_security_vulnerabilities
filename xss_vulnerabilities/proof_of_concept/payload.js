window.onload = function() {
    student = document.getElementById('selected_student');
    children = student.children

    for(var i = 0; i < children.length; i++) {
        let child = children[i];
        if (child.hasAttribute('selected')) {
            child.removeAttribute('selected') 
            children[0].setAttribute('selected', 'selected')
        }
    }
    
    change_student_to_grade(student, 'student');
}