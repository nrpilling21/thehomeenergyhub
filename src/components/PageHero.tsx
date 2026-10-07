import { Sunlight } from "@/components/Sunlight";

/* Everyday-style page header used by every guide, calculator and blog page:
   a stone panel with a small label at the top and the title and intro pinned
   to the bottom, next to a photo tile (or a code-drawn sunlight panel when a
   page has no photo yet). */
export function PageHero({
  eyebrow,
  title,
  children,
  image,
  imageAlt = "",
  mood,
  seed = 2,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  mood?: "amber" | "dusk" | "morning";
  seed?: number;
}) {
  const hasMedia = Boolean(image || mood);
  return (
    <section className="px-2 pt-2">
      <div className={`grid gap-2 ${hasMedia ? "lg:grid-cols-[1.3fr_1fr]" : ""}`}>
        <div className="bg-cream-dark rounded-[6px] px-5 sm:px-10 pt-7 pb-9 sm:pb-12 flex flex-col justify-between gap-16 min-h-[320px] sm:min-h-[440px]">
          {eyebrow ? (
            <p className="text-[15px] font-medium tracking-[-0.02em] text-plum-muted">{eyebrow}</p>
          ) : (
            <span />
          )}
          <div>
            <h1 className="!text-[2.25rem] sm:!text-[2.75rem] !leading-[1.08] max-w-3xl mb-5">{title}</h1>
            {children ? (
              <div className="text-[1.125rem] sm:text-[1.3rem] font-medium tracking-[-0.03em] leading-[1.3] text-plum-muted max-w-3xl [&_strong]:text-ink [&_strong]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4">
                {children}
              </div>
            ) : null}
          </div>
        </div>
        {image ? (
          <div className="relative overflow-hidden rounded-[6px] min-h-[260px] sm:min-h-[340px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
          </div>
        ) : mood ? (
          <div className="relative isolate overflow-hidden rounded-[6px] min-h-[260px] sm:min-h-[340px]">
            <Sunlight mood={mood} seed={seed} shade={false} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
