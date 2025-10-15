

### APPLICATION FLOW

  Data Example:
    Customer.json:
  - Partnership: "Chooose SAF Demo" (partnership ID: 682fa8c19340de8ea5338e8a)
  - Customer: "Kanu's Tea Shop"
    - Organization that does business travel
    - Has employees who fly
    - Tracks their flight emissions
    - Can purchase SAF attributes


  The Flow:

  1. Acme Airlines (Partnership) → Signs up with Chooose
  2. Delta Corp (Customer) → A company that flies with Acme Airlines regularly
  3. Delta Corp's employees → Take business flights
  4. Delta Corp → Uses the emissions dashboard to:
    - See: "Your organization emitted 11,366 tCO₂e from 1,251 flights"
    - Purchase SAF attributes to offset those emissions
    - Get certificates for sustainability reporting

    Chooose Platform
    │
    └─ Partnership: "Acme Airlines"
        │
        └─ Customer: "Delta Corp" (a business that flies with Acme)
            │
            ├─ Employees/Travelers who take flights
            ├─ Tracks emissions from their business travel
            └─ Purchases SAF attributes to offset their footprint

  So in the context of "Kanu's Tea Shop" (from Customer.json):
  - They're a business customer of the partnership
  - They track their company's flight emissions
  - They purchase SAF attributes to reduce their carbon footprint
  - They use it for ESG/sustainability reporting
