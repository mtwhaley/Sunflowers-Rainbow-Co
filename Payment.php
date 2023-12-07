
<html>
    <head>
        <title>
            Sunflowers & Rainbow Co
        </title>
        <link rel="stylesheet" href="StyleSheets/style1.css">
        <link rel="stylesheet" href="StyleSheets/Header.css">
        <link rel="stylesheet" href="StyleSheets/Nav.css">
        <link rel="stylesheet" href="StyleSheets/Messages.css">
        <link rel="stylesheet" href="StyleSheets/Forms.css">
    </head>
    <body>
        <div id="header">
            <img src="Header Image.png" id="headerImage" alt="Sunflower & Rainbow Cover Photo">
            <p id="businessName"> S u n f l o w e r &nbsp; & &nbsp; R a i n b o w &nbsp; c o </p>
        </div>


        <div class="messageBoard" style="width: 50%; min-width: 400px;">
            <div class="messageSpace">
                <p style="font-weight: bold; font-size: 22px;">Payment information: </p>
                <form id="PaymentForm" >
                    <label for="cardName">Name on card: </label><br>
                    <input type="text" name="cardName" id="cardName">
                    <br><br>
                    <label for="cardNumber">Card Number: </label><br>
                    <input type="text" name="cardNumber" id="cardNumber">
                    <br><br>
                    <label for="exp">Exp: </label>
                    <label for="CCV" style="margin-left: calc(60% - 65px);">CCV: </label>
                    <br>
                    <input type="text" name="exp" id="exp" style="width: 40%;">
                    
                    <input type="text" name="CCV" id="CCV" style="width: 40%; margin-left: calc(20% - 30px)">
                    <br><br>
                    
                    <label for="baddress">Billing address: </label><br>
                    <input type="text" name="baddress" id="baddress">
                </form>
            </div>
        </div>
        <?php echo $_POST["fullname"]; ?>


        <div id="navSpace"></div>
        <script src="ScriptSheets/ShoppingCart.js"></script>
        <script src="ScriptSheets/Nav.js"></script>
        <script>
            setNavigation()
            document.getElementById("bottomNav").style.position="fixed"
            document.getElementById("bottomNav").style.bottom="0"
        </script>
    </body>
</html>