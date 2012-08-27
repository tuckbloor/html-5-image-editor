<?php


        $png =$_POST['data'];

 
    // Remove the headers (data:,) part. 
    // A real application should use them according to needs such as to check image type
    $filteredData=substr($png, strpos($png, ",")+1);
 
    // Need to decode before saving since the data we received is already base64 encoded
    $unencodedData=base64_decode($filteredData);
 
    //echo "unencodedData".$unencodedData;
 
    // Save file.  This example uses a hard coded filename for testing,
    // but a real application can specify filename in POST variable
    $fp = fopen( 'image.png', 'wb' );
    fwrite( $fp, $unencodedData);
    fclose( $fp );
   
?>