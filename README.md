### Tech Stack:
- Frontend: Next.js (App Router), TypeScript, Tailwind CSS, and TanStack Query.
- Backend: Node.js with NestJS (TypeScript) as a REST API.
- Database: PostgreSQL (using Prisma ORM).
- State Management: React Context or Zustand for the booking flow.

### Key Features to Implement:
1. Search Interface: A landing page with a search bar for destinations, dates, and guest count.
2. Mock Flight/Hotel Data: Create a service that returns mock JSON data for flights and hotels to simulate a GDS (Global Distribution System) like Amadeus.
3. Results Page: A filterable list (price, rating, duration) for search results.
4. Booking Flow: A multi-step form (Passenger Details -> Payment Simulation -> Confirmation).
5. API Integration Layer: A clean service pattern in the backend to easily swap mock data for real APIs (like Duffel or Amadeus) later.

### Project Structure:
- /apps/web: The Next.js frontend.
- /apps/api: The NestJS backend.
- /packages/types: Shared TypeScript interfaces for Flights, Hotels, and Bookings.