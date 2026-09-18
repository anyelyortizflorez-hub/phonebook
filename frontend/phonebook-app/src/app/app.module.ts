import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactModalComponent } from './contact-modal/contact-modal.component';
import { DeleteConfirmModalComponent } from './delete-confirm-modal/delete-confirm-modal.component';

@NgModule({
  // Todos los componentes que forman parte de esta app
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactModalComponent,
    DeleteConfirmModalComponent
  ],
  imports: [
    BrowserModule,       // necesario en cualquier app Angular que corre en el navegador
    HttpClientModule,    // habilita HttpClient para llamar a la API
    FormsModule,         // formularios simples (ngModel)
    ReactiveFormsModule, // formularios reactivos (los usamos en el modal, más robustos)
    NgbModule            // componentes de ng-bootstrap (los modales)
  ],
  providers: [],
  bootstrap: [AppComponent] // el componente que arranca toda la app
})
export class AppModule { }
