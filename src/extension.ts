import * as vscode from "vscode";

const descriptions: { [key: string]: string } = {
  ABL: "ABL: End of assignment.",
  BEA: "BEA: Author or creator of the file or settings.",
  DAB: "DAB: Data block allocation or a specific data address.",
  DST: "DST: Destination parameters or configuration details.",
  EAD: "EAD: An encoded address or identifier.",
  EPK: "EPK: A configuration parameter set.",
  EPR: "EPR: A reference to a specific environment or process.",
  FKT: "FKT: Folder structure related command.",
  FKX: "FKX: Function X-axis configuration.",
  FKY: "FKY: Function Y-axis configuration.",
  KNR: "KNR: Customer or client identification number.",
  MCK: "MCK: Measurement or control key settings.",
  PBA: "PBA: Physical block address or base address.",
  PNR: "PNR: Part number or a reference to a specific product.",
  PRO: "PRO: Project or process configuration.",
  REP: "REP: Repair or replacement indicator.",
  RFG: "RFG: Reference group or related flag.",
  SGB: "SGB: Unknown.",
  SND: "SND: Define memory area.",
  SPC: "SPC: Space or a specific configuration parameter.",
  SPW: "SPW: Weighting factor or configuration details.",
  SPX: "SPX: X-axis configuration or data.",
  SPY: "SPY: Y-axis configuration or data.",
  SPZ: "SPZ: Begin map definition.",
  SRC: "SRC: Source-related parameter or identifier.",
  TEL: "TEL: Telephone or contact information.",
  UMR: "UMR: Possibly usage or utilization metric.",
  UMV: "UMV: Voltage or measurement unit.",
  UP: "UP: Update or a specific setting identifier.",
  UTB: "UTB: Utility or test bench configuration.",
  VAD: "VAD: A value address or specific identifier.",
  YNR: "YNR: Yet another reference or identifier.",
};

export function activate(context: vscode.ExtensionContext) {
  const hoverProvider = vscode.languages.registerHoverProvider("dam", {
    provideHover(document, position, token) {
      const keys = Object.keys(descriptions).join("|");
      const re = new RegExp(String.raw`\b/(${keys})\b`);
      const range = document.getWordRangeAtPosition(position, re);

      if (range) {
        const word = document.getText(range);
        return new vscode.Hover(descriptions[word]);
      }

      return null;
    },
  });

  context.subscriptions.push(hoverProvider);
}
