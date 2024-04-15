import App from '../App';
import '../globals.css';
import 'katex/dist/katex.min.css';

export const metadata = {
  title: 'KNOWTIFAI',
  description: 'KNOWTIFAI is a platform that provides AI-powered solutions for video content and documents.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <App>
        {children}
        </App>
      </body>
    </html>
  )
}
