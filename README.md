# CosPhiAPI

Dies ist eine API/Libary/Code-Vorschlag um den für eine Veranstaltungstechnik App von Manuel Dannhauer. Das Ziel ist es den CosPhi (Phasenverschiebung/-swinkel), Strangleistung und Neutralleiterstrom von einem Stromanschluss bzw. Drehstromanschlusses zu berechnen. Dazu kann man die Schein-/Blind-/Wirkleistung und Stromstärke pro Strang (L1, L2, L3) errechnen.

# Dokumentation
[Dokumentation der Methoden](out/index.html)

  Mit dieser "API" ist es möglich die verschiedenen (für die Veranstaltungstechnik interressanten) Werte eines Gerätes, Ein-Phasigenanschlusses oder Drehtstromanschlusses zu brechnen.
  Dabei ist muss Gerät z.B. ```javascript "Moving-Head":{p: 150, cosPhi: 1}´´´ mindestens zwei Werte angegeben haben. Die Methode ``calcValues´´ kann die restlichen Werte dann berechnen.


ToDo:
- [x] API für drumherum bauen
  - [x] Nur den cosPhi von einem Gerät
  - [x] cosPhi von Phase
  - [x] Stromstärke von Phase
  - [x] NeutraLLeiterstrom
- [x] Dokumentation dazu und Kommentare
- [x] Methodennamen anpassen