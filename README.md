Prueba Técnica GUDAR DEVS :)

Hice esta prueba tecnica desarrollando un crud de contactos con angular en el front y ASP.NET Core + PostgreSQL en el back

Mi proyecto tiene dos partes independientes:

phonebook/
backend/PhoneBookApi/     API REST en ASP.NET Core + EF Core + PostgreSQL
frontend/phonebook-app/   Angular + Bootstrap + ng-Bootstrap

Decisiones que tome

* En lugar de hacer una tabla diferente para cada tipo de contacto como persona, organización publica y organización privada, preferí usar una sola tabla y agregar algunos campos extras que se llenan dependiendo del tipo de contacto. Me parecio una forma mas sencilla de manejar esos 1 o 2 campos especificos de cada tipo sin complicar tanto la estructura.

* Para las Personas agregue la fecha de nacimiento y el cargo o profesión. Para las organizaciones publicas, el numero de registro y la dependencia y para las organizaciones privadas, el NIT y la industria.

* El filtro por tipo de contacto lo hice directamente desde el servidor usando el query string asi solo se traen los contactos que realmente se necesitan, en vez de traerlos todos y filtrarlos después en el frontend.

* En Angular usé reactive forms en lugar de formularios template driven, porque me permite manejar mejor las validaciones y tener mas control sobre el formulario.

* Para el diseño quise algo muy sencillo y sobrio sin tantos colores ni cosas llamativas. Me fui por un estilo más tipo antiguo al estilo 2007/2008 en lugar de dejar el bootstrap con su diseño por defecto.


*Como correrlo

Tener PostgreSQL, el SDK de .NET 10 y Node + Angular CLI instalado.

Backend:

bash
cd backend/PhoneBookApi
dotnet restore
dotnet ef migrations add InicialCreate
dotnet ef database update
dotnet run

Queda corriendo en http://localhost:5000 aunque al inicio tenia un problema y era que me corria en el 5001 pero lo solucione. Antes de correrlo hay que crear la base phonebookdb en Postgresql y pon la contraseña en appsettings.json.

Frontend:

bash
cd frontend/phonebook-app
npm install --legacy-peer-deps
ng serve

Y hay que abrirlo en http://localhost:4200.

si el backend queda en otro puerto, hay que cambiarlo en contact.service.ts seria la variable apiUrl.

Cosas que deje pendientes 

El enunciado pedia como bonus validacion en front y back esa si la hice: revisa SaveContactDto.cs para el back y las validaciones del formulario en contact-modal.component.ts para el front y autorizacion simple, que no alcance a implementar por tiempo.