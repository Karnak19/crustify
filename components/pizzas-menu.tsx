import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

export function PizzasMenu({
  sections,
}: {
  sections: {
    title: string;
    items: { name: string; description: string; price: number }[];
  }[];
}) {
  return (
    <Card className="max-w-[100ch] mx-auto my-20">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight md:text-4xl font-serif px-4 md:px-6 lg:px-8">
          Menu
        </CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 divide-x divide-border gap-y-6 md:gap-y-0">
        {sections.map((section) => (
          <PizzasMenuSection key={section.title} {...section} />
        ))}
      </CardContent>
    </Card>
  );

  function PizzasMenuSection({
    title,
    items,
  }: {
    title: string;
    items: { name: string; description: string; price: number }[];
  }) {
    return (
      <section className="px-4 md:px-6 lg:px-8">
        <h2 className="mb-6 text-xl font-bold tracking-tight md:text-2xl font-serif">
          {title}
        </h2>
        <div className="grid gap-6">
          {items.map((item) => (
            <div key={item.name}>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold font-serif">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground font-serif-secondary">
                    {item.description}
                  </p>
                </div>
                <span className="font-medium font-serif-secondary">
                  {item.price.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </span>
              </div>
              <Separator />
            </div>
          ))}
        </div>
      </section>
    );
  }
}
