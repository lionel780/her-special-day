export default function Icon({ name, size = 24, strokeWidth = 1.4, ...rest }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: "false",
    ...rest
  };

  switch (name) {
    case "envelope":
      return (
        <svg {...common}>
          <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
          <path d="m3.8 7 7.3 5.2a1.6 1.6 0 0 0 1.8 0L20.2 7" />
          <path d="m4 17 5.4-5M20 17l-5.4-5" opacity=".45" />
        </svg>
      );
    case "feather":
      return (
        <svg {...common}>
          <path d="M19.8 4.2c-3.9-1.4-8.7.3-10.9 3.8-1.7 2.7-1.7 6-1.7 6s3.3 0 6-1.7c3.5-2.2 5.2-7 4.1-8.1Z" />
          <path d="M6.5 17.5 18 6M9.4 14.6h4.2M11.5 11.9V8.4" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M12 2.8c.6 4.5 2.1 6 6.6 6.6-4.5.6-6 2.1-6.6 6.6-.6-4.5-2.1-6-6.6-6.6 4.5-.6 6-2.1 6.6-6.6Z" />
          <path d="M18.7 15.4c.3 1.9.9 2.5 2.8 2.8-1.9.3-2.5.9-2.8 2.8-.3-1.9-.9-2.5-2.8-2.8 1.9-.3 2.5-.9 2.8-2.8Z" />
        </svg>
      );
    case "aperture":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8.2 4.4 3.7 6.4M20.2 8.7l-7.4.1M17.5 19.1 14 12.6M9.1 20.1l3.7-6.3M3.7 15.2l7.2-.2M6.4 5l3.6 6.3" opacity=".8" />
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4.1" />
          <path d="M12 2.4v2.2M12 19.4v2.2M4.4 12H2.2M21.8 12h-2.2M6.6 6.6 5 5M19 19l-1.6-1.6M17.4 6.6 19 5M5 19l1.6-1.6" />
        </svg>
      );
    case "music":
      return (
        <svg {...common}>
          <path d="M9 18.2V6.6l9-1.8v11" />
          <ellipse cx="6.6" cy="18.2" rx="2.6" ry="2.1" />
          <ellipse cx="15.6" cy="15.8" rx="2.6" ry="2.1" />
        </svg>
      );
    case "jar":
      return (
        <svg {...common}>
          <path d="M7.5 8.2h9v10.3a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2V8.2Z" />
          <path d="M8.6 8.2V6.4h6.8v1.8M7.2 5.2h9.6A1.2 1.2 0 0 1 18 6.4v1a1.2 1.2 0 0 1-1.2 1.2H7.2A1.2 1.2 0 0 1 6 7.4v-1a1.2 1.2 0 0 1 1.2-1.2Z" />
          <path d="M10.2 12.8c.9-1 2.7-1 3.6 0M11.2 16.2h1.6" opacity=".7" />
        </svg>
      );
    case "gift":
      return (
        <svg {...common}>
          <path d="M4.5 9.5h15v11h-15zM3.2 9.5h17.6M12 9.5v11" />
          <path d="M12 9.5C10.2 5.4 6.6 5.2 6.9 7.5c.2 1.5 2.6 2 5.1 2ZM12 9.5c1.8-4.1 5.4-4.3 5.1-2-.2 1.5-2.6 2-5.1 2Z" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M4.5 12h15M14 6.5l5.5 5.5L14 17.5" />
        </svg>
      );
    case "arrow-left":
      return (
        <svg {...common}>
          <path d="M19.5 12h-15M10 6.5 4.5 12 10 17.5" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m4.5 12.5 5 5L20 6.5" />
        </svg>
      );
    case "download":
      return (
        <svg {...common}>
          <path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5M4.5 19.5h15" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20.2S3.4 15.3 3.4 9.1a4.6 4.6 0 0 1 8.6-2.4 4.6 4.6 0 0 1 8.6 2.4c0 6.2-8.6 11.1-8.6 11.1Z" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3.5" y="5.2" width="17" height="15" rx="2.4" />
          <path d="M7.8 3.2v4M16.2 3.2v4M3.5 9.7h17" />
          <path d="M8 13h.1M12 13h.1M16 13h.1M8 16.8h.1M12 16.8h.1" strokeWidth="2.2" />
        </svg>
      );
    case "quiz":
      return (
        <svg {...common}>
          <path d="M9.2 9.1a2.9 2.9 0 1 1 4.5 2.4c-1 .6-1.7 1.2-1.7 2.4v.5" />
          <circle cx="12" cy="18" r=".9" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case "sound":
      return (
        <svg {...common}>
          <path d="M4 9.5h3.2L12 5.6v12.8L7.2 14.5H4z" />
          <path d="M15.2 9.2a4 4 0 0 1 0 5.6M17.8 6.8a7.4 7.4 0 0 1 0 10.4" />
        </svg>
      );
    case "sound-off":
      return (
        <svg {...common}>
          <path d="M4 9.5h3.2L12 5.6v12.8L7.2 14.5H4z" />
          <path d="m16 9.5 5 5M21 9.5l-5 5" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="m3.5 11 8.5-7 8.5 7" />
          <path d="M5.8 9.4v10h12.4v-10M10 19.4v-5.8h4v5.8" />
        </svg>
      );
    case "perfume":
      return (
        <svg {...common}>
          <rect x="7.2" y="8.4" width="9.6" height="12" rx="2.4" />
          <path d="M10 8.4V5.6h4v2.8M10.6 3.5h2.8M12 11.5v5.4M9.4 14.2h5.2" />
        </svg>
      );
    case "bag":
      return (
        <svg {...common}>
          <path d="M4.5 8.5h15l-1.1 11.2H5.6L4.5 8.5Z" />
          <path d="M8.4 8.5V7a3.6 3.6 0 0 1 7.2 0v1.5M9 12.5h6" />
        </svg>
      );
    case "headphones":
      return (
        <svg {...common}>
          <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
          <rect x="3" y="13.5" width="4" height="6" rx="2" />
          <rect x="17" y="13.5" width="4" height="6" rx="2" />
        </svg>
      );
    case "plane":
      return (
        <svg {...common}>
          <path d="m3.2 13.3 17.5-8.1-5.2 14.5-3.3-6.1-9-.3Z" />
          <path d="m12.2 13.6 4.2-4.2" />
        </svg>
      );
    case "dinner":
      return (
        <svg {...common}>
          <path d="M7 3.5v6.2a2 2 0 0 0 4 0V3.5M9 11.7v8.8M16.5 3.5c-1.3 1.1-2 2.8-2 4.9 0 1.3.8 2.2 2 2.2s2-.9 2-2.2c0-2.1-.7-3.8-2-4.9ZM16.5 10.6v9.9" />
        </svg>
      );
    case "flowers":
      return (
        <svg {...common}>
          <path d="M12 21v-8M12 16c-2.4 0-4.2-1.4-4.8-3.3 2.3-.5 4 .4 4.8 3.3ZM12 14.2c2.2-.2 3.7-1.6 4.1-3.5-2.1-.2-3.6.8-4.1 3.5Z" />
          <path d="M12 12.8c-1.4-1.2-2-2.7-1.5-4 .4-1.1 1.5-1.4 1.5-1.4s1.1.3 1.5 1.4c.5 1.3-.1 2.8-1.5 4Z" />
          <circle cx="12" cy="6.2" r="2.3" />
        </svg>
      );
    case "serum":
      return (
        <svg {...common}>
          <path d="M9 9h6v9.5a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V9Z" />
          <path d="M10.5 9V6.2h3V9M12 3v3.2M9 13h6" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 4.8h5.2A2.8 2.8 0 0 1 12 7.6v12a2.8 2.8 0 0 0-2.8-2.8H4V4.8ZM20 4.8h-5.2A2.8 2.8 0 0 0 12 7.6v12a2.8 2.8 0 0 1 2.8-2.8H20V4.8Z" />
        </svg>
      );
    case "concert":
      return (
        <svg {...common}>
          <path d="M9.5 17.5V6.8l9-1.8v10.7" />
          <ellipse cx="7" cy="17.5" rx="2.5" ry="1.9" />
          <ellipse cx="16" cy="15.7" rx="2.5" ry="1.9" />
          <path d="M4.2 5.2 3 3.5M20.2 5.2 21.4 3.5" opacity=".6" />
        </svg>
      );
    case "palette":
      return (
        <svg {...common}>
          <path d="M12 3.2a8.8 8.8 0 1 0 0 17.6c1.5 0 2-1 1.4-2.2-.7-1.3.1-2.6 1.6-2.6h1.8A4 4 0 0 0 20.8 12 8.8 8.8 0 0 0 12 3.2Z" />
          <circle cx="8.2" cy="9" r=".9" fill="currentColor" stroke="none" />
          <circle cx="12" cy="7" r=".9" fill="currentColor" stroke="none" />
          <circle cx="15.8" cy="9.2" r=".9" fill="currentColor" stroke="none" />
          <circle cx="7.8" cy="13.2" r=".9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "money":
      return (
        <svg {...common}>
          <rect x="2.8" y="6.4" width="18.4" height="11.2" rx="2.2" />
          <circle cx="12" cy="12" r="2.8" />
          <path d="M6 9.6h.01M18 14.4h.01" strokeWidth="2.4" />
        </svg>
      );
    case "gloss":
      return (
        <svg {...common}>
          <rect x="9" y="9.8" width="6" height="9.2" rx="1.8" />
          <path d="M10.4 9.8V7h3.2v2.8M12 3.2V7M10.2 13.4h3.6" />
        </svg>
      );
    case "slippers":
      return (
        <svg {...common}>
          <path d="M4 16.5h15.4a1.5 1.5 0 0 0 1.4-2l-.6-1.7a2 2 0 0 0-1.4-1.2l-3.2-.8a3 3 0 0 1-1.3-.8l-1.1-1.1a1.8 1.8 0 0 0-2.6 0l-.6.6c-.7.8-1.6 1.3-2.6 1.5l-2.7.7A2 2 0 0 0 3 13.5v1.5A1.5 1.5 0 0 0 4 16.5Z" />
          <path d="M4 16.5V19h14.5v-2.5" opacity=".45" />
        </svg>
      );
    case "cupcake":
      return (
        <svg {...common}>
          <path d="M6 12.6h12l-1.4 6.5a2 2 0 0 1-2 1.6H9.4a2 2 0 0 1-2-1.6L6 12.6Z" />
          <path d="M4.6 12.6h14.8" />
          <path d="M8 12.6c-.8-1.2-.4-2.6.7-3.1-.2-1.2.7-2.3 1.9-2.3.4-1 1.7-1.4 2.6-.8.9-.6 2.2-.1 2.5.9 1.2 0 2 1.1 1.7 2.2 1 .6 1.3 1.9.6 3.1" />
          <path d="M10.3 16.3h.01M13.7 16.3h.01" strokeWidth="2.2" />
        </svg>
      );
    case "candy":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3.7" />
          <path d="m8.7 9.4-3.2-1.7a.7.7 0 0 0-1 .8l1 3.1M15.3 14.6l3.2 1.7a.7.7 0 0 0 1-.8l-1-3.1" />
        </svg>
      );
    case "chips":
      return (
        <svg {...common}>
          <path d="M7 4.6h10l1.3 13.9a1.5 1.5 0 0 1-1.5 1.6H7.2a1.5 1.5 0 0 1-1.5-1.6L7 4.6Z" />
          <path d="m6.9 8.2 1.6-1.1 1.7 1.1 1.8-1.1 1.8 1.1 1.7-1.1 1.6 1.1" />
          <path d="M9.3 12.4c.9.7 1.8.7 2.7 0 .9.7 1.8.7 2.7 0" opacity=".55" />
        </svg>
      );
    case "microphone":
      return (
        <svg {...common}>
          <rect x="9" y="3.2" width="6" height="10.4" rx="3" />
          <path d="M6.2 11.4a5.8 5.8 0 0 0 11.6 0M12 17.2v3.6M9.2 20.8h5.6" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}
