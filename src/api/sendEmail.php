<?php

// what to we want to check to send an email???
// when will this script trigger????
if (true) {

        try {
        
        $nameEmail = "emails";
        $file_nameEmail = $nameEmail. '.json';
       
        $locationEmail = $file_nameEmail;

        $nameUnsub = "emails";
        $file_nameUnsub = $nameUnsub. '.json';
       
        $locationUnsub = $file_nameUnsub;
        
        // record current time
        $time = strval(round(microtime(true)));
        
        if (file_exists($locationEmail)) {
            
            $jsonDataEmail = file_get_contents($locationEmail);
            
            $jsonArrayMail = json_decode($jsonDataEmail);

            // handle if file doesn't exist
            $jsonUnsub = file_get_contents($locationUnsub);
            
            $jsonArrayUnsub = json_decode($jsonUnsub);
        
            for ($x = 0; $x < count($jsonArrayMail); $x++) {

                $unsubKey = hash("sha256", "unsubscribe" . $email . "I play pokemon go every day, pleas dont hack us" . $time, false);
                $unsubPlaced = false;
                for ($i = 0; $i < count($jsonArrayUnsub); $i++) {
                    if ($jsonArrayUnsub[$i]->email == to_email) {
                        $jsonArrayUnsub[$i]->key = $unsubKey;
                        $unsubPlaced = true;
                    }
                }

                if (!$unsubPlaced) {
                    $userID = $jsonArrayUnsub[count($jsonArrayUnsub)-1]->id + 1;

                    $newKey = Array (
                        "id" => $userID,
                        "email" => $email,
                        "key" => $unsubKey,
                    );

                    array_push($jsonArrayUnsub, $newKey);
                }

                // send email to each user
                $to_email = $jsonArrayMail[$x]->email;
                $secondCount = $time % 6000000;
                $dateString = date("m/d/Y");
                $subject = "CDaily Rate Update ($dateString)";
                $body = "<h2 style='text-align: center;'>We Have More Rates!</h2><h3 style='text-align: center;'>Yay</h3><h3 style='text-align: center;'><a href='https://cdaily.co/php/unsubscribe.php?key=" . $key . "&email=" . $to_email . "'>Confirm Email</a></h3>";
                $headers = "From: no-reply@cdaily.co\r\n";
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

            }

            
        }
        
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