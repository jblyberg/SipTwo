export class Summary {
  private summary = '          ';
  private position: number;
  private POSITIONS = {
    hold: 0,
    overdue: 1,
    charged: 2,
    fine: 3,
    recall: 4,
    unavailable: 5,
    fee: 6,
  };

  constructor(type: string) {
    if (this.POSITIONS.hasOwnProperty(type)) {
      this.position = this.POSITIONS[type];
      this.summary = Summary.replaceAt(this.summary, this.position, 'Y');
    }
  }

  static replaceAt(target: string, index: number, replacement: string) {
    return target.slice(0, Math.max(0, index)) + replacement + target.slice(Math.max(0, index + 1));
  }

  public toString() {
    return this.summary;
  }
}
