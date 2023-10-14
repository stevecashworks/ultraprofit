const appendCodetoHtml=(code, userName)=>{
  return`
  <html lang="en">    <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password</title>  
  <style>
      .headerty{
          width: 100%; 
          text-align: center;
          color:#fd961a;
          font: bold;
      }
      .downclic{
          width: 50%;
          border:none;
          color:white;
          padding:10px;
          font:bold;
          background-color:#fd961a;
      }
  </style>
</head>
<body>  
  
  <div class="headerty">
      <p>
          Welcome,
          <b>
            ${userName}  
          </b>
          Your verification code is: 
      </p>
      <br/>
      <br/>
      <h1>
         
          ${code}
            
          
      </h1>
  </div>
</body>
</html>
`
}
module.exports= appendCodetoHtml