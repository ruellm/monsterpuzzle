<?php

$params = array();
if(count($_GET) > 0) {
    $params = $_GET;
} else {
    $params = $_POST;
}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
     <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# spiritbubble: http://ogp.me/ns/fb/spiritbubble#">
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

        <!-- Open Graph meta tags -->
        <meta property="fb:app_id" content="822472184448676" />
        <meta property="og:type" content="spiritbubble:<?php echo $params['type']?>"/>
        <meta property="og:title" content="<?php echo $params['title']; ?>"/>
        <meta property="og:image" content="<?php echo $params['image']; ?>"/>
        <meta property="og:description" content="<?php echo $params['description']; ?>"/>

    </head>
</html>