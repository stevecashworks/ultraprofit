const getResetTemplate=(userName,id)=>{
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
            Hi,
            <b>
              ${userName}  
            </b>
            click the button to  update your password
        </p>
        <br/>
        <br/>
        <a href="ulltraprofit-com.vercel.app/codesend.html?profid=${id} style="background-color:red" class="downclic">
            <b> 
                Update password
            </b>
        </a>
    </div>
</body>
</html>
`
}
module.exports=  getResetTemplate