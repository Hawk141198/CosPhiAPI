# CosPhiAPI

Dies ist eine API/Libary/Code-Vorschlag um den für eine Veranstaltungstechnik App von Manuel Dannhauer. Das Ziel ist es den CosPhi (Phasenverschiebung/-swinkel), Strangleistung und Neutralleiterstrom von einem Stromanschluss bzw. Drehstromanschlusses zu berechnen. Dazu kann man die Schein-/Blind-/Wirkleistung und Stromstärke pro Strang (L1, L2, L3) errechnen. 


## Aufzählung Einheiten und Formelzeichen
* P - Leistung/Wirkleistung [W - Watt]
* I - Stromstärke [A - Ampere]
* U - Spannung [V - Volt]
* Q - Blindleistung [vAr - Volt-Ampere-Reactiv]
* S - Scheinleistung [VA - Volt-Ampere]

## Beschreibung der Zusammenhänge
Es gibt zwei Arten von Stromanschlüssen: Ein-Phasig (normaler Stromkreis) und Drehstrom (Starkstrom). Die Größe des Anschlusses wird Leistung (W) bemessen, diese bezieht sich auf eine Phase. Ein normaler Haushaltsüblicher Stromanschluss ist mit 16A abgesichert. Mit der Formel `P = U * I` kann man die Leistung dieses Stromanschlusses berechnen. In dem Fall `P = 230V * 16A = 3650W`, mit der dieser Stromkreis belastet werden kann. In einem Drehstromanschluss sind (vereinfacht dargestellt) drei Stromkreise enthalten, die drei Phasen L1, L2, L3. Diese Phasen sind ebenfalls mit einem Leistungsschutzschalter (Sicherung) abgesichert und können auf die selbe Art und Weise berechnet werden. D.h. ein 16A-Drehstromanschluss kann auf jeder Phase mit 3650 Watt belastet werden. Das Stromnetz in Deutschland ist ein Wechselstromnetz, d.h. die Stromrichtung wechselt sich 50 mal pro Sekunde. Dadurch entsteht eine Sinusförmiger Spannungsverlauf (https://www.amprion.net/Bilder/%C3%9Cbertragungsnetz/Physik-des-Stroms/Wechselstrom/amprion_Wechselstrom_dreiphasig_720x0.jpg).

Elektronische Endgeräte beeinflussen den Stromkreis in dem sie sich befinden. Diese Art der Beeinflussung passiert durch drei unterschiedliche Leistungen (Blind-, Schein-, Wirkleistung) in die sich die generelle Leistung aufteilt. Um die drei Leistungen zu verstehen hilft sehr gut folgendes Bild: https://blog.studyflix.de/wp-content/uploads/2019/10/Scheinleistung_Bier.png. Die Scheinleistung ist die Endleistung des Gerätes, so viel wie das Gerät im eingeschalteten Zustand an Leistung verbrauchen würde. Die Blindleistung gibt an wie viel Leistung durch z.B. elektronische Bauteile verbraucht wird. Die Wirkleistung gibt an, wie viel Leistung tatsächlich durch den Zweck des Gerätes verbraucht wird. Die drei Leistungen sind dafür Verantworlich, das sich der Stromkreis verändert, sobald das Gerät angeschlossen wird. Stellt man die drei Leistungen als Dreieck dar, Scheinleistung als Hypothenuse, Wirkleistung als Ankathete und Blindleistung als Gegenkathete (https://dewesoft.com/upload/news/daq/power-analysis/leistungsdreieck.svg), entsteht ein Winkel phi zwischen Scheinleistung und Wirkleistung. Dieser Winkel ist der Phasenverschiebungswinkel phi. Dieser gibt an, wie Stark sich die Phase (der Stromkreis in dem das Gerät ist) verschiebt. Dies hat Einfluss auf die Stromstärke des Neutralleiters, der bei einer ungünstigen Kombination der Phasenverschiebungswinkel der drei Phasen überlastet werden könnte.
Um dies zu berechnen, wird aus der Schein-/Blind- und Wirkleistung eines elektronischen Gerätes, der Winkel Phi errechnet. Mit diesem Winkel kann man den cos phi (auch oft als Powerfactor angegeben) errechnen. Mit diesen Werten lassen sich nun die Phasenverschiebung einer einzelnen Phase oder eines Drehstromanschlusses, also drei Phasen berechenen. Leider kann man nicht einfach alle cos phi Werte der Geräte auf einem Stromkreis addieren, stattdessen muss mann die Blind- und Wirkleistung addieren und erneut den Winkel phi bestimmen.

Die benötigte Leistung von elektronischen Endgeräten wird üblicherweise mit Watt angegeben, so hat z.B. eine 2kW Stufenlinse (ein typischer analoger Scheinwerfer) eine Leistungsaufnahme von 2000W. Zudiesem Wert ist im Datenblatt oft auch die Scheinleistung in Volt-Ampere (VA) angegeben. Im Datenblatt findet man oft nicht den cos Phi Wert, sondern eher den Powerfactor.

# Dokumentation

  Mit dieser Library ist es möglich die verschiedenen (für die Veranstaltungstechnik interressanten) Werte eines Gerätes, Schuko- oder Drehstromanschlusses zu brechnen.
  Dabei ist muss Gerät mindestens zwei Werte angegeben haben. Die Methode ``calcAllValues`` kann die restlichen Werte dann berechnen.
  ```javascript
  "Moving-Head":{
    q: 150, // Gegeben
    s: 150, // Gegeben
    phi: 48.21273601220948,
    cosphi: 0.4635080415293762,
    p: 69.52620622940643
  }
  ```
  Mit Hilfe der Methode ``getPhaseValues`` können die Werte eines Ein-Phasigenanschlusses, z.B. einer Schuko-Leitung, errechnet werden. Dabei gibt sie ein Objekt zurück welches die einzelnen Werte enthält. Z.B:

  ```javascript
  {
    p: 300,
    q: 0,
    s: 300,
    cosPhi: 1,
    phi: 0,
    i: 1.3043478260869565
  }
  ```

  Mit Hilfe der Methode ``getPowerSourceValues`` können die Werte eines Drehstromanschlusses errechnet werden. Dabei gibt sie ein Objekt zurück welches die einzelnen Werte enthält. Z.B:
  ```javascript
  {
    p_L1: 300,
    q_L1: 0,
    p_L2: 250,
    q_L2: 0,
    p_L3: 300,
    q_L3: 0,
    s_L1: 300,
    s_L2: 250,
    s_L3: 300,
    cosPhi_L1: 1,
    cosPhi_L2: 1,
    cosPhi_L3: 1,
    phi_L1: 0,
    phi_L2: 0,
    phi_L3: 0,
    i_L1: 1.3043478260869565,
    i_L2: 1.0869565217391304,
    i_L3: 1.3043478260869565,
    neutraLI: 0.21739130434782641
  }
  ```