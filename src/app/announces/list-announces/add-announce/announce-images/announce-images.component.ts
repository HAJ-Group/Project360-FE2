import { Component, OnInit } from '@angular/core';
import {ImageModel} from '../../../../model.ts/Image-model';
import {HttpClient} from '@angular/common/http';
import {AnnonceDataService} from '../../../../service/data/annonce-data.service';
declare var $: any;
@Component({
  selector: 'app-announce-images',
  templateUrl: './announce-images.component.html',
  styleUrls: ['./announce-images.component.css']
})
export class AnnounceImagesComponent implements OnInit {

  selectedFiles: File[] = [];


  constructor(

  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    console.log(event.target.files[0]);
    this.selectedFiles.push(event.target.files[0]);
  }






  uploader(){
    /**
     * CUSTOM FILE INPUTS FOR IMAGES
     *
     * Version: 1.0.0
     *
     * Custom file inputs with image preview and
     * image file name on selection.
     */
    $('input[type="file"]').each(function(){
      // Refs
      // tslint:disable-next-line:one-variable-per-declaration
      const $file = $(this),
        $label = $file.next('label'),
        $labelText = $label.find('span'),
        labelDefault = $labelText.text();

      // When a new file is selected
      // tslint:disable-next-line:only-arrow-functions
      $file.on('change', function(event){
        // tslint:disable-next-line:one-variable-per-declaration
        const fileName = $file.val().split( '\\' ).pop(),
          tmppath = URL.createObjectURL(event.target.files[0]);
        // Check successfully selection
        if ( fileName ){
          $label
            .addClass('file-ok')
            .css('background-image', 'url(' + tmppath + ')');
          $labelText.text(fileName);
        }else{
          $label.removeClass('file-ok');
          $labelText.text(labelDefault);
        }
      });
    });

  }

}
