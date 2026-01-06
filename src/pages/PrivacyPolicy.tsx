import { useI18n } from "@/contexts/I18nContext";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  const { t, language } = useI18n();

  const isTurkish = language === "tr";

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl"
          style={{ 
            background: "radial-gradient(circle, hsl(260, 60%, 65%, 0.4) 0%, transparent 70%)",
            animation: "gradientFloat 20s ease-in-out infinite"
          }}
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl mx-auto">
        {/* Back button */}
        <Link to="/">
          <Button variant="ghost" className="mb-6 glass-card border-border/50 hover:bg-secondary/50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isTurkish ? "Ana Sayfaya Dön" : "Back to Home"}
          </Button>
        </Link>

        {/* Content */}
        <div className="glass-card p-6 sm:p-8 lg:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {isTurkish ? "Gizlilik Politikası" : "Privacy Policy"}
          </h1>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-sm text-muted-foreground/80">
              {isTurkish 
                ? "Son güncelleme: " 
                : "Last updated: "}
              {new Date().toLocaleDateString(language === "tr" ? "tr-TR" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                {isTurkish ? "1. Veri Toplama" : "1. Data Collection"}
              </h2>
              <p>
                {isTurkish 
                  ? "Sleep Sounds uygulaması, uygulamanın iyileştirilmesi ve kullanıcı deneyiminin geliştirilmesi amacıyla aşağıdaki verileri toplamaktadır:"
                  : "The Sleep Sounds application collects the following data for the purpose of improving the app and enhancing user experience:"}
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  {isTurkish 
                    ? "Uygulama etkileşimleri (ses oynatma, durdurma, zamanlayıcı kullanımı)"
                    : "App interactions (sound playback, stopping, timer usage)"}
                </li>
                <li>
                  {isTurkish 
                    ? "Cihaz veya diğer kimlik bilgileri (analitik amaçlı)"
                    : "Device or other IDs (for analytics purposes)"}
                </li>
                <li>
                  {isTurkish 
                    ? "Reklam kimliği (AdMob reklamları için)"
                    : "Advertising ID (for AdMob advertisements)"}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                {isTurkish ? "2. Veri Kullanımı" : "2. Data Usage"}
              </h2>
              <p>
                {isTurkish 
                  ? "Toplanan veriler aşağıdaki amaçlar için kullanılmaktadır:"
                  : "The collected data is used for the following purposes:"}
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  {isTurkish 
                    ? "Uygulama performansını analiz etme ve hataları tespit etme"
                    : "Analyzing app performance and detecting errors"}
                </li>
                <li>
                  {isTurkish 
                    ? "Kullanıcı davranışlarını anlama ve özellik kullanımını iyileştirme"
                    : "Understanding user behavior and improving feature usage"}
                </li>
                <li>
                  {isTurkish 
                    ? "Kişiselleştirilmiş reklamlar gösterme (AdMob)"
                    : "Displaying personalized advertisements (AdMob)"}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                {isTurkish ? "3. Üçüncü Taraf Hizmetler" : "3. Third-Party Services"}
              </h2>
              <p>
                {isTurkish 
                  ? "Uygulama aşağıdaki üçüncü taraf hizmetleri kullanmaktadır:"
                  : "The application uses the following third-party services:"}
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Firebase Analytics:</strong>{" "}
                  {isTurkish 
                    ? "Google'ın analitik hizmeti. Veri toplama ve analiz için kullanılır."
                    : "Google's analytics service. Used for data collection and analysis."}
                </li>
                <li>
                  <strong>Google AdMob:</strong>{" "}
                  {isTurkish 
                    ? "Reklam gösterimi için kullanılır. Reklam kimliği ve cihaz bilgileri kullanılabilir."
                    : "Used for displaying advertisements. Advertising ID and device information may be used."}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                {isTurkish ? "4. Veri Güvenliği" : "4. Data Security"}
              </h2>
              <p>
                {isTurkish 
                  ? "Toplanan veriler, endüstri standardı güvenlik önlemleri kullanılarak korunmaktadır. Kişisel olarak tanımlanabilir bilgiler (PII) toplanmamaktadır."
                  : "The collected data is protected using industry-standard security measures. Personally identifiable information (PII) is not collected."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                {isTurkish ? "5. Kullanıcı Hakları" : "5. User Rights"}
              </h2>
              <p>
                {isTurkish 
                  ? "Kullanıcılar, veri toplamayı sınırlamak için cihaz ayarlarından reklam kimliğini sıfırlayabilir veya analitik veri toplamayı devre dışı bırakabilir."
                  : "Users can reset their advertising ID or disable analytics data collection from device settings to limit data collection."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                {isTurkish ? "6. İletişim" : "6. Contact"}
              </h2>
              <p>
                {isTurkish 
                  ? "Gizlilik politikası hakkında sorularınız için lütfen bizimle iletişime geçin:"
                  : "For questions about the privacy policy, please contact us:"}
              </p>
              <p className="mt-2">
                <strong>Email:</strong>{" "}
                <a 
                  href="mailto:contact@melihkochan.com" 
                  className="text-primary hover:underline"
                >
                  contact@melihkochan.com
                </a>
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a 
                  href="https://sleep-sounds.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://sleep-sounds.vercel.app
                </a>
              </p>
            </section>

            <section className="pt-4 border-t border-border/30">
              <p className="text-sm text-muted-foreground/70">
                {isTurkish 
                  ? "Bu gizlilik politikası, uygulamanın güncellenmesi durumunda değiştirilebilir. Önemli değişiklikler kullanıcılara bildirilecektir."
                  : "This privacy policy may be changed when the application is updated. Significant changes will be notified to users."}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

