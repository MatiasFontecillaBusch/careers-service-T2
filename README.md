# Careers-Service

Este servicio forma parte del Taller 2 de Arquitectura de Sistemas.

## Requisitos Previos

- Node.js versión 22 o superior
- Base de datos SQLserver
- RabbitMQ

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/MatiasFontecillaBusch/careers-service-T2.git
   cd careers-service-T2$
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Variables de entorno:
   - Copia el archivo `.env.example` a `.env`:
     ```bash
     cp .env.example .env
     ```
   - Personaliza las variables si es necesario, NODE_ENV debe ser "production".


4. Ejecuta el comando para iniciar el servicio:
   ```bash
   npm start
   ``` 