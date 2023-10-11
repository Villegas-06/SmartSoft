import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable()
export class SweetAlertService {
  confirmDialog(title: string, text: string): Promise<any> {
    const options: SweetAlertOptions = {
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
    };

    return Swal.fire(options);
  }
}
