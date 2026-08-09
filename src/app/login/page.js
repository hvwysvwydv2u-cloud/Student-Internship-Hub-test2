import { LoginForm } from "@/components/react-components";
import { StitchSection } from "@/components/stitch-loop";

export default function LoginPage() {
  return (
    <StitchSection>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2 text-[var(--foreground)]">مرحباً بك مجدداً</h2>
        <p className="text-[var(--text-secondary)]">سجل دخولك للوصول إلى طلبات التدريب والنتائج الخاصة بك.</p>
      </div>
      <LoginForm />
    </StitchSection>
  );
}
