var users;
var state = -1;
var existsForm = 0;
var existsFormSignIn = 0;

$(window).on("load", function(){
    $("#socialShow").on("click", () => {
        document.getElementById("socialRight").style = "width: 0;"
        document.getElementById("socialLeft").style = "width: 0;"
        $("#socialShow").hide();
    });
    $("#logInBtn").on("click", () => {
        $("#logInContainer").hide();
        if (!existsForm) {
            existsForm = 1 - existsForm;
            $("#submitForm").prepend(`
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="logInEmail" placeholder="FirstName">
                <label for="floatingInput">Email</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="logInPassword" placeholder="Password">
                <label for="floatingInput">Password</label>
            </div>
            <button type="submit" class="btn btn-primary formBtn">Submit</button>
        `);
        }
        else $("#submitForm").show();
        $("#backToLogin").show();
    });
    $("#submitForm").on("submit", async function(event){
        event.preventDefault();
        if (!users) users = (await axios.get("https://jedi-project.herokuapp.com/users")).data;
        let inputEmail = $("#logInEmail").val();
        let inputPassword = $("#logInPassword").val();
        var a = users.find(user => user.email === inputEmail);
        if (a && a.password === inputPassword) { //Existeix a la base de dades
            window.location.replace('shop.html');
        } else{ //No existeix
            $("#last_child").show();
        }
        return false;
    });
    $("#lateralNav").on("click", async () => {
        $("#lateralNav").hide();
        let windowWidth = $(window).width();
        let varWidth;
        if (windowWidth > 1150) varWidth = 30;
        else if (windowWidth > 950) varWidth = 40;
        else varWidth = 50;
        document.getElementById("lateralNavAppears").style = `width:${varWidth}%; display:block;`;
        setTimeout(function() {
            $("#hideLateralNav").show();
            document.getElementById("navFlex").style = "display: flex;";
        }, 300);
        
    })
    $("#hideLateralNav").on("click", () => {
        $("#hideLateralNav").hide();
        document.getElementById("lateralNavAppears").style = "width: 0vw !important; display:block;"
        $("#lateralNav").show();
        document.getElementById("navFlex").style = "display: none;";
    })
    $("#logInBtn").hover(() => {
        if (!state || state===-1) {
            state = 1;
            document.getElementById("logInAnimation").style = "display:block; left: 0; background-color: aliceblue;";
        }
    })
    $("#signUpBtn").hover(() => {
        if (state || state===-1) {
            state = 0;
            document.getElementById("logInAnimation").style = "display:block; left:50%; background-color: rgb(223, 99, 77);";
        }
    })
    $("#goBack").on("click", () => {
        $("#submitForm").hide();
        $("#backToLogin").hide();
        $("#last_child").hide();
        $("#logInContainer").show();
    })
    $("#signUpBtn").on("click", () => {
        $("#logInContainer").hide();
        $("#goBack2").show();
        $("#signUpBtn").show();
        if (!existsFormSignIn) {
            existsFormSignIn = 1 - existsFormSignIn;
            $("#signUpForm").prepend(`
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="firstName" placeholder="FirstName">
                <label for="floatingInput">First Name</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="lastName" placeholder="LastName">
                <label for="floatingInput">Last Name</label>
            </div>
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="email" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="password" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>
            `);
        }
        document.getElementById("signUpForm").style = "display: flex;"
        $("#backToLogin2").show();
    });
    $("#goBack2").on("click", () => {
        $("#signUpForm").hide();
        $("#goBack2").hide();
        $("#errorSignIn").hide();
        $("#logInContainer").show();
    })
    $("#register").on("click", async (event)=> {
        event.preventDefault();
        if (!users) users = (await axios.get("https://jedi-project.herokuapp.com/users")).data;
        let inputFirstName = $("#firstName").val();
        let inputLastName = $("#lastName").val();
        let inputEmail = $("#email").val();
        let inputPassword = $("#password").val();
        console.log(inputFirstName, inputLastName, inputEmail, inputPassword);
        //check if input email is correct.
        var exist = users.find(user => user.email === inputEmail);
        if (inputFirstName.trim() === "" || inputLastName.trim() === "" || inputEmail.trim() === "" || inputPassword.trim() === "") {
            document.getElementById("errorSignIn").innerHTML ="All fields are required. Blanks are not allowed.";
            $("#errorSignIn").show();
            return;
        }
        let correctEmail = await validateEmail(inputEmail);
        if (!correctEmail) {
            document.getElementById("errorSignIn").innerHTML ="Incorrect Email format!";
            $("#errorSignIn").show();
            return;
        }
        else{
            if (exist) {
                document.getElementById("errorSignIn").innerHTML = "The email has already an account.";
                $("#errorSignIn").show();
                return;
            }
            else {
                //The email does not exist on the database
                if (inputPassword.trim() === inputPassword && inputPassword != ""){
                    //Password Correcta
                    console.log("Register")
                    await axios.post("https://jedi-project.herokuapp.com/users", {
                        "firstName":`${inputFirstName}`,
                        "lastName": `${inputLastName}`,
                        "email":  `${inputEmail}`,
                        "password": `${inputPassword}`
                    });
                    window.location.replace('shop.html');
                }
                else{
                    document.getElementById("errorSignIn").innerHTML ="The password cannot contain any space!";
                    $("#errorSignIn").show();
                    return;
                }
            }
        }
    })
});
async function validateEmail (email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}