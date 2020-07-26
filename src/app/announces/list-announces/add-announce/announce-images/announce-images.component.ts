import { Component, OnInit } from '@angular/core';
import {ImageModel} from '../../../../model.ts/Image-model';
import {HttpClient} from '@angular/common/http';
import {AnnonceDataService} from '../../../../service/data/annonce-data.service';
import {tsCreateElement} from '@angular/compiler-cli/src/ngtsc/typecheck/src/ts_util';
declare var $: any;
@Component({
  selector: 'app-announce-images',
  templateUrl: './announce-images.component.html',
  styleUrls: ['./announce-images.component.css']
})
export class AnnounceImagesComponent implements OnInit {

  selectedFiles: File[] = [];
  counter = 2;

  constructor(

  ) { }

  ngOnInit(): void {
    this.uploader();
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

  addImageInput(){
    /*// Create the global div element
    const div = document.createElement('div');
    div.setAttribute('class', 'wrap-custom-file');

    // Create the input file
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('name', 'image');
    input.setAttribute('id', 'image');
    input.setAttribute('accept', '.gif, .jpg, .png');

    // Create the label for the input
    const label = document.createElement('label');
    label.setAttribute('for', 'image');

    // Create the span inside the label
    const span = document.createElement('span');
    const spanContent = document.createTextNode('Select Image');
    span.appendChild(spanContent);

    // Create the i element inside the label
    const iElement = document.createElement('i');
    iElement.setAttribute('class', 'fa fa-plus-circle');

    // Add the span and i to the label
    label.appendChild(span);
    label.appendChild(iElement);

    // add the input and label to the div
    div.appendChild(input);
    div.appendChild(label);*/

    // append the div to the page id
    const id = document.getElementById('page');
    id.innerHTML += '<div class="fileinput fileinput-new text-center mr-2" data-provides="fileinput">\n' +
      '    <div class="fileinput-new thumbnail">\n' +
      '      <img src="assets/dashboard/img/image_placeholder.jpg" alt="...">\n' +
      '    </div>\n' +
      '    <div class="fileinput-preview fileinput-exists thumbnail"></div>\n' +
      '    <div>\n' +
      '                          <span class="btn btn-rose btn-round btn-file">\n' +
      '                            <span class="fileinput-new">Select image</span>\n' +
      '                            <span class="fileinput-exists">Change</span>\n' +
      '                            <input type="file" name="image1" id="image' + (++this.counter) + '"\n' +
      '                                   accept=".gif, .jpg, .png" (change)="onFileSelected($event)" />\n' +
      '                          </span>\n' +
      '      <a href="#pablo" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times"></i> Remove</a>\n' +
      '    </div>\n' +
      '  </div>';
    document.getElementById('more-imgs').classList.add('d-none');
  }

}
