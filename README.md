# CosPhiAPI

Dies ist eine API/Libary/Code-Vorschlag um den für eine Veranstaltungstechnik App von Manuel Dannhauer. Das Ziel ist es den CosPhi (Phasenverschiebung/-swinkel), Strangleistung und Neutralleiterstrom von einem Stromanschluss bzw. Drehstromanschlusses zu berechnen. Dazu kann man die Schein-/Blind-/Wirkleistung und Stromstärke pro Strang (L1, L2, L3) errechnen.

# Dokumentation

  Mit dieser "API" ist es möglich die verschiedenen (für die Veranstaltungstechnik interressanten) Werte eines Gerätes, Ein-Phasigenanschlusses oder Drehtstromanschlusses zu brechnen.
  Dabei ist muss Gerät mindestens zwei Werte angegeben haben. Die Methode ``calcValues`` kann die restlichen Werte dann berechnen.
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
## Funktionen

<dl>
  <dt><a href="#calcCosPhi">calcCosPhi(p, s)</a> ⇒ <code>number</code></dt>
  <dd><p>Berechnet den cosPhi mit den angegebenen werten.</p></dd>
  <dt><a href="#calcP">calcP(s, phi)</a> ⇒ <code>number</code></dt>
  <dd><p>Berechnet den Betrag der Wirkleistung</p></dd>
  <dt><a href="#calcQ">calcQ(p, phi)</a> ⇒ <code>number</code></dt>
  <dd><p>Berechnet die Blindleistung</p></dd>
  <dt><a href="#calcS">calcS(q, p)</a> ⇒ <code>number</code></dt>
  <dd><p>Berechnet die Scheinleistung</p></dd>
  <dt><a href="#calcSPhi">calcSPhi(q, phi)</a> ⇒ <code>number</code></dt>
  <dd><p>Alternativmethode um die Scheinleistung zu berechnen.</p></dd>
  <dt><a href="#calcI">calcI(s)</a> ⇒ <code>number</code></dt>
  <dd><p>Berechnet die Stromstärke anhand der Scheinleistung.</p></dd>
  <dt><a href="#calcPhi">calcPhi(cosPhi)</a> ⇒ <code>number</code></dt>
  <dd><p>Berechnet den Phasenverschiebungswinkel mit dem cosPhi Wert</p></dd>
  <dt><a href="#calcAllValues">calcAllValues(device)</a></dt>
  <dd><p>Berechnet alle Werte eines Device-Objektes anhand der vorhandenen Werte.</p></dd>
  <dt><a href="#getPowerSourceValues">getPowerSourceValues(deviceDistribution)</a></dt>
  <dd><p>Gibt die Leistungswerte einens fiktiven Drehtstromanschlusses zurück. Darunter zählen die Strangleistung (Wirk-,Blind-,Scheinleistung), der cosPhi pro Phase und der Neutralleiterstrom.</p></dd>
  <dt><a href="#getPhaseValues">getPhaseValues(deviceDistributionSinglePhase)</a> ⇒ <code>Object</code></dt>
  <dd><p>Gibt die Leistungswerte einens fiktiven Stromanschlusses zurück. Darunter zählen die Leistungen (Wirk-,Blind-,Scheinleistung) und der cosPhi.</p></dd>
</dl>

<a name="calcCosPhi"></a>

## calcCosPhi(p, s) ⇒ <code>number</code>
Berechnet den cosPhi mit den angegebenen werten.

**Kind**: global function
**Returns**: <code>number</code> - cosPhi 0 <= cosPhi <= 1

| Param | Type | Description |
| --- | --- | --- |
| p | <code>number</code> | Wirkleistung |
| s | <code>number</code> | Scheinleistung |

<a name="calcP"></a>

## calcP(s, phi) ⇒ <code>number</code>
Berechnet den Betrag der Wirkleistung

**Kind**: global function
**Returns**: <code>number</code> - Wirkleistung

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | Scheinleistung |
| phi | <code>number</code> | Phasenverschiebungswinkel Phi 0 <= phi <= 90 |

<a name="calcQ"></a>

## calcQ(p, phi) ⇒ <code>number</code>
Berechnet die Blindleistung

**Kind**: global function
**Returns**: <code>number</code> - Blindleistung

| Param | Type | Description |
| --- | --- | --- |
| p | <code>number</code> | Wirkleistung |
| phi | <code>number</code> | Phasenverschiebungswinkel Phi 0 <= phi <= 90 |

<a name="calcS"></a>

## calcS(q, p) ⇒ <code>number</code>
Berechnet die Scheinleistung

**Kind**: global function
**Returns**: <code>number</code> - Scheinleistung

| Param | Type | Description |
| --- | --- | --- |
| q | <code>number</code> | Blindleistung |
| p | <code>number</code> | Wirkleistung |

<a name="calcSPhi"></a>

## calcSPhi(q, phi) ⇒ <code>number</code>
Alternativmethode um die Scheinleistung zu berechnen.

**Kind**: global function
**Returns**: <code>number</code> - Scheinleistung

| Param | Type | Description |
| --- | --- | --- |
| q | <code>number</code> | Blindleistung |
| phi | <code>number</code> | Phasenverschiebungswinkel Phi 0 <= phi <= 90 |

<a name="calcI"></a>

## calcI(s) ⇒ <code>number</code>
Berechnet die Stromstärke anhand der Scheinleistung.

**Kind**: global function
**Returns**: <code>number</code> - Stromstärke

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | Scheinleistung |

<a name="calcPhi"></a>

## calcPhi(cosPhi) ⇒ <code>number</code>
Berechnet den Phasenverschiebungswinkel mit dem cosPhi Wert

**Kind**: global function
**Returns**: <code>number</code> - Phasenverschiebungswinkel phi

| Param | Type | Description |
| --- | --- | --- |
| cosPhi | <code>number</code> | cosPhi - 0 <= cosPhi <= 1 |

<a name="calcAllValues"></a>

## calcAllValues(device)
Berechnet alle Werte eines Device-Objektes anhand der vorhandenen Werte.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| device | <code>device</code> | Device-Objekt mit mindestens der cosPhi Angabe und einer der Werte von Wirkleistung (p), Scheinleistung (s) und Blindleistung (q). |

<a name="getPowerSourceValues"></a>

## getPowerSourceValues(deviceDistribution)
Gibt die Leistungswerte einens fiktiven Drehtstromanschlusses zurück. Darunter zählen die Strangleistung (Wirk-,Blind-,Scheinleistung), der cosPhi pro Phase und der Neutralleiterstrom.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| deviceDistribution | <code>Object</code> | Verteilung der Geräte auf den Phasen im Format: {L1: [.. , ..], L2: [.. , ..], L3: [.. , ..]} |

<a name="getPhaseValues"></a>

## getPhaseValues(deviceDistributionSinglePhase) ⇒ <code>Object</code>
Gibt die Leistungswerte einens fiktiven Stromanschlusses zurück. Darunter zählen die Leistungen (Wirk-,Blind-,Scheinleistung) und der cosPhi.

**Kind**: global function
**Returns**: <code>Object</code> - {p: X, q: X, s: X, cosPhi: X, i: X}

| Param | Type | Description |
| --- | --- | --- |
| deviceDistributionSinglePhase | <code>Object</code> | Eine Liste der Geräte die auf dieser Phase sind. |