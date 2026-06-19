export type SubnetResult = {
  ip: string;
  cidr: number;
  networkAddress: string;
  broadcastAddress: string;
  subnetMask: string;
  wildcardMask: string;
  totalHosts: number;
  usableHosts: number;
  firstUsable: string;
  lastUsable: string;
  networkBinary: string;
  maskBinary: string;
};

export type SubnetReferenceRow = {
  prefix: number;
  subnetMask: string;
  totalHosts: number;
  usableHosts: number;
};

export const SUBNET_REFERENCE_PREFIXES = [24, 25, 26, 27, 28, 30] as const;

function ipToInt(ip: string): number | null {
  const parts = ip.trim().split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => !Number.isInteger(p) || p < 0 || p > 255)) {
    return null;
  }
  return (
    ((parts[0] << 24) >>> 0) +
    ((parts[1] << 16) >>> 0) +
    ((parts[2] << 8) >>> 0) +
    (parts[3] >>> 0)
  );
}

function intToIp(value: number): string {
  return [
    (value >>> 24) & 255,
    (value >>> 16) & 255,
    (value >>> 8) & 255,
    value & 255,
  ].join(".");
}

function intToBinary(value: number): string {
  return [
    ((value >>> 24) & 255).toString(2).padStart(8, "0"),
    ((value >>> 16) & 255).toString(2).padStart(8, "0"),
    ((value >>> 8) & 255).toString(2).padStart(8, "0"),
    (value & 255).toString(2).padStart(8, "0"),
  ].join(".");
}

export function cidrToSubnetMask(cidr: number): string {
  if (cidr < 0 || cidr > 32) return "";
  if (cidr === 0) return "0.0.0.0";
  const mask = cidr === 32 ? 0xffffffff : (~0 << (32 - cidr)) >>> 0;
  return intToIp(mask);
}

export function subnetMaskToCidr(mask: string): number | null {
  const maskInt = ipToInt(mask);
  if (maskInt === null) return null;

  let seenZero = false;
  let cidr = 0;

  for (let i = 31; i >= 0; i -= 1) {
    const bit = (maskInt >> i) & 1;
    if (bit === 1) {
      if (seenZero) return null;
      cidr += 1;
    } else {
      seenZero = true;
    }
  }

  return cidr;
}

export function calculateSubnet(ip: string, cidr: number): SubnetResult | null {
  const ipInt = ipToInt(ip);
  if (ipInt === null || cidr < 0 || cidr > 32) return null;

  const maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  const wildcardInt = (~maskInt) >>> 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;

  const totalHosts = cidr === 32 ? 1 : Math.pow(2, 32 - cidr);
  const usableHosts =
    cidr >= 31 ? (cidr === 32 ? 1 : 2) : Math.max(0, totalHosts - 2);

  const firstUsable =
    cidr >= 31 ? intToIp(networkInt) : intToIp(networkInt + 1);
  const lastUsable =
    cidr >= 31 ? intToIp(broadcastInt) : intToIp(broadcastInt - 1);

  return {
    ip,
    cidr,
    networkAddress: intToIp(networkInt),
    broadcastAddress: intToIp(broadcastInt),
    subnetMask: intToIp(maskInt),
    wildcardMask: intToIp(wildcardInt),
    totalHosts,
    usableHosts,
    firstUsable,
    lastUsable,
    networkBinary: intToBinary(networkInt),
    maskBinary: intToBinary(maskInt),
  };
}

export function parseCidrInput(input: string): { ip: string; cidr: number } | null {
  const trimmed = input.trim();
  if (trimmed.includes("/")) {
    const [ip, prefix] = trimmed.split("/");
    const cidr = Number(prefix);
    if (!ip || !Number.isInteger(cidr)) return null;
    return { ip, cidr };
  }
  return null;
}

export function getSubnetReferenceRows(): SubnetReferenceRow[] {
  return SUBNET_REFERENCE_PREFIXES.map((prefix) => {
    const totalHosts = Math.pow(2, 32 - prefix);
    return {
      prefix,
      subnetMask: cidrToSubnetMask(prefix),
      totalHosts,
      usableHosts: totalHosts - 2,
    };
  });
}
