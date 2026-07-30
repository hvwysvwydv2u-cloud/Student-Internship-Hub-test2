import { LoginForm } from "@/components/react-components";
import { StitchSection } from "@/components/stitch-loop";

export default function LoginPage() {
  return (
    <StitchSection>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black mb-4">مرحباً بك مجدداً</h2>
        <p className="text-white/40">سجل دخولك للوصول إلى طلبات التدريب والنتائج الخاصة بك.</p>
      </div>
      <LoginForm />
    </StitchSection>
  );
}
