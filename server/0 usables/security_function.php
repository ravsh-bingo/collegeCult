<?php
echo htmlentities("soe string <script>alert('dfdf');</script>", ENT_QUOTES | ENT_HTML5, 'UTF-8');
echo "<br>";
echo "thi iz not safe <script>alert('this is not safe')</script>";
?>