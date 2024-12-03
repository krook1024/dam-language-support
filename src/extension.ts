import * as vscode from "vscode";

const descriptions: { [key: string]: string } = {
  ABL: "ABL: End of assignment.",
  BEA: "BEA: Author or creator of the file.",
  DAB: "DAB: Unknown.",
  DST: "DST: Configuration details.",
  EAD: "EAD: Some kind of address.",
  EPK: "EPK: A configuration parameter set.",
  EPR: "EPR: A reference to a specific environment or process.",
  FKT: "FKT: Folder structure related command.",
  FKX: "FKX: Function X-axis configuration.",
  FKY: "FKY: Function Y-axis configuration.",
  KNR: "KNR: Customer or client identification number.",
  MCK: "MCK: Unknown.",
  PBA: "PBA: Base address.",
  PNR: "PNR: Part number or version.",
  PRO: "PRO: Project configuration.",
  REG: "REG: Axis description definition.",
  REP: "REP: Repair or replacement indicator.",
  RFG: "RFG: Unknown.",
  SGB: "SGB: Unknown.",
  SND: "SND: Define memory area.",
  SPC: "SPC: Space or a specific configuration parameter.",
  SPW: "SPW: Weighting factor.",
  SPX: "SPX: X-axis configuration.",
  SPY: "SPY: Y-axis configuration.",
  SPZ: "SPZ: Begin map definition.",
  SRC: "SRC: Create axis definition.",
  TEL: "TEL: Telephone or contact information.",
  UMR: "UMR: Unknown.",
  UMV: "UMV: Unknown.",
  UP: "UP: Unknown.",
  UTB: "UTB: Unknown.",
  VAD: "VAD: A value address or specific identifier.",
  YNR: "YNR: Unknown.",
};

const channel = vscode.window.createOutputChannel(
  "dam-language-support",
  "dam",
);

export function activate(context: vscode.ExtensionContext) {
  const hoverProvider = vscode.languages.registerHoverProvider("dam", {
    provideHover(document, position, token) {
      const range = document.getWordRangeAtPosition(
        position,
        /(?:^|[\s/,])([A-Z]+)(?=,|\s|$)/i,
      );

      if (range) {
        const word = document.getText(range).replace("/", "");
        if (descriptions[word]) {
          return new vscode.Hover(descriptions[word]);
        }
      }

      return null;
    },
  });

  context.subscriptions.push(hoverProvider);
}
