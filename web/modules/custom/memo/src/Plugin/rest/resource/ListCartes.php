<?php
namespace Drupal\memo\Plugin\rest\resource;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
/**
 * Provides a Demo Resource
 *
 * @RestResource(
 *   id = "list_cartes",
 *   label = @Translation("Cartes Resource"),
 *   uri_paths = {
 *     "canonical" = "/memo/list_cartes"
 *   }
 * )
 */
class ListCartes extends ResourceBase {
  /**
   * Responds to entity GET requests.
   * @return \Drupal\rest\ResourceResponse
   */
  public function get() {
    /* $nids = \Drupal::entityQuery('node')->condition('type','carte')->execute();
    $nodes =  \Drupal\node\Entity\Node::loadMultiple($nids); */

    // Récupération de l'id de l'utilisateur connecté
    //$user_id = User::load(\Drupal::currentUser()->id());
    $uid = \Drupal::currentUser()->id();

    // Requête
    $query = \Drupal::entityQuery('node');
    $query->condition('type', 'carte');
    $query->condition('uid', $uid);

    // taxonomie des colonnes carte_colonne
    $colonnes = [];
    $vid = 'carte_colonne';
    $terms =\Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree($vid);
    // pour chaque colonne, on fait une requête
    $i = 0;
    foreach ($terms as $term) {
      $term_data[] = array(
        'id' => $term->tid,
        'name' => $term->name
      );
      $colonnes[$i] = $term->tid;
      //array_push($colonnes[$i],$term->tid);
      $i ++;
    }
    $query->condition('field_carte_colonne', $colonnes[0], 'IN');


    $nids = $query->execute();
    $nodes =  \Drupal\node\Entity\Node::loadMultiple($nids);

    $cartes = [];
    foreach($nodes as $cle =>$node){
      // Le getValue()['0'] peut déclencher un warning si le champ est vide.
      // Cf https://www.drupal.org/forum/support/module-development-and-code-questions/2016-04-25/entity-getfield-getvalue-returns#comment-12892695
      $question = array("question" => $node->get('field_carte_question')->getValue()['0']['value'],
      "reponse" => $node->get('field_carte_reponse')->getValue()['0']['value']);
      array_push($cartes,$question,$reponse);
      //ksm($node);
    }

    // création de la réponse
    $response = ['tableaux' => $cartes];

    return new ResourceResponse($response);
  }
}
/* $films = [[
      "name" => "The Shawshank Redemption",
      "year" => 1994,
      "duration" => 142,
    ],
    [
      "name" => "The Godfather",
      "year" => 1972,
      "duration" => '',
    ],
    [
      "name" => "The Dark Knight",
      "year" => 2008,
      "duration" => 175,
    ],
    [
      "name" => "The Godfather: Part II",
      "year" => 1974,
      "duration" => '',
    ],
    [
      "name" => "Pulp Fiction",
      "year" => 1994,
      "duration" => '',
    ],
    [
      "name" => "The Lord of the Rings: The Return of the King",
      "year" => 2003,
      "duration" => '',
    ],]; */