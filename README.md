# CtrlC-CtrlV_UserStories_Gesti-_de_Receptes

url: https://github.com/marfontas/CtrlC-CtrlV_UserStories_Gesti-_de_Receptes.git 

## Prompt 1 + errors pamtalla en blanc: Estructura inicial de l’app
Vull crear una aplicació React anomenada "Gestió de Receptes". 
Fes una primera versió funcional en un sol component App.jsx, amb una interfície principal clara.

Requisits inicials:
- Mostrar un títol "Gestió de Receptes".
- Mostrar una llista de receptes d'exemple.
- Cada recepta ha de tenir: nom, ingredients i passos.
- La interfície ha de ser senzilla, neta i en català.
- Utilitza estat de React amb useState.
- No facis servir backend ni base de dades encara.
- Mantén el codi fàcil d'entendre per a estudiants.

## Promt 2: Afegir receptes
Ara afegeix la funcionalitat US-01: afegir noves receptes.

Requisits:
- A la interfície principal hi ha d'haver un formulari per crear una recepta nova.
- El formulari ha de demanar:
  - Nom de la recepta
  - Ingredients
  - Passos
- En enviar el formulari, la recepta s'ha d'afegir a la llista.
- Mostra un missatge de confirmació després d'afegir-la, per exemple: "Recepta afegida correctament".
- Valida que el nom no estigui buit.
- Després d'afegir una recepta, neteja els camps del formulari.
- Mantén tot en React amb useState.

## Prompt 3: Guardar dades amb localStorage
- Ara afegeix persistència de dades amb localStorage.

Requisits:
- Les receptes s'han de guardar a localStorage cada vegada que canvien.
- Quan l'usuari torni a obrir l'aplicació, s'han de carregar les receptes guardades.
- Si no hi ha dades guardades, mostra unes receptes d'exemple.
- Utilitza useEffect per carregar i guardar les dades.
- No utilitzis backend.

## Prompt 4: Cercar receptes per nom o ingredient
- Ara implementa la user story US-02: cercar receptes per nom o ingredient.

Requisits:
- Afegeix una barra de cerca visible a la interfície principal.
- L'usuari ha de poder escriure un text i filtrar receptes.
- La cerca ha de funcionar tant pel nom de la recepta com pels ingredients.
- La cerca no ha de distingir entre majúscules i minúscules.
- Si no hi ha resultats, mostra el missatge "No s'han trobat receptes".
- Afegeix un botó "Netejar cerca" per tornar a veure totes les receptes.
- Mostra un petit missatge de confirmació quan es netegi la cerca.

## Prompt 5: Editar receptes
- Ara implementa la user story US-03: editar receptes existents.

Requisits:
- Cada recepta de la llista ha de tenir un botó "Editar".
- Quan l'usuari prem "Editar", les dades de la recepta han d'aparèixer al formulari.
- El formulari ha de canviar a mode edició.
- El botó principal ha de dir "Guardar canvis" en lloc de "Afegir recepta".
- Quan es guarden els canvis, la recepta s'ha d'actualitzar a la llista.
- Mostra un missatge de confirmació: "Recepta actualitzada correctament".
- Afegeix un botó "Cancel·lar edició" per sortir del mode edició sense modificar res.
- Les dades modificades també s'han de guardar a localStorage.

## Prompt 6: Eliminar receptes
- Ara implementa la user story US-04: eliminar receptes.

Requisits:
- Cada recepta ha de tenir un botó "Eliminar".
- Abans d'eliminar, demana confirmació a l'usuari amb window.confirm.
- Si l'usuari confirma, elimina la recepta de la llista.
- Mostra el missatge "Recepta eliminada correctament".
- Les dades actualitzades s'han de guardar a localStorage.
- Si l'usuari cancel·la, no facis cap canvi.

## Prompt 7: Funció de desfer acció
- Ara afegeix una funcionalitat de desfer l'última acció.

Requisits:
- L'usuari ha de poder desfer l'última acció important.
- Les accions que es poden desfer són:
  - Afegir una recepta
  - Editar una recepta
  - Eliminar una recepta
- Guarda l'estat anterior de la llista de receptes abans de fer cada canvi.
- Mostra un botó "Desfer última acció" només quan hi hagi una acció que es pugui desfer.
- Quan l'usuari desfà, restaura la llista anterior.
- Mostra el missatge "Acció desfeta correctament".
- Assegura't que localStorage també quedi actualitzat després de desfer.

## Promt 8: Millorar interfície i usabilitat
- Millora la interfície visual de l'aplicació sense canviar les funcionalitats.

Objectius:
- Disseny més clar i agradable.
- Formulari i llista ben separats.
- Botons amb estils diferents segons l'acció:
  - Afegir o guardar
  - Editar
  - Eliminar
  - Cancel·lar
  - Desfer
- Missatges de confirmació visibles però no molestos.
- Disseny responsive perquè es vegi bé en pantalla petita.
- Mantén el CSS en App.css o index.css.
- No afegeixis llibreries externes.

## Prompt 9: Revisió final de requisits
- Revisa tota l'aplicació React i comprova que compleixi aquests requisits funcionals:

US-01:
- Afegir receptes amb nom, ingredients i passos.
- Confirmació després d'afegir.
- Dades guardades correctament.

US-02:
- Cercar receptes per nom o ingredient.
- Netejar cerca.
- Missatge si no hi ha resultats.

US-03:
- Editar receptes existents.
- Cancel·lar edició.
- Confirmació després d'editar.
- Persistència amb localStorage.

US-04:
- Eliminar receptes.
- Confirmació abans d'eliminar.
- Confirmació després d'eliminar.
- Persistència amb localStorage.

Criteris generals:
- Tot ha d'estar disponible a la interfície principal.
- L'usuari ha de poder desfer accions importants.
- El sistema ha de mostrar feedback després de cada acció.
- El codi ha de ser clar i sense funcionalitats innecessàries.

Si falta alguna cosa, modifica el codi per corregir-ho.

## Reflexió sobre l'ús de Copilot:
L’ús de GitHub Copilot ha estat molt útil per accelerar el desenvolupament de l’aplicació. L’eina ha ajudat especialment en la creació de l’estructura inicial del projecte React, la gestió de l’estat amb useState, la persistència amb localStorage i la implementació de funcionalitats repetitives com afegir, editar o eliminar receptes.

Un dels avantatges principals ha estat poder treballar de manera iterativa. En lloc de demanar tota l’aplicació en un únic prompt, s’han anat introduint instruccions concretes per a cada user story. Això ha facilitat detectar errors, revisar el comportament de cada funcionalitat i mantenir un desenvolupament més ordenat.

Tot i això, Copilot no ha substituït la feina del programador. Ha estat necessari revisar manualment el codi generat per assegurar que complia tots els criteris d’acceptació. Per exemple, algunes funcionalitats com els missatges de confirmació, l’opció de desfer accions o la persistència de les dades havien de ser indicades de manera molt explícita perquè quedessin ben implementades.

També ha estat important comprovar que la interfície fos clara i que totes les accions principals estiguessin disponibles des de la pantalla principal. Copilot pot generar codi funcional, però cal revisar si realment compleix les necessitats de l’usuari i si l’experiència d’ús és coherent.

En conclusió, GitHub Copilot ha estat una eina molt útil per desenvolupar més ràpidament, però el resultat final depèn de la qualitat dels prompts i de la revisió crítica del codi generat. L’eina ajuda molt, però no elimina la necessitat d’entendre què fa el programa ni de comprovar que els requisits s’han implementat correctament.
