import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { blogPostBySlug, blogPosts, getCategoryBadgeClass } from "../posts";
import AadhaarCardPhotoSizeContent from "../content/aadhaar-card-photo-size";
import HowToCompressPdfOnlineFreeContent from "../content/how-to-compress-pdf-online-free";
import ReduceImageSizeWithoutLosingQualityContent from "../content/reduce-image-size-without-losing-quality";
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
import HowToCalculatePercentageOfMarksIndiaContent from "../content/how-to-calculate-percentage-of-marks-india";
import HowToResizePhotoForGovernmentExamsContent from "../content/how-to-resize-photo-for-government-exams";
import WordCountForUpscEssayWritingContent from "../content/word-count-for-upsc-essay-writing";
import AgeCalculatorForGovernmentFormsIndiaContent from "../content/age-calculator-for-government-forms-india";
import BestFreeToolsForIndianStudentsContent from "../content/best-free-tools-for-indian-students";
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

const contentBySlug: Record<string, () => JSX.Element> = {
  "complete-pdf-tools-guide-india": CompletePdfToolsGuideIndiaContent,
  "complete-salary-tax-guide-india": CompleteSalaryTaxGuideIndiaContent,
  "complete-government-forms-guide-india":
    CompleteGovernmentFormsGuideIndiaContent,
  "complete-student-tools-guide-india": CompleteStudentToolsGuideIndiaContent,
  "complete-image-tools-guide-india": CompleteImageToolsGuideIndiaContent,
  "aadhaar-card-photo-size": AadhaarCardPhotoSizeContent,
  "how-to-compress-pdf-online-free": HowToCompressPdfOnlineFreeContent,
  "reduce-image-size-without-losing-quality":
    ReduceImageSizeWithoutLosingQualityContent,
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
  "how-to-calculate-percentage-of-marks-india":
    HowToCalculatePercentageOfMarksIndiaContent,
  "how-to-resize-photo-for-government-exams":
    HowToResizePhotoForGovernmentExamsContent,
  "word-count-for-upsc-essay-writing": WordCountForUpscEssayWritingContent,
  "age-calculator-for-government-forms-india":
    AgeCalculatorForGovernmentFormsIndiaContent,
  "best-free-tools-for-indian-students": BestFreeToolsForIndianStudentsContent,
  "how-to-make-passport-size-photo-at-home":
    HowToMakePassportSizePhotoAtHomeContent,
  "unit-conversion-guide-indian-students":
    UnitConversionGuideIndianStudentsContent,
  "how-to-split-pdf-extract-pages-india": HowToSplitPdfExtractPagesIndiaContent,
  "qr-code-for-college-events-india": QrCodeForCollegeEventsIndiaContent,
  "how-to-combine-images-into-pdf-india":
    HowToCombineImagesIntoPdfIndiaContent,
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
