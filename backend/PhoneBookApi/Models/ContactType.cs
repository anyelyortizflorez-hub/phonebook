namespace PhoneBookApi.Models
{
    // Esto es un "enum": una lista fija de opciones.
    // Cada opción se guarda en la base de datos como un número (0, 1, 2)
    // pero en el código lo leemos como un nombre, mucho más claro.
    public enum ContactType
    {
        Person = 0,
        PublicOrganization = 1,
        PrivateOrganization = 2
    }
}
