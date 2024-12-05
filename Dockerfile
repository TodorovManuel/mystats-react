# Etapa 1: Construcción y pruebas (test)
FROM node:16-alpine AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración (package.json, package-lock.json)
COPY package*.json ./

# Instalar las dependencias de desarrollo y producción
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Ejecutar los tests
RUN npm run test -- --watchAll=false --ci --reporters=default --passWithNoTests

# Etapa 2: Construcción de la aplicación React
FROM node:16-alpine AS production

# Establecer el directorio de trabajo para la producción
WORKDIR /app

# Copiar los archivos de configuración
COPY package*.json ./

# Instalar solo las dependencias de producción
RUN npm install --only=production

# Copiar la aplicación construida desde la etapa anterior
COPY --from=build /app/build /app/build

# Exponer el puerto 3000 (puerto por defecto de React)
EXPOSE 3000

# Comando para iniciar la aplicación en producción
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
