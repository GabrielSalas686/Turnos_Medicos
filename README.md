# Turnos Médicos
## Descripción
API Backend para gestionar turnos médicos, hecha con Node.js, Express, TypeScript y MongoDB.

## Tecnologías
| Herramienta | Para qué se usa |
|-----------  |-----------|
| Node.js 20+ | Entorno para ejecutar JavaScript/TypeScript |
|Express ^5.3.0 | Servidor y rutas de la API|
|TypeScript + tsx|Tipado; tsx ejecuta el código en desarrollo sin compilar |
|MongoDB Atlas + Mongoose|Base de datos en la nube y modelos |
|JWT + bcrypt|Login: tokens de sesión y contraseñas encriptadas |
|dotenv	|Variables de entorno; lee archivo .env |


## Requisitos previos
- Node.js versión 20 o superior (comprobar con node -v)
- Git (comprobar con git --version)
- Con una cuenta en MongoDB Atlas crear:
  1. Un cluster
  2. Un usuario de base de datos con su contraseña
  3. Admitir tu IP en Network Access (admitir cada vez que cambie)
  4. Copiar cadena de conexión, que va en MONGO_URI


## Puesta en marcha del proyecto:
1. Clonar repositorio
```bash
git clone https://github.com/GabrielSalas686/Turnos_Medicos.git
```
2. Entrar a la carpeta
```bash
cd Turnos_Medicos
```
3. Instalar las dependencias
```bash
npm install
```
Esto crea la carpeta node_modules con todas las librerías del proyecto
4. Crear el archivo .env
```bash
# Terminales Mac / Linux / Git Bash
cp .env.example .env
# Windows (CMD)
copy .env.example .env
```

Abrí el .env nuevo y completalo con los valores
```bash
PORT=3000 # por defecto
MONGO_URI= # cadena de conexión a MongoDB
JWT_SECRET= # clave secreta para los token
```
### PRECAUCIÓN!
#### El .env tiene contraseñas reales. Nunca se sube a GitHub (es importante agregar el .env al .gitignore) y no se comparte en grupos públicos 

5. Levantar el servidor
```bash
npm run dev
```
Si todo salió bien, en la terminal vas a ver:
```bash
Conectado a MongoDB
Servidor en http://localhost:3000
```
Abrí http://localhost:3000 en el navegador, con el servidor corriendo y deberías ver un texto que dice API de turnos médicos funcionando

¡Listo, ya podés empezar a trabajar!

## Comandos disponibles

| Comando | Para qué se usa |
|-----------  |-----------|
| npm run dev | Levanta el servidor y lo reinicia solo cada vez que guardás un archivo. Es el que se usa para programar. |

## Endpoints
| Método | Ruta | Descripción | Requiere token |
|--------|------|-------------|----------------|
| POST | /auth/register | Registra un usuario | No |
| POST | /auth/login | Inicia sesión a un usuario | No |
| GET | /turnos | Lista todos los turnos | No |
| GET | /turnos/:id | Obtiene un turno por id | No |
| POST | /turnos | Crea un turno nuevo | Sí |
| PUT | /turnos/:id | Actualiza un turno por id | Sí |
| DELETE | /turnos/:id | Elimina un turno por id | Sí |

## Códigos de respuesta
| Código | Cuándo ocurre |
|--------|---------------|
| 200 | La operación salió bien (listar, actualizar, borrar o iniciar sesión) |
| 201 | Se creó un turno nuevo o usuario nuevo |
| 400 | Faltan datos o el turno no cumple una regla (ej: fecha atrasada) |
| 401 | No mandaste el token, es inválido, o las credenciales del login son incorrectas |
| 404 | El turno no existe |
| 500 | Error interno del servidor |

### Ejemplos de body

**POST /auth/register**
```json
{
  "nombre": "Prueba",
  "email": "prueba@mail.com",
  "password": "1234"
}
```

**POST /auth/login**
```json
{
  "email": "prueba@mail.com",
  "password": "1234"
}
```

**POST /turnos** y **PUT /turnos/:id**
```json
{
  "paciente": "Juan Pérez",
  "especialidad": "Cardiología",
  "fecha": "2026-12-15T10:00:00"
}
```

## Cómo probar

1. Registrate con `POST /auth/register`.
2. Iniciá sesión con `POST /auth/login`. La respuesta trae un token.
3. Para crear, modificar o eliminar turnos, agregá este header a la petición:
```
Authorization: Bearer <tu_token>
```
4. Las capturas de las pruebas están en la carpeta pruebas/.