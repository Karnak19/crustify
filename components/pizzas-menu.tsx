export function PizzasMenu({
  sections,
}: {
  sections: {
    title: string;
    items: { name: string; description: string; price: number }[];
  }[];
}) {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl font-serif">
        Menu
      </h1>
      <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
        {sections.map((section) => (
          <PizzasMenuSection key={section.title} {...section} />
        ))}
      </div>
    </main>
  );

  function PizzasMenuSection({
    title,
    items,
  }: {
    title: string;
    items: { name: string; description: string; price: number }[];
  }) {
    return (
      <section>
        <h2 className="mb-6 text-xl font-bold tracking-tight md:text-2xl font-serif">
          {title}
        </h2>
        <div className="grid gap-6">
          {items.map((item) => (
            <div className="flex items-start gap-4" key={item.name}>
              <div className="flex-1">
                <h3 className="text-lg font-semibold font-serif">
                  {item.name}
                </h3>
                <p className="text-gray-500">{item.description}</p>
              </div>
              <span className="font-medium">
                {item.price.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                })}
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
