export default function PageHeader({
  title,
  intro,
  eyebrow,
}: {
  title: string;
  intro?: string;
  eyebrow?: string;
}) {
  return (
    <section className="px-5 pt-32 pb-14 sm:px-6 md:px-12 md:pt-44">
      <div className="mx-auto max-w-[1280px]">
        {eyebrow && (
          <span className="block text-[0.82rem] text-leaf">{eyebrow}</span>
        )}
        <h1 className="mt-3 max-w-[18ch] text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02]">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-[56ch] text-[1.08rem] leading-relaxed text-stone">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}