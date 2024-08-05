export default function NavOpt({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <a
        className="antialiased block py-2 px-3 text-gray-100 rounded"
        href={href}
      >
        {text}
      </a>
    </li>
  );
}
