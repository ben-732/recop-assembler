export class DefinitionManager {
  public readonly definitions: Map<string, string> = new Map<string, string>();

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

  /**
   * Replace uses definitions with their values,
   *
   * !var -> #value
   * @var -> $value
   */
  public replaceDefinitions(line: string): string {
    return line
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
}
