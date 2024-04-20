<?php

$reponse = "<h2 style='text-align:center;'>there was an error</h2>";

if (isset($_GET["key"]) and (strlen($_GET["key"]) > 0)) {
    $key = $_GET["key"];
    
    $weOpened = true;
    
    $nameMail = "unsubKeys";
    $file_nameMail = $nameMail . '.json';
       
    $locationMail = $file_nameMail;
    
    if (file_exists($locationMail)) {
        
        $mailArr = json_decode(file_get_contents($locationMail));
        
        $keyHash = hash("sha256", $key, false);
        
        $keyValid = false;
        
        for ($i=0; $i < count($mailArr); $i++) {
            if ($mailArr[$i]->key == $keyHash) {
                $userID = $mailArr[$i]->userId;
                $keyValid = true;
                $keyID = $i;
            }
        }
        
        if ($keyValid) {
            
            $userFile = "emails.json";
            
            if (file_exists($userFile)) {
                $userArr = json_decode(file_get_contents($userFile));
                
                for ($i=0; $i < count($userArr); $i++) {
                    if ($userArr[$i]->id == $userID) $userIdLegit = $i;
                }
                
                $userArr[$userIdLegit]->emailIsVerified = false;
                
            } else {
                $reponse = "<h2 style='text-align:center;'>there was an error</h2>";
            }
            
            unset($userArr[$userIdLegit]);
            
            if (file_put_contents($userFile, json_encode($userArr))) {
                unset($mailArr[$keyID]);
                
                if (file_put_contents($locationMail, json_encode(array_values($mailArr)))) {
                    $reponse = "<h2 style='text-align:center;'>You have been unsubscribed!</h2>";
                }
            }
        } else {
            $reponse = "<h2 style='text-align:center;'>there was an error</h2>";
        }
      
    } else {
        $reponse = "<h2 style='text-align:center;'>there was an error</h2>";
    }    
}

echo $reponse;

?>