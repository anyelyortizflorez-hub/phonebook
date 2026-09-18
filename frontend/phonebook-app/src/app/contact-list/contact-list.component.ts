import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact, ContactType, CONTACT_TYPE_LABELS } from '../models/contact.model';
import { ContactService } from '../services/contact.service';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { DeleteConfirmModalComponent } from '../delete-confirm-modal/delete-confirm-modal.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];
  ContactType = ContactType; // lo exponemos para poder usarlo en el HTML
  labels = CONTACT_TYPE_LABELS;


  filters = {
    person: true,
    publicOrg: true,
    privateOrg: true
  };

  constructor(
    private contactService: ContactService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  // Arme la lista de tipos seleccionados segun los checkboxes y pide al backend
  // SOLO esos contactos ya que el filtrado se hace en el servidor, via query string).
  loadContacts(): void {
    const selectedTypes: number[] = [];
    if (this.filters.person) selectedTypes.push(ContactType.Person);
    if (this.filters.publicOrg) selectedTypes.push(ContactType.PublicOrganization);
    if (this.filters.privateOrg) selectedTypes.push(ContactType.PrivateOrganization);

    this.contactService.getContacts(selectedTypes).subscribe({
      next: (data) => this.contacts = data,
      error: (err) => console.error('Error cargando contactos', err)
    });
  }

  // Lo llama cada vez que el usuario marca o desmarca un checkbox de filtro
  onFilterChange(): void {
    this.loadContacts();
  }

  // Se abre el modal en modo agregar sin datos precargados
  openAddModal(): void {
    const modalRef = this.modalService.open(ContactModalComponent);
    modalRef.componentInstance.mode = 'add';

    // Cuando el modal se cierra con Save changes se recarga la tabla
    modalRef.result.then(
      (result) => {
        if (result === 'saved') {
          this.loadContacts();
        }
      },
      () => { /* se cierra con Cancel o clic afuera*/ }
    );
  }

  // Se abre el modal en modo editar pre cargando los datos del contacto elegido
  openEditModal(contact: Contact): void {
    const modalRef = this.modalService.open(ContactModalComponent);
    modalRef.componentInstance.mode = 'edit';
    modalRef.componentInstance.contact = { ...contact }; // copia, para no mutar la tabla en vivo

    modalRef.result.then(
      (result) => {
        if (result === 'saved') {
          this.loadContacts();
        }
      },
      () => { }
    );
  }

  // Se abre el modal de confirmacion de borrado
  openDeleteModal(contact: Contact): void {
    const modalRef = this.modalService.open(DeleteConfirmModalComponent);

    modalRef.result.then(
      (result) => {
        if (result === 'confirmed') {
          this.contactService.deleteContact(contact.id).subscribe({
            next: () => this.loadContacts(),
            error: (err) => console.error('Error eliminando contacto', err)
          });
        }
      },
      () => { }
    );
  }
}
