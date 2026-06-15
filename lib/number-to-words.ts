const ones = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const tens = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

function convertLessThanThousand(n: number): string {
  if (n === 0) return "";
  if (n < 20) return ones[n];
  if (n < 100)
    return (
      tens[Math.floor(n / 10)] + (n % 10 ? "-" + ones[n % 10] : "")
    );
  return (
    ones[Math.floor(n / 100)] +
    " hundred" +
    (n % 100 ? " " + convertLessThanThousand(n % 100) : "")
  );
}

export function numberToWords(num: number): string {
  if (num === 0) return "zero";
  if (num < 0) return "negative " + numberToWords(-num);

  let result = "";

  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const remainder = num % 1000;

  if (crore) result += convertLessThanThousand(crore) + " crore ";
  if (lakh) result += convertLessThanThousand(lakh) + " lakh ";
  if (thousand) result += convertLessThanThousand(thousand) + " thousand ";
  if (remainder) result += convertLessThanThousand(remainder);

  return result.trim();
}

export function numberToWordsInternational(num: number): string {
  if (num === 0) return "zero";
  if (num < 0) return "negative " + numberToWordsInternational(-num);

  let result = "";
  const billion = Math.floor(num / 1000000000);
  const million = Math.floor((num % 1000000000) / 1000000);
  const thousand = Math.floor((num % 1000000) / 1000);
  const remainder = num % 1000;

  if (billion) result += convertLessThanThousand(billion) + " billion ";
  if (million) result += convertLessThanThousand(million) + " million ";
  if (thousand) result += convertLessThanThousand(thousand) + " thousand ";
  if (remainder) result += convertLessThanThousand(remainder);

  return result.trim();
}

export function formatIndianNumber(num: number): string {
  const str = num.toString();
  const lastThree = str.slice(-3);
  const rest = str.slice(0, -3);
  if (rest === "") return lastThree;
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
}

export function formatInternationalNumber(num: number): string {
  return num.toLocaleString("en-US");
}
