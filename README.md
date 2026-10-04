# Aula Unix

Entorno de prácticas guiadas y exámenes de Unix, en español. Aplicación independiente de Regex Spellcaster.

## Aprender y practicar

- **Temas:** elige temas 1, 2, 4, 5 y 6; el recorrido incluye todos sus ejercicios, de básico a avanzado, con variantes aleatorias.
- **Conocimientos:** selecciona una o varias de las 18 habilidades; comienza por sus fundamentos y termina en los ejercicios avanzados.
- **Examen:** 20 familias de ejercicios distintas, elegidas aleatoriamente; guía, pistas y resolución disponibles y registradas.
- **Consola:** archivos, permisos, variables, alias, procesos y paquetes virtuales. Admite composiciones de órdenes y varias soluciones válidas.
- **Ayuda:** diccionario contextual con siglas, comportamiento, ejemplos y enlaces a manuales oficiales.
- **Informe PDF:** enunciados, órdenes del alumno, stdout, stderr, soluciones, cambios de estado y registro de ayudas. Incluye las preguntas pendientes.
- **Sesión:** nombre editable, cookie identificadora y progreso en localStorage del navegador; 3 sesiones anteriores recuperables y borrado explícito.

El banco incluye **117 ejercicios base × 48 variantes de datos = 5.616 identificadores**. Algunos enunciados fundamentales se mantienen entre variantes. El examen no repite una familia dentro de sus 20 preguntas. Las variantes vistas se evitan hasta agotar las disponibles de una familia.

## Ejecutar y verificar

Requiere Node.js 22 o posterior; se verifica con Node 24. No necesita instalar dependencias.

```bash
npm test
npm run build
npm run dev
```

Abre `http://localhost:4173/`. `dist/` contiene la aplicación estática completa. Funciona en rutas de proyecto como `/aula-unix/`, usando enlaces relativos. PDF-lib está incluido con su licencia MIT; no depende de una CDN.

GitHub Pages publica mediante `.github/workflows/pages.yml`. Configura **Settings → Pages → Source → GitHub Actions**. Las pruebas deben pasar antes de publicar.

## Arquitectura

| Archivo | Responsabilidad |
| --- | --- |
| `src/bank.js` | Familias, variantes deterministas, datos iniciales, soluciones y objetivos |
| `src/shell.js` | Analizador y motor de consola virtual |
| `src/worker.js` | Ejecución aislada con límites, sin bloquear la interfaz |
| `src/session.js` | Recorridos, persistencia, recuperación y progreso |
| `src/glossary.js` | Definiciones y referencias oficiales |
| `src/report.js` | PDF con ajuste de líneas y paginación |
| `src/app.js` | Interfaz y flujos de aprendizaje |
| `public/style.css` | Diseño adaptable y preferencias de accesibilidad |

## Añadir preguntas

Añade una definición `def(id,tema,conocimiento,nivel,título,build,página)` antes de exportar TEMPLATES en `src/bank.js`. `build` recibe datos de una variante y devuelve enunciado, soluciones y objetivo; opcionalmente `setup` modifica el estado inicial y `also` añade un segundo requisito. Una solución puede ser una orden o un array de órdenes para ejecuciones separadas.

Objetivos disponibles: salida, contenido, existencia, ausencia, permisos, máscara, directorio actual, variable, alias, eliminación de alias, actualización, paquete y proceso. Las rutas relativas de los objetivos se anclan en el directorio inicial, aunque el alumno cambie de directorio. `createExercise` ejecuta la referencia y rechaza soluciones fallidas. Las pruebas recorren todas las variantes y alternativas: una pregunta nueva debe pasar antes de publicarse.

## Alcance y límites

Es un **emulador didáctico**, no un Bash completo ni una máquina Unix real. Nunca ejecuta código del equipo, instala paquetes reales ni accede a una red desde la consola. El reloj UTC, procesos, disco y catálogo son simulados. `exec` y `exit` conservan la interfaz. `less` y `more` usan el panel desplazable. `od` muestra octales por byte; `du` suma contenido virtual. `cp` y `mv` trabajan con archivos individuales. `sed` y `awk` admiten las formas del banco, no todo su lenguaje. Los alias nuevos se pueden invocar tras `;` en esta simulación; Bash real requiere que se analicen después de la definición, normalmente en otra línea.

La consola tiene límites de orden (4.000 caracteres), anidación (10), expresión regular (160 caracteres), salida (60 kB), archivos (1.000), tamaño de estado (750 kB), tiempo de ejecución (1,5 s) y 400 órdenes por pregunta. Las ejecuciones con límite de tiempo conservan el estado anterior. Opciones no implementadas requieren una forma compatible del repertorio. Unicode fuera de WinAnsi se representa como código U+ en el PDF para evitar errores de exportación; los acentos españoles se conservan.

El modo examen es **de práctica**, con ayuda visible; no es una evaluación vigilada, no autentica al alumno y sus resultados locales se pueden modificar. No hay servidor de usuarios, sincronización ni envío de datos personales. Si el almacenamiento está bloqueado, se avisa; exporta antes de cerrar. Borrar elimina únicamente los datos de Aula Unix.

Los ejercicios se adaptan del material aportado de los temas 1, 2, 4, 5 y 6; la interfaz identifica documento y página. Se han corregido erratas sobre nombre de equipo frente a arquitectura, cabeceras de procesos, permisos del directorio padre, bloques de `find -size`, `cut -d:`, ordenación moderna `sort -k`, grupos y guiones de opciones. Los documentos originales no se publican en el repositorio.

## Diseño Signal

Interfaz oscura inspirada en la referencia visual aportada: tipografía de terminal, acentos ámbar, navegación horizontal y selección por filas. Fondo propio de partículas en Canvas 2D; sin React, Three.js ni servicios externos. La animación se puede pausar, recuerda la preferencia, respeta movimiento reducido y deja de ejecutarse en pestañas ocultas. La consola utiliza texto monoespaciado convencional para facilitar la lectura; los títulos usan VT323, incluida localmente con su licencia SIL OFL.

Referencias revisadas: [React Bits / Dither](https://github.com/DavidHDev/react-bits/tree/main/src/content/Backgrounds/Dither) para el tratamiento visual de ondas y puntos; [Google Fonts / VT323](https://github.com/google/fonts/tree/main/ofl/vt323) para la fuente. El código de la animación se ha escrito para esta aplicación, sin copiar el componente Dither.
