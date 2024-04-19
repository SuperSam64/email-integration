function iWasClicked(){
    $("#textChange").text("I was clicked!")
    const formData = {
        name: "Form name",
        notes:[{
            message: "This is a note!"
        }]
    }
    openForm(formData);
  }