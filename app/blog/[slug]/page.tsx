import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { blogPostBySlug, blogPosts, getCategoryBadgeClass } from "../posts";
import AadhaarCardPhotoSizeContent from "../content/aadhaar-card-photo-size";
import HowToCompressPdfOnlineFreeContent from "../content/how-to-compress-pdf-online-free";
import BestFreePdfToolsOnline2026Content from "../content/best-free-pdf-tools-online-2026";
import HowToSplitPdfPagesOnlineFree2026Content from "../content/how-to-split-pdf-pages-online-free-2026";
import ReduceImageSizeWithoutLosingQualityContent from "../content/reduce-image-size-without-losing-quality";
import HowToConvertHeicToJpgOnWindowsContent from "../content/how-to-convert-heic-to-jpg-on-windows";
import ConvertPdfToWordFreeContent from "../content/convert-pdf-to-word-free";
import PassportSizePhotoDimensionsIndiaContent from "../content/passport-size-photo-dimensions-india";
import HowToCompressPdfUnder1mbContent from "../content/how-to-compress-pdf-under-1mb";
import HowToMergePdfFilesFreeContent from "../content/how-to-merge-pdf-files-free";
import HowToRemoveBackgroundFromPhotoFreeContent from "../content/how-to-remove-background-from-photo-free";
import HowToUnlockPasswordProtectedPdfContent from "../content/how-to-unlock-password-protected-pdf";
import ResizePhotoForGovernmentFormsIndiaContent from "../content/resize-photo-for-government-forms-india";
import HowToCalculateInHandSalaryFromCtcContent from "../content/how-to-calculate-in-hand-salary-from-ctc";
import OldVsNewTaxRegimeIndia2025Content from "../content/old-vs-new-tax-regime-india-2025";
import HowToStartSipIndiaBeginnersGuideContent from "../content/how-to-start-sip-india-beginners-guide";
import NoticePeriodBuyoutIndiaGuideContent from "../content/notice-period-buyout-india-guide";
import HowToSaveIncomeTaxIndiaLegallyContent from "../content/how-to-save-income-tax-india-legally";
import HomeLoanEmiGuideIndiaContent from "../content/home-loan-emi-guide-india";
import GstForFreelancersIndiaContent from "../content/gst-for-freelancers-india";
import HowToReadSalarySlipIndiaContent from "../content/how-to-read-salary-slip-india";
import FdVsSipIndiaComparisonContent from "../content/fd-vs-sip-india-comparison";
import SalaryHikeNegotiationGuideIndiaContent from "../content/salary-hike-negotiation-guide-india";
import HowToMergePdfOnMobileIndiaContent from "../content/how-to-merge-pdf-on-mobile-india";
import HowToConvertWordToPdfFreeContent from "../content/how-to-convert-word-to-pdf-free";
import CompressImageUnder100kbIndiaContent from "../content/compress-image-under-100kb-india";
import PassportPhotoSizeRequirementsIndiaGuideContent from "../content/passport-photo-size-requirements-india-guide";
import HowToCreateDigitalSignatureIndiaContent from "../content/how-to-create-digital-signature-india";
import AadhaarPhotoSizeGuideContent from "../content/aadhaar-photo-size-guide";
import QrCodeForSmallBusinessIndiaContent from "../content/qr-code-for-small-business-india";
import RentReceiptForHraExemptionIndiaContent from "../content/rent-receipt-for-hra-exemption-india";
import CgpaToPercentageForJobApplicationsContent from "../content/cgpa-to-percentage-for-job-applications";
import HowToCreateStrongPasswordGuideContent from "../content/how-to-create-strong-password-guide";
import PassphraseGeneratorGuideContent from "../content/passphrase-generator-guide";
import HowToCalculatePercentageOfMarksIndiaContent from "../content/how-to-calculate-percentage-of-marks-india";
import HowToResizePhotoForGovernmentExamsContent from "../content/how-to-resize-photo-for-government-exams";
import WordCountForUpscEssayWritingContent from "../content/word-count-for-upsc-essay-writing";
import WordCounterOnlineGuideContent from "../content/word-counter-online-guide";
import AgeCalculatorForGovernmentFormsIndiaContent from "../content/age-calculator-for-government-forms-india";
import BestFreeToolsForIndianStudentsContent from "../content/best-free-tools-for-indian-students";
import BestFreeCalculatorsForStudents2026Content from "../content/best-free-calculators-for-students-2026";
import HowToMakePassportSizePhotoAtHomeContent from "../content/how-to-make-passport-size-photo-at-home";
import UnitConversionGuideIndianStudentsContent from "../content/unit-conversion-guide-indian-students";
import HowToSplitPdfExtractPagesIndiaContent from "../content/how-to-split-pdf-extract-pages-india";
import QrCodeForCollegeEventsIndiaContent from "../content/qr-code-for-college-events-india";
import HowToCombineImagesIntoPdfIndiaContent from "../content/how-to-combine-images-into-pdf-india";
import CompletePdfToolsGuideIndiaContent from "../content/complete-pdf-tools-guide-india";
import CompleteSalaryTaxGuideIndiaContent from "../content/complete-salary-tax-guide-india";
import CompleteGovernmentFormsGuideIndiaContent from "../content/complete-government-forms-guide-india";
import CompleteStudentToolsGuideIndiaContent from "../content/complete-student-tools-guide-india";
import CompleteImageToolsGuideIndiaContent from "../content/complete-image-tools-guide-india";
import CompleteDeveloperToolsGuideContent from "../content/complete-developer-tools-guide";
import HowToFormatJsonOnlineFreeContent from "../content/how-to-format-json-online-free";
import Base64EncodeDecodeGuideContent from "../content/base64-encode-decode-guide";
import Md5Sha256HashGeneratorGuideContent from "../content/md5-sha256-hash-generator-guide";
import HowToDecodeJwtTokenOnlineContent from "../content/how-to-decode-jwt-token-online";
import HowToTestRegexOnlineContent from "../content/how-to-test-regex-online";
import PomodoroTechniqueTimerGuideContent from "../content/pomodoro-technique-timer-guide";
import OnlineStopwatchGuideContent from "../content/online-stopwatch-guide";
import TimeZoneConverterGuideContent from "../content/time-zone-converter-guide";
import BmiCalculatorGuideContent from "../content/bmi-calculator-guide";
import CompoundInterestCalculatorGuideContent from "../content/compound-interest-calculator-guide";
import HowToConvertPdfToJpgOnlineFreeContent from "../content/how-to-convert-pdf-to-jpg-online-free";
import HowToConvertImageFormatsOnlineContent from "../content/how-to-convert-image-formats-online";
import HowToConvertWebpToJpgContent from "../content/how-to-convert-webp-to-jpg";
import HowToConvertExcelToPdfFreeContent from "../content/how-to-convert-excel-to-pdf-free";
import HowToConvertPptToPdfFreeContent from "../content/how-to-convert-ppt-to-pdf-free";
import EpfCalculatorGuideIndiaContent from "../content/epf-calculator-guide-india";
import GratuityCalculationFormulaIndiaContent from "../content/gratuity-calculation-formula-india";
import LtaExemptionRulesIndiaContent from "../content/lta-exemption-rules-india";
import HourlyToSalaryCalculatorGuideContent from "../content/hourly-to-salary-calculator-guide";
import InflationCalculatorMoneyValueGuideContent from "../content/inflation-calculator-money-value-guide";
import TipCalculatorGuideContent from "../content/tip-calculator-guide";
import DeveloperDataEncodingToolsGuideContent from "../content/developer-data-encoding-tools-guide";
import DesignToolsForDevelopersGuideContent from "../content/design-tools-for-developers-guide";
import WritingSeoToolsForContentCreatorsContent from "../content/writing-seo-tools-for-content-creators";
import UsefulTextUtilityToolsGuideContent from "../content/useful-text-utility-tools-guide";
import HowToRotatePdfPagesOnlineFreeContent from "../content/how-to-rotate-pdf-pages-online-free";
import HowToAddPageNumbersToPdfFreeContent from "../content/how-to-add-page-numbers-to-pdf-free";
import HowToAddWatermarkToPdfFreeContent from "../content/how-to-add-watermark-to-pdf-free";
import HowToCreateFaviconOnlineFreeContent from "../content/how-to-create-favicon-online-free";
import CalorieDeficitCalculatorGuideContent from "../content/calorie-deficit-calculator-guide";
import HowToFormatSqlOnlineFreeContent from "../content/how-to-format-sql-online-free";
import HowToConvertSvgToPngOnlineContent from "../content/how-to-convert-svg-to-png-online";
import HowToExtractColorPaletteFromImageContent from "../content/how-to-extract-color-palette-from-image";
import FreeTextToSpeechOnlineGuideContent from "../content/free-text-to-speech-online-guide";
import CheckDeviceBrowserInfoOnlineContent from "../content/check-device-browser-info-online";
import UuidGeneratorGuideContent from "../content/uuid-generator-guide";
import GpaCalculatorGuideContent from "../content/gpa-calculator-guide";
import DaysBetweenDatesCalculatorGuideContent from "../content/days-between-dates-calculator-guide";
import RomanNumeralConverterGuideContent from "../content/roman-numeral-converter-guide";
import LeapYearCheckerGuideContent from "../content/leap-year-checker-guide";
import USPaycheckCalculatorGuideContent from "../content/us-paycheck-calculator-guide";
import MortgageCalculatorGuideContent from "../content/mortgage-calculator-guide";
import BoxBreathingTechniqueGuideContent from "../content/box-breathing-technique-guide";
import CronExpressionGeneratorGuideContent from "../content/cron-expression-generator-guide";
import SubnetCalculatorGuideContent from "../content/subnet-calculator-guide";
import SvgCodePreviewerGuideContent from "../content/svg-code-previewer-guide";
import FreeOnlineAudioRecorderGuideContent from "../content/free-online-audio-recorder-guide";
import LoanEligibilityCalculatorGuideContent from "../content/loan-eligibility-calculator-guide";
import CssGradientGeneratorGuideContent from "../content/css-gradient-generator-guide";
import UnixTimestampConverterGuideContent from "../content/unix-timestamp-converter-guide";
import HowToConvertJsonToCsvOnlineFreeContent from "../content/how-to-convert-json-to-csv-online-free";
import HowToConvertWordToJpgOnlineFreeContent from "../content/how-to-convert-word-to-jpg-online-free";
import CurrencyConverterGuideContent from "../content/currency-converter-guide";
import CryptoPriceTrackerGuideContent from "../content/crypto-price-tracker-guide";
import DnsLookupToolGuideContent from "../content/dns-lookup-tool-guide";
import IpAddressLookupGuideContent from "../content/ip-address-lookup-guide";
import FdCalculatorGuideIndiaContent from "../content/fd-calculator-guide-india";
import HraExemptionCalculatorGuideContent from "../content/hra-exemption-calculator-guide";
import DiscountCalculatorGuideContent from "../content/discount-calculator-guide";
import RandomNumberGeneratorGuideContent from "../content/random-number-generator-guide";
import NewLabourCode2026SalaryGuideContent from "../content/new-labour-code-2026-salary-guide";
import Section44AdaFreelancerTaxGuideContent from "../content/section-44ada-freelancer-tax-guide";
import OldVsNewTaxRegimeComparison2026Content from "../content/old-vs-new-tax-regime-comparison-2026";
import PpfCalculatorGuideIndiaContent from "../content/ppf-calculator-guide-india";
import W2Vs1099TaxComparisonGuideContent from "../content/w2-vs-1099-tax-comparison-guide";
import SelfEmploymentTaxCalculatorGuideUsaContent from "../content/self-employment-tax-calculator-guide-usa";
import RobotsTxtGeneratorGuideContent from "../content/robots-txt-generator-guide";
import CapitalGainsTaxCalculatorIndiaGuideContent from "../content/capital-gains-tax-calculator-india-guide";
import RdCalculatorGuideIndiaContent from "../content/rd-calculator-guide-india";
import GlassmorphismCssGeneratorGuideContent from "../content/glassmorphism-css-generator-guide";
import HtaccessGeneratorGuideContent from "../content/htaccess-generator-guide";
import NpsCalculatorGuideIndiaContent from "../content/nps-calculator-guide-india";
import FourOhOneKCalculatorGuideUsaContent from "../content/401k-calculator-guide-usa";
import LeaveEncashmentCalculatorGuideIndiaContent from "../content/leave-encashment-calculator-guide-india";
import BoxShadowCssGeneratorGuideContent from "../content/box-shadow-css-generator-guide";
import CagrCalculatorGuideIndiaContent from "../content/cagr-calculator-guide-india";
import SukanyaSamriddhiYojanaCalculatorGuideContent from "../content/sukanya-samriddhi-yojana-calculator-guide";
import AdvanceTaxCalculatorGuideIndiaContent from "../content/advance-tax-calculator-guide-india";
import ColorPaletteGeneratorGuideContent from "../content/color-palette-generator-guide";

const contentBySlug: Record<string, () => JSX.Element> = {
  "complete-pdf-tools-guide-india": CompletePdfToolsGuideIndiaContent,
  "complete-salary-tax-guide-india": CompleteSalaryTaxGuideIndiaContent,
  "complete-government-forms-guide-india":
    CompleteGovernmentFormsGuideIndiaContent,
  "complete-student-tools-guide-india": CompleteStudentToolsGuideIndiaContent,
  "complete-image-tools-guide-india": CompleteImageToolsGuideIndiaContent,
  "complete-developer-tools-guide": CompleteDeveloperToolsGuideContent,
  "how-to-format-json-online-free": HowToFormatJsonOnlineFreeContent,
  "base64-encode-decode-guide": Base64EncodeDecodeGuideContent,
  "md5-sha256-hash-generator-guide": Md5Sha256HashGeneratorGuideContent,
  "how-to-decode-jwt-token-online": HowToDecodeJwtTokenOnlineContent,
  "how-to-test-regex-online": HowToTestRegexOnlineContent,
  "pomodoro-technique-timer-guide": PomodoroTechniqueTimerGuideContent,
  "online-stopwatch-guide": OnlineStopwatchGuideContent,
  "time-zone-converter-guide": TimeZoneConverterGuideContent,
  "bmi-calculator-guide": BmiCalculatorGuideContent,
  "compound-interest-calculator-guide": CompoundInterestCalculatorGuideContent,
  "how-to-convert-pdf-to-jpg-online-free": HowToConvertPdfToJpgOnlineFreeContent,
  "how-to-convert-image-formats-online": HowToConvertImageFormatsOnlineContent,
  "how-to-convert-webp-to-jpg": HowToConvertWebpToJpgContent,
  "how-to-convert-excel-to-pdf-free": HowToConvertExcelToPdfFreeContent,
  "how-to-convert-ppt-to-pdf-free": HowToConvertPptToPdfFreeContent,
  "aadhaar-card-photo-size": AadhaarCardPhotoSizeContent,
  "how-to-compress-pdf-online-free": HowToCompressPdfOnlineFreeContent,
  "best-free-pdf-tools-online-2026": BestFreePdfToolsOnline2026Content,
  "how-to-split-pdf-pages-online-free-2026":
    HowToSplitPdfPagesOnlineFree2026Content,
  "reduce-image-size-without-losing-quality":
    ReduceImageSizeWithoutLosingQualityContent,
  "how-to-convert-heic-to-jpg-on-windows":
    HowToConvertHeicToJpgOnWindowsContent,
  "convert-pdf-to-word-free": ConvertPdfToWordFreeContent,
  "passport-size-photo-dimensions-india":
    PassportSizePhotoDimensionsIndiaContent,
  "how-to-compress-pdf-under-1mb": HowToCompressPdfUnder1mbContent,
  "how-to-merge-pdf-files-free": HowToMergePdfFilesFreeContent,
  "how-to-remove-background-from-photo-free":
    HowToRemoveBackgroundFromPhotoFreeContent,
  "how-to-unlock-password-protected-pdf":
    HowToUnlockPasswordProtectedPdfContent,
  "resize-photo-for-government-forms-india":
    ResizePhotoForGovernmentFormsIndiaContent,
  "how-to-calculate-in-hand-salary-from-ctc":
    HowToCalculateInHandSalaryFromCtcContent,
  "old-vs-new-tax-regime-india-2025": OldVsNewTaxRegimeIndia2025Content,
  "how-to-start-sip-india-beginners-guide":
    HowToStartSipIndiaBeginnersGuideContent,
  "notice-period-buyout-india-guide": NoticePeriodBuyoutIndiaGuideContent,
  "how-to-save-income-tax-india-legally": HowToSaveIncomeTaxIndiaLegallyContent,
  "home-loan-emi-guide-india": HomeLoanEmiGuideIndiaContent,
  "gst-for-freelancers-india": GstForFreelancersIndiaContent,
  "how-to-read-salary-slip-india": HowToReadSalarySlipIndiaContent,
  "fd-vs-sip-india-comparison": FdVsSipIndiaComparisonContent,
  "salary-hike-negotiation-guide-india":
    SalaryHikeNegotiationGuideIndiaContent,
  "how-to-merge-pdf-on-mobile-india": HowToMergePdfOnMobileIndiaContent,
  "how-to-convert-word-to-pdf-free": HowToConvertWordToPdfFreeContent,
  "compress-image-under-100kb-india": CompressImageUnder100kbIndiaContent,
  "passport-photo-size-requirements-india-guide":
    PassportPhotoSizeRequirementsIndiaGuideContent,
  "how-to-create-digital-signature-india":
    HowToCreateDigitalSignatureIndiaContent,
  "aadhaar-photo-size-guide": AadhaarPhotoSizeGuideContent,
  "qr-code-for-small-business-india": QrCodeForSmallBusinessIndiaContent,
  "rent-receipt-for-hra-exemption-india":
    RentReceiptForHraExemptionIndiaContent,
  "cgpa-to-percentage-for-job-applications":
    CgpaToPercentageForJobApplicationsContent,
  "how-to-create-strong-password-guide":
    HowToCreateStrongPasswordGuideContent,
  "passphrase-generator-guide": PassphraseGeneratorGuideContent,
  "how-to-calculate-percentage-of-marks-india":
    HowToCalculatePercentageOfMarksIndiaContent,
  "how-to-resize-photo-for-government-exams":
    HowToResizePhotoForGovernmentExamsContent,
  "word-count-for-upsc-essay-writing": WordCountForUpscEssayWritingContent,
  "word-counter-online-guide": WordCounterOnlineGuideContent,
  "age-calculator-for-government-forms-india":
    AgeCalculatorForGovernmentFormsIndiaContent,
  "best-free-tools-for-indian-students": BestFreeToolsForIndianStudentsContent,
  "best-free-calculators-for-students-2026":
    BestFreeCalculatorsForStudents2026Content,
  "how-to-make-passport-size-photo-at-home":
    HowToMakePassportSizePhotoAtHomeContent,
  "unit-conversion-guide-indian-students":
    UnitConversionGuideIndianStudentsContent,
  "how-to-split-pdf-extract-pages-india": HowToSplitPdfExtractPagesIndiaContent,
  "qr-code-for-college-events-india": QrCodeForCollegeEventsIndiaContent,
  "how-to-combine-images-into-pdf-india":
    HowToCombineImagesIntoPdfIndiaContent,
  "epf-calculator-guide-india": EpfCalculatorGuideIndiaContent,
  "gratuity-calculation-formula-india": GratuityCalculationFormulaIndiaContent,
  "lta-exemption-rules-india": LtaExemptionRulesIndiaContent,
  "hourly-to-salary-calculator-guide": HourlyToSalaryCalculatorGuideContent,
  "inflation-calculator-money-value-guide":
    InflationCalculatorMoneyValueGuideContent,
  "tip-calculator-guide": TipCalculatorGuideContent,
  "developer-data-encoding-tools-guide": DeveloperDataEncodingToolsGuideContent,
  "design-tools-for-developers-guide": DesignToolsForDevelopersGuideContent,
  "writing-seo-tools-for-content-creators":
    WritingSeoToolsForContentCreatorsContent,
  "useful-text-utility-tools-guide": UsefulTextUtilityToolsGuideContent,
  "how-to-rotate-pdf-pages-online-free": HowToRotatePdfPagesOnlineFreeContent,
  "how-to-add-page-numbers-to-pdf-free": HowToAddPageNumbersToPdfFreeContent,
  "how-to-add-watermark-to-pdf-free": HowToAddWatermarkToPdfFreeContent,
  "how-to-create-favicon-online-free": HowToCreateFaviconOnlineFreeContent,
  "calorie-deficit-calculator-guide": CalorieDeficitCalculatorGuideContent,
  "how-to-format-sql-online-free": HowToFormatSqlOnlineFreeContent,
  "how-to-convert-svg-to-png-online": HowToConvertSvgToPngOnlineContent,
  "how-to-extract-color-palette-from-image": HowToExtractColorPaletteFromImageContent,
  "free-text-to-speech-online-guide": FreeTextToSpeechOnlineGuideContent,
  "check-device-browser-info-online": CheckDeviceBrowserInfoOnlineContent,
  "uuid-generator-guide": UuidGeneratorGuideContent,
  "gpa-calculator-guide": GpaCalculatorGuideContent,
  "days-between-dates-calculator-guide": DaysBetweenDatesCalculatorGuideContent,
  "roman-numeral-converter-guide": RomanNumeralConverterGuideContent,
  "leap-year-checker-guide": LeapYearCheckerGuideContent,
  "us-paycheck-calculator-guide": USPaycheckCalculatorGuideContent,
  "mortgage-calculator-guide": MortgageCalculatorGuideContent,
  "box-breathing-technique-guide": BoxBreathingTechniqueGuideContent,
  "cron-expression-generator-guide": CronExpressionGeneratorGuideContent,
  "subnet-calculator-guide": SubnetCalculatorGuideContent,
  "svg-code-previewer-guide": SvgCodePreviewerGuideContent,
  "free-online-audio-recorder-guide": FreeOnlineAudioRecorderGuideContent,
  "loan-eligibility-calculator-guide": LoanEligibilityCalculatorGuideContent,
  "css-gradient-generator-guide": CssGradientGeneratorGuideContent,
  "unix-timestamp-converter-guide": UnixTimestampConverterGuideContent,
  "how-to-convert-json-to-csv-online-free": HowToConvertJsonToCsvOnlineFreeContent,
  "how-to-convert-word-to-jpg-online-free": HowToConvertWordToJpgOnlineFreeContent,
  "currency-converter-guide": CurrencyConverterGuideContent,
  "crypto-price-tracker-guide": CryptoPriceTrackerGuideContent,
  "dns-lookup-tool-guide": DnsLookupToolGuideContent,
  "ip-address-lookup-guide": IpAddressLookupGuideContent,
  "fd-calculator-guide-india": FdCalculatorGuideIndiaContent,
  "hra-exemption-calculator-guide": HraExemptionCalculatorGuideContent,
  "discount-calculator-guide": DiscountCalculatorGuideContent,
  "random-number-generator-guide": RandomNumberGeneratorGuideContent,
  "new-labour-code-2026-salary-guide": NewLabourCode2026SalaryGuideContent,
  "section-44ada-freelancer-tax-guide": Section44AdaFreelancerTaxGuideContent,
  "old-vs-new-tax-regime-comparison-2026": OldVsNewTaxRegimeComparison2026Content,
  "ppf-calculator-guide-india": PpfCalculatorGuideIndiaContent,
  "w2-vs-1099-tax-comparison-guide": W2Vs1099TaxComparisonGuideContent,
  "self-employment-tax-calculator-guide-usa": SelfEmploymentTaxCalculatorGuideUsaContent,
  "robots-txt-generator-guide": RobotsTxtGeneratorGuideContent,
  "capital-gains-tax-calculator-india-guide": CapitalGainsTaxCalculatorIndiaGuideContent,
  "rd-calculator-guide-india": RdCalculatorGuideIndiaContent,
  "glassmorphism-css-generator-guide": GlassmorphismCssGeneratorGuideContent,
  "htaccess-generator-guide": HtaccessGeneratorGuideContent,
  "nps-calculator-guide-india": NpsCalculatorGuideIndiaContent,
  "401k-calculator-guide-usa": FourOhOneKCalculatorGuideUsaContent,
  "leave-encashment-calculator-guide-india": LeaveEncashmentCalculatorGuideIndiaContent,
  "box-shadow-css-generator-guide": BoxShadowCssGeneratorGuideContent,
  "cagr-calculator-guide-india": CagrCalculatorGuideIndiaContent,
  "sukanya-samriddhi-yojana-calculator-guide": SukanyaSamriddhiYojanaCalculatorGuideContent,
  "advance-tax-calculator-guide-india": AdvanceTaxCalculatorGuideIndiaContent,
  "color-palette-generator-guide": ColorPaletteGeneratorGuideContent,
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type Props = {
  params: { slug: string };
};

export default function BlogPostPage({ params }: Props) {
  const post = blogPostBySlug[params.slug];
  const Content = contentBySlug[params.slug];

  if (!post || !Content) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← All Guides
          </Link>

          <span
            className={`mt-8 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryBadgeClass(post.category)}`}
          >
            {post.category}
          </span>

          <h1 className="mb-4 mt-4 text-3xl font-bold leading-tight text-content-primary">
            {post.title}
          </h1>

          <p className="text-sm text-content-muted">
            {post.author} · {post.readTime} · Last updated {post.lastUpdated}
          </p>

          <hr className="my-8 border-surface-border" />

          <Content />

          <div className="mt-12 rounded-2xl border border-surface-border bg-surface-card p-6">
            <p className="mb-3 text-sm text-content-secondary">
              Ready to try it yourself?
            </p>
            <h3 className="mb-2 text-lg font-semibold text-content-primary">
              {post.cta.toolName} — Free & Private
            </h3>
            <p className="mb-4 text-sm text-content-secondary">
              No signup. No upload to server. Runs in your browser.
            </p>
            <Link
              href={post.cta.toolHref}
              className="inline-block rounded-xl bg-brand-blue px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600"
            >
              Try {post.cta.toolName} →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
