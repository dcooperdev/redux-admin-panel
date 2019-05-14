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
}
