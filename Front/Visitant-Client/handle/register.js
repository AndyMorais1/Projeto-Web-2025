$(document).ready(()=>{

    $("#register-btn").click( async () => {
      //Obtem o valor inserido no campo (val) do nome e remove os espaços (trim)
       const name = $("#register-name").val().trim();
       const email = $("#register-email").val().trim();
       const password = $("#register-pass").val().trim();
       const confirmPassword = $("#confirm-pass").val().trim();

      // se um elemento estiver empty( que em js equivale a falso )
      if (!name || !email || !password || !confirmPassword){
        alert("Preencha os espaços vazios");
        return;
      }
      // verify if the passwords are equal 
      if (password !== confirmPassword){
        alert("Verifique a passwords");
        return;
      }

      //dados a serem insiridos no user através de um objectp
      const userdata = {
        name: name,
        email: email,
        password: password
      }

      try{
        const response = await window.usersServices.registerUser(userdata);
        alert("Registro realizado com sucesso");
        window.location.href = "/public/login.html";
      }catch (err){
        console.error("erro ao registar", err);
        alert("Erro inesperado");
      }

  })
})