import './globals.css';

export const metadata = {
  title: 'TraceX — AI Coding Mentor',
  description: 'Trace every mistake. Never repeat one.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
