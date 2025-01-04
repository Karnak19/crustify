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
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-primary ring-1 ring-gray-900/10 lg:w-1/2">
              <svg
                className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    x="100%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={0} fill="white" />
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                />
              </svg>
            </div>
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
