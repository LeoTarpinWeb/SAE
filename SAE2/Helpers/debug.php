<?php


  /**
   * Affiche les informations de debug (nom, ligne et contenu) sur une variable
   * @param $var  la variable à analyser
   */
  function dump($var = null): void
  {
      // récupérer le nom du fichier  et le numéro de ligne appellant
      $bt = debug_backtrace();
      $caller = array_shift($bt);
      $file_name_caller =  $caller['file'];
      $line_caller =  $caller['line'];
      echo "<!-- DEBUG -->\n";
      echo '<pre style="font-size:20px;color: yellow;background-color: black">';
      // le nom de la variable
      echo sprintf('$%s <smaller>[%s, %d]</smaller> :: ', getVariableName($var), $file_name_caller, $line_caller);
      if (is_array($var) || is_object($var)) {
          echo htmlentities(print_r($var, true));
        } elseif (is_string($var)) {
          echo 'string(' . strlen($var) . ') "' . htmlentities($var) . "\"\n";
      } else {
          var_dump($var);
      }
      echo "</pre>\n<!-- end DEBUG -->\n";
  }


  /**
   * Affiche les informations de debug sur une variable et stoppe le script.
   * @param $var  la variable à analyser
   */
  function dd($var = null): void
  {
      dump($var);
      die();
  }

  /**
   * Affiche les informations de debug d'un requête SQL préparée.
   * @param $stmt  l'object statement à analyser
   */
  function dump_sql($stmt)
  {
      ob_start();
      $stmt->debugDumpParams();
      $r = ob_get_contents();
      ob_end_clean();
      dump($r);
  }

  /**
   * Retourne le nom de la variable.
   *
   * @param [type] $var
   * @return string|null
   */
  function getVariableName($var): ?string
  {
      foreach ($GLOBALS as $varName => $value) {
          if ($value === $var) {
              return $varName;
          }
      }

      return null;
  }