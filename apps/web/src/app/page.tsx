import { SearchForm } from '@/components/search/search-form';

export default function HomePage() {
  return (
    <div className="container-page space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-sky-600 to-cyan-500 p-8 text-white shadow-lg">
        <p className="text-sm font-medium uppercase tracking-wider text-cyan-100">OTA Boilerplate</p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">Plan and book your next trip</h2>
        <p className="mt-3 max-w-2xl text-cyan-50">
          Microservices-ready starter with Next.js, NestJS, Prisma, and shared types.
        </p>
      </section>

      <SearchForm />
    </div>
  );
}
