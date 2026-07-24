export const PRODUCT_MENU = [
  { label: "Product Overview", href: "/product", description: "The verification engine end to end" },
  { label: "Deepfake Detection", href: "/deepfake-detection", description: "Image, audio & video manipulation" },
  { label: "Context Verification", href: "/context-verification", description: "Claim extraction & source matching" },
  { label: "Dashboard Demo", href: "/dashboard", description: "See a real verification workspace" },
];

export const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product", menu: PRODUCT_MENU },
  { label: "Solutions", href: "/solutions" },
  { label: "API", href: "/developers" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  Product: [
    { label: "Product Overview", href: "/product" },
    { label: "Deepfake Detection", href: "/deepfake-detection" },
    { label: "Context Verification", href: "/context-verification" },
    { label: "Dashboard Demo", href: "/dashboard" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Solutions", href: "/solutions" },
    { label: "Blog & Research", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "API & Developers", href: "/developers" },
    { label: "FAQ", href: "/faq" },
    { label: "Documentation", href: "/developers#documentation" },
    { label: "Status", href: "/faq#status" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Security", href: "/legal/security" },
  ],
};
