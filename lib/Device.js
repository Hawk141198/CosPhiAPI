module.exports = class Device {
  constructor(name = '', values = {
    q: null, s: null, p: null, phi: null, cosPhi: null,
  }) {
    this.name = name;
    this.q = values.q;
    this.s = values.s;
    this.p = values.p;
    this.phi = values.phi;
    this.cosPhi = values.cosPhi;

    try {
      this.calcAllValues();
    } catch (e) { console.error(e); }
  }

  /**
   * Berechnet alle Werte des Device anhand der vorhandenen Werte.
   */
  calcAllValues() {
    if (this.p !== undefined && this.cosPhi !== undefined) {
      this.phi = this.calcPhi(this.cosPhi);
      this.q = this.calcQ(this.p, this.phi);
      this.s = this.calcS(this.q, this.p);
    } else if (this.s !== undefined && this.cosPhi !== undefined) {
      this.phi = this.calcPhi(this.cosPhi);
      this.p = this.calcP(this.s, this.phi);
      this.q = this.calcQ(this.p, this.phi);
    } else if (this.q !== undefined && this.cosPhi !== undefined) {
      if (this.cosPhi === 1) {
        throw new Error(`Das Gerät ist ${this.name} fehlerhaft! Der CosPhi kann nicht "1" sein, wenn die BLindLeistung nicht "0" ist.`);
      }

      this.phi = this.calcPhi(this.cosPhi);
      this.s = this.calcSPhi(this.q, this.phi);
      this.p = this.calcP(this.s, this.phi);
    } else if (this.q !== undefined && this.s !== undefined) {
      this.phi = Math.sin(this.q / this.s) * (180 / Math.PI);
      this.cosPhi = Math.abs(Math.cos(this.phi));
      this.p = this.calcP(this.s, this.phi);
    } else {
      throw new Error(`Das Gerät ${this.name} ist fehlerhaft! Es muss mindestens der cosPhi und einer der Werte von Wirkleistung (p), Scheinleistung (s) und Blindleistung (q) angegeben sein.`);
    }
  }

  /**
   * Berechnet die Stromstärke anhand der Scheinleistung.
   * @returns {Number} Stromstärke
   */
  calcI() {
    return this.s / 230;
  }

  /**
   * Berechnet den Betrag der Wirkleistung
   * @returns {Number} Wirkleistung
   */
  calcP() {
    return Math.abs(this.s * Math.cos(this.phi));
  }

  /**
   * Berechnet die Blindleistung
   * @returns {Number} Blindleistung
   */
  calcQ() {
    return this.p * Math.tan(this.phi);
  }

  /**
   * Berechnet die Scheinleistung
   * @returns {Number} Scheinleistung
   */
  calcS() {
    return Math.sqrt(this.q * this.q + this.p * this.p);
  }

  /**
   * Berechnet den Phasenverschiebungswinkel mit dem cosPhi Wert
   * @returns {Number} Phasenverschiebungswinkel phi
   */
  calcPhi() {
    return Math.acos(this.cosPhi) * (180 / Math.PI);
  }
};
