# Verificación de la primera versión

Fecha: 4 de octubre de 2026. Node.js 24 y herramientas GNU/Bash disponibles en el entorno de pruebas.

## Comprobaciones automáticas

- 117 familias × 48 variantes: **5.616 ejercicios construidos** sin identificadores duplicados ni soluciones de referencia fallidas.
- **8.112 ejecuciones de soluciones** de referencia y alternativas, todas aceptadas por su objetivo.
- **176 resoluciones contrastadas con Bash/GNU reales**, cubriendo lectura, conteo, grep, BRE/ERE, cut, sort, sed y awk. Son verificaciones independientes del motor de referencia virtual.
- Recorridos de los cinco temas y 18 conocimientos: cobertura completa de sus familias, inicio en nivel básico y progresión ordenada.
- 48 exámenes sucesivos: 20 familias distintas en cada examen y rechazo de variantes ya vistas mientras quedan alternativas disponibles.
- Rechazo de respuestas incorrectas, conservación de origen en copias, contenido compartido de enlaces duros, copias independientes y máscaras 600/700.
- Permisos de lectura, escritura y búsqueda, redirecciones antes de ejecutar, tuberías, grupos, sustituciones y errores de sintaxis.
- Guardado y recuperación de nombre, archivos, órdenes, ayudas y progreso; recuperación segura ante datos corruptos o almacenamiento bloqueado.
- PDF real: informes de 20 preguntas, de todas las familias, sin sesión y con salida larga. Lectura posterior con PDF-lib, extracción de texto y renderizado con PyMuPDF. Acentos españoles conservados; caracteres fuera de WinAnsi representados como U+.

## Comprobaciones en navegador

- Inicio por temas, ejercicio erróneo con diagnóstico, pista automática, solución correcta y avance.
- Recarga: nombre, paso, historial y objetivos recuperados.
- Guía contextual y modal de UID con enlace a documentación.
- Modo examen con 20 preguntas navegables y resolución accesible.
- Recorrido completo de orientación, de principio a fin: **4/4 objetivos**.
- Generación del informe desde el botón de la aplicación: modal y enlaces de descarga/lectura creados.
- Diseño de escritorio y marcos móviles de 320 y 390 px: sin desbordamiento horizontal del documento; sesión y preferencias accesibles.

El navegador remoto de pruebas no devolvió el evento de descarga del enlace Blob, por lo que no se pudo recuperar ese archivo mediante su API. La generación del PDF y sus bytes se verificaron por separado; el enlace usa el mecanismo estándar de descarga del navegador. Esta limitación de la prueba se conserva explícitamente, sin declarar una descarga recuperada que no se observó.

## Límites de la verificación

Estas pruebas cubren el repertorio implementado y las familias del banco. No certifican compatibilidad con todas las órdenes, opciones o extensiones de Bash/GNU, ni garantizan ausencia absoluta de errores. El alcance de la emulación se explica dentro de la aplicación y en README.md. El examen permite ayudas y no es una evaluación autenticada ni vigilada.

## Rediseño Signal (4 de octubre de 2026)

- 14 pruebas automáticas pasan, incluyendo pausa, movimiento reducido, pestaña oculta y liberación del ciclo de animación.
- Comprobación de escritorio: temas, conocimientos, consola con pwd, corrección por objetivo y generación del informe. Sin errores de la aplicación en la consola del navegador de pruebas.
- Guardado de la preferencia de pausa y recuperación de sesiones de la primera versión.
- Inicio y espacio de trabajo en marcos de 320 y 390 px: anchura de documento igual a la anchura disponible, sin desbordamiento horizontal. Se corrigió el tamaño mínimo implícito de la lista de preguntas en Grid.
- Fuente VT323 en WOFF servida localmente; licencia SIL OFL incluida. CSS y entrada de la aplicación con versión para actualizar la caché.
