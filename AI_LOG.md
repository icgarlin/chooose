
### AI Tools
- Claude Code 

### Prompts
  1. Using the following image [Image #1] create a dashboard using tailwindcss
  2. Build a page that lists all partnerships in a table showing partnership name, Chooose ID, company, currency, and
  creation date with view and edit actions
  3. Create a form to create new partnerships with fields for partnership name, internal name, company name, currency
  selector, and portal URL
  4. Build an edit page for partnerships where you can update the name, company, currency, and select portfolios from
  available options
  5. Add the ability to select connectFeatures and features in the edit portal. Look at the partnership JSON files to see what these are - they control UI capabilities and data input methods for the customer portal


### Prompt Corrections 
- Remove chooose-demo-partnership.json from code due to a missing internalName 


### Clarifying Prompt Questions

#1 Based on the data structure, can you explain the application flow? 
 
 ANSWER:
  
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


#2 Whats the difference between a portfolio and a feature / connectFeature?

ANSWER: Portfolios (like the SAF portfolio):
  - These are products/offerings that customers can purchase
  - They contain actual carbon offset projects or SAF supplies
  - They have pricing, descriptions, and represent what customers buy
  - Example: "Sustainable Aviation Fuel (SAF)" portfolio with its pricing and supply

  Features and connectFeatures:
  - These are functionality toggles for the customer portal
  - They control what actions/capabilities are available in the UI
  - Examples:
    - EmissionsDashboard - Can customers see a dashboard?
    - EmissionCompensate_Flights - Can customers compensate flight emissions?
    - Flights_FromTo - Can customers enter flights by origin/destination?
    - FlightsFootprints_Upload - Can customers upload emissions data?

  The relationship:
  - Portfolios = WHAT customers can buy (the products)
  - Features/connectFeatures = HOW customers interact with those products (the UI capabilities)



### Prompt Reasoning 
- I would accept prompts based on the above clarifying questions.  
In my README.md I describe the purpose of the Chooose software service and as I prompted Claude Code, I would ensure that the proposed changes were aligned with that file. 
Everything started from my analysis of the data structure and the and my assumption that it was a multi-tenant architecture.