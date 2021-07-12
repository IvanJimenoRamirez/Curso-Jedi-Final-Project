$(window).on("load", function(){
    $("#socialShow").on("click", () => {
        document.getElementById("socialRight").style = "width: 0;"
        document.getElementById("socialLeft").style = "width: 0;"
        $("#socialShow").hide();
    })
    $("#startButton").on("click", () => {
        $("#startButton").hide();
        $("#formContainer").append(`
            <form class="limitedHeight">
                <div class="form-group size_custom">
                    <label class="size_custom" for="logInEmail">Email address</label>
                    <input type="email" class="form-control size_custom" id="logInEmail" aria-describedby="emailHelp" placeholder="Enter email">
                     <small id="emailHelp" class="form-text text-muted size_custom">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group size_custom">
                    <label for="logInPassword" class="size_custom">Password</label>
                    <input type="password" class="form-control size_custom" id="logInPassword" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary customSize size_custom">Submit</button>
                <a href="forgot.html">Forgot password?</a>
        </form>
        `)
    })
});