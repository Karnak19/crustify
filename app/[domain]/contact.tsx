import { env } from "@/env";
import { MapPinned, Phone } from "lucide-react";

export function Contact({
  name,
  street_address,
  zip_code,
  city,
  phone,
}: {
  name: string;
  street_address: string | null;
  zip_code: string | null;
  city: string | null;
  phone: string | null;
}) {
  const fullAddress =
    street_address && zip_code && city
      ? `${street_address}, ${zip_code} ${city}`
      : "1234 Elm St, Springfield, IL";

  return (
    <div className="relative isolate bg-background">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 lg:min-h-[700px]">
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Contact
            </h2>
            <dl className="mt-10 space-y-4 text-base leading-7 text-foreground">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <MapPinned
                    className="h-7 w-6 text-muted-foreground"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  <address>{fullAddress}</address>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <Phone
                    className="h-7 w-6 text-muted-foreground"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  <a
                    className="hover:text-muted-foreground"
                    href={`tel:${phone || "+1 (555) 234-5678"}`}
                  >
                    {phone || "+1 (555) 234-5678"}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <iframe
          title="Google Maps"
          style={{ border: 0 }}
          className="w-full h-96 lg:h-full lg:w-full"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${
            env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
          }&q=${`${name.split(" ").join("+")}+${fullAddress
            .split(" ")
            .join("+")}`}&zoom=16`}
        />
      </div>
    </div>
  );
}
