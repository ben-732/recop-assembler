export class DefinitionManager {
  public readonly definitions: Map<string, string> = new Map();
  public readonly labels: Map<string, number> = new Map();

  constructor(private currentAddress = 0) {}

  newDefinition(line: string) {
    const parts = line.split(/\s+/).map((part) => part.trim());

    if (parts.length !== 3) {
      throw new Error(
        "Invalid definition format. Expected: :define <name> <value>"
      );
    }

    if (parts[0] !== ":define") {
      throw new Error(
        "Invalid definition format. Expected: :define <name> <value>"
      );
    }

    const name = parts[1].toUpperCase();
    const value = parts[2].toUpperCase();

    if (this.definitions.has(name)) {
      throw new Error(`Duplicate definition: ${name}`);
    }

    this.definitions.set(name, value);
  }

  newLabel(line: string) {
    const parts = line.split(/\s+/).map((part) => part.trim());

    if (parts.length !== 1) {
      throw new Error("Invalid label format. Expected: --<label>");
    }

    const name = parts[0].slice(2).toUpperCase();

    if (!name.match(/^[A-Z0-9_]+$/)) {
      throw new Error("Invalid characters in label name. Expected [A-Z0-9_]+");
    }

    if (this.labels.has(name)) {
      throw new Error(`Duplicate label: ${name}`);
    }

    this.labels.set(name, this.currentAddress);
  }

  public replaceLabels(line: string): string {
    const parts = line.split(/\s+/).map((part) => part.trim());

    if (parts.length === 0) {
      return line;
    }

    if (parts[0].toUpperCase() !== "JMP") {
      return line;
    }

    const label = parts[1].toUpperCase();

    if (this.labels.has(label)) {
      return line.replace(
        label,
        "#" + this.labels.get(label)?.toString(16).padStart(4, "0")
      );
    }

    throw new Error(`Undefined label: ${label}`);
  }

  /**
   * Replace uses definitions with their values,
   *
   * !var -> #value
   * @var -> $value
   */
  public replaceDefinitions(line: string): string {
    let l = line.trim();
    if (l.startsWith("JMP")) {
      l = this.replaceLabels(l);
    }

    return l
      .split(/\s+/)
      .map((part) => part.trim())
      .map((s) => this.replacePart(s))
      .join(" ");
  }

  private replacePart(part: string): string {
    const name = part.slice(1).toUpperCase();
    const symbol = part[0];

    if (symbol !== "@" && symbol !== "!") {
      return part;
    }

    const newSymbol = part[0] === "!" ? "#" : "$";

    if (this.definitions.has(name)) {
      return `${newSymbol}${this.definitions.get(name)}`;
    } else {
      throw new Error(`Undefined variable: ${name}`);
    }
  }

  nextLine() {
    return this.currentAddress++;
  }

  getAddress() {
    return this.currentAddress;
  }
}
