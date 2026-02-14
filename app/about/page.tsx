import Trust from "./_c/trust";
import Principles from "./_c/principles";
import Leadership from "./_c/leadership";
import CTA from "./_c/cta";

const page = () => {
  return (
    <main className="w-full overflow-x-hidden">
      <Trust />
      <Principles />
      <Leadership />
      <CTA />
    </main>
  );
};

export default page;