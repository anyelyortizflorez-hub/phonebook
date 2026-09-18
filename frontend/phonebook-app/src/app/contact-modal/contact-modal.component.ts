import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact, ContactType } from '../models/contact.model';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html'
})
export class ContactModalComponent implements OnInit {

  
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() contact: Contact | null = null;

  ContactType = ContactType;
  form!: FormGroup;
  saving = false;
  errorMessage = '';

  constructor(
    public activeModal: NgbActiveModal, // nos deja cerrar el modal desde el HTML
    private fb: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    // defini el formulario y sus validaciones aca,
    // en vez de hacerlo directamente en el html.
    this.form = this.fb.group({
      contactType: [this.contact?.contactType ?? ContactType.Person, Validators.required],
      name: [this.contact?.name ?? '', [Validators.required, Validators.maxLength(150)]],
      phoneNumber: [this.contact?.phoneNumber ?? '', [Validators.required, Validators.maxLength(30)]],
      comments: [this.contact?.comments ?? ''],

      // Campos de Persona
      birthDate: [this.contact?.birthDate ?? ''],
      jobTitle: [this.contact?.jobTitle ?? ''],

      // Campos de Organización publica
      registrationNumber: [this.contact?.registrationNumber ?? ''],
      department: [this.contact?.department ?? ''],

      // Campos de Organizacion privada
      taxId: [this.contact?.taxId ?? ''],
      industry: [this.contact?.industry ?? '']
    });
  }

  // Atajo para acceder mas facil a los controles desde el html form.get('name') -> f('name')
  f(controlName: string) {
    return this.form.get(controlName);
  }

  save(): void {
    if (this.form.invalid) {
      // se muestren los mensajes de error
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    const payload = { ...this.form.value };

    // El input de fecha manda un texto vacio cuando no se llena pero el backend
    // espera una fecha real o nada null ya que esta vacio se convierte a null.
    if (!payload.birthDate) {
      payload.birthDate = null;
    }

    if (this.mode === 'add') {
      this.contactService.createContact(payload).subscribe({
        next: () => this.activeModal.close('saved'),
        error: (err) => this.handleError(err)
      });
    } else {
      this.contactService.updateContact(this.contact!.id, payload).subscribe({
        next: () => this.activeModal.close('saved'),
        error: (err) => this.handleError(err)
      });
    }
  }

  private handleError(err: any): void {
    this.saving = false;
    this.errorMessage = 'Ocurrió un error al guardar. Verifica los datos e intenta de nuevo.';
    console.error(err);
  }

  cancel(): void {
    this.activeModal.dismiss('cancel');
  }
}
