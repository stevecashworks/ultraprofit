const appendCodetoHtml=(code, userName)=>{
  return
  `
<!DOCTYPE html>
<html lang="en">    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email verification</title>
    <link rel="stylesheet" href="./css/style.css">
    <link rel="shortcut icon" href="./assets/img/download (1).png" type="image/x-icon">
</head>
<body>
    <section class="formcontain">
        <br>
        <div style="color:#fd961a;">
             <div style="text-align: center; ">
                <b style=""> 
                    Ulltraprofit.com
                 </b>
             </div>
            <p style="margin:8px; text-align: center;  ">
                Email verification
            </p>
            <p style="margin:8px; text-align: center;"> 
              dear <p style="text-transform:capitalize">${userName}</p>  This is to verify that email you are about to use in ulltraprofit.com
                is a valid email so that your account will be activated
            </p>
            <h1 style="text-align: center;"> 
                    ${code}
            </h1>
            <div style="margin:10px; text-align: center; font-size: 12px;">
                <p>
                    <b>By</b> <!--Jude Ezeagu Chijioke--> Ceo ulltraprofit.com
                </p> 
                 <div style="text-align:center; font-size: 12px;">
                    <a href="terms.html">Term of services</a>
                 </div>
            </div>
        </div>   
        <div style="color:#fd961a;; text-align: center; font-size: 15px;">
            <p>
              Allright reserved &copy; Ulltraprofit.com 2023
            </p>
          </div>
          <br>
    </section>
</body>
</html>
  `
}
export default appendCodetoHtml