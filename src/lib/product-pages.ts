/**
 * Sub-pages for each platform module: /platform/{module}/{slug}.
 *
 * Every feature claim follows the design system's product page (what is
 * live in v1.0, and what arrives in which version). Detail comes from the
 * customer guides (ECOD/docs/product/*.md). Anything not live is named with
 * its status word, such as "coming soon".
 * Pages without enough verified detail stay short and say so plainly
 * instead of padding; they're listed in the phase-2 report for a
 * merge-or-drop decision.
 */

export type ScreenKey = "pipeline" | "inbox" | "invoice" | "flow" | "booking" | "ai" | "documents" | "leads" | "engine";

export interface SubPage {
  slug: string;
  /** h1 and <title> (the root template adds " | ECODrIx"); ≤ 50 characters. */
  title: string;
  /** Meta description; 120–160 characters. */
  description: string;
  type: "use-case" | "capability" | "guide" | "comparison";
  lead: string;
  /** Coded mock of the related screen (components/scenes/screens.tsx). */
  screen?: ScreenKey;
  /** "How it works", in order. */
  steps?: string[];
  sections: { heading: string; body: string[]; points?: string[] }[];
  faqs?: { q: string; a: string }[];
  /** What isn't available, said plainly. */
  notice?: string;
}

/* ═══════════════════════════════════════════════════════════════════════
 * ERIX CRM
 * ═════════════════════════════════════════════════════════════════════ */

export const CRM_PAGES: SubPage[] = [
  {
    slug: "lead-pipeline",
    title: "Contacts and pipeline for Indian SMBs",
    description:
      "Every enquiry on one board: stages made for your business, rupee totals per stage, drag to move, search and filters, and contacts that work on your phone.",
    type: "capability",
    lead: "Every enquiry on one board, so you always know who is new, who has visited and who is ready to pay, without a notebook or an Excel sheet.",
    screen: "pipeline",
    steps: [
      "Pick your business type when you sign up. Your pipeline and contact fields are ready in about a minute.",
      "Your lead forms put new enquiries in the first stage by themselves, and bookings from your booking page add the person to your contacts. Add walk-ins and phone enquiries by hand.",
      "Drag a card to the next column when the deal moves. It saves at once, and your whole team sees it.",
      "Tap a card to open the contact, with their chats, bookings, proposals and invoices in one place.",
    ],
    sections: [
      {
        heading: "Stages made for your business",
        body: [
          "A real estate agent starts with Inquiry → Site Visit Scheduled → Site Visit Done → Shortlisted → Token Paid → Agreement Signed → Closed or Lost. Healthcare and clinics, education and coaching, e-commerce and D2C, and marketing agencies each get their own stages. Any other business starts with a simple sales pipeline: New → Contacted → Qualified → Proposal → Won or Lost.",
          "You can change stages later. Need buyers and sellers apart? Add a second pipeline with New pipeline, and choose in each form's settings which pipeline it fills.",
        ],
      },
      {
        heading: "Fields that match what you track",
        body: [
          "Each business type adds the details it needs to every contact. Real estate adds property type, budget range, location preference, possession date and the property ID or project. Add your own fields for anything else you track.",
        ],
      },
      {
        heading: "See the money at every stage",
        body: [
          "Each column shows the total deal value sitting in it, in rupees with Indian grouping, so you can see how much business is waiting at site visit and how much at token paid. New contacts go to your default pipeline unless a form sends them somewhere else.",
        ],
      },
      {
        heading: "Find anyone fast",
        body: [
          "Search by name, phone number or email. Filter to the last 30 days to see this month's fresh enquiries. Archived contacts are kept, but they're hidden from the board, so the pipeline shows only live deals.",
        ],
      },
      {
        heading: "Safe for a team",
        body: [
          "Everyone with the right role can move cards and work leads. Only the owner or an admin can delete a pipeline or a stage, so nobody wipes a column by mistake.",
        ],
        points: [
          "Owner: everything, including the plan and inviting admins",
          "Admin: everything except the plan",
          "Agent: contacts, the pipeline, the inbox and broadcasts",
          "Viewer: can look around, can't change anything",
        ],
      },
      {
        heading: "Built for the phone in your pocket",
        body: [
          "Contacts and pipelines fit a phone screen, so you can update a lead from the site visit itself. Every move saves as you make it; there is no Save button to forget.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I keep buyers and sellers apart?",
        a: "Yes. Add a second pipeline, for example Buyers and Sellers, and pick in each form's settings which one it fills.",
      },
      {
        q: "Where do enquiries from my forms go?",
        a: "To the first stage of the pipeline you choose in the form's settings, marked as coming from that form, with the consent the person gave.",
      },
      {
        q: "I dragged a card to the wrong column. What now?",
        a: "Drag it back. Every move saves as you make it, so the board always shows where each enquiry stands.",
      },
    ],
  },
  {
    slug: "client-portal",
    title: "Projects, e-sign and a client portal",
    description:
      "Run each client job as a project: tasks, documents your client signs first and you sign after, and a portal where the client follows progress and messages you.",
    type: "capability",
    lead: "Every client job in one place, with its tasks, documents and signatures, plus a page of their own where the client follows progress. No more answering “what's the status?” on WhatsApp ten times a week.",
    screen: "documents",
    steps: [
      "Create a project under ERIX CRM → Active projects and add its tasks.",
      "Upload the quotation or work order and choose Ask for signature.",
      "Invite your client by email, and copy the invite link to send on WhatsApp too.",
      "Your client signs in the portal, then you sign. Both signatures land on the PDF.",
    ],
    sections: [
      {
        heading: "An example from Nagpur",
        body: [
          "An interior designer takes on a ₹6,50,000 2BHK job. She creates a project, adds Measurements, 3D design, Carpentry and Handover as tasks, and uploads the quotation for the client to sign. The client signs on her phone from the portal, sees Carpentry move to In progress, and asks her questions on the same page. After handover, the designer sends the final invoice and a payment link from ERIX.",
        ],
      },
      {
        heading: "Plan the work",
        body: [
          "Filter your projects by Active, On hold or Done. Tasks move across To do, In progress, Review and Done, and the bar at the top shows overall progress, such as 1 of 5 tasks done. The Overview tab shows the status, package, start and due dates, and a count of tasks in each column.",
        ],
      },
      {
        heading: "Documents your client signs first",
        body: [
          "Upload PDF, Word, PNG or JPG files up to 100 MB each. Choose Ask for signature, enter your client's name, and they see Needs your signature in their portal. They sign with a finger or mouse, type their full name, or decline. Then the file shows Waiting for your signature and a Sign button. The status changes by itself on both sides: Partly signed, then Signed, or Declined.",
        ],
      },
      {
        heading: "What this signature is",
        body: [
          "It is click-to-sign. Every signature, yours and your client's, is stamped on the PDF with the signer's name and the date, and ERIX keeps an audit seal, a digital fingerprint of the signed file, so you can show it wasn't changed afterwards. It works well for quotations, work orders and service agreements. It is not Aadhaar eSign: for papers that must be Aadhaar-signed, stamped or registered, such as a sale deed, use the official route.",
        ],
      },
      {
        heading: "What your client sees",
        body: ["Your client sees only the project you invited them to, on a page that works on their phone:"],
        points: [
          "the project name, its status and how far along it is",
          "each task and its status",
          "your documents, to view and sign",
          "messages to you, which you answer from your inbox, marked Portal",
        ],
      },
      {
        heading: "Invites and access",
        body: [
          "ERIX emails your client a link to set a password and open the project. The link works for 7 days; copy it and send it on WhatsApp if the email doesn't arrive. Each client shows as Invited, Active or Invite expired. Only owners and admins invite clients, sign for the business or remove access, and removing access ends it at once.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is this an Aadhaar eSign?",
        a: "No. It's click-to-sign with the signer's name, the date and an audit seal on the PDF. Use the official route for documents that must be Aadhaar-signed, stamped or registered.",
      },
      {
        q: "What if my client never got the invite email?",
        a: "Choose Copy invite link and send it on WhatsApp. If the email couldn't be sent, ERIX tells you, and the link is the way in for 7 days.",
      },
      {
        q: "Do project files count towards my storage?",
        a: "Yes. When your workspace's storage is full, uploading says so and suggests deleting files you no longer need.",
      },
    ],
  },
  {
    slug: "commerce",
    title: "Proposals, GST invoices and payment links",
    description:
      "Send a proposal, turn it into a GST invoice with CGST, SGST or IGST worked out for you, and get paid through your own Razorpay link. Marked Paid by itself.",
    type: "capability",
    lead: "Send a proposal, the client says yes, a correct GST invoice goes out with a payment link, and you see Paid the moment the money lands.",
    screen: "invoice",
    steps: [
      "Add your GSTIN, business address and numbering once, in Invoice settings.",
      "Send a proposal to a contact. The client opens it on a phone and accepts it, without logging in.",
      "The accepted proposal becomes an advance GST invoice, linked to the proposal and the contact.",
      "Create a Razorpay payment link and send the invoice on WhatsApp or email.",
      "When the payment lands, the invoice turns Paid by itself, live on your screen.",
    ],
    sections: [
      {
        heading: "GST worked out from the place of supply",
        body: [
          "A buyer in your state gets CGST and SGST, split exactly to the paisa. A buyer in another state, or with another state's GSTIN, gets IGST. A ₹10,000 service at 18% becomes ₹900 CGST plus ₹900 SGST, or ₹1,800 IGST. A wrong GSTIN, state code or HSN/SAC code is refused with a sentence that says what to fix, and a 0% rate stays 0%.",
        ],
      },
      {
        heading: "A proper tax invoice",
        body: [
          "The PDF says TAX INVOICE and carries your GSTIN and the buyer's, the place of supply (for example 29 · Karnataka), HSN or SAC codes, the tax lines, the buyer's address, the amount in words (Rupees … Only) and a line for your authorised signatory. Amounts use Indian grouping, so ₹14,56,789.65 reads the way your accountant expects.",
        ],
      },
      {
        heading: "Numbered by financial year",
        body: [
          "Invoice numbers run per financial year, such as INV/26-27/0012, and stay within 16 characters. A save that fails never burns a number.",
        ],
      },
      {
        heading: "Payment links from your own Razorpay",
        body: [
          "Connect your Razorpay keys under Connect → Payments. ERIX creates the payment link and the money goes to your account. If Razorpay refuses your keys, ERIX says so plainly and creates no link. Change the total on an invoice that already has a live link, and the old link is cancelled first.",
        ],
      },
      {
        heading: "Sent where your client reads",
        body: [
          "Send the invoice PDF and its payment link on WhatsApp or by email, straight from the invoice. The client pays by phone, using the methods your Razorpay account accepts.",
        ],
      },
      {
        heading: "Paid, live",
        body: [
          "When Razorpay confirms the payment, the invoice turns Paid on your screen at once, without a refresh, and the contact's timeline shows it. A paid invoice becomes a read-only record.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does ERIX handle IGST for customers in other states?",
        a: "Yes. When the buyer's GSTIN or place of supply is in another state, the invoice uses IGST instead of CGST and SGST.",
      },
      {
        q: "How can my client pay?",
        a: "Through a Razorpay payment link, using the methods your Razorpay account accepts, such as UPI and cards. The money goes to your account.",
      },
      {
        q: "Can I send the invoice on WhatsApp?",
        a: "Yes. Send the PDF and the payment link on WhatsApp or by email from the invoice itself.",
      },
    ],
  },
  {
    slug: "crm-automation",
    title: "Automations on your CRM",
    description:
      "Automations that start on CRM events, such as a new lead, a stage change, a won deal or a booking, are built in ERIX Flow. Here is how they meet your pipeline.",
    type: "capability",
    lead: "Automations that react to your pipeline live in ERIX Flow. They start when something happens in your CRM and act on the same contact.",
    sections: [
      {
        heading: "Events from your CRM",
        body: [
          "An automation can start when a lead is created, enters or leaves a stage, is won or lost, or is tagged; when a form is submitted; when an invoice is paid; or when a meeting is booked, rescheduled or cancelled. The Welcome Journey template starts when a new lead comes in, and Appointment Reminders starts on a booked meeting.",
        ],
      },
      {
        heading: "Steps that act on the contact",
        body: [
          "Steps can send a message on WhatsApp or email, wait, wait for a reply, ask for approval, write an AI reply or update the contact. Each run is saved on the contact's history.",
        ],
      },
    ],
    notice: "This page covers the same ground as the ERIX Flow guides. See What starts an ERIX automation and Automation steps in ERIX Flow for the detail.",
  },
  {
    slug: "real-estate",
    title: "ERIX for real estate agents and builders",
    description:
      "For property consultants: portal and ad leads in one pipeline, site visits in IST, WhatsApp follow-ups, an agent that knows your listings, and token invoices.",
    type: "use-case",
    lead: "Built for how property is sold in India: enquiries at night, site visits at the weekend, follow-ups on WhatsApp and a token amount at the end.",
    screen: "pipeline",
    sections: [
      {
        heading: "A pipeline that matches the sale",
        body: [
          "Pick Real estate at sign-up and you start with Inquiry → Site Visit Scheduled → Site Visit Done → Shortlisted → Token Paid → Agreement Signed → Closed or Lost. Every contact gets property type, budget range, location preference, possession date and property ID or project. Each column shows the deal value in it, so you see what's waiting at Token Paid.",
        ],
      },
      {
        heading: "Site visits without phone tag",
        body: [
          "Set your booking hours and add an appointment type such as Site visit, 30 minutes, in person. A consultant in Indore open 10:00 am to 1:00 pm, with 30-minute visits and a 15-minute gap, offers 10:00 am, 10:45 am, 11:30 am and 12:15 pm. If two buyers pick the same slot, one gets it and the other is asked to pick another time. Switch on the Appointment Reminders template and buyers get WhatsApp reminders 1 hour and 15 minutes before the visit.",
        ],
      },
      {
        heading: "Follow-ups that actually happen",
        body: [
          "A consultant in Nashik gets about 40 WhatsApp enquiries a week. Each new enquiry gets “Hi, shall we book your site visit?”, and the automation waits for a reply. If the buyer answers, the chat is waiting in the inbox for the team; if there's no reply in two days, a gentle follow-up goes out on its own. Nobody has to remember who to chase.",
        ],
      },
      {
        heading: "Every enquiry in one place",
        body: [
          "Put your form link or WhatsApp number on property portals, ads and your Instagram bio. Form answers and WhatsApp, Instagram or website chats all land on the right contact, matched by phone and then email, so a buyer who writes twice doesn't become two leads.",
        ],
      },
      {
        heading: "An agent that sticks to your listings",
        body: [
          "Add your project details and price list to AI knowledge, and the agent answers buyers from that information. It sends an answer on its own only when the answer is grounded and it's sure; anything else becomes a draft for your team. Money questions such as discounts always go to a person, so nobody gets a promise you didn't make.",
        ],
      },
      {
        heading: "Token amount and paperwork",
        body: [
          "When the buyer is ready, send the token amount invoice, say ₹1,00,000, with your Razorpay payment link, and the deal moves to Token Paid. Quotations and work orders can be signed online with click-to-sign; a sale deed still needs registration through the official route.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will the AI promise prices or possession dates?",
        a: "No. It answers only from the details you add to its knowledge, and money questions such as discounts go to your team.",
      },
      {
        q: "Can buyers book a site visit themselves?",
        a: "Yes, from your booking page, in Indian time. They can't cancel or move a booking themselves yet; you reschedule from Appointments.",
      },
      {
        q: "Can I keep buyer and seller enquiries apart?",
        a: "Yes. Add a second pipeline and point each form at the pipeline it should fill.",
      },
    ],
  },
  {
    slug: "healthcare",
    title: "ERIX for clinics and healthcare practices",
    description:
      "For clinics: enquiry forms with consent, appointments in IST with no double bookings, WhatsApp reminders, and medical questions always routed to your own team.",
    type: "use-case",
    lead: "Patients ask on WhatsApp, book from a link and expect a reminder. ERIX handles the routine and leaves anything medical to your team.",
    screen: "booking",
    sections: [
      {
        heading: "Enquiries with consent recorded",
        body: [
          "Every lead form has a consent box patients must tick, with a link to your privacy policy. A second, optional box, Send me offers and updates, is never ticked for them. Wrong phone numbers and emails are stopped at the form, so your front desk isn't chasing junk.",
        ],
      },
      {
        heading: "Appointments the front desk doesn't juggle",
        body: [
          "Set your hours, appointment length and the gap between patients. Each appointment type has its own length and place: in person, a phone call or Google Meet. A patient booking from Dubai sees your times clearly labelled in India Standard Time. Two people can never take the same slot, and you can confirm each booking yourself or let them confirm automatically.",
        ],
      },
      {
        heading: "Reminders that go out on time",
        body: [
          "Switch on the Appointment Reminders template and patients get WhatsApp reminders 1 hour and 15 minutes before the appointment. If someone books inside a reminder's window, the early reminder is skipped and the later one still goes on time. Add a WhatsApp step at the start for a confirmation right after booking.",
        ],
      },
      {
        heading: "Medical questions go to a person",
        body: [
          "If you turn on AI replies, it answers everyday questions such as timings, fees and location from the information you give it. Medical questions and symptoms are on the list of topics that always go to a person, switched on from the start, along with refunds and complaints. The chat moves to Needs you with the conversation attached, and the patient is told someone will reply.",
        ],
      },
      {
        heading: "Chat on your clinic's website",
        body: [
          "Add the chat to your clinic's website with one line. You choose whether it asks for a name and phone number before the chat, only when needed, or not at all, with consent. Patients see replies live, with typing and WhatsApp-style ticks. AI replies are labelled AI, and your staff's replies show their first name.",
        ],
      },
      {
        heading: "Invoices and payment links",
        body: [
          "Send an invoice with the tax rate that applies to your service, with 0% kept as 0%, and a Razorpay payment link the patient pays by phone.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can patients book a teleconsultation?",
        a: "Yes. Set the appointment type's place to Google Meet. With Google connected, each booking gets a Meet link; without it, bookings still come in, just without a link.",
      },
      {
        q: "Will the AI give medical advice?",
        a: "No. Medical questions and symptoms always go to your team, and that switch starts turned on.",
      },
      {
        q: "Can patients cancel or move a booking themselves?",
        a: "Not yet. Your team confirms, reschedules or cancels from Appointments, and cancelling frees the slot for someone else.",
      },
    ],
  },
  {
    slug: "agencies",
    title: "ERIX for marketing agencies",
    description:
      "For agencies: a pipeline for new business, proposals clients accept on a phone, projects with tasks and e-sign, a client portal and GST invoices with links.",
    type: "use-case",
    lead: "Win the client, run the work and get paid from one workspace, with clients following progress without a status call.",
    screen: "documents",
    notice: "White-label, running ERIX under your own brand, isn't available today.",
    sections: [
      {
        heading: "New business in a pipeline",
        body: [
          "Pick Marketing agency at sign-up and your pipeline starts with stages for agency sales. Form answers land in the first stage, and chats from WhatsApp, Instagram and your website land on the same contact.",
        ],
      },
      {
        heading: "Proposals and advance invoices",
        body: [
          "Send a proposal; the client opens it on a phone and accepts it without logging in. The accepted proposal becomes an advance GST invoice, linked to the contact, with CGST and SGST or IGST worked out from the place of supply and a Razorpay payment link.",
        ],
      },
      {
        heading: "Projects your clients can follow",
        body: [
          "Each retainer or campaign becomes a project with tasks across To do, In progress, Review and Done. Upload the scope document or work order, ask the client to sign, and sign after them. Clients message you from their portal, and those chats land in your inbox, marked Portal.",
        ],
      },
      {
        heading: "Follow-ups and approvals",
        body: [
          "Use the Welcome Journey for new enquiries, Wait for a reply to nudge anyone who goes quiet, and an approval step before any offer goes out, so a junior can't send a discount you didn't agree to.",
        ],
      },
      {
        heading: "Roles for your team",
        body: [
          "Agents work leads, the inbox and broadcasts. Admins handle settings and invite agents. Only owners and admins invite clients to a portal or sign documents for the agency.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I run ERIX under my agency's brand?",
        a: "Not today. White-label isn't part of ERIX yet.",
      },
      {
        q: "Can clients see my internal notes?",
        a: "No. A client sees only the project you invite them to: its progress, tasks, your documents and their messages with you.",
      },
    ],
  },
  {
    slug: "education",
    title: "ERIX for coaching institutes",
    description:
      "For coaching institutes: admission forms, counselling bookings, AI answers on batch timings and fees, WhatsApp follow-ups, and GST invoices for course fees.",
    type: "use-case",
    lead: "Parents enquire at night and decide over a week. ERIX answers the routine questions, books the counselling session and keeps the follow-up going.",
    screen: "inbox",
    sections: [
      {
        heading: "A week from enquiry to admission",
        body: ["Here is a normal week for a coaching institute in Indore:"],
        points: [
          "At 9:40 pm on 11 Oct, a parent fills in your admission form from the link in your Instagram bio and lands in the first stage of your pipeline.",
          "The Welcome Journey emails them straight away and sends a WhatsApp message the next day.",
          "They book a counselling session for Sat, 17 Oct, 10:00 am on your booking page, and nobody else can take that time.",
          "They ask about batch timings on WhatsApp. Your counsellor answers from the inbox and drags their card forward.",
          "You send a proposal for the ₹48,000 course. Once accepted, it becomes a GST invoice: ₹48,000 + CGST ₹4,320 + SGST ₹4,320 = ₹56,640, with a payment link.",
        ],
      },
      {
        heading: "Answers at 10:30 pm",
        body: [
          "A coaching institute in Vijayawada adds its batch timings, its fee chart (₹18,000 for the JEE foundation course) and its address to AI knowledge. When a parent asks at 10:30 pm, “What time is the Sunday batch?”, the AI answers from the timings in seconds. When another parent writes, “I want a refund for the crash course,” the AI doesn't answer: the chat goes to the team with the reason Refunds, and the counsellor calls back.",
        ],
      },
      {
        heading: "Your institute's tone",
        body: [
          "Give the agent a persona, such as a friendly counsellor who always asks which class the student is in. It replies in the language the parent writes in, whether that's Telugu, Hindi or English. Start with replies as drafts your counsellors send, and check its answers in Answer review before you let it reply on its own.",
        ],
      },
      {
        heading: "Follow-ups that don't depend on memory",
        body: [
          "Send a WhatsApp message, then wait for a reply. If the parent answers, the chat is in your counsellors' inbox; if nobody replies in three days, a gentle follow-up goes out on its own.",
        ],
      },
      {
        heading: "New-batch announcements",
        body: [
          "Announce a new batch with a WhatsApp broadcast, using a template WhatsApp has approved, and pick who gets it, such as parents tagged jee-2027. Because ERIX uses your own WhatsApp account, Meta bills you directly and ERIX adds no markup.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can the AI reply in Telugu or Hindi?",
        a: "Yes. The agent replies in the language the parent writes in, including Telugu or Hindi mixed with English. Refunds, complaints and medical questions still go to a person.",
      },
      {
        q: "Can parents pay the course fee online?",
        a: "Yes. Send the GST invoice with a Razorpay payment link and the invoice turns Paid when the money lands.",
      },
      {
        q: "Is GST added to course fees?",
        a: "ERIX applies the GST rate you set on the invoice and splits it into CGST and SGST, or IGST for another state. Check the right rate for your courses with your accountant.",
      },
    ],
  },
  {
    slug: "d2c-ecommerce",
    title: "ERIX for D2C and local brands",
    description:
      "For D2C and local brands: one inbox for order questions, WhatsApp broadcasts with approved templates, AI answers from your price list, and invoices with links.",
    type: "use-case",
    lead: "Answer order questions from one inbox, send offers on WhatsApp with templates WhatsApp has approved, and take a chat all the way to a paid invoice.",
    screen: "inbox",
    notice: "ERIX doesn't connect to Shopify or a store catalogue today, and storefront checkout is planned for later. Orders come in as chats, and you invoice them.",
    sections: [
      {
        heading: "Every DM in one list",
        body: [
          "A boutique in Jaipur posts its new kurta sets. Questions arrive on Instagram DMs, WhatsApp and the website chat, and they all land in one inbox, each on the right customer, matched by phone and then email. Unread counts and a Needs you list show what's waiting.",
        ],
      },
      {
        heading: "Answers from your price list",
        body: [
          "Add your price list, sizes and delivery areas to AI knowledge. When someone asks “Kurta sets kitne ke hain?”, the agent answers from your price list in the customer's language. Anything it isn't sure of becomes a draft, and refunds and complaints always go to your team.",
        ],
      },
      {
        heading: "Festive offers on WhatsApp",
        body: [
          "A saree shop in Coimbatore sends its Diwali offer to customers tagged diwali, using a template WhatsApp has approved. Because ERIX uses your own WhatsApp account, Meta bills you directly for the messages and ERIX adds no markup. Broadcasts wait out quiet hours in Indian time.",
        ],
      },
      {
        heading: "From chat to paid",
        body: [
          "Customers who reply “Is the red one available?” land in your inbox, where your team takes the chat to an invoice and a Razorpay payment link. The invoice turns Paid by itself when the money lands. Pick E-commerce / D2C at sign-up and your pipeline starts with stages made for selling online.",
        ],
      },
      {
        heading: "Follow-ups after the first chat",
        body: [
          "Switch on the Welcome Journey for new customers, and use Wait for a reply to nudge anyone who asked about a product and then went quiet.",
        ],
      },
    ],
    faqs: [
      {
        q: "Who pays for WhatsApp broadcast messages?",
        a: "Your business pays Meta directly, because you connect your own WhatsApp Business account. ERIX adds no markup to Meta's charges.",
      },
      {
        q: "Can the AI reply in Hinglish?",
        a: "Yes. The agent replies in the language the customer writes in, including Hindi mixed with English.",
      },
      {
        q: "Does ERIX connect to Shopify?",
        a: "Not today. Orders come in through chats, and you send the invoice and payment link from ERIX. Storefront checkout is planned for later.",
      },
    ],
  },
  {
    slug: "professional-services",
    title: "ERIX for CAs, lawyers and consultants",
    description:
      "For CAs, lawyers and consultants: a portal for every engagement, click-to-sign engagement letters, deadline broadcasts on WhatsApp and GST invoices with links.",
    type: "use-case",
    lead: "Share documents without digging through WhatsApp, get engagement letters signed, and remind every client about a deadline in one go.",
    screen: "documents",
    sections: [
      {
        heading: "A portal for every engagement",
        body: [
          "Create a project for each engagement, such as an annual audit or a company incorporation, and add its tasks. Your client sees only their own project: its progress, each task, the documents you share and a place to message you. Their messages land in your inbox, marked Portal, next to their WhatsApp chats.",
        ],
      },
      {
        heading: "Engagement letters signed online",
        body: [
          "Upload the engagement letter or fee quotation and choose Ask for signature. Your client signs first, by drawing or typing their name, then you sign. Both signatures go on the PDF with the date and an audit seal. It's click-to-sign, not Aadhaar eSign, so use the official route for anything that must be stamped or registered.",
        ],
      },
      {
        heading: "Deadline reminders to everyone at once",
        body: [
          "Tag clients by the work you do for them, such as gst-monthly or itr, and send a template WhatsApp has approved to everyone with that tag. Meta bills you directly for the messages, with no ERIX markup.",
        ],
      },
      {
        heading: "Questions a bot shouldn't answer",
        body: [
          "If you use the AI agent for office hours and document checklists, keep it in Suggest mode: it drafts and your team sends. Refunds and complaints always go to a person, and anything the agent isn't sure of becomes a draft instead of an answer.",
        ],
      },
      {
        heading: "Invoices for your fees",
        body: [
          "Send GST invoices with CGST and SGST or IGST worked out from the place of supply, numbered per financial year, with a Razorpay payment link.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the online signature enough for an engagement letter?",
        a: "It's a click-to-sign signature with the signer's name, date and an audit seal, which suits quotations, work orders and service agreements. For documents that must be Aadhaar-signed, stamped or registered, use the official route.",
      },
      {
        q: "Will the AI answer legal or tax questions?",
        a: "Only from what you add to its knowledge, and only when it is sure. In Suggest mode, the default, every reply is a draft your team checks before it goes.",
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════
 * ERIX Flow
 * ═════════════════════════════════════════════════════════════════════ */

export const FLOW_PAGES: SubPage[] = [
  {
    slug: "node-types",
    title: "Automation steps in ERIX Flow",
    description:
      "The steps you can add to an ERIX automation today: send a message, wait, Wait for a reply, approval, AI reply and update the contact, and what's coming soon.",
    type: "capability",
    lead: "An automation is one starting event and a few steps. These are the steps in ERIX Flow today, and the ones coming in version 1.2.",
    screen: "flow",
    sections: [
      {
        heading: "Send a message",
        body: [
          "Send a WhatsApp message or an email to the contact the run is about. Inside WhatsApp's 24-hour window you can send a normal message; outside it, use a template WhatsApp has approved. The message can use the contact's details, such as their first name.",
        ],
      },
      {
        heading: "Wait",
        body: [
          "Pause the run for some minutes, hours or days, such as two days before a follow-up, so messages arrive when they make sense instead of all at once.",
        ],
      },
      {
        heading: "Wait for a reply",
        body: [
          "Pause until the contact answers or a time limit ends. The run then carries on down one of two paths: Replied, when they answered, or No reply, when the time ran out. It's the step behind every “nudge them if they go quiet” follow-up.",
        ],
      },
      {
        heading: "Ask for approval",
        body: [
          "Hold the run until someone on your team decides. Use it before money or a customer message goes out, so nothing leaves without a person's OK. Requests collect on the Approvals page, live.",
        ],
      },
      {
        heading: "AI reply",
        body: [
          "Let the AI agent write the reply from your knowledge: documents, price lists, FAQs and website pages. Like the agent in the inbox, it drafts for a person by default, and refunds, complaints and medical questions always go to your team.",
        ],
      },
      {
        heading: "Update the contact",
        body: [
          "Save what the run learned on the contact, such as a tag or a field, so your team sees it on the timeline and the pipeline.",
        ],
      },
      {
        heading: "Coming soon in version 1.2",
        body: ["These steps aren't in ERIX Flow today. They arrive in version 1.2:"],
        points: [
          "Webhooks, to send data to other software and take data in",
          "Schedules that start an automation at a set time",
          "Branches and conditions beyond Replied and No reply",
          "Loops over a list",
          "Connected apps",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I message someone who hasn't written to me today?",
        a: "Yes, with a template WhatsApp has approved. Normal messages only go within 24 hours of the customer's last message.",
      },
      {
        q: "Can an automation split into more than two paths?",
        a: "Not yet. Today, Wait for a reply splits into Replied and No reply. Branches and conditions arrive in version 1.2.",
      },
    ],
  },
  {
    slug: "triggers",
    title: "What starts an ERIX automation",
    description:
      "ERIX automations start when something happens: a new lead, a stage change, a won or lost deal, a tag, a form, an inbound message, a payment or a booking.",
    type: "capability",
    lead: "Every automation begins with one event. Pick it when you build the automation, and ERIX starts a run each time it happens.",
    screen: "flow",
    sections: [
      {
        heading: "Leads and the pipeline",
        body: ["Most follow-ups start from something that happens to a lead:"],
        points: ["A lead is created", "A lead enters or leaves a stage", "A deal is won or lost", "A contact is tagged"],
      },
      {
        heading: "Forms, messages and payments",
        body: ["Others start from something a customer does:"],
        points: [
          "A form is submitted",
          "A message comes in on any channel: WhatsApp, Instagram, email or website chat",
          "An invoice is paid or a payment is captured",
        ],
      },
      {
        heading: "Bookings",
        body: [
          "An automation can start when a meeting is booked, rescheduled or cancelled. Appointment Reminders starts on a booked meeting and sends WhatsApp reminders 1 hour and 15 minutes before the appointment.",
        ],
      },
      {
        heading: "Examples by business",
        body: ["The same events cover very different follow-ups:"],
        points: [
          "A clinic: a meeting is booked, and WhatsApp reminders go out before the appointment",
          "A property consultant: a lead enters Site Visit Done, a message asks how the visit went, and No reply sends a nudge two days later",
          "A coaching institute: an admission form is submitted, and a welcome message goes out at once",
          "Any business: an invoice is paid, a thank-you message goes out and the contact is updated",
        ],
      },
      {
        heading: "Templates that come ready",
        body: [
          "Templates are made for each industry. Welcome Journey starts when a new lead comes in, and Appointment Reminders starts on a booked meeting. Each one installs as a draft until you switch it on.",
        ],
      },
      {
        heading: "Every run on the contact",
        body: [
          "Each run is saved on the contact it's about, with every step and what it did, and it updates live while the run is going.",
        ],
      },
      {
        heading: "Coming soon",
        body: [
          "Starting an automation from a schedule or from a webhook arrives in version 1.2. Today, automations start on events inside ERIX.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can my own software start an automation?",
        a: "Not yet. Starting an automation from a webhook arrives in version 1.2.",
      },
      {
        q: "Can an automation start at a set time every week?",
        a: "Not yet. Schedules arrive in version 1.2. Today, automations start when something happens in ERIX.",
      },
    ],
  },
  {
    slug: "custom-nodes",
    title: "Custom steps in ERIX Flow",
    description:
      "Custom automation steps and a step marketplace aren't part of ERIX Flow today. Here is what you can build with the built-in steps, and where to start instead.",
    type: "capability",
    lead: "Building your own steps, and sharing them in a marketplace, isn't available in ERIX Flow today.",
    sections: [
      {
        heading: "What you can do now",
        body: [
          "The built-in steps cover sending on WhatsApp or email, waiting, waiting for a reply, approvals, AI replies and updating the contact. Webhooks, branches, loops and connected apps are coming soon, in version 1.2.",
        ],
      },
    ],
    notice: "Custom steps aren't available yet. See Automation steps in ERIX Flow for what's built in.",
  },
  {
    slug: "zapier-alternative",
    title: "ERIX Flow vs Zapier for Indian SMBs",
    description:
      "ERIX Flow vs Zapier: Zapier links thousands of apps; ERIX Flow works natively on your contacts, inbox and WhatsApp, with approvals and AI replies built in.",
    type: "comparison",
    lead: "Both run automations, but they're built for different jobs. Here is an honest split of where each one fits.",
    screen: "flow",
    sections: [
      {
        heading: "The short answer",
        body: [
          "Pick Zapier when your work hops between many different apps. Pick ERIX Flow when the work lives in your customer conversations: WhatsApp, Instagram, email, your pipeline and your invoices, all on one contact record.",
        ],
      },
      {
        heading: "Where Zapier is stronger",
        body: [
          "Zapier connects to thousands of third-party apps. ERIX Flow works inside ERIX; webhooks and connected apps are coming soon, in version 1.2. If you need to pass data between a dozen tools, Zapier is the better fit.",
        ],
      },
      {
        heading: "Where ERIX Flow is stronger",
        body: ["ERIX Flow already knows your customers and WhatsApp's rules, so you don't rebuild them:"],
        points: [
          "Starts on what happens in ERIX: new leads, stage changes, forms, messages, payments and bookings",
          "WhatsApp's 24-hour window and approved templates handled for you",
          "Wait for a reply, with a Replied path and a No reply path",
          "AI replies from your own knowledge, as drafts by default",
          "Approval steps before money or a customer message goes out",
          "Templates made for your industry",
          "A run history on every contact, updated live",
        ],
      },
      {
        heading: "How the pricing differs",
        body: [
          "Zapier bills by the number of tasks your automations run. ERIX Flow isn't a separate subscription: it comes with ERIX, on the same contacts and inbox. During the pilot, our team sets up your workspace and agrees pricing with you.",
        ],
      },
      {
        heading: "Using both",
        body: [
          "You don't have to choose. Keep Zapier for the hops between your other apps, and let ERIX Flow handle the follow-ups that live in your customer chats. Webhooks to link the two are coming soon, in version 1.2.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can ERIX Flow connect to Google Sheets or other apps?",
        a: "Not today. Connected apps and webhooks are coming soon, in version 1.2.",
      },
      {
        q: "Is ERIX Flow a separate subscription?",
        a: "No. ERIX Flow comes with ERIX. During the pilot, our team agrees pricing with each business.",
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════
 * ERIX LAIE (invite-only beta): kept short until the beta has verified
 * detail to publish.
 * ═════════════════════════════════════════════════════════════════════ */

const LAIE_NOTICE = "ERIX LAIE is in an invite-only beta. Join the waitlist and choose Finding new leads (LAIE) to ask for access.";

export const LAIE_PAGES: SubPage[] = [
  {
    slug: "discovery-sources",
    title: "Where ERIX LAIE looks for leads",
    description:
      "ERIX LAIE looks for businesses that match the customer you describe, by type and city, in public listings and company websites. An invite-only beta.",
    type: "capability",
    lead: "LAIE starts from the customer you describe, such as dental clinics in Vijayawada, and looks for businesses that match.",
    screen: "leads",
    sections: [
      {
        heading: "Public business information",
        body: [
          "LAIE works from public business listings and company websites. Our team sets up which sources each beta workspace uses, and every match is listed for you to review before it moves into your CRM.",
        ],
      },
    ],
    notice: LAIE_NOTICE,
  },
  {
    slug: "ai-enrichment",
    title: "How ERIX LAIE checks lead details",
    description:
      "Before a lead reaches your pipeline, ERIX LAIE checks its contact details and adds what it learns about the business. Part of the invite-only LAIE beta.",
    type: "capability",
    lead: "LAIE checks the contact details it finds before a lead moves on, so your team isn't calling dead numbers.",
    screen: "leads",
    sections: [
      {
        heading: "Checked before it reaches you",
        body: [
          "Each match goes through contact checks, and LAIE adds a short summary of the business from its public information. Leads that pass move into your ERIX CRM pipeline.",
        ],
      },
    ],
    notice: LAIE_NOTICE,
  },
  {
    slug: "relay-fabric",
    title: "Relay Fabric: the workers behind LAIE",
    description:
      "Relay Fabric is the pool of workers that runs ERIX LAIE's research jobs, with health checks that retire failing workers. Part of the invite-only beta.",
    type: "capability",
    lead: "Relay Fabric is internal infrastructure: the pool of workers that runs LAIE's research jobs.",
    sections: [
      {
        heading: "Workers that look after themselves",
        body: [
          "Workers report their health regularly. Ones that fail checks are retired and replaced, so a research run doesn't stall on a broken worker.",
        ],
      },
    ],
    notice: LAIE_NOTICE,
  },
  {
    slug: "outreach-kits",
    title: "Outreach drafts from ERIX LAIE",
    description:
      "ERIX LAIE drafts first messages for each lead it finds, using what it learned about the business. Nothing is sent until you review it. Invite-only beta.",
    type: "capability",
    lead: "For each lead, LAIE drafts a first message based on what it learned about the business.",
    screen: "leads",
    sections: [
      {
        heading: "Drafts, not auto-sends",
        body: [
          "Outreach waits for your review. Edit it, send it on WhatsApp or email from ERIX within the usual consent rules, or drop it.",
        ],
      },
    ],
    notice: LAIE_NOTICE,
  },
  {
    slug: "developer-sdk",
    title: "ERIX LAIE for developers",
    description:
      "A developer API for ERIX LAIE research runs and their results is part of the invite-only LAIE beta. Ask for access through the waitlist to learn more about it.",
    type: "capability",
    lead: "Developer access to LAIE runs and results is part of the invite-only beta.",
    sections: [
      {
        heading: "Ask for access",
        body: [
          "If you want to run LAIE research from your own software, mention it when you join the waitlist. We'll share the details with invited workspaces.",
        ],
      },
    ],
    notice: LAIE_NOTICE,
  },
];

/* ═══════════════════════════════════════════════════════════════════════
 * ERIX Connect
 * ═════════════════════════════════════════════════════════════════════ */

export const CONNECT_PAGES: SubPage[] = [
  {
    slug: "channels",
    title: "Channels in ERIX Connect: what's live today",
    description:
      "WhatsApp Business API, Instagram DMs, email, website chat, Google Calendar and Meet, and Razorpay: what ERIX Connect supports today, and what's coming soon.",
    type: "capability",
    lead: "Every channel lands in the same inbox and on the same contact, so your team answers from one place.",
    screen: "inbox",
    sections: [
      {
        heading: "WhatsApp",
        body: [
          "Connect your own WhatsApp Business account with Meta's Embedded Signup. Meta bills you directly, and ERIX adds no markup. Incoming messages arrive in the inbox live and are linked to the contact by phone number, creating one if needed. Each message shows its ticks: sent, delivered, read.",
        ],
      },
      {
        heading: "Instagram",
        body: [
          "Instagram DMs land in the same inbox, on the same contact as the customer's WhatsApp chats and emails.",
        ],
      },
      {
        heading: "Email",
        body: [
          "Send from your own domain. Customer emails arrive in the inbox as threads next to their chats, and your replies stay in the same thread.",
        ],
      },
      {
        heading: "Website chat",
        body: [
          "Paste one line onto your website and visitors' messages arrive in your inbox, marked Website chat. Set the name, greeting, colour, position and logo in ERIX, and list the domains allowed to show it; any other site is refused. You choose whether it asks for details before the chat, only when needed, or not at all, with consent. Visitors see replies live, with typing and WhatsApp-style ticks. AI replies are labelled AI, and your team's replies show the person's first name.",
        ],
      },
      {
        heading: "One inbox for all of it",
        body: [
          "Every channel lands in one list, with unread counts. Chats the AI handed over sit under Needs you, and AI drafts show where the answer came from, such as “From: Baner listing”, with Send or Edit. When the tab is in the background, a chime and a count in the tab title tell you a customer wrote; you can switch that off.",
        ],
      },
      {
        heading: "Google Calendar and Meet, and Razorpay",
        body: [
          "Connect Google once and bookings get Meet links. Bookings still work without Google, just without a meeting link. Connect your own Razorpay keys for payment links; the money goes to your account and the invoice marks itself paid.",
        ],
      },
      {
        heading: "Coming soon",
        body: ["Facebook Messenger and Telegram inboxes arrive in version 1.2."],
      },
    ],
    faqs: [
      {
        q: "Can one reply go back on the customer's channel?",
        a: "Yes. Your reply from the inbox always goes back on the channel the customer used.",
      },
      {
        q: "Do I need to refresh to see new messages?",
        a: "No. New messages, ticks and typing appear live, on your computer and your phone.",
      },
    ],
  },
  {
    slug: "unified-send-api",
    title: "Send API for developers",
    description:
      "Developers can send WhatsApp and email messages from their own software through ERIX Connect's send endpoint, with scoped keys and the same rules as the app.",
    type: "capability",
    lead: "Your own software can send a message on a connected channel through one endpoint per channel.",
    sections: [
      {
        heading: "One endpoint per channel",
        body: [
          "Send to /v1/api/infra/connect/send/{channel} with a scoped key created in your dashboard. WhatsApp's rules still apply: outside the 24-hour window you need an approved template. The API docs at api.ecodrix.com list the fields, and the public SDK, @ecodrix/erix-api, wraps the same API.",
        ],
      },
    ],
    notice: "This is a short developer note. The full reference lives in the API docs at api.ecodrix.com.",
  },
  {
    slug: "whatsapp-api-guide",
    title: "Connect the WhatsApp Business API to ERIX",
    description:
      "Step by step: connect your own WhatsApp Business account to ERIX with Meta's Embedded Signup, get templates approved, and reply within WhatsApp's rules.",
    type: "guide",
    lead: "Connecting takes a few minutes. Here is the order that works, and the rules WhatsApp sets once you're live.",
    screen: "inbox",
    steps: [
      "Go to Connect → WhatsApp and choose Embedded Signup. Log in with Facebook and pick your business number.",
      "Create your message templates and wait for WhatsApp to approve them.",
      "Reply to customers from the inbox while their 24-hour window is open.",
      "Use approved templates for broadcasts and for messages outside the 24-hour window.",
    ],
    sections: [
      {
        heading: "Your account, your Meta bill",
        body: [
          "ERIX connects to your own WhatsApp Business account, not a shared one. Meta bills your business directly for messages, and ERIX adds no markup to Meta's charges. Check Meta's current rate card for India before you plan a big broadcast.",
        ],
      },
      {
        heading: "The 24-hour rule, in plain words",
        body: [
          "When a customer messages you, a 24-hour window opens. In that time you can reply with anything, such as free text or photos. Every new message from them opens a fresh 24 hours. After 24 hours of silence, WhatsApp lets businesses send only templates it has approved, and ERIX keeps track of the window for you.",
        ],
      },
      {
        heading: "Templates and broadcasts",
        body: [
          "Templates need WhatsApp's approval before you use them. Once approved, send one to a single contact or as a broadcast to a group, such as everyone with a tag. Broadcasts wait out quiet hours in Indian time.",
        ],
      },
      {
        heading: "Replies with AI, checked by you",
        body: [
          "With the AI agent on, it drafts replies from your knowledge and shows the source of each answer. In Suggest mode, the default, a person sends every reply. Refunds, complaints and medical questions always go to your team.",
        ],
      },
      {
        heading: "Every chat on the right contact",
        body: [
          "Messages are matched to contacts by phone number, so a customer's WhatsApp chat sits next to their emails, bookings and invoices, and ticks update live: sent, delivered, read.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does ERIX add a markup on WhatsApp charges?",
        a: "No. You connect your own WhatsApp Business account, so Meta bills you directly.",
      },
      {
        q: "Can I send a broadcast to anyone?",
        a: "Broadcasts use templates WhatsApp has approved, and WhatsApp's own rules on who you may message still apply. Read Meta's policy before you import a list.",
      },
    ],
  },
  {
    slug: "green-tick",
    title: "WhatsApp verified badge",
    description:
      "What WhatsApp's verified badge for businesses is, why ERIX can't grant it, and where to apply for it in Meta's tools. Meta sets the rules, so check them first.",
    type: "guide",
    lead: "The verified badge on WhatsApp is granted by Meta, not by ERIX or any other provider.",
    sections: [
      {
        heading: "Where to apply",
        body: [
          "Requests are made in Meta's own tools for your WhatsApp Business Account. Meta decides who qualifies and changes its criteria from time to time, so read Meta's current help pages before you apply. Connecting your number to ERIX doesn't change your eligibility either way.",
        ],
      },
    ],
    notice: "Meta's badge rules change. Check Meta's help pages for the current criteria.",
  },
  {
    slug: "whatsapp-broadcast-limits",
    title: "WhatsApp broadcast limits, explained",
    description:
      "How many WhatsApp messages you can broadcast: Meta's daily limit on new conversations, what moves it, and how broadcasts work in ERIX with approved templates.",
    type: "guide",
    lead: "Meta sets the limits on WhatsApp broadcasts. Here is how they work, and what ERIX does around them.",
    sections: [
      {
        heading: "Meta's daily limit",
        body: [
          "Meta limits how many different customers a business can start conversations with in a rolling 24 hours. New numbers start lower, and the limit rises as you send messages people want and keep a good quality rating. Meta changes the tiers from time to time, so check your current limit in WhatsApp Manager rather than relying on a number on a blog.",
        ],
      },
      {
        heading: "What moves the limit",
        body: [
          "Meta looks at your quality rating, which drops when people block or report your messages. Send offers to people who expect them and keep templates short and useful, and the limit tends to rise; a poor rating can hold it back. Your rating is shown in WhatsApp Manager.",
        ],
      },
      {
        heading: "Marketing, utility and authentication",
        body: [
          "WhatsApp files every template as Marketing, Utility or Authentication, and Meta charges each category differently. Meta's rates for India change, so check its current rate card before you plan a big send.",
        ],
      },
      {
        heading: "Before a big send",
        body: ["A few checks keep a festive broadcast from hurting your number:"],
        points: [
          "Check your current limit and quality rating in WhatsApp Manager",
          "Send to people who know you and expect the offer, not a bought list",
          "Keep the template short, useful and clearly from your business",
          "On a new number, start with smaller sends and grow as the limit rises",
          "Check Meta's current rate card so the cost isn't a surprise",
        ],
      },
      {
        heading: "Broadcasts in ERIX",
        body: [
          "In ERIX, a broadcast uses a template WhatsApp has approved and goes to the contacts you pick, such as everyone with a tag. Because you connect your own WhatsApp account, Meta bills you directly and ERIX adds no markup. Broadcasts wait out quiet hours in Indian time.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many people can I broadcast to in a day?",
        a: "Meta decides, based on your number's current limit and quality rating. Check it in WhatsApp Manager.",
      },
      {
        q: "Who pays for broadcast messages?",
        a: "Meta bills your business directly, with no ERIX markup.",
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════
 * ERIX Storage: technical notes, kept short
 * ═════════════════════════════════════════════════════════════════════ */

export const STORAGE_PAGES: SubPage[] = [
  {
    slug: "presigned-uploads",
    title: "Direct uploads to ERIX Storage",
    description:
      "Files uploaded to ERIX go straight to Cloudflare R2 through short-lived signed links, kept in each workspace's own folder, with its storage checked first.",
    type: "capability",
    lead: "Uploads go directly from the browser to storage, not through ERIX's servers.",
    screen: "documents",
    sections: [
      {
        heading: "Signed, short-lived links",
        body: [
          "ERIX hands the browser a time-limited upload link, and the file goes straight to Cloudflare R2. Every file sits under its workspace's own folder, and the workspace's storage is checked before the upload starts.",
        ],
      },
    ],
  },
  {
    slug: "ai-image-processing",
    title: "Images and photos in ERIX Storage",
    description:
      "Photos and images in ERIX Storage live inside the project they belong to, next to the client's documents. Image tools and a Storage page are coming soon.",
    type: "capability",
    lead: "Site photos, floor plans and design images sit in the project they belong to.",
    sections: [
      {
        heading: "Kept with the project",
        body: [
          "Upload PNG and JPG files up to 100 MB each to a project, and your client sees them in their portal next to the documents. Send any file as a share link instead of another WhatsApp attachment. There are no AI image tools in ERIX today.",
        ],
      },
    ],
    notice: "The standalone Storage page is coming soon. Today, files live inside projects.",
  },
  {
    slug: "quota-metering",
    title: "Storage quotas in ERIX",
    description:
      "Each ERIX workspace has a storage allowance. Every upload checks it first, and when it's full ERIX says so plainly and suggests what to do next.",
    type: "capability",
    lead: "Each workspace has a storage allowance, and ERIX keeps the count honest.",
    sections: [
      {
        heading: "Checked before every upload",
        body: [
          "Uploads check the workspace's storage first. When it's full, the upload says so and suggests deleting files you no longer need. Talk to us if your workspace needs more.",
        ],
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════
 * ERIX Store (coming soon): internal engine notes, kept short
 * ═════════════════════════════════════════════════════════════════════ */

const STORE_NOTICE = "ERIX Store is coming soon for developers. Today it runs ERIX's own background work.";

export const STORE_PAGES: SubPage[] = [
  {
    slug: "queue-system",
    title: "Job queues in ERIX Store",
    description:
      "ERIX Store's priority job queues, with delays, retries and a list for failed jobs, run ERIX's background work today. Developer access is coming soon.",
    type: "capability",
    lead: "Queues let ERIX do slow work in the background, in the right order.",
    screen: "engine",
    sections: [
      {
        heading: "Priority, delay and retry",
        body: [
          "A job can wait until later, jump ahead of slower batch work, retry after a failure, and land in a separate list if it keeps failing, so nothing disappears silently.",
        ],
      },
    ],
    notice: STORE_NOTICE,
  },
  {
    slug: "cache-pubsub",
    title: "Cache and publish-subscribe in ERIX Store",
    description:
      "ERIX Store keeps hot data in memory with an expiry time and passes messages between services through channels. Coming soon for developers, per workspace.",
    type: "capability",
    lead: "Fast reads from memory, and channels that pass messages to whoever is listening.",
    screen: "engine",
    sections: [
      {
        heading: "Memory first",
        body: [
          "Values are kept in memory with an expiry time, so frequently read data doesn't hit the database each time. Channels pass a message to every subscriber at once.",
        ],
      },
    ],
    notice: STORE_NOTICE,
  },
  {
    slug: "rate-limiting",
    title: "Rate limits and locks in ERIX Store",
    description:
      "ERIX Store provides rate limits, locks and atomic counters, so two workers never do the same job at once. Coming soon for developers, separate per workspace.",
    type: "capability",
    lead: "Limits and locks keep shared work orderly when many workers run at once.",
    screen: "engine",
    sections: [
      {
        heading: "One holder at a time",
        body: [
          "A lock has one holder at a time and expires on its own. Counters change atomically, and rate limits cap how often something can happen per workspace.",
        ],
      },
    ],
    notice: STORE_NOTICE,
  },
];

/** All sub-pages for a module slug. */
export function getProductPages(product: string): SubPage[] {
  switch (product) {
    case "erix-crm":
      return CRM_PAGES;
    case "erix-flow":
      return FLOW_PAGES;
    case "erix-laie":
      return LAIE_PAGES;
    case "erix-connect":
      return CONNECT_PAGES;
    case "erix-storage":
      return STORAGE_PAGES;
    case "erix-store":
      return STORE_PAGES;
    default:
      return [];
  }
}
