import { Sunlight } from "@/components/Sunlight";

/* Everyday-style split layout for the calculator pages: a tall image tile
   carrying the page title on the left, the step-by-step calculator on a
   stone panel on the right. */
export function CalculatorShell({
  title,
  intro,
  points,
  image,
  imageAlt = "",
  mood = "amber",
  children,
}: {
  title: string;
  intro: string;
  points: string[];
  image?: string;
  imageAlt?: string;
  mood?: "amber" | "dusk" | "morning";
  children: React.ReactNode;
}) {
  return (
    <section className="px-2 pt-2">
      <div className="grid lg:grid-cols-[1fr_1.15fr] gap-2">
        <div className="relative isolate overflow-hidden rounded-[6px] min-h-[380px] lg:min-h-[680px] text-white flex flex-col justify-end">
          {image ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover -z-10" />
              <div className="absolute inset-0 -z-10 bg-black/45 lg:bg-transparent lg:bg-gradient-to-t lg:from-black/65 lg:via-black/10 lg:to-black/0" />
            </>
          ) : (
            <div className="absolute inset-0 -z-10">
              <Sunlight mood={mood} seed={3} />
            </div>
          )}
          <div className="p-5 sm:p-8">
            <p className="text-[15px] font-medium tracking-[-0.02em] text-white/75 mb-4">Free calculator</p>
            <h1 className="!text-[2.25rem] sm:!text-[2.75rem] !leading-[1.08] mb-4 max-w-md">{title}</h1>
            <p className="text-[1.125rem] font-medium tracking-[-0.03em] leading-[1.3] text-white/80 max-w-md mb-8">{intro}</p>
            <ol className="hidden sm:grid sm:grid-cols-3 gap-2">
              {points.map((pt, i) => (
                <li key={pt} className="bg-white/12 backdrop-blur-md rounded-[6px] p-3 text-[14px] font-medium tracking-[-0.02em] leading-snug">
                  <span className="w-6 h-6 rounded-full bg-white text-ink flex items-center justify-center text-[12px] mb-6">{i + 1}</span>
                  {pt}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="bg-cream-dark rounded-[6px] p-2 sm:p-6 lg:p-10 flex items-start justify-center">
          <div className="w-full max-w-xl bg-white rounded-[6px] sm:p-3">{children}</div>
        </div>
      </div>
    </section>
  );
}
