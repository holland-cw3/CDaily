<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST' and isset($_POST["email"]) and (strlen($_POST["email"]) > 0)) {

        try {
        
        $nameEmail = "emails";
        $file_nameEmail = $nameEmail. '.json';
       
        $locationEmail = $file_nameEmail;
        
        // may want to preform some checking on the email here
        $email = $_POST['email'];
        
        // record current time
        $time = strval(round(microtime(true)));
        
        if (file_exists($locationEmail)) {
            
            $jsonDataEmail = file_get_contents($locationEmail);
            
            $jsonArrayMail = json_decode($jsonDataEmail);
            
            $userID = $jsonArrayMail[count($jsonArrayMail)-1]->id + 1;
            
            $userNotExists = true;
            
            for ($x = 0; $x < count($jsonArrayMail); $x++) {
                
                $emailSub1 = str_replace(".", "", strtok(strtolower($jsonArrayMail[$x]->email), '@'));
                $emailSub2 = str_replace(".", "", strtok(strtolower($email), '@'));
                  
                $emailEnd1 = substr(strtolower($jsonArrayMail[$x]->email), strpos(strtolower($jsonArrayMail[$x]->email), "@"));
                $emailEnd2 = substr(strtolower($email), strpos(strtolower($email), "@"));
                  
                $emailFilter1 = $emailSub1 . $emailEnd1;
                $emailFilter2 = $emailSub2 . $emailEnd2;
                
                if (strtolower($jsonArrayMail[$x]->email) == strtolower($email) or $emailFilter1 == $emailFilter2) {
                    $userNotExists = false;
                    $response = "badEmail";
                }
                
                if (str_contains($emailFilter2, "@") and str_contains($emailFilter2, ".")) {
                    $emailValid = true;
                } else {
                    $emailValid = false;
                }
            }
            
            if ($userNotExists) {
                $newUser = Array (
                    "id" => $userID,
                    "email" => $email,
                    "emailIsVerified" => false,
                    "time" => $time,
                );
                array_push($jsonArrayMail, $newUser);
            } else {
                //echo ""; //bad";
            }
            
        } else {
            $userID = 0;
            
            $userNotExists = true;
            
            $jsonArrayMail = Array (
                "0" => Array (
                    "id" => $userID,
                    "email" => $email,
                    "emailIsVerified" => false,
                    "time" => $time,
                )
            );
        }
        
        $key = hash("sha256", $email . "I play pokemon go every day, pleas dont hack us" . $time, false);
        
        $nameMailKeys = "mailKeys";
        $file_nameMailKeys = $nameMailKeys . '.json';
       
        $locationMailKeys = $file_nameMailKeys;
        
        if (file_exists($locationMailKeys)) {
            
            $jsonDataMailKeys = file_get_contents($locationMailKeys);
            
            $jsonArrayMailKeys = json_decode($jsonDataMailKeys);
            
            $hashedKey = hash("sha256", $key, false);
            
            $newSet = Array (
                "key" => $hashedKey,
                "userId" => $userID,
                "time" => $time,
            );
            
            array_push($jsonArrayMailKeys, $newSet);
            
        } else {
            
            $hashedKey = hash("sha256", $key, false);
            
            $jsonArrayMailKeys = Array (
                "0" => Array (
                    "key" => $hashedKey,
                    "userId" => $userID,
                    "time" => $time,
                )
            );
            
        }
        
        $to_email = $email;
        $secondCount = $time % 6000000;
        $dateString = date("m/d/Y");
        $subject = "Confirm CDaily Email ($dateString)";
        $body = "<h2 style='text-align: center;'>Confirm CDaily Email:</h2><h3 style='text-align: center;'>Email: $email</h3><h3 style='text-align: center;'><a href='https://cdaily.co/php/confirmMail.php?key=" . $key . "'>Confirm Email</a></h3>";
        $headers = "From: no-reply@cdaily.co\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
        // encode array to json
        $jsonEmail = json_encode($jsonArrayMail);
        $jsonEmailKeys = json_encode($jsonArrayMailKeys);
        

        if ($emailValid and file_put_contents($locationMailKeys, $jsonEmailKeys)) {
            if ($userNotExists and file_put_contents($locationEmail, $jsonEmail)) {
                if (mail($to_email, $subject, $body, $headers)) {
                        $response = 1;
                } else {
                    $response = "mailSend";
                }
            }
        } else {
            $response = "validEmail";
        }    
        
    } catch (Throwable $e) {
       //echo 'And my error is: ' . $e->getMessage();
       $response = 0;
    }

} else {
    $response = ""; //bad post";
}

echo $response;

?>