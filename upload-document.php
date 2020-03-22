<?php
/*

Plugin Name: Upload Documents to Post
description: A plugin to upload documents to posts to download them
Version: 1
Author: Arpin IT Dev

*/

function add_scripts($hook) {

global $post;

   if( $hook == 'post-new.php' || $hook == 'post.php' ){

      wp_register_script('upload', plugin_dir_url(__FILE__) . 'scripts/upload.js', array('jquery'), true);
      wp_enqueue_script('upload');
   }

}
add_action('admin_enqueue_scripts', 'add_scripts', 10, 1);


add_action( 'add_meta_boxes', 'upload_meta_boxes');

function upload_meta_boxes(){
   global $post;

      if(!empty($post)){         

         add_meta_box('add_document', 'Upload Document to Post', 'add_resource', 'post', 'advanced', 'high');

      }

}


function add_resource($post){
  $fileurl = get_post_meta($post->ID, 'my_file_URL', true);
  $fileid = get_post_meta($post->ID, 'my_file_ID', true);


   if($fileurl != '' && $fileid != '' ){

   $urls = explode(',', $fileurl);
   $ids = explode(',', $fileid);


   $urlCount = count($urls);

      $url = array(); 
      $id = array();


      for($u = 0; $u < $urlCount; $u++){  

      array_push($url, $urls[$u]);
      array_push($id, $ids[$u]);


      ?>
      <div class="<?php echo $ids[$u] ?>">
      <p><label><strong>File URL: </strong></label>
      <input class="<?php echo $ids[$u]; ?>" name="my_file_<?php echo $u ?>" type="text" value="<?php echo $urls[$u]; ?>" style="width:600px;" />
      <input class="<?php echo $ids[$u] ?> lookupid" data-file-id="<?php echo $ids[$u] ?>" data-file-url="<?php echo $urls[$u]; ?>" id="<?php echo $ids[$u] ?>" name="my_id_<?php echo $u ?>" type="hidden" value="<?php echo $ids[$u]; ?>" style="width:600px;" />
      <input id="remove_button" class="remove_button" type="button" value="Remove" name="<?php echo $ids[$u] ?>" /></p><br/>
      </div>

<?php 
      } 

      $files = implode(',', $url);


   }

?>
 <div id="files"></div>
 <input id="my_file_URL" name="my_file_URL" type="hidden" value="<?php if(isset($files)) { echo $files; } ?>" style="width:600px;" />
  <input id="my_file_ID" name="my_file_ID" type="hidden" value="<?php echo $fileid; ?>" style="width:400px;" />
  <input id="my_upl_button" type="button" value="Upload File" />
  <input id="my_clear_button" type="button" value="Cancel" />

  <br/>

<?php
}

function save_upload_box($post_id){

      global $post;


            if(defined('DOING_AUTOSAVE') && DOING_AUTOSAVE){
               return;
            } else {
               if ( isset( $_POST['add_id'] ) ) {
                     update_post_meta($post_id, "add_id", $_POST["add_id"]);
               } else {             

                   delete_post_meta($post_id, "add_id");

               }
               if (isset($_POST['my_file_URL'])){

                   update_post_meta($post_id, 'my_file_URL', $_POST['my_file_URL']);

               }


               if (isset($_POST['my_file_ID'])){

                   update_post_meta($post_id, 'my_file_ID', $_POST['my_file_ID']);

               }


             }


}
add_action('save_post','save_upload_box');



?>