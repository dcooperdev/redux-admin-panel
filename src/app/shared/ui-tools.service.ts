import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UiToolsService {

  constructor() { }

  makingAnAction( actionState: boolean, title: string = 'Espere un momento por favor...' ) {
    if ( actionState ) {
      Swal.fire({
        title,
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });
    } else {
      if ( Swal.isVisible() ) {
        Swal.close();
      }
    }
  }

  toast( type: 'warning' | 'error' | 'success' | 'info' | 'question' = 'success',
         title: string = 'Accion completada con exito!',
         time: number = 2000 ) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: time
    });

    Toast.fire({
      type,
      title
    });
  }

  gravatar() {
    Swal.fire({
      position: 'top-end',
      title: 'Dar de alata su avatar',
      html: 'En StarAdmin utilizamos <b>Gravatar</b> (Globally Recognized Avatar | Avatares mundialmente reconocidos).\
             Para crear su gravatar tiene que crear una cuenta <a href="https://es.gravatar.com/" target="_blank">aquí</a>',
      footer: '<a href="https://es.gravatar.com/" target="_blank">\
                <img src="https://automattic.files.wordpress.com/2005/12/gravatar.png" width="240">\
               </a>'
    });
  }
}
