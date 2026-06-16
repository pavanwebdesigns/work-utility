function prettifyXML(xml: string): string {
  let formatted = "";
  let indent = "";
  const tab = "  ";

  xml.split(/>\s*</).forEach((node) => {
    if (node.match(/^\/\w/)) {
      indent = indent.substring(tab.length);
    }
    formatted += indent + "<" + node + ">\r\n";
    if (node.match(/^<?\w[^>]*[^/]$/) && !node.startsWith("?")) {
      indent += tab;
    }
  });

  return formatted.substring(1, formatted.length - 3);
}

export function formatXML(xml: string): string {
  if (typeof DOMParser === "undefined") {
    throw new Error("XML formatting requires a browser environment");
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");

  const errorNode = doc.querySelector("parsererror");
  if (errorNode) {
    throw new Error("Invalid XML: " + errorNode.textContent);
  }

  return prettifyXML(xml);
}

export function validateXML(xml: string): { valid: boolean; error?: string } {
  try {
    if (typeof DOMParser === "undefined") {
      return { valid: false, error: "XML validation requires a browser" };
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "application/xml");
    const errorNode = doc.querySelector("parsererror");
    if (errorNode) {
      return { valid: false, error: errorNode.textContent || "Invalid XML" };
    }
    return { valid: true };
  } catch (e) {
    return { valid: false, error: (e as Error).message };
  }
}

export function minifyXML(xml: string): string {
  return xml.replace(/>\s+</g, "><").trim();
}
