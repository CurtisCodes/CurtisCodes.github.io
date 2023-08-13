<?php
$email_to="curtis@curtisperdue.dev";
$email_subject="It works";
$email_message="Hello. I can send mail!";
$headers = "From: Beacze\r\n".
"Reply-To: curtisperdue@hotmail.com\r\n'" .
"X-Mailer: PHP/" . phpversion();
mail($email_to, $email_subject, $email_message, $headers);  
echo "mail sent!"
?>
