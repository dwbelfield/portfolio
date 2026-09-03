import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="grid-underlay flex flex-1 items-center">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-32 md:px-8">
        <p className="readout mb-6">404</p>
        <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
          Nothing here. Yet.
        </h1>
        <p className="mt-6 max-w-md text-lg text-muted">
          The page you were looking for has not been put in order.
        </p>
        <div className="mt-10">
          <Button href="/">Back to the start</Button>
        </div>
      </div>
    </section>
  );
}
