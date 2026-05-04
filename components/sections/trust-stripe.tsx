const STRIPE_ITEMS = [
  { roman: "i.", label: "500+ zufriedene Patienten" },
  { roman: "ii.", label: "5,0★ Google Reviews*" },
  { roman: "iii.", label: "Deutsches Konzept" },
  { roman: "iv.", label: "Garantierte Nachsorge in DE" },
];

export function TrustStripe() {
  return (
    <section className="py-8 border-y border-[color:var(--border)]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 md:gap-y-0">
          {STRIPE_ITEMS.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-3 text-[color:var(--text-primary)]"
            >
              <span className="roman text-xl flex-shrink-0">{item.roman}</span>
              <span className="text-sm leading-snug">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
