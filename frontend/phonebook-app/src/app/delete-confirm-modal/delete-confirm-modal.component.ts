import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html'
})
export class DeleteConfirmModalComponent {

  constructor(public activeModal: NgbActiveModal) { }

  // cuando se haga clic en si se cerrara el modal devolviendo confirmed
  // quien abre el modal ContactListComponent ve ese resultado
  // y ahi si llama al backend para borrar de verdad
  confirm(): void {
    this.activeModal.close('confirmed');
  }

  cancel(): void {
    this.activeModal.dismiss('cancel');
  }
}
