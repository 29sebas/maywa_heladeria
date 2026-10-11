# MAYWA Heladería — sitio web para Visual Studio Code

Proyecto React + TypeScript + Vite con catálogo, búsqueda y filtros, carrito de consulta, configurador interactivo de cono, formulario para eventos, sedes, domicilios y accesos a WhatsApp.

## Ejecutar localmente

1. Abre esta carpeta completa (`maywa-vscode`) en Visual Studio Code.
2. Abre una terminal en esa carpeta. Debes ver `package.json` al ejecutar `Get-ChildItem` en PowerShell.
3. Instala las dependencias:

   ```powershell
   npm install
   ```

4. Inicia el servidor de desarrollo:

   ```powershell
   npm run dev
   ```

5. Abre la URL local que indique la terminal.

## Imágenes de MAYWA

Las fotografías/ilustraciones usadas en esta versión se extrajeron de las imágenes originales compartidas para el proyecto (capturas del catálogo y piezas gráficas de MAYWA). Las imágenes del catálogo se han recortado para reducir el contenido de la interfaz del teléfono y enfocarlas en el producto o en la pieza publicitaria original. Se optimizaron para mostrarse en la web, pero **el material fuente es una captura de pantalla y no contiene fotografías 4K reales**. La ampliación de una imagen pequeña no recupera detalle perdido; para obtener calidad 4K auténtica, reemplaza esos archivos por fotografías originales de producto en alta resolución que proporcione el negocio.

No se generaron fotografías de productos mediante IA ni se usaron productos genéricos de otras marcas.

## Datos comerciales

Los precios no confirmados se muestran como “Precio por confirmar”. Revisa horarios, disponibilidad de sabores, cobertura de domicilios y direcciones con MAYWA antes de publicar el sitio.

## Despliegue

Tras probarlo localmente, sube la carpeta del proyecto a un repositorio de GitHub y conéctalo con Vercel. No publiques secretos ni archivos `.env` si los añades en el futuro.
